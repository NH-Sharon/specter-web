import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetailComponent implements OnInit {
  jobId = signal(0);

  readonly job = {
    id: 1,
    title: 'Senior Cloud Engineer',
    department: 'Cloud Engineering',
    location: 'Dhaka, Bangladesh / Remote',
    type: 'Full-time',
    level: 'Senior (5+ years)',
    salary: 'Competitive + Benefits',
    posted: 'June 27, 2025',
    overview: 'We are looking for a Senior Cloud Engineer to join our Cloud Engineering practice and lead multi-cloud infrastructure design and delivery for enterprise clients across banking, government, and healthcare sectors.',
    responsibilities: [
      'Design and implement cloud-native infrastructure architectures on AWS and Azure for enterprise clients',
      'Lead cloud migration projects using lift-and-shift, re-platform, and re-architect strategies',
      'Build and maintain Infrastructure-as-Code using Terraform, with modular, reusable patterns',
      'Establish Kubernetes clusters with proper RBAC, networking, and multi-tenancy configurations',
      'Implement FinOps practices and cost optimization strategies, targeting 40–60% cost reduction',
      'Mentor junior engineers and conduct architecture reviews for client engagements',
      'Participate in pre-sales technical discussions and solution design workshops',
      'Contribute to Specter\'s cloud engineering knowledge base and internal tools'
    ],
    requirements: [
      '5+ years of hands-on cloud engineering experience (AWS, Azure, or GCP)',
      'AWS Solutions Architect Professional or Azure Solutions Architect Expert certification',
      'Deep expertise in Terraform for multi-environment IaC',
      'Strong Kubernetes knowledge including Helm, ingress controllers, and service mesh',
      'Experience with GitOps using ArgoCD or Flux',
      'Proficiency in Python or Go for automation and tooling',
      'Understanding of networking: VPCs, VPNs, DNS, load balancers, CDN',
      'Experience working in regulated industries (banking, healthcare, or government) is a strong plus'
    ],
    niceToHave: [
      'Certified Kubernetes Administrator (CKA) or CKAD',
      'Experience with multi-cloud networking and interconnect',
      'Knowledge of FinOps frameworks and cloud cost modeling',
      'Familiarity with security frameworks like NIST or ISO 27001',
      'Open-source contributions to cloud infrastructure projects'
    ],
    techStack: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Python', 'GitHub Actions'],
    process: [
      { step: '01', title: 'Application Review', duration: '3-5 days', description: 'Our recruiting team reviews your application and reaches out to shortlisted candidates.' },
      { step: '02', title: 'Recruiter Screen', duration: '30 minutes', description: 'A quick call to discuss your background, the role, and answer your initial questions.' },
      { step: '03', title: 'Technical Assessment', duration: '2-3 hours', description: 'A practical take-home assessment covering infrastructure design and Terraform/Kubernetes tasks.' },
      { step: '04', title: 'Technical Interview', duration: '1 hour', description: 'Deep-dive technical discussion with two senior engineers from the Cloud practice.' },
      { step: '05', title: 'Culture & Leadership', duration: '45 minutes', description: 'Conversation with the VP of Engineering on team culture, growth, and expectations.' },
      { step: '06', title: 'Offer', duration: '2-3 days', description: 'We move fast. Offer letter with full compensation details within 48 hours of final interview.' }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId.set(+params['id'] || 1);
    });
  }
}
