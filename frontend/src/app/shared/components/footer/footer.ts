import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  email = signal('');
  subscribed = signal(false);

  services = [
    { label: 'Software Development', path: '/services/software-development' },
    { label: 'Cloud Engineering', path: '/services/cloud-engineering' },
    { label: 'Data Engineering', path: '/services/data-engineering' },
    { label: 'Artificial Intelligence', path: '/services/artificial-intelligence' },
    { label: 'Cybersecurity', path: '/services/cybersecurity' },
    { label: 'DevOps Consulting', path: '/services/devops' },
    { label: 'Platform Engineering', path: '/services/platform-engineering' },
    { label: 'API Development', path: '/services/api-development' },
  ];

  company = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Portfolio', path: '/portfolio' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Careers', path: '/careers' },
    { label: 'Partners', path: '/partners' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ];

  technologies = [
    { label: 'Angular & React', path: '/technologies' },
    { label: 'Spring Boot', path: '/technologies' },
    { label: 'AWS & Azure', path: '/technologies' },
    { label: 'Kubernetes', path: '/technologies' },
    { label: 'Apache Kafka', path: '/technologies' },
    { label: 'PostgreSQL', path: '/technologies' },
    { label: 'TensorFlow & PyTorch', path: '/technologies' },
    { label: 'Terraform', path: '/technologies' },
  ];

  subscribe(e: Event): void {
    e.preventDefault();
    if (this.email()) {
      this.subscribed.set(true);
    }
  }
}
