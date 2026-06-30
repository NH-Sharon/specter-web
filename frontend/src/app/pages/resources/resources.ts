import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Resource {
  id: number;
  type: string;
  typeIcon: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './resources.html',
  styleUrl: './resources.scss'
})
export class ResourcesComponent {
  activeType = signal('All');

  readonly types = ['All', 'Whitepaper', 'Guide', 'Webinar', 'Case Study', 'Checklist'];

  readonly resources: Resource[] = [
    {
      id: 1,
      type: 'Whitepaper',
      typeIcon: '📄',
      title: 'Enterprise Cloud Migration Playbook 2025',
      description: 'A comprehensive 48-page playbook covering cloud migration strategy, risk assessment frameworks, and proven execution methodologies drawn from 50+ enterprise migrations.',
      category: 'Cloud',
      date: 'Jun 2025',
      readTime: '45 min read',
      featured: true
    },
    {
      id: 2,
      type: 'Guide',
      typeIcon: '📖',
      title: 'Building RAG Systems for Enterprise: Architecture Guide',
      description: 'Step-by-step guide to designing, building, and deploying production-grade retrieval-augmented generation systems for enterprise knowledge management.',
      category: 'AI',
      date: 'May 2025',
      readTime: '30 min read'
    },
    {
      id: 3,
      type: 'Webinar',
      typeIcon: '🎥',
      title: 'Data Mesh in Practice: Lessons from the Field',
      description: 'Recording of our 90-minute webinar with Farhan Hossain, Head of Data Engineering, covering real-world Data Mesh implementation patterns and pitfalls.',
      category: 'Data',
      date: 'May 2025',
      readTime: '90 min watch'
    },
    {
      id: 4,
      type: 'Case Study',
      typeIcon: '📊',
      title: 'How a National Bank Cut Fraud Losses by 94%',
      description: 'Detailed case study of how we built a real-time ML fraud detection platform that transformed the bank\'s fraud operations and saved $16M in the first year.',
      category: 'Finance',
      date: 'Apr 2025',
      readTime: '20 min read'
    },
    {
      id: 5,
      type: 'Checklist',
      typeIcon: '✅',
      title: 'Kubernetes Production Readiness Checklist',
      description: 'A 100-point checklist covering security hardening, resource management, observability, networking, and disaster recovery for production Kubernetes clusters.',
      category: 'DevOps',
      date: 'Apr 2025',
      readTime: '15 min read'
    },
    {
      id: 6,
      type: 'Whitepaper',
      typeIcon: '📄',
      title: 'Zero-Trust Architecture for Financial Institutions',
      description: 'A technical whitepaper on implementing zero-trust network architecture in regulated financial environments, with compliance mapping to PCI-DSS and SOX.',
      category: 'Security',
      date: 'Mar 2025',
      readTime: '35 min read'
    },
    {
      id: 7,
      type: 'Guide',
      typeIcon: '📖',
      title: 'DevSecOps Implementation Guide for Enterprise Teams',
      description: 'A practical guide to shifting security left: integrating SAST, DAST, container scanning, and policy-as-code into your existing CI/CD pipeline without disruption.',
      category: 'Security',
      date: 'Mar 2025',
      readTime: '25 min read'
    },
    {
      id: 8,
      type: 'Webinar',
      typeIcon: '🎥',
      title: 'Generative AI in Government: Compliance & Opportunity',
      description: 'Panel discussion on deploying generative AI in public sector organizations, covering data sovereignty, explainability requirements, and use case prioritization.',
      category: 'AI',
      date: 'Feb 2025',
      readTime: '60 min watch'
    },
    {
      id: 9,
      type: 'Case Study',
      typeIcon: '📊',
      title: 'e-Government Portal: 40M Citizens, Zero Downtime',
      description: 'Full case study of the national revenue authority digital transformation — architecture decisions, migration strategy, and post-launch performance metrics.',
      category: 'Government',
      date: 'Feb 2025',
      readTime: '25 min read'
    },
    {
      id: 10,
      type: 'Checklist',
      typeIcon: '✅',
      title: 'Cloud Cost Optimization: 50-Point Audit Checklist',
      description: 'Identify cost savings across compute, storage, networking, and licensing with this structured audit checklist, organized by cloud provider and service category.',
      category: 'Cloud',
      date: 'Jan 2025',
      readTime: '20 min read'
    },
    {
      id: 11,
      type: 'Whitepaper',
      typeIcon: '📄',
      title: 'Real-Time Data Architecture Patterns at Scale',
      description: 'Architectural patterns for building low-latency streaming data platforms using Kafka, Flink, and Spark — with decision frameworks for choosing the right approach.',
      category: 'Data',
      date: 'Jan 2025',
      readTime: '40 min read'
    },
    {
      id: 12,
      type: 'Guide',
      typeIcon: '📖',
      title: 'Internal Developer Platform Design Guide',
      description: 'A blueprint for building a self-service IDP using Backstage, with patterns for service templates, golden paths, and platform team operating models.',
      category: 'DevOps',
      date: 'Dec 2024',
      readTime: '30 min read'
    }
  ];

  get filteredResources(): Resource[] {
    const t = this.activeType();
    return t === 'All' ? this.resources : this.resources.filter(r => r.type === t);
  }

  get featuredResource(): Resource | undefined {
    return this.resources.find(r => r.featured);
  }

  setType(type: string): void {
    this.activeType.set(type);
  }

  readonly typeColors: Record<string, string> = {
    Whitepaper: '#4f6ef7',
    Guide: '#10b981',
    Webinar: '#8b5cf6',
    'Case Study': '#f59e0b',
    Checklist: '#06b6d4'
  };

  getTypeColor(type: string): string {
    return this.typeColors[type] || '#4f6ef7';
  }
}
