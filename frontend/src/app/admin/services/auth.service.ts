import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API = `${environment.apiUrl}/api/v1`;
const TOKEN_KEY = 'specter_admin_token';
const USER_KEY = 'specter_admin_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(this.hasValidToken());
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  currentUser = signal<{username: string; fullName: string; role: string} | null>(
    this.getStoredUser()
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${API}/auth/login`, { username, password }).pipe(
      tap(res => {
        if (res.success && res.data) {
          localStorage.setItem(TOKEN_KEY, res.data.token);
          localStorage.setItem(USER_KEY, JSON.stringify({
            username: res.data.username,
            fullName: res.data.fullName,
            role: res.data.role
          }));
          this._isLoggedIn.set(true);
          this.currentUser.set({ username: res.data.username, fullName: res.data.fullName, role: res.data.role });
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private hasValidToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  private getStoredUser() {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  }
}
