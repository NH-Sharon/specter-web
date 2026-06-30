import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  submitted = signal(false);
  submitting = signal(false);

  form = {
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  };

  readonly services = [
    'Software Development',
    'Cloud Engineering',
    'Data Engineering',
    'Artificial Intelligence',
    'Cybersecurity',
    'Platform Engineering',
    'DevOps Consulting',
    'API Development',
    'Other / Not Sure'
  ];

  readonly budgets = [
    'Under $10,000',
    '$10,000 – $50,000',
    '$50,000 – $150,000',
    '$150,000 – $500,000',
    '$500,000+',
    'Not sure yet'
  ];

  readonly offices = [
    {
      city: 'Dhaka',
      country: 'Bangladesh',
      flag: '🇧🇩',
      address: 'Level 12, Gulshan Tower, 34 Gulshan Ave, Dhaka 1212',
      phone: '+880 2 9844567',
      email: 'dhaka@spectertech.com'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      flag: '🇬🇧',
      address: '25 Canada Square, Canary Wharf, London E14 5LB',
      phone: '+44 20 7946 0800',
      email: 'london@spectertech.com'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      address: '1 Raffles Place, #40-02, One Raffles Place, Singapore 048616',
      phone: '+65 6221 8888',
      email: 'singapore@spectertech.com'
    }
  ];

  submitForm(e: Event): void {
    e.preventDefault();
    if (this.submitting()) return;
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 1500);
  }
}
