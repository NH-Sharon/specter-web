import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  featured?: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent {
  activeCategory = signal('All');

  readonly categories = ['All', 'Cloud', 'AI', 'DevOps', 'Data', 'Security'];

  readonly posts: BlogPost[] = [
    {
      slug: 'building-rag-systems-langchain-pgvector',
      title: 'Building Production-Grade RAG Systems with LangChain and PGVector',
      excerpt: 'A deep-dive into architecting retrieval-augmented generation systems that scale to millions of documents with sub-second retrieval latency and production reliability.',
      category: 'AI',
      date: 'Jun 18, 2025',
      readTime: '12 min read',
      author: 'Nadia Islam',
      authorAvatar: 'NI',
      featured: true
    },
    {
      slug: 'gitops-argocd-kubernetes-scale',
      title: 'GitOps with ArgoCD: Managing 200+ Microservices at Scale',
      excerpt: 'How we manage 200+ microservices across multiple Kubernetes clusters using GitOps principles, ArgoCD, and progressive delivery with automated rollback strategies.',
      category: 'DevOps',
      date: 'Jun 10, 2025',
      readTime: '9 min read',
      author: 'Tanvir Hassan',
      authorAvatar: 'TH'
    },
    {
      slug: 'data-mesh-architecture-practical-guide',
      title: 'Data Mesh Architecture: When and Why to Adopt It',
      excerpt: 'A practical guide to implementing Data Mesh in large organizations, with real-world lessons from enterprise deployments and a decision framework to evaluate readiness.',
      category: 'Data',
      date: 'May 28, 2025',
      readTime: '15 min read',
      author: 'Farhan Hossain',
      authorAvatar: 'FH'
    },
    {
      slug: 'aws-cost-optimization-strategies',
      title: 'AWS Cost Optimization: From $200K to $90K/Month in 90 Days',
      excerpt: 'The exact strategies, tools, and architectural changes we used to cut a client\'s AWS bill by 55% without any performance degradation or service disruption.',
      category: 'Cloud',
      date: 'May 15, 2025',
      readTime: '11 min read',
      author: 'Arif Rahman',
      authorAvatar: 'AR'
    },
    {
      slug: 'zero-trust-enterprise-implementation',
      title: 'Zero-Trust Security: Implementation Playbook for Enterprises',
      excerpt: 'A comprehensive implementation playbook for enterprise zero-trust architecture, covering identity, network segmentation, device trust, and workload security.',
      category: 'Security',
      date: 'May 5, 2025',
      readTime: '14 min read',
      author: 'Shafiq Ahmed',
      authorAvatar: 'SA'
    },
    {
      slug: 'kafka-streams-real-time-analytics',
      title: 'Kafka Streams for Real-Time Financial Analytics',
      excerpt: 'Designing a low-latency streaming analytics pipeline for financial risk monitoring using Kafka Streams, ksqlDB, and Flink — lessons from processing 1M events/second.',
      category: 'Data',
      date: 'Apr 22, 2025',
      readTime: '13 min read',
      author: 'Farhan Hossain',
      authorAvatar: 'FH'
    },
    {
      slug: 'kubernetes-platform-engineering-backstage',
      title: 'Building an Internal Developer Platform with Backstage',
      excerpt: 'How we built a self-service IDP using Spotify Backstage, reducing infrastructure provisioning from 2 weeks to 15 minutes for a 500-person engineering org.',
      category: 'DevOps',
      date: 'Apr 10, 2025',
      readTime: '10 min read',
      author: 'Tanvir Hassan',
      authorAvatar: 'TH'
    },
    {
      slug: 'llm-fine-tuning-enterprise',
      title: 'Fine-Tuning LLMs for Enterprise Domain Knowledge',
      excerpt: 'A technical walkthrough of fine-tuning open-source LLMs on proprietary enterprise data with privacy-preserving techniques, RLHF, and production deployment on Azure.',
      category: 'AI',
      date: 'Mar 28, 2025',
      readTime: '16 min read',
      author: 'Rima Chowdhury',
      authorAvatar: 'RC'
    },
    {
      slug: 'devsecops-pipeline-enterprise',
      title: 'DevSecOps Pipeline: Shifting Security Left Without Slowing Down',
      excerpt: 'How to integrate SAST, DAST, container scanning, and policy-as-code into your CI/CD pipeline without adding more than 5 minutes to your build time.',
      category: 'Security',
      date: 'Mar 12, 2025',
      readTime: '11 min read',
      author: 'Shafiq Ahmed',
      authorAvatar: 'SA'
    }
  ];

  get filteredPosts(): BlogPost[] {
    const cat = this.activeCategory();
    return cat === 'All' ? this.posts : this.posts.filter(p => p.category === cat);
  }

  get featuredPost(): BlogPost | undefined {
    return this.posts.find(p => p.featured);
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  readonly categoryColors: Record<string, string> = {
    Cloud: '#0ea5e9',
    AI: '#8b5cf6',
    DevOps: '#10b981',
    Data: '#f59e0b',
    Security: '#ef4444'
  };

  getCategoryColor(cat: string): string {
    return this.categoryColors[cat] || '#4f6ef7';
  }
}
