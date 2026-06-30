import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface TechCategory {
  name: string;
  icon: string;
  description: string;
  technologies: { name: string; icon: string; level: 'Expert' | 'Advanced' | 'Proficient' }[];
}

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss'
})
export class TechnologiesComponent {
  activeCategory = 'All';

  readonly categories: TechCategory[] = [
    {
      name: 'Frontend', icon: '🎨',
      description: 'Modern, performant, accessible user interfaces',
      technologies: [
        { name: 'Angular 20', icon: '🅰', level: 'Expert' },
        { name: 'React 19', icon: '⚛', level: 'Expert' },
        { name: 'Next.js 15', icon: '▲', level: 'Expert' },
        { name: 'TypeScript 5', icon: 'TS', level: 'Expert' },
        { name: 'Tailwind CSS', icon: '🎨', level: 'Expert' },
        { name: 'Vue.js 3', icon: '💚', level: 'Advanced' },
      ]
    },
    {
      name: 'Backend', icon: '⚙️',
      description: 'High-performance, scalable server-side systems',
      technologies: [
        { name: 'Spring Boot 3', icon: '🍃', level: 'Expert' },
        { name: 'Node.js', icon: '🟢', level: 'Expert' },
        { name: 'NestJS', icon: '🦅', level: 'Advanced' },
        { name: 'Python / FastAPI', icon: '🐍', level: 'Expert' },
        { name: 'Go', icon: '🐹', level: 'Proficient' },
        { name: 'Rust', icon: '🦀', level: 'Proficient' },
      ]
    },
    {
      name: 'Cloud', icon: '☁️',
      description: 'Multi-cloud architecture and migrations',
      technologies: [
        { name: 'AWS', icon: '☁', level: 'Expert' },
        { name: 'Microsoft Azure', icon: '🔷', level: 'Expert' },
        { name: 'Google Cloud', icon: '🌐', level: 'Advanced' },
        { name: 'AWS EKS', icon: '⎈', level: 'Expert' },
        { name: 'Azure AKS', icon: '🔷', level: 'Expert' },
        { name: 'CloudFront / CDN', icon: '🌍', level: 'Expert' },
      ]
    },
    {
      name: 'DevOps', icon: '🔄',
      description: 'CI/CD, containers, and infrastructure automation',
      technologies: [
        { name: 'Kubernetes', icon: '⎈', level: 'Expert' },
        { name: 'Docker', icon: '🐳', level: 'Expert' },
        { name: 'Terraform', icon: '🏗', level: 'Expert' },
        { name: 'GitHub Actions', icon: '🐙', level: 'Expert' },
        { name: 'GitLab CI/CD', icon: '🦊', level: 'Expert' },
        { name: 'Ansible', icon: '🅰', level: 'Advanced' },
        { name: 'ArgoCD', icon: '🐙', level: 'Expert' },
        { name: 'Helm', icon: '⎈', level: 'Expert' },
      ]
    },
    {
      name: 'Data', icon: '📊',
      description: 'Big data processing and stream analytics',
      technologies: [
        { name: 'Apache Kafka', icon: '📨', level: 'Expert' },
        { name: 'Apache Spark', icon: '⚡', level: 'Expert' },
        { name: 'Apache Airflow', icon: '🌊', level: 'Expert' },
        { name: 'Apache NiFi', icon: '🌀', level: 'Advanced' },
        { name: 'dbt', icon: '🔧', level: 'Advanced' },
        { name: 'Snowflake', icon: '❄', level: 'Advanced' },
        { name: 'BigQuery', icon: '📊', level: 'Advanced' },
      ]
    },
    {
      name: 'AI/ML', icon: '🤖',
      description: 'Machine learning and generative AI',
      technologies: [
        { name: 'OpenAI / GPT-4', icon: '🤖', level: 'Expert' },
        { name: 'LangChain', icon: '🔗', level: 'Expert' },
        { name: 'PyTorch', icon: '🔥', level: 'Expert' },
        { name: 'TensorFlow', icon: '📐', level: 'Advanced' },
        { name: 'Hugging Face', icon: '🤗', level: 'Expert' },
        { name: 'Qdrant / pgvector', icon: '🗄', level: 'Expert' },
      ]
    },
    {
      name: 'Database', icon: '🗄️',
      description: 'Relational, document, and time-series databases',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘', level: 'Expert' },
        { name: 'Oracle DB', icon: '🔴', level: 'Expert' },
        { name: 'MySQL / MariaDB', icon: '🐬', level: 'Expert' },
        { name: 'MongoDB', icon: '🍃', level: 'Expert' },
        { name: 'Redis', icon: '🔴', level: 'Expert' },
        { name: 'ClickHouse', icon: '📦', level: 'Advanced' },
      ]
    },
    {
      name: 'Observability', icon: '📈',
      description: 'Monitoring, logging, and distributed tracing',
      technologies: [
        { name: 'Grafana', icon: '📊', level: 'Expert' },
        { name: 'Prometheus', icon: '🔥', level: 'Expert' },
        { name: 'ELK Stack', icon: '🔍', level: 'Expert' },
        { name: 'Jaeger / Tempo', icon: '🕸', level: 'Advanced' },
        { name: 'Datadog', icon: '🐶', level: 'Advanced' },
        { name: 'New Relic', icon: '📡', level: 'Proficient' },
      ]
    },
    {
      name: 'Security', icon: '🔐',
      description: 'Identity, secrets management, and security tooling',
      technologies: [
        { name: 'HashiCorp Vault', icon: '🏛', level: 'Expert' },
        { name: 'Keycloak / OAuth2', icon: '🔑', level: 'Expert' },
        { name: 'SonarQube', icon: '🔍', level: 'Expert' },
        { name: 'Trivy / Falco', icon: '🛡', level: 'Advanced' },
        { name: 'OPA / Rego', icon: '⚖', level: 'Advanced' },
        { name: 'AWS WAF', icon: '🛡', level: 'Expert' },
      ]
    }
  ];

  getLevelColor(level: string): string {
    return level === 'Expert' ? '#10b981' : level === 'Advanced' ? '#4f6ef7' : '#8b5cf6';
  }
}
