import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface ServiceDetail {
  slug: string;
  icon: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  technologies: string[];
  industries: string[];
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent {
  readonly services: ServiceDetail[] = [
    {
      slug: 'software-development',
      icon: '💻',
      title: 'Software Development',
      description: 'Enterprise-grade custom software, ERP systems, and government digital transformation solutions.',
      longDescription: 'We engineer complex, mission-critical software systems for enterprises, governments, and financial institutions. From greenfield applications to legacy modernization, our teams deliver clean, maintainable, and scalable codebases.',
      benefits: ['Reduced time-to-market by 40%', 'Scalable to millions of users', 'Clean, maintainable codebase', '100% test coverage practices'],
      technologies: ['Angular', 'React', 'Next.js', 'Spring Boot', 'Node.js', 'TypeScript', 'PostgreSQL'],
      industries: ['Government', 'Banking', 'Healthcare', 'Retail'],
      color: '#4f6ef7'
    },
    {
      slug: 'cloud-engineering',
      icon: '☁️',
      title: 'Cloud Engineering',
      description: 'Cloud migrations, infrastructure automation, and multi-cloud architecture on AWS, Azure, and GCP.',
      longDescription: 'Transform your infrastructure with cloud-native architecture. We design and implement robust, cost-optimized cloud environments that scale automatically and deliver enterprise-grade reliability.',
      benefits: ['50-70% infrastructure cost reduction', 'Auto-scaling to handle traffic spikes', '99.99% availability SLA', 'Disaster recovery built in'],
      technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Helm', 'ArgoCD'],
      industries: ['Finance', 'Healthcare', 'Media', 'Enterprise'],
      color: '#0ea5e9'
    },
    {
      slug: 'data-engineering',
      icon: '📊',
      title: 'Data Engineering',
      description: 'End-to-end data pipelines, warehouses, and real-time analytics with Apache Kafka, Spark, and Airflow.',
      longDescription: 'Turn raw data into business intelligence. We build robust data infrastructure that captures, transforms, and delivers clean, reliable data to power your analytics, ML models, and business decisions.',
      benefits: ['Real-time data at millisecond latency', '10x faster data processing', 'Single source of truth', 'GDPR & compliance ready'],
      technologies: ['Apache Kafka', 'Spark', 'Airflow', 'dbt', 'Snowflake', 'BigQuery', 'Apache NiFi'],
      industries: ['Banking', 'Retail', 'Telecom', 'Healthcare'],
      color: '#8b5cf6'
    },
    {
      slug: 'artificial-intelligence',
      icon: '🤖',
      title: 'Artificial Intelligence',
      description: 'Production-grade ML pipelines, Generative AI, LLM integration, RAG solutions, and intelligent automation.',
      longDescription: 'Move beyond AI hype to real business impact. We build production-grade AI systems that are reliable, explainable, and continuously improving — from classical ML to cutting-edge Generative AI.',
      benefits: ['40-70% automation of manual tasks', 'Measurable ROI within 90 days', 'Explainable AI for compliance', 'Continuous model improvement'],
      technologies: ['OpenAI', 'LangChain', 'PyTorch', 'TensorFlow', 'Hugging Face', 'FastAPI', 'Vector DBs'],
      industries: ['Finance', 'Insurance', 'Healthcare', 'Legal'],
      color: '#10b981'
    },
    {
      slug: 'cybersecurity',
      icon: '🛡️',
      title: 'Cybersecurity',
      description: 'Application security, cloud security posture, DevSecOps, and penetration testing services.',
      longDescription: 'Security is not a product — it is a process. We embed security throughout your entire development and operations lifecycle, ensuring your systems are hardened against modern threats.',
      benefits: ['Zero critical vulnerabilities in prod', 'Compliance with ISO, SOC2, PCI-DSS', 'Shift-left security culture', 'Real-time threat monitoring'],
      technologies: ['Vault', 'Keycloak', 'OWASP ZAP', 'SonarQube', 'Falco', 'Trivy', 'WAF'],
      industries: ['Banking', 'Government', 'Healthcare', 'Defense'],
      color: '#f59e0b'
    },
    {
      slug: 'platform-engineering',
      icon: '⚙️',
      title: 'Platform Engineering',
      description: 'Internal developer platforms, SRE practices, observability stacks, and infrastructure automation at scale.',
      longDescription: 'Empower your development teams with a best-in-class internal developer platform. We build the infrastructure and tooling that lets your engineers focus on building products, not managing infrastructure.',
      benefits: ['3x developer productivity increase', 'Self-service infrastructure', 'SRE-grade reliability', 'Full observability coverage'],
      technologies: ['Kubernetes', 'Grafana', 'Prometheus', 'Loki', 'ELK Stack', 'Jaeger', 'Backstage'],
      industries: ['Enterprise', 'SaaS', 'Finance', 'Telecom'],
      color: '#06b6d4'
    },
    {
      slug: 'devops',
      icon: '🔄',
      title: 'DevOps Consulting',
      description: 'CI/CD automation, container orchestration, and full DevOps transformation for modern engineering teams.',
      longDescription: 'Break down silos between development and operations. We implement comprehensive DevOps practices that accelerate delivery, improve quality, and reduce risk across your entire software lifecycle.',
      benefits: ['Deploy multiple times per day', '90% reduction in deployment failures', 'Automated compliance gates', 'Full audit trail'],
      technologies: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'],
      industries: ['All Industries'],
      color: '#6366f1'
    },
    {
      slug: 'api-development',
      icon: '🔗',
      title: 'API Development',
      description: 'Microservices architecture, API gateway design, system integration, and event-driven platforms.',
      longDescription: 'Connect your systems with robust, scalable APIs. We design and build API ecosystems that power digital products, enable third-party integrations, and form the backbone of modern enterprise architecture.',
      benefits: ['API-first architecture', 'OpenAPI documentation', 'Rate limiting & security', 'Versioning strategy'],
      technologies: ['REST', 'GraphQL', 'gRPC', 'Spring Boot', 'FastAPI', 'Kong', 'API Gateway'],
      industries: ['Fintech', 'E-Commerce', 'Healthcare', 'Government'],
      color: '#ec4899'
    }
  ];

  hexToRgb(hex: string): string {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!r) return '79,110,247';
    return `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}`;
  }

  readonly faqs = [
    { q: 'How long does a typical project take?', a: 'Project timelines vary by scope. Discovery & design typically takes 2-4 weeks, MVP delivery 8-16 weeks, and full-scale solutions 3-12 months. We provide detailed estimates after our discovery phase.' },
    { q: 'Do you work with existing systems or only greenfield?', a: 'We work with both. Many of our most impactful engagements involve modernizing and migrating legacy systems. We have deep experience with system assessment, incremental migration, and zero-downtime deployments.' },
    { q: 'What is your development methodology?', a: 'We use Agile Scrum with 2-week sprints. This gives you regular demos, early delivery of value, and the flexibility to evolve requirements as the project progresses.' },
    { q: 'How do you handle security and compliance?', a: 'Security is embedded at every stage — we follow OWASP guidelines, conduct automated security scanning in CI/CD, and adhere to relevant compliance frameworks (ISO 27001, SOC2, PCI-DSS, HIPAA) based on your industry.' },
    { q: 'Do you provide post-launch support?', a: 'Yes. We offer flexible support and maintenance contracts ranging from SLA-based support to full managed services with 24/7 monitoring and incident response.' },
    { q: 'Can you work with our existing team?', a: 'Absolutely. We offer multiple engagement models: dedicated team augmentation, project-based delivery, or embedded engineering where we work alongside your existing developers.' },
  ];
}
