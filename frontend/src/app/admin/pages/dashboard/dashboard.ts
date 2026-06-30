import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Stat { label: string; value: number; icon: string; color: string; link: string; }
interface RecentInquiry { id: number; name: string; email: string; subject: string; createdAt: string; status: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  stats = signal<Stat[]>([
    { label: 'Total Inquiries',    value: 0, icon: '📬', color: '#0A52CC', link: '/admin/inquiries' },
    { label: 'Newsletter Subs',    value: 0, icon: '📧', color: '#10B981', link: '/admin/settings' },
    { label: 'Blog Posts',         value: 0, icon: '✍️', color: '#8B5CF6', link: '/admin/blog' },
    { label: 'Portfolio Projects', value: 0, icon: '💼', color: '#F59E0B', link: '/admin/portfolio' },
    { label: 'Active Job Postings',value: 0, icon: '📋', color: '#EF4444', link: '/admin/jobs' },
  ]);

  recentInquiries = signal<RecentInquiry[]>([]);
  loading = signal(true);

  readonly quickLinks = [
    { icon: '✍️', label: 'New Blog Post',   path: '/admin/blog/new',      color: '#8B5CF6' },
    { icon: '💼', label: 'Add Portfolio',    path: '/admin/portfolio/new', color: '#F59E0B' },
    { icon: '📋', label: 'Post a Job',       path: '/admin/jobs/new',      color: '#10B981' },
    { icon: '🗂️', label: 'Edit Content',     path: '/admin/content',       color: '#0A52CC' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/api/v1/admin/inquiries`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('specter_admin_token')}` },
      params: { page: 0, size: 5 }
    }).subscribe({
      next: (res) => {
        if (res?.data) {
          this.recentInquiries.set(res.data.content || res.data || []);
          this.stats.update(s => {
            s[0].value = res.data.totalElements || (res.data.length ?? 0);
            return [...s];
          });
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      NEW: 'badge-new',
      IN_PROGRESS: 'badge-progress',
      RESPONDED: 'badge-responded',
      CLOSED: 'badge-closed'
    };
    return map[status] || 'badge-new';
  }
}
