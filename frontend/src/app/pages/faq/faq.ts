import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class FaqComponent {
  activeCategory = signal('general');
  openItem = signal<string | null>(null);

  readonly categories: FaqCategory[] = [
    {
      id: 'general',
      label: 'General',
      icon: '💡',
      items: [
        { question: 'What does Specter Technologies do?', answer: 'Specter Technologies is a premium technology company specializing in software development, cloud engineering, data engineering, AI/ML, cybersecurity, and platform engineering for enterprise clients across government, finance, healthcare, and other regulated industries.' },
        { question: 'Where is Specter Technologies based?', answer: 'Our headquarters are in Dhaka, Bangladesh, with delivery teams and client presence across South Asia, MENA, and Southeast Asia. We operate as a remote-first company and serve clients globally.' },
        { question: 'What size of organizations do you typically work with?', answer: 'We primarily work with mid-to-large enterprises, government agencies, and fast-growing technology companies. Our typical client has 500+ employees and complex technology needs, though we also work with ambitious scale-ups building enterprise-grade systems.' },
        { question: 'Do you offer both project-based and ongoing engagements?', answer: 'Yes. We offer three engagement models: fixed-scope project delivery, dedicated team augmentation (where our engineers join your team), and managed services for ongoing operations. We\'ll recommend the model that best fits your needs and budget.' },
        { question: 'How do I get started with Specter Technologies?', answer: 'Start by booking a free 60-minute discovery call via our Contact page. We\'ll learn about your goals, challenges, and timeline. Within a week we\'ll provide a detailed proposal including approach, team composition, timeline, and investment estimate.' }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      icon: '⚙️',
      items: [
        { question: 'Which cloud platforms do you support?', answer: 'We have deep expertise across all three major cloud platforms: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We are an AWS Advanced Consulting Partner and Microsoft Solutions Partner. We can work in single-cloud, multi-cloud, or hybrid configurations.' },
        { question: 'Do you work with AI and Generative AI specifically?', answer: 'Yes — we have a dedicated AI/ML practice. Our capabilities span classical machine learning, LLM integration (OpenAI, Anthropic, open-source models), RAG system design, vector database architecture, fine-tuning, and MLOps. We build production AI systems, not prototypes.' },
        { question: 'Can you modernize our existing legacy system?', answer: 'Legacy modernization is one of our core specializations. We assess your existing system, design a pragmatic migration path, and execute using proven strategies — whether that\'s the strangler fig pattern for microservices, lift-and-shift to cloud, or a full re-architecture with zero-downtime cutover.' },
        { question: 'Do you handle data privacy and compliance requirements?', answer: 'Absolutely. We have deep experience with major compliance frameworks: GDPR, HIPAA, PCI-DSS, ISO 27001, SOC 2, and local regulatory requirements in the markets we serve. Compliance is designed into our architectures from day one, not bolted on afterward.' },
        { question: 'Do you provide UI/UX design services?', answer: 'We have in-house product designers who collaborate with our engineering teams on enterprise applications. For complex consumer-facing products, we partner with specialized UX agencies. Our strength is designing and building complex enterprise interfaces that are both functional and usable.' }
      ]
    },
    {
      id: 'process',
      label: 'Process',
      icon: '🔄',
      items: [
        { question: 'What is your development methodology?', answer: 'We use Agile Scrum with 2-week sprints. You receive a working demo at the end of every sprint, full transparency into progress via our project dashboard, and the flexibility to adjust priorities as requirements evolve. We use GitHub for all code and project tracking.' },
        { question: 'How long does a typical engagement take?', answer: 'It depends on scope. Discovery and design typically takes 2–4 weeks. An MVP delivery takes 8–16 weeks. Full-scale enterprise systems take 6–18 months. We always provide a detailed timeline with milestones after the discovery phase, and we are accountable to it.' },
        { question: 'How do you handle project communication and reporting?', answer: 'Every engagement has a dedicated project manager and a Slack channel for daily communication. You receive a weekly status report, sprint demos every two weeks, and access to a live project dashboard with velocity, backlog, and risk indicators.' },
        { question: 'What happens if requirements change mid-project?', answer: 'Change is normal. Our Agile approach means you can reprioritize the backlog at any sprint boundary. For significant scope changes, we run a quick impact assessment and provide updated timeline and cost projections before proceeding. We don\'t hide change in estimates.' },
        { question: 'Do you provide documentation and knowledge transfer?', answer: 'Yes. Every engagement includes comprehensive technical documentation (architecture diagrams, API docs, runbooks) and hands-on knowledge transfer sessions. We also conduct structured handover periods when transitioning to your internal team or a support contract.' }
      ]
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: '💰',
      items: [
        { question: 'How do you price your services?', answer: 'We use three pricing models: time-and-materials for exploratory or evolving engagements, fixed-price for well-defined deliverables, and retainer/managed-service contracts for ongoing work. We are transparent about all costs and don\'t have surprise fees.' },
        { question: 'What is the typical budget range for an engagement?', answer: 'Project engagements typically range from $50K for scoped feature work to $2M+ for full-scale enterprise transformation programs. We have experience delivering value across this entire range and will always propose a scope that fits your budget constraints.' },
        { question: 'Do you require payment upfront?', answer: 'For project-based work, we typically structure payments as milestones tied to deliverables: a portion upon engagement start, milestone payments during delivery, and a final payment upon acceptance. We do not require full payment upfront.' },
        { question: 'Are there any hidden fees or ongoing costs?', answer: 'No. Our proposals include a full breakdown of all costs. We explicitly call out any third-party tools, cloud infrastructure estimates, or licensing fees. If anything changes, we discuss and agree before incurring costs.' },
        { question: 'Do you offer any discounts for long-term engagements?', answer: 'Yes. For multi-year engagements or clients who commit to a minimum monthly retainer, we offer preferential rates and dedicated team structures. We value long-term partnerships and price accordingly.' }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      icon: '🛟',
      items: [
        { question: 'What support options do you offer post-delivery?', answer: 'We offer three support tiers: Standard (business hours, 24hr response, bug fixes), Professional (extended hours, 4hr response, minor enhancements), and Enterprise (24/7 coverage, 1hr SLA, dedicated on-call engineer, and proactive monitoring).' },
        { question: 'What is your typical incident response time?', answer: 'Under our Enterprise SLA, P1 critical incidents have a 1-hour response and 4-hour resolution target. P2 major incidents have a 4-hour response and 24-hour resolution target. All SLAs are contractually committed and tracked with financial penalties for breaches.' },
        { question: 'Do you provide proactive monitoring or only reactive support?', answer: 'Our managed services include proactive monitoring via full-stack observability (metrics, logs, traces) with intelligent alerting. In many cases, our team identifies and resolves issues before they impact your users. We review infrastructure health reports with you monthly.' },
        { question: 'Can we transition support to our internal team later?', answer: 'Absolutely. We plan for this from the start. We document everything thoroughly and run structured knowledge transfer programs. Many clients start with our managed services and gradually transition responsibility to their growing internal teams over 12–24 months.' },
        { question: 'How do you handle security incidents?', answer: 'Security incidents trigger our IR runbook immediately: containment within minutes, client notification within 1 hour, root-cause analysis within 24 hours, and a full post-incident report within 72 hours. We maintain cyber insurance and have a dedicated security incident response team.' }
      ]
    }
  ];

  get activeItems(): FaqItem[] {
    return this.categories.find(c => c.id === this.activeCategory())?.items ?? [];
  }

  setCategory(id: string): void {
    this.activeCategory.set(id);
    this.openItem.set(null);
  }

  toggleItem(key: string): void {
    this.openItem.update(current => current === key ? null : key);
  }

  isOpen(key: string): boolean {
    return this.openItem() === key;
  }
}
