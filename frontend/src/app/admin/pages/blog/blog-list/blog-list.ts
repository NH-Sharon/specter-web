import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss'
})
export class BlogListComponent implements OnInit {
  posts = signal<any[]>([]);
  loading = signal(true);
  page = 0;
  totalPages = 0;

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getBlogs(this.page).subscribe({
      next: (res) => {
        this.posts.set(res.data?.content || res.data || []);
        this.totalPages = res.data?.totalPages || 1;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  togglePublish(post: any) {
    this.api.toggleBlogPublish(post.id).subscribe(() => this.load());
  }

  delete(id: number) {
    if (!confirm('Delete this blog post?')) return;
    this.api.deleteBlog(id).subscribe(() => this.load());
  }
}
