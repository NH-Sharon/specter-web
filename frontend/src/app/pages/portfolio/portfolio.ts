import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  year: string;
  image: string;
  icon?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class PortfolioComponent {
  activeFilter = signal('All');

  readonly categories = ['All', 'Government', 'Finance', 'AI/ML', 'Healthcare', 'Retail', 'Cloud'];

  readonly projects: Project[] = [
    {
      id: 1,
      title: 'National Revenue Digital Portal',
      client: 'Revenue Authority',
      category: 'Government',
      description: 'End-to-end digital transformation of national tax collection infrastructure handling 2M+ daily transactions with zero downtime migration.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS', 'Kafka'],
      metrics: [{ label: 'Transactions/Day', value: '2M+' }, { label: 'Uptime', value: '99.99%' }, { label: 'Cost Savings', value: '60%' }],
      year: '2024',
      image: 'gov'
    },
    {
      id: 2,
      title: 'Real-Time Fraud Detection Platform',
      client: 'National Commerce Bank',
      category: 'Finance',
      description: 'Streaming ML-based fraud detection system analyzing 1M+ transactions per second with sub-10ms response time across 24 countries.',
      technologies: ['Apache Kafka', 'Spark', 'Python', 'AWS', 'TensorFlow'],
      metrics: [{ label: 'Latency', value: '<10ms' }, { label: 'Fraud Caught', value: '94%' }, { label: 'Events/Sec', value: '1M+' }],
      year: '2024',
      image: 'fin'
    },
    {
      id: 3,
      title: 'Enterprise GenAI Copilot',
      client: 'Fortune 500 Conglomerate',
      category: 'AI/ML',
      description: 'RAG-powered enterprise AI assistant integrated across 14 internal systems, automating document processing and workflow approvals.',
      technologies: ['LangChain', 'OpenAI', 'FastAPI', 'Azure', 'PGVector'],
      metrics: [{ label: 'Automation Rate', value: '40%' }, { label: 'ROI Year 1', value: '320%' }, { label: 'Active Users', value: '5,000+' }],
      year: '2024',
      image: 'ai'
    },
    {
      id: 4,
      title: 'Patient Data Interoperability Hub',
      client: 'National Health Network',
      category: 'Healthcare',
      description: 'FHIR-compliant data exchange platform connecting 200+ hospitals, enabling real-time patient data sharing across the national health network.',
      technologies: ['HL7 FHIR', 'Spring Boot', 'GCP', 'Kubernetes', 'MongoDB'],
      metrics: [{ label: 'Hospitals Connected', value: '200+' }, { label: 'Records/Day', value: '500K' }, { label: 'HIPAA Compliant', value: '100%' }],
      year: '2023',
      image: 'health'
    },
    {
      id: 5,
      title: 'Omnichannel Commerce Platform',
      client: 'Apex Retail Group',
      category: 'Retail',
      description: 'Unified commerce platform handling online, mobile, and in-store experiences for 3M+ customers with AI-powered personalization.',
      technologies: ['React', 'Node.js', 'Elasticsearch', 'AWS', 'Redis'],
      metrics: [{ label: 'Revenue Increase', value: '35%' }, { label: 'Conversion Rate', value: '+22%' }, { label: 'Customers', value: '3M+' }],
      year: '2023',
      image: 'retail'
    },
    {
      id: 6,
      title: 'Multi-Cloud Infrastructure Migration',
      client: 'Telecom Consortium',
      category: 'Cloud',
      description: 'Zero-downtime migration of 400+ legacy services to AWS and Azure, with full Kubernetes orchestration and automated disaster recovery.',
      technologies: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'ArgoCD'],
      metrics: [{ label: 'Services Migrated', value: '400+' }, { label: 'Cost Reduction', value: '55%' }, { label: 'Downtime', value: '0hrs' }],
      year: '2023',
      image: 'cloud'
    },
    {
      id: 7,
      title: 'e-Government Services Portal',
      client: 'Ministry of Digital Affairs',
      category: 'Government',
      description: 'Unified digital gateway for 300+ government services, processing 500K citizen requests daily with digital identity verification.',
      technologies: ['Angular', 'Spring Boot', 'AWS', 'Keycloak', 'PostgreSQL'],
      metrics: [{ label: 'Services Online', value: '300+' }, { label: 'Citizens/Day', value: '500K' }, { label: 'Satisfaction', value: '4.8/5' }],
      year: '2022',
      image: 'gov2'
    },
    {
      id: 8,
      title: 'Predictive Credit Scoring Engine',
      client: 'Regional Banking Alliance',
      category: 'Finance',
      description: 'ML-powered credit scoring system replacing legacy rule-based models, improving approval rates while reducing default risk.',
      technologies: ['Python', 'XGBoost', 'Airflow', 'AWS SageMaker', 'dbt'],
      metrics: [{ label: 'Default Reduction', value: '28%' }, { label: 'Approval Lift', value: '+18%' }, { label: 'Model Accuracy', value: '96.2%' }],
      year: '2022',
      image: 'fin2'
    }
  ];

  get filteredProjects(): Project[] {
    const f = this.activeFilter();
    return f === 'All' ? this.projects : this.projects.filter(p => p.category === f);
  }

  setFilter(cat: string): void {
    this.activeFilter.set(cat);
  }

  readonly categoryColors: Record<string, string> = {
    Government: '#4f6ef7',
    Finance: '#10b981',
    'AI/ML': '#8b5cf6',
    Healthcare: '#0ea5e9',
    Retail: '#f59e0b',
    Cloud: '#06b6d4'
  };

  getCategoryColor(cat: string): string {
    return this.categoryColors[cat] || '#4f6ef7';
  }
}
