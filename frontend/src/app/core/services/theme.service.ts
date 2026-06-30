import { Injectable, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this._loadSaved());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const t = this.theme();
      this.doc.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('specter-theme', t);
    });
  }

  toggle(): void {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  setTheme(t: Theme): void {
    this.theme.set(t);
  }

  private _loadSaved(): Theme {
    if (typeof localStorage === 'undefined') return 'dark';
    const saved = localStorage.getItem('specter-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
