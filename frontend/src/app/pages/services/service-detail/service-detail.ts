import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface ServiceData {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  overview: string;
  benefits: { icon: string; title: string; description: string }[];
  techStack: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  metrics: { label: string; value: string }[];
  color: string;
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss'
})
export class ServiceDetailComponent implements OnInit {
  slug = signal('');
  openFaq = signal<number | null>(null);

  private readonly serviceMap: Record<string, ServiceData> = {
    'software-development': {
      slug: 'software-development',
      icon: '💻',
      title: 'Software Development',
      tagline: 'Enterprise-grade systems engineered to scale',
      overview: 'We design and build custom software for organizations that cannot afford failure — governments, banks, hospitals, and enterprises. From greenfield applications to legacy modernization, our engineering teams deliver clean, scalable, maintainable codebases that stand the test of time.',
      benefits: [
        { icon: '⚡', title: 'Rapid Delivery', description: 'Agile delivery with 2-week sprints means working software in your hands within weeks, not months.' },
        { icon: '🔒', title: 'Security by Default', description: 'OWASP-compliant development with automated security scanning at every stage of the pipeline.' },
        { icon: '📈', title: 'Built to Scale', description: 'Architecture designed for 10x your current load from day one, so growth never breaks your systems.' },
        { icon: '🧪', title: 'Quality Assurance', description: 'Automated testing at unit, integration, and E2E levels with coverage targets and mutation testing.' }
      ],
      techStack: ['Angular', 'React', 'Next.js', 'TypeScript', 'Spring Boot', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
      process: [
        { step: '01', title: 'Discovery & Architecture', description: 'We map your requirements to a technical architecture, identify risks early, and align on technology choices.' },
        { step: '02', title: 'Design System', description: 'UI/UX design and a living design system that ensures consistency and accelerates frontend development.' },
        { step: '03', title: 'Agile Development', description: '2-week sprints with daily standups, regular demos, and continuous integration from day one.' },
        { step: '04', title: 'QA & Security Testing', description: 'Automated and manual testing, security scanning, performance load tests, and accessibility audits.' },
        { step: '05', title: 'Deployment & Launch', description: 'Zero-downtime deployment via CI/CD pipelines with rollback capability and blue-green strategies.' },
        { step: '06', title: 'Handover & Support', description: 'Full documentation, knowledge transfer, and flexible support options to keep your system healthy.' }
      ],
      faqs: [
        { question: 'Can you integrate with our existing systems?', answer: 'Yes — system integration is a core strength. We build RESTful and event-driven integrations with any ERP, CRM, government system, or third-party API, regardless of how legacy the target system is.' },
        { question: 'Do you build mobile applications?', answer: 'We build Progressive Web Apps (PWA) and React Native mobile applications. For most enterprise use cases, we recommend PWA for its maintainability advantages. We evaluate your specific needs before recommending an approach.' },
        { question: 'What programming languages do you use?', answer: 'We match the technology to the problem. For enterprise web applications, Angular or React frontend with Spring Boot or Node.js backend. For APIs and data services, Python or Go. We avoid using exotic technologies that create hiring and maintenance risks for you.' },
        { question: 'How do you ensure long-term code maintainability?', answer: 'We enforce coding standards, mandatory code reviews, comprehensive automated testing, architecture decision records (ADRs), and up-to-date technical documentation. Our goal is code that your internal team can maintain confidently after handover.' }
      ],
      metrics: [{ label: 'Faster delivery vs. traditional', value: '40%' }, { label: 'Code test coverage', value: '90%+' }, { label: 'Post-launch defects', value: '-85%' }],
      color: '#4f6ef7'
    },
    'cloud-engineering': {
      slug: 'cloud-engineering',
      icon: '☁️',
      title: 'Cloud Engineering',
      tagline: 'Cloud-native infrastructure that scales and saves',
      overview: 'We transform how organizations build, deploy, and operate their technology infrastructure. From cloud migration to greenfield cloud-native architecture, our engineers design environments that maximize reliability, minimize cost, and enable engineering teams to move faster.',
      benefits: [
        { icon: '💰', title: 'Cost Optimization', description: 'Average 50–70% infrastructure cost reduction through right-sizing, Reserved Instances, and architectural optimization.' },
        { icon: '🔄', title: 'Auto-Scaling', description: 'Infrastructure that scales automatically to handle traffic spikes and scales down to save costs during quiet periods.' },
        { icon: '🛡️', title: 'Resilience', description: 'Multi-AZ, multi-region architectures with automated failover and RPO/RTO targets met by design.' },
        { icon: '⚙️', title: 'Full Automation', description: 'Everything-as-code with Terraform — no manual infrastructure changes, full audit trail, consistent environments.' }
      ],
      techStack: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana', 'Loki'],
      process: [
        { step: '01', title: 'Cloud Assessment', description: 'We audit your current infrastructure, workloads, and dependencies to build a migration risk register and TCO analysis.' },
        { step: '02', title: 'Architecture Design', description: 'Cloud-native reference architecture with security controls, network topology, and cost model.' },
        { step: '03', title: 'Landing Zone Setup', description: 'Multi-account structure, identity federation, network baseline, and security guardrails deployed via IaC.' },
        { step: '04', title: 'Migration Waves', description: 'Phased workload migration using the 6R strategy (Rehost, Replatform, Refactor, etc.) to minimize risk.' },
        { step: '05', title: 'Optimization', description: 'Post-migration cost optimization, right-sizing, and performance tuning against SLA targets.' },
        { step: '06', title: 'FinOps Practice', description: 'Cost monitoring dashboards, budgets, alerts, and monthly optimization reviews to continuously reduce spend.' }
      ],
      faqs: [
        { question: 'Which cloud provider do you recommend?', answer: 'It depends on your workloads, existing Microsoft investments, team skills, and regulatory requirements. We are provider-agnostic and will recommend the best fit — often a multi-cloud approach for resilience. We have deep competencies across AWS, Azure, and GCP.' },
        { question: 'How do you handle data residency requirements?', answer: 'We have extensive experience designing for data sovereignty — deploying to specific AWS Regions or Azure Sovereign Clouds, using dedicated infrastructure where required, and implementing data governance controls that meet local regulatory requirements.' },
        { question: 'Can you migrate without any downtime?', answer: 'For most workloads, yes. We use blue-green, canary, and traffic-shifting strategies to migrate services with zero user-impacting downtime. Only deeply stateful systems (like some databases) require brief maintenance windows, which we plan and communicate well in advance.' },
        { question: 'Do you manage the cloud environment after migration?', answer: 'Yes. We offer full managed cloud operations: 24/7 monitoring, incident response, patch management, security monitoring, and monthly optimization reviews under a fixed monthly managed services contract.' }
      ],
      metrics: [{ label: 'Avg. cost savings', value: '55%' }, { label: 'Migration success rate', value: '100%' }, { label: 'Time to production', value: '-60%' }],
      color: '#0ea5e9'
    }
  };

  private readonly defaultService: ServiceData = this.serviceMap['software-development'];

  currentService = signal<ServiceData>(this.defaultService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const s = params['slug'] || '';
      this.slug.set(s);
      this.currentService.set(this.serviceMap[s] ?? this.defaultService);
    });
  }

  toggleFaq(i: number): void {
    this.openFaq.update(current => current === i ? null : i);
  }

  isFaqOpen(i: number): boolean {
    return this.openFaq() === i;
  }

  hexToRgb(hex: string): string {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!r) return '79,110,247';
    return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`;
  }
}
