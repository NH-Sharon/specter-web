import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './blog-edit.html',
  styleUrl: './blog-edit.scss'
})
export class BlogEditComponent implements OnInit {
  isEdit = false;
  postId: number | null = null;
  loading = signal(false);
  saving = signal(false);
  error = signal('');
  success = signal('');

  form = {
    title: '', slug: '', excerpt: '', content: '',
    category: '', tags: '', author: 'Specter Technologies',
    coverImage: '', published: false, featured: false, readTime: '5 min read'
  };

  readonly categories = ['Cloud', 'AI & ML', 'Data', 'Mobile', 'Security', 'DevOps', 'Case Study', 'News'];

  constructor(private api: AdminApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEdit = !!this.postId;
    if (this.isEdit && this.postId) {
      this.loading.set(true);
      this.api.getBlog(this.postId).subscribe({
        next: (res) => { if (res.data) Object.assign(this.form, res.data); this.loading.set(false); },
        error: () => this.loading.set(false)
      });
    }
  }

  generateSlug() {
    this.form.slug = this.form.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  }

  save() {
    if (!this.form.title || !this.form.content) {
      this.error.set('Title and content are required.');
      return;
    }
    this.saving.set(true);
    this.error.set('');
    const obs = this.isEdit && this.postId
      ? this.api.updateBlog(this.postId, this.form)
      : this.api.createBlog(this.form);

    obs.subscribe({
      next: () => {
        this.success.set('Post saved successfully!');
        this.saving.set(false);
        setTimeout(() => this.router.navigate(['/admin/blog']), 1200);
      },
      error: (e) => {
        this.error.set(e?.error?.message || 'Failed to save post.');
        this.saving.set(false);
      }
    });
  }
}
