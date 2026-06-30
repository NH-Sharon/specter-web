import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface RelatedPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
}

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss'
})
export class PostDetailComponent implements OnInit {
  slug = signal('');
  postTitle = signal('Building Production-Grade RAG Systems with LangChain and PGVector');
  postCategory = signal('AI');
  postDate = signal('Jun 18, 2025');
  postReadTime = signal('12 min read');
  postAuthor = signal('Nadia Islam');
  postAuthorRole = signal('Chief Technology Officer');
  postAuthorAvatar = signal('NI');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug.set(params['slug'] || '');
    });
  }

  readonly tableOfContents = [
    { id: 'intro', label: 'Introduction' },
    { id: 'architecture', label: 'Architecture Overview' },
    { id: 'ingestion', label: 'Document Ingestion Pipeline' },
    { id: 'embeddings', label: 'Embedding Strategy' },
    { id: 'retrieval', label: 'Retrieval & Reranking' },
    { id: 'production', label: 'Production Considerations' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  readonly relatedPosts: RelatedPost[] = [
    {
      slug: 'llm-fine-tuning-enterprise',
      title: 'Fine-Tuning LLMs for Enterprise Domain Knowledge',
      category: 'AI',
      date: 'Mar 28, 2025',
      readTime: '16 min read'
    },
    {
      slug: 'kafka-streams-real-time-analytics',
      title: 'Kafka Streams for Real-Time Financial Analytics',
      category: 'Data',
      date: 'Apr 22, 2025',
      readTime: '13 min read'
    },
    {
      slug: 'zero-trust-enterprise-implementation',
      title: 'Zero-Trust Security: Implementation Playbook for Enterprises',
      category: 'Security',
      date: 'May 5, 2025',
      readTime: '14 min read'
    }
  ];

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
