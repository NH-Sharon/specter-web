import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Solution {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  useCases: string[];
  outcomes: { label: string; value: string }[];
  technologies: string[];
  color: string;
}

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss'
})
export class SolutionsComponent {
  activeSolution = signal(0);

  readonly solutions: Solution[] = [
    {
      icon: '🚀',
      title: 'Digital Transformation',
      tagline: 'Modernize your entire technology stack',
      description: 'We guide organizations through end-to-end digital transformation — from legacy assessment to cloud-native delivery. Our approach balances speed with risk management, ensuring continuity while building for the future.',
      useCases: [
        'Legacy monolith to microservices migration',
        'Paperless government service delivery',
        'ERP consolidation and modernization',
        'Mobile-first citizen and customer portals',
        'Unified digital identity and access management'
      ],
      outcomes: [
        { label: 'Avg. cost reduction', value: '45%' },
        { label: 'Faster delivery cycles', value: '3x' },
        { label: 'System availability', value: '99.9%' }
      ],
      technologies: ['Angular', 'Spring Boot', 'AWS', 'Kubernetes', 'Kafka'],
      color: '#4f6ef7'
    },
    {
      icon: '🏗️',
      title: 'ERP Solutions',
      tagline: 'Streamline operations with intelligent ERP',
      description: 'Custom ERP implementations and integrations tailored to complex enterprise workflows. We build scalable ERP platforms that unify finance, HR, procurement, inventory, and operations on a single platform.',
      useCases: [
        'Custom ERP development for government agencies',
        'SAP / Oracle integration and extension',
        'Financial management and audit systems',
        'Supply chain and procurement automation',
        'Human capital management systems'
      ],
      outcomes: [
        { label: 'Process automation', value: '60%' },
        { label: 'Reporting accuracy', value: '99.8%' },
        { label: 'Operational savings', value: '30%' }
      ],
      technologies: ['SAP BTP', 'Spring Boot', 'PostgreSQL', 'Azure', 'Power BI'],
      color: '#8b5cf6'
    },
    {
      icon: '📦',
      title: 'Data Warehouse',
      tagline: 'Unified analytics from all your data sources',
      description: 'Build an enterprise-grade data warehouse that consolidates all your operational data into a single source of truth. Enable self-service analytics, real-time dashboards, and data-driven decisions at every level.',
      useCases: [
        'Enterprise data lake and warehouse design',
        'Real-time BI dashboards for executives',
        'Regulatory and compliance reporting',
        'Customer 360 analytics platforms',
        'Operational data store consolidation'
      ],
      outcomes: [
        { label: 'Query performance', value: '100x' },
        { label: 'Data freshness', value: '<5min' },
        { label: 'Manual reporting time', value: '-80%' }
      ],
      technologies: ['Snowflake', 'BigQuery', 'dbt', 'Airflow', 'Tableau'],
      color: '#0ea5e9'
    },
    {
      icon: '☁️',
      title: 'Cloud Migration',
      tagline: 'Move to cloud with zero-downtime confidence',
      description: 'Comprehensive cloud migration services covering assessment, planning, execution, and optimization. We migrate complex enterprise workloads to AWS, Azure, and GCP with proven methodologies and zero service disruption.',
      useCases: [
        'Datacenter to cloud migration (Lift & Shift)',
        'Re-platforming to containers and Kubernetes',
        'Multi-cloud architecture and governance',
        'Cloud cost optimization and FinOps',
        'Hybrid cloud connectivity and networking'
      ],
      outcomes: [
        { label: 'Infrastructure cost savings', value: '50%' },
        { label: 'Deployment frequency', value: '10x' },
        { label: 'MTTR improvement', value: '70%' }
      ],
      technologies: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'ArgoCD'],
      color: '#06b6d4'
    },
    {
      icon: '🤖',
      title: 'AI Automation',
      tagline: 'Intelligent automation that learns and adapts',
      description: 'Deploy AI-powered automation that handles complex, unstructured tasks. From document processing to intelligent workflow routing, our AI automation solutions free your teams from repetitive work and accelerate decision-making.',
      useCases: [
        'Intelligent document processing (IDP)',
        'LLM-powered enterprise search and Q&A',
        'Automated fraud and anomaly detection',
        'Predictive maintenance and IoT analytics',
        'Customer service AI and chatbots'
      ],
      outcomes: [
        { label: 'Manual task reduction', value: '65%' },
        { label: 'Processing accuracy', value: '98.5%' },
        { label: 'ROI (Year 1)', value: '280%' }
      ],
      technologies: ['OpenAI', 'LangChain', 'PyTorch', 'FastAPI', 'Airflow'],
      color: '#10b981'
    },
    {
      icon: '🛡️',
      title: 'Security Transformation',
      tagline: 'Zero-trust security for the modern enterprise',
      description: 'Transform your security posture with a zero-trust architecture, DevSecOps pipeline integration, and continuous threat monitoring. We assess, design, and implement end-to-end security programs for regulated industries.',
      useCases: [
        'Zero-trust network architecture design',
        'DevSecOps pipeline implementation',
        'Cloud security posture management',
        'Identity and access management modernization',
        'Compliance automation (ISO, SOC2, PCI-DSS)'
      ],
      outcomes: [
        { label: 'Critical vulns in prod', value: '0' },
        { label: 'Mean time to detect', value: '<1hr' },
        { label: 'Compliance score', value: '100%' }
      ],
      technologies: ['Vault', 'Keycloak', 'Falco', 'SonarQube', 'Wazuh'],
      color: '#f59e0b'
    }
  ];

  setActive(i: number): void {
    this.activeSolution.set(i);
  }
}
