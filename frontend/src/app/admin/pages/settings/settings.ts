import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class SettingsComponent {
  saved = signal(false);

  settings = {
    companyName: 'Specter Technologies Ltd.',
    tagline: 'Engineering the Future with Cloud, Data & AI',
    email: 'hello@spectertech.com.bd',
    phone: '+880 1700-000000',
    address: 'Mannan Plaza, Khilkhet, Dhaka 1229, Bangladesh',
    linkedIn: '',
    github: '',
    twitter: '',
    facebook: '',
    googleAnalytics: '',
  };

  constructor() {
    const stored = localStorage.getItem('specter_settings');
    if (stored) {
      try { Object.assign(this.settings, JSON.parse(stored)); } catch {}
    }
  }

  save() {
    localStorage.setItem('specter_settings', JSON.stringify(this.settings));
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2500);
  }
}
