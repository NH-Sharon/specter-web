import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LogoComponent } from '../../shared/components/logo/logo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective, LogoComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  // ── Tabs ──────────────────────────────────────────
  activeTab = signal('cloud');
  private statInterval: any;
  private statObserver?: IntersectionObserver;
  statsAnimated = false;

  readonly solutionTabs = [
    { key: 'cloud',    label: 'Cloud Computing',  icon: '☁️' },
    { key: 'ai',       label: 'AI & ML',           icon: '🤖' },
    { key: 'data',     label: 'Data Analytics',    icon: '📊' },
    { key: 'mobile',   label: 'Mobile Apps',       icon: '📱' },
    { key: 'erp',      label: 'ERP Solutions',     icon: '🏗️' },
    { key: 'security', label: 'Cybersecurity',     icon: '🛡️' },
  ];

  readonly solutionsMap: Record<string, { icon: string; title: string; description: string; path: string }[]> = {
    cloud: [
      { icon: '☁️', title: 'Cloud Migration', description: 'Seamlessly migrate your infrastructure to AWS, Azure, or GCP with zero downtime.', path: '/solutions' },
      { icon: '⚙️', title: 'Cloud-Native Development', description: 'Build scalable microservices and container-based applications on modern cloud platforms.', path: '/solutions' },
      { icon: '📦', title: 'Kubernetes & DevOps', description: 'Orchestrate containers at scale with K8s, Helm, ArgoCD and full CI/CD automation.', path: '/solutions' },
      { icon: '🔒', title: 'Cloud Security', description: 'Multi-layer cloud security with IAM, encryption, and compliance frameworks.', path: '/solutions' },
    ],
    ai: [
      { icon: '🤖', title: 'Machine Learning', description: 'Custom ML models for prediction, classification, and recommendation systems.', path: '/solutions' },
      { icon: '💬', title: 'Generative AI & LLM', description: 'Deploy GPT, LLaMA, and RAG-powered chatbots and enterprise AI assistants.', path: '/solutions' },
      { icon: '👁️', title: 'Computer Vision', description: 'Object detection, OCR, and image recognition for industrial and commercial use.', path: '/solutions' },
      { icon: '🔮', title: 'Predictive Analytics', description: 'AI-powered forecasting for demand, finance, supply chain, and customer behaviour.', path: '/solutions' },
    ],
    data: [
      { icon: '🗄️', title: 'Data Warehouse', description: 'Modern data warehouse on Snowflake, BigQuery, or Redshift with ETL automation.', path: '/solutions' },
      { icon: '🔄', title: 'Real-time Data Pipeline', description: 'Stream processing with Apache Kafka, Flink, and Spark for real-time insights.', path: '/solutions' },
      { icon: '📈', title: 'Business Intelligence', description: 'Interactive dashboards with Power BI, Tableau, and Metabase for data-driven decisions.', path: '/solutions' },
      { icon: '🔍', title: 'Data Governance', description: 'Establish data quality, lineage, cataloging, and compliance across your organisation.', path: '/solutions' },
    ],
    mobile: [
      { icon: '📱', title: 'iOS Development', description: 'Native Swift/SwiftUI apps with smooth animations and App Store deployment.', path: '/solutions' },
      { icon: '🤖', title: 'Android Development', description: 'Kotlin-based Android apps with Jetpack Compose and Play Store launch support.', path: '/solutions' },
      { icon: '⚛️', title: 'React Native', description: 'Cross-platform mobile apps with shared codebase and native performance.', path: '/solutions' },
      { icon: '🐦', title: 'Flutter Apps', description: 'Beautiful cross-platform UI with Dart/Flutter targeting iOS, Android & Web.', path: '/solutions' },
    ],
    erp: [
      { icon: '🏢', title: 'Enterprise ERP', description: 'Full-featured ERP covering HR, Finance, Inventory, Procurement, and CRM.', path: '/solutions' },
      { icon: '🛒', title: 'E-Commerce Platform', description: 'Scalable multi-vendor marketplace and B2B/B2C commerce solutions.', path: '/solutions' },
      { icon: '📋', title: 'Project Management', description: 'Agile project management, resource planning, and team collaboration tools.', path: '/solutions' },
      { icon: '💰', title: 'Financial Management', description: 'Accounting, payroll, tax, and financial reporting for enterprises.', path: '/solutions' },
    ],
    security: [
      { icon: '🛡️', title: 'Penetration Testing', description: 'Manual and automated pentesting of web, mobile, API, and network infrastructure.', path: '/solutions' },
      { icon: '🔍', title: 'Security Audit', description: 'Comprehensive security audits and vulnerability assessments with remediation plans.', path: '/solutions' },
      { icon: '🚨', title: 'SOC & Monitoring', description: '24/7 Security Operations Center with SIEM, threat detection, and incident response.', path: '/solutions' },
      { icon: '📜', title: 'Compliance & GRC', description: 'ISO 27001, SOC 2, GDPR, and PCI-DSS compliance consulting and certification support.', path: '/solutions' },
    ],
  };

  currentSolutions = computed(() => this.solutionsMap[this.activeTab()] ?? []);

  // ── Stats ─────────────────────────────────────────
  readonly glanceStats = [
    { icon: '📁', value: 150, suffix: '+', label: 'Projects Delivered', display: signal('0') },
    { icon: '🏆', value: 20,  suffix: '+', label: 'Products Built',     display: signal('0') },
    { icon: '👨‍💻', value: 60,  suffix: '+', label: 'Expert Engineers',  display: signal('0') },
    { icon: '🌍', value: 15,  suffix: '+', label: 'Countries Served',   display: signal('0') },
    { icon: '😊', value: 500, suffix: '+', label: 'Happy Clients',      display: signal('0') },
    { icon: '📅', value: 7,   suffix: '+', label: 'Years Experience',   display: signal('0') },
  ];

  // ── Trust badges ──────────────────────────────────
  readonly trustBadges = [
    { icon: '🏅', name: 'ISO 9001:2015 Certified' },
    { icon: '☁️', name: 'AWS Partner' },
    { icon: '🔵', name: 'Google Cloud Partner' },
    { icon: '🟦', name: 'Microsoft Partner' },
    { icon: '🇧🇩', name: 'BASIS Member' },
    { icon: '🏆', name: 'BACCO Member' },
  ];

  // ── Dynamic content signals (with hardcoded fallbacks) ────────────────────
  heroBadge         = signal("🏆 Bangladesh's Premier Technology Partner");
  heroHeadline      = signal("Best Technology Partner For Your");
  heroHeadlineHighlight = signal("Digital Transformation");
  heroSubtext       = signal("Specter Technologies has 7+ years of experience delivering cloud, AI, data and enterprise software to businesses across 15+ countries. Over 20 ready-made solutions and 150+ successful projects delivered globally.");
  heroCta1Label     = signal("Contact Us");
  heroCta1Link      = signal("/contact");
  heroCta2Label     = signal("View Our Work");
  heroCta2Link      = signal("/portfolio");
  heroMiniStats     = signal([
    { value: '150+', label: 'Projects' },
    { value: '500+', label: 'Clients' },
    { value: '15+',  label: 'Countries' },
    { value: '7+',   label: 'Years' },
  ]);

  serviceItems = signal([
    { icon: '💻', color: '#0A52CC', title: 'Software Development', description: 'Custom enterprise software, web apps, APIs, and SaaS platforms built with modern technologies and best practices.', path: '/services/software-development' },
    { icon: '☁️', color: '#0EA5E9', title: 'Cloud Engineering',    description: 'Cloud architecture, migration, infrastructure as code, and managed cloud operations on AWS, Azure & GCP.', path: '/services/cloud-engineering' },
    { icon: '🤖', color: '#8B5CF6', title: 'AI & Machine Learning', description: 'ML model development, GenAI integration, RAG systems, NLP, and computer vision solutions for enterprises.', path: '/services/artificial-intelligence' },
    { icon: '📊', color: '#10B981', title: 'Data Engineering',     description: 'End-to-end data pipelines, real-time streaming, data warehouse, lakehouse, and analytics engineering.', path: '/services/data-engineering' },
    { icon: '📱', color: '#F59E0B', title: 'Mobile Development',   description: 'Native iOS & Android and cross-platform Flutter/React Native apps with beautiful UI and seamless UX.', path: '/services/mobile-development' },
    { icon: '🛡️', color: '#EF4444', title: 'Cybersecurity',        description: 'Penetration testing, security audits, SIEM, SOC, and compliance consulting for regulated industries.', path: '/services/cybersecurity' },
  ]);

  testimonialItems = signal([
    { name: 'Ahmed Al-Rashid',   role: 'CTO',              company: 'Gulf Digital Holdings',       quote: 'Specter Technologies transformed our legacy banking system into a modern cloud-native platform. The team delivered on time, on budget, and exceeded our performance expectations.', avatar: 'A', country: '🇦🇪' },
    { name: 'Sarah Thompson',    role: 'VP Engineering',   company: 'MediTech Solutions, UK',      quote: 'Their AI/ML team built a diagnostic prediction model that improved our clinical accuracy by 34%. Exceptional technical depth and professional communication throughout.', avatar: 'S', country: '🇬🇧' },
    { name: 'Rajesh Patel',      role: 'CEO',              company: 'LogiCore Technologies, India', quote: 'From data warehouse to real-time dashboards, Specter handled our entire data stack. Our team now makes decisions in minutes, not days. Highly recommended.', avatar: 'R', country: '🇮🇳' },
    { name: 'Emma Johansson',    role: 'Head of IT',       company: 'Nordic Retail Group',         quote: 'The cloud migration project was seamless. Zero downtime, excellent documentation, and the post-deployment support has been outstanding.', avatar: 'E', country: '🇸🇪' },
  ]);

  clientItems = signal([
    'ILO', 'ICT Division', 'DNCC', 'BTRC', 'Dhaka WASA',
    'Grameen Bank', 'BRAC', 'Square Group', 'Beximco', 'Walton',
    'MTB Bank', 'BRAC Bank', 'SIBL', 'Dutch-Bangla Bank', 'Robi',
    'Banglalink', 'SSL Wireless', 'Shohoz', 'ShajGoj', 'Chaldal',
  ]);

  industryItems = signal([
    { icon: '🏛️', title: 'Government',   sub: '& Public Sector' },
    { icon: '🏦', title: 'Banking',       sub: '& Finance' },
    { icon: '🏥', title: 'Healthcare',    sub: '& Pharma' },
    { icon: '🏭', title: 'Manufacturing', sub: '& Industry 4.0' },
    { icon: '🛍️', title: 'Retail',        sub: '& E-Commerce' },
    { icon: '🎓', title: 'Education',     sub: '& EdTech' },
    { icon: '📡', title: 'Telecom',       sub: '& ISP' },
    { icon: '✈️', title: 'Travel',        sub: '& Hospitality' },
    { icon: '🔋', title: 'Energy',        sub: '& Utilities' },
    { icon: '🚢', title: 'Logistics',     sub: '& Supply Chain' },
    { icon: '📺', title: 'Media',         sub: '& Entertainment' },
    { icon: '🌾', title: 'Agriculture',   sub: '& AgriTech' },
  ]);

  processItems = signal([
    { num: '01', icon: '🔍', title: 'Discovery & Scoping',   desc: 'We understand your business goals, technical requirements, and define a clear project roadmap.' },
    { num: '02', icon: '📐', title: 'Architecture & Design',  desc: 'Our architects design a scalable, secure solution with wireframes, prototypes, and tech stack selection.' },
    { num: '03', icon: '⚙️', title: 'Agile Development',      desc: 'We build in 2-week sprints with continuous delivery, code reviews, and stakeholder demos.' },
    { num: '04', icon: '🧪', title: 'QA & Security Testing',  desc: 'Rigorous automated testing, penetration testing, and performance benchmarking before release.' },
    { num: '05', icon: '🚀', title: 'Deployment & Support',   desc: 'Production deployment with CI/CD pipelines and dedicated 12-month post-launch support.' },
  ]);

  ctaHeadline   = signal("Ready to Transform Your Business?");
  ctaSubtext    = signal("Let's discuss your project. Get a free consultation and project estimate within 24 hours.");
  ctaCta1Label  = signal("Start a Project →");
  ctaCta1Link   = signal("/contact");
  ctaCta2Label  = signal("See Our Work");
  ctaCta2Link   = signal("/portfolio");

  constructor(private http: HttpClient) {}

  setTab(key: string): void {
    this.activeTab.set(key);
  }

  ngOnInit(): void {
    this.setupStatCounter();
    this.loadContent();
  }

  ngOnDestroy(): void {
    this.statObserver?.disconnect();
    clearInterval(this.statInterval);
  }

  private setupStatCounter(): void {
    const el = document.getElementById('stats-section');
    if (!el) return;

    this.statObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.statsAnimated) {
        this.statsAnimated = true;
        this.animateStats();
      }
    }, { threshold: 0.3 });

    this.statObserver.observe(el);
  }

  private animateStats(): void {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    this.statInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      this.glanceStats.forEach(stat => {
        stat.display.set(Math.round(eased * stat.value).toString());
      });

      if (step >= steps) clearInterval(this.statInterval);
    }, interval);
  }

  private loadContent(): void {
    const sections = ['hero', 'services', 'testimonials', 'clients', 'industries', 'process', 'cta_banner'];
    sections.forEach(key => {
      this.http.get<any>(`${environment.apiUrl}/api/v1/content/${key}`)
        .pipe(catchError(() => of(null)))
        .subscribe(res => {
          if (!res?.data?.content_json) return;
          try {
            const d = JSON.parse(res.data.content_json);
            switch (key) {
              case 'hero':
                if (d.badge)              this.heroBadge.set(d.badge);
                if (d.headline)           this.heroHeadline.set(d.headline);
                if (d.headlineHighlight)  this.heroHeadlineHighlight.set(d.headlineHighlight);
                if (d.subtext)            this.heroSubtext.set(d.subtext);
                if (d.cta1Label)          this.heroCta1Label.set(d.cta1Label);
                if (d.cta1Link)           this.heroCta1Link.set(d.cta1Link);
                if (d.cta2Label)          this.heroCta2Label.set(d.cta2Label);
                if (d.cta2Link)           this.heroCta2Link.set(d.cta2Link);
                if (d.miniStats)          this.heroMiniStats.set(d.miniStats);
                break;
              case 'services':
                if (d.items?.length) this.serviceItems.set(d.items);
                break;
              case 'testimonials':
                if (d.items?.length) this.testimonialItems.set(d.items);
                break;
              case 'clients':
                if (d.items?.length) this.clientItems.set(d.items);
                break;
              case 'industries':
                if (d.items?.length) this.industryItems.set(d.items);
                break;
              case 'process':
                if (d.items?.length) this.processItems.set(d.items);
                break;
              case 'cta_banner':
                if (d.headline)   this.ctaHeadline.set(d.headline);
                if (d.subtext)    this.ctaSubtext.set(d.subtext);
                if (d.cta1Label)  this.ctaCta1Label.set(d.cta1Label);
                if (d.cta1Link)   this.ctaCta1Link.set(d.cta1Link);
                if (d.cta2Label)  this.ctaCta2Label.set(d.cta2Label);
                if (d.cta2Link)   this.ctaCta2Link.set(d.cta2Link);
                break;
            }
          } catch {}
        });
    });
  }
}
