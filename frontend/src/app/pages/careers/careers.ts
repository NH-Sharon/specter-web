import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
  skills: string[];
  posted: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './careers.html',
  styleUrl: './careers.scss'
})
export class CareersComponent {
  activeDepartment = signal('All');

  readonly departments = ['All', 'Engineering', 'AI/ML', 'Cloud', 'Security', 'Product'];

  readonly jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Cloud Engineer',
      department: 'Cloud',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Senior',
      description: 'Design and implement cloud-native infrastructure on AWS and Azure for enterprise clients. Lead cloud migration projects and establish architecture standards.',
      skills: ['AWS', 'Terraform', 'Kubernetes', 'Helm', 'Python'],
      posted: '3 days ago'
    },
    {
      id: 2,
      title: 'Lead Data Engineer',
      department: 'Engineering',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Lead',
      description: 'Architect and build large-scale data pipelines, data warehouses, and real-time streaming platforms for banking and financial clients.',
      skills: ['Apache Kafka', 'Spark', 'Airflow', 'dbt', 'Snowflake'],
      posted: '5 days ago'
    },
    {
      id: 3,
      title: 'AI/ML Engineer',
      department: 'AI/ML',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Mid-Senior',
      description: 'Build production ML systems, LLM-powered applications, and RAG pipelines. Work on GenAI integrations for enterprise automation use cases.',
      skills: ['Python', 'PyTorch', 'LangChain', 'OpenAI', 'FastAPI'],
      posted: '1 week ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Mid-Senior',
      description: 'Own CI/CD pipelines, container orchestration, and observability stacks. Implement GitOps workflows and SRE practices for mission-critical systems.',
      skills: ['Kubernetes', 'ArgoCD', 'GitHub Actions', 'Grafana', 'Terraform'],
      posted: '1 week ago'
    },
    {
      id: 5,
      title: 'Security Engineer',
      department: 'Security',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Senior',
      description: 'Lead DevSecOps transformation engagements, cloud security posture management, and penetration testing for enterprise and government clients.',
      skills: ['DevSecOps', 'Vault', 'SonarQube', 'Falco', 'OWASP'],
      posted: '2 weeks ago'
    },
    {
      id: 6,
      title: 'Full Stack Engineer',
      department: 'Engineering',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Mid',
      description: 'Build end-to-end features for enterprise web applications using Angular and Spring Boot. Work on complex government and banking portals.',
      skills: ['Angular', 'Spring Boot', 'TypeScript', 'PostgreSQL', 'Docker'],
      posted: '2 weeks ago'
    },
    {
      id: 7,
      title: 'Product Manager',
      department: 'Product',
      location: 'Dhaka',
      type: 'Full-time',
      level: 'Senior',
      description: 'Own the product roadmap for our internal platforms and client-facing delivery tools. Work closely with engineering leads and client stakeholders.',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis', 'Roadmapping'],
      posted: '3 weeks ago'
    },
    {
      id: 8,
      title: 'Solutions Architect',
      department: 'Engineering',
      location: 'Dhaka / Remote',
      type: 'Full-time',
      level: 'Principal',
      description: 'Lead technical pre-sales, solution design, and architecture reviews for complex enterprise engagements across cloud, data, and AI practice areas.',
      skills: ['Cloud Architecture', 'Enterprise Integration', 'Technical Sales', 'AWS', 'Azure'],
      posted: '3 weeks ago'
    }
  ];

  get filteredJobs(): Job[] {
    const dept = this.activeDepartment();
    return dept === 'All' ? this.jobs : this.jobs.filter(j => j.department === dept);
  }

  setDepartment(dept: string): void {
    this.activeDepartment.set(dept);
  }

  readonly benefits: Benefit[] = [
    { icon: '💰', title: 'Competitive Compensation', description: 'Market-leading salaries, performance bonuses, and equity participation for senior roles.' },
    { icon: '🏥', title: 'Health & Wellness', description: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
    { icon: '🌍', title: 'Remote-First Culture', description: 'Work from anywhere. Our async-first culture means you control your environment and schedule.' },
    { icon: '📚', title: 'Learning & Development', description: '$3,000 annual learning budget, certification support, and sponsored conference attendance.' },
    { icon: '🚀', title: 'Career Growth', description: 'Clear career ladders, quarterly reviews, and internal mobility across all practice areas.' },
    { icon: '🏖️', title: 'Generous Time Off', description: '25 days PTO plus public holidays, with flexible rollover and mental health days.' },
    { icon: '⚡', title: 'Latest Hardware', description: 'Top-of-the-line MacBook Pro or equivalent, and a home office setup budget of $1,500.' },
    { icon: '🤝', title: 'Parental Leave', description: '16 weeks fully paid parental leave for all parents, regardless of gender.' }
  ];

  readonly values = [
    { icon: '🔬', title: 'Engineering Excellence', description: 'We obsess over code quality, architecture, and engineering craft. You\'ll grow faster here than anywhere else.' },
    { icon: '🌱', title: 'Ownership Mentality', description: 'Every engineer owns their domain end-to-end — from design to production. No ticket monkeys here.' },
    { icon: '🤝', title: 'Radical Transparency', description: 'Open books, honest feedback, and no organizational politics. We communicate directly and respectfully.' },
    { icon: '🌍', title: 'Meaningful Work', description: 'Our systems serve millions of citizens and businesses. The work you do here genuinely matters.' }
  ];
}
