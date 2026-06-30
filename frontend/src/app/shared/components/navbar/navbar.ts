import {
  Component, signal, computed, HostListener, inject, OnInit
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { LogoComponent } from '../logo/logo';

interface NavLink {
  label: string;
  path?: string;
  children?: NavGroup[];
}

interface NavGroup {
  title: string;
  items: { label: string; path: string; icon: string; desc?: string }[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LogoComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  readonly themeService = inject(ThemeService);

  scrolled = signal(false);
  mobileOpen = signal(false);
  activeMenu = signal<string | null>(null);

  readonly navLinks: NavLink[] = [
    {
      label: 'Services',
      children: [
        {
          title: 'Engineering',
          items: [
            { label: 'Software Development', path: '/services/software-development', icon: '💻', desc: 'Enterprise & custom software' },
            { label: 'Cloud Engineering', path: '/services/cloud-engineering', icon: '☁️', desc: 'AWS, Azure, GCP migrations' },
            { label: 'Platform Engineering', path: '/services/platform-engineering', icon: '⚙️', desc: 'Kubernetes, SRE, automation' },
            { label: 'API Development', path: '/services/api-development', icon: '🔗', desc: 'Microservices & integrations' },
          ]
        },
        {
          title: 'Data & AI',
          items: [
            { label: 'Data Engineering', path: '/services/data-engineering', icon: '📊', desc: 'Kafka, Spark, pipelines' },
            { label: 'Artificial Intelligence', path: '/services/artificial-intelligence', icon: '🤖', desc: 'ML, GenAI, LLM, RAG' },
            { label: 'Business Intelligence', path: '/services/business-intelligence', icon: '📈', desc: 'Dashboards & analytics' },
          ]
        },
        {
          title: 'Security & IT',
          items: [
            { label: 'Cybersecurity', path: '/services/cybersecurity', icon: '🛡️', desc: 'DevSecOps, pentesting, IAM' },
            { label: 'Managed IT Services', path: '/services/managed-it', icon: '🖥️', desc: 'Support, consulting, training' },
            { label: 'DevOps Consulting', path: '/services/devops', icon: '🔄', desc: 'CI/CD, Docker, Kubernetes' },
          ]
        }
      ]
    },
    {
      label: 'Solutions',
      children: [
        {
          title: 'By Industry',
          items: [
            { label: 'Government & Public Sector', path: '/industries', icon: '🏛️' },
            { label: 'Banking & Finance', path: '/industries', icon: '🏦' },
            { label: 'Healthcare', path: '/industries', icon: '🏥' },
            { label: 'Retail & E-Commerce', path: '/industries', icon: '🛍️' },
          ]
        },
        {
          title: 'By Need',
          items: [
            { label: 'Digital Transformation', path: '/solutions', icon: '🚀' },
            { label: 'ERP Solutions', path: '/solutions', icon: '🏗️' },
            { label: 'Data Warehouse', path: '/solutions', icon: '🗄️' },
            { label: 'Cloud Migration', path: '/solutions', icon: '☁️' },
          ]
        }
      ]
    },
    { label: 'Technologies', path: '/technologies' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    {
      label: 'Resources',
      children: [
        {
          title: 'Learn',
          items: [
            { label: 'Blog', path: '/blog', icon: '📝', desc: 'Insights & tutorials' },
            { label: 'Case Studies', path: '/case-studies', icon: '📋', desc: 'Real-world solutions' },
            { label: 'Resources', path: '/resources', icon: '📚', desc: 'Downloads & guides' },
          ]
        },
        {
          title: 'Company',
          items: [
            { label: 'Careers', path: '/careers', icon: '💼', desc: 'Join our team' },
            { label: 'Partners', path: '/partners', icon: '🤝', desc: 'Partner program' },
            { label: 'FAQ', path: '/faq', icon: '❓', desc: 'Common questions' },
          ]
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.themeService.theme();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  openMenu(label: string): void {
    this.activeMenu.set(label);
  }

  closeMenu(): void {
    this.activeMenu.set(null);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  hasChildren(link: NavLink): boolean {
    return !!link.children?.length;
  }
}
