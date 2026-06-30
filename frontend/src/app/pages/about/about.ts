import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  readonly team = [
    { name: 'Arif Rahman', role: 'Chief Executive Officer', expertise: 'Cloud Architecture & Strategy', avatar: 'AR', years: '12+ years' },
    { name: 'Nadia Islam', role: 'Chief Technology Officer', expertise: 'Distributed Systems & AI', avatar: 'NI', years: '10+ years' },
    { name: 'Tanvir Hassan', role: 'VP of Engineering', expertise: 'Platform Engineering & DevOps', avatar: 'TH', years: '9+ years' },
    { name: 'Farhan Hossain', role: 'Head of Data Engineering', expertise: 'Big Data & Analytics', avatar: 'FH', years: '8+ years' },
    { name: 'Rima Chowdhury', role: 'Head of AI/ML', expertise: 'Machine Learning & GenAI', avatar: 'RC', years: '7+ years' },
    { name: 'Shafiq Ahmed', role: 'Head of Cybersecurity', expertise: 'Cloud Security & DevSecOps', avatar: 'SA', years: '10+ years' },
  ];

  readonly values = [
    { icon: '🎯', title: 'Excellence First', description: 'We hold ourselves to the highest engineering standards. Every line of code, every architecture decision reflects our commitment to quality.' },
    { icon: '🤝', title: 'Client Partnership', description: 'We view every client relationship as a long-term partnership. Your success is our success, and we invest in your outcomes.' },
    { icon: '🔬', title: 'Continuous Innovation', description: 'Technology evolves fast. We stay at the cutting edge so our clients always have access to the best solutions available.' },
    { icon: '🌍', title: 'Responsible Technology', description: 'We build sustainable, ethical, and inclusive technology solutions that create positive impact for organizations and communities.' },
    { icon: '🔐', title: 'Security by Design', description: 'Security is not an afterthought. We embed it in every layer of every solution from the very first line of code.' },
    { icon: '📈', title: 'Results Driven', description: 'Every engagement is measured against clear business outcomes. We are accountable for the value we create for our clients.' },
  ];

  readonly milestones = [
    { year: '2017', event: 'Founded', description: 'Specter Technologies founded by a team of enterprise engineers with a mission to build world-class digital solutions.' },
    { year: '2018', event: 'First Enterprise Client', description: 'Delivered first government digital transformation project, establishing our public sector credentials.' },
    { year: '2019', event: 'AWS Partnership', description: 'Achieved AWS Advanced Consulting Partner status, recognizing our cloud expertise and delivery excellence.' },
    { year: '2020', event: 'Data Practice Launch', description: 'Launched dedicated Data Engineering practice, building real-time analytics platforms for banking and finance.' },
    { year: '2021', event: 'AI/ML Division', description: 'Established AI/ML Center of Excellence, delivering machine learning and NLP solutions for enterprise clients.' },
    { year: '2022', event: 'ISO 27001 Certification', description: 'Achieved ISO 27001 certification, demonstrating our commitment to information security management.' },
    { year: '2023', event: 'Generative AI Launch', description: 'Launched Generative AI practice, helping enterprises integrate LLMs and RAG systems into their workflows.' },
    { year: '2024', event: '150+ Clients', description: 'Crossed 150 enterprise clients across 15+ countries, firmly establishing our global presence.' },
    { year: '2025', event: 'Platform Engineering', description: 'Launched Platform Engineering practice, helping organizations build internal developer platforms at scale.' },
  ];

  readonly certifications = [
    { name: 'AWS Advanced Partner', icon: '☁️', type: 'Cloud' },
    { name: 'Microsoft Azure Expert', icon: '🔷', type: 'Cloud' },
    { name: 'Google Cloud Partner', icon: '🌐', type: 'Cloud' },
    { name: 'ISO 27001 Certified', icon: '🔒', type: 'Security' },
    { name: 'CNCF Member', icon: '⎈', type: 'Cloud Native' },
    { name: 'CKA Certified Engineers', icon: '🏆', type: 'Kubernetes' },
  ];
}
