import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LogoComponent } from '../../shared/components/logo/logo';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, LogoComponent],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayoutComponent {
  sidebarOpen = signal(true);

  readonly navItems = [
    { icon: '📊', label: 'Dashboard',    path: '/admin/dashboard' },
    { icon: '✍️', label: 'Blog Posts',    path: '/admin/blog' },
    { icon: '💼', label: 'Portfolio',     path: '/admin/portfolio' },
    { icon: '📋', label: 'Job Postings',  path: '/admin/jobs' },
    { icon: '📬', label: 'Inquiries',     path: '/admin/inquiries' },
    { icon: '🗂️', label: 'Site Content',  path: '/admin/content' },
    { icon: '⚙️', label: 'Settings',      path: '/admin/settings' },
  ];

  constructor(readonly auth: AuthService) {}

  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  logout() { this.auth.logout(); }
}
