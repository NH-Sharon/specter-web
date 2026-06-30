import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../../../shared/components/logo/logo';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LogoComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/admin/dashboard']);
  }

  login() {
    if (!this.username || !this.password) {
      this.error.set('Please enter username and password.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (e) => {
        this.loading.set(false);
        this.error.set(e?.error?.message || 'Invalid credentials. Please try again.');
      }
    });
  }
}
