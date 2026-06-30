import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-portfolio-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './portfolio-edit.html',
  styleUrl: './portfolio-edit.scss'
})
export class PortfolioEditComponent implements OnInit {
  isEdit = false;
  projectId: number | null = null;
  loading = signal(false);
  saving = signal(false);
  error = signal('');
  success = signal('');

  form = {
    title: '',
    client: '',
    category: '',
    description: '',
    technologies: '',
    metrics: '',
    year: new Date().getFullYear(),
    featured: false,
    published: false,
    coverImage: '',
    projectUrl: ''
  };

  readonly categories = ['Cloud Migration', 'Data Platform', 'AI/ML', 'Mobile App', 'Web Application', 'DevOps', 'Security', 'IoT'];

  constructor(private api: AdminApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEdit = !!this.projectId;
    if (this.isEdit && this.projectId) {
      this.loading.set(true);
      this.api.getProject(this.projectId).subscribe({
        next: (res) => { if (res.data) Object.assign(this.form, res.data); this.loading.set(false); },
        error: () => this.loading.set(false)
      });
    }
  }

  save() {
    if (!this.form.title || !this.form.description) {
      this.error.set('Title and description are required.');
      return;
    }
    this.saving.set(true);
    this.error.set('');
    const obs = this.isEdit && this.projectId
      ? this.api.updateProject(this.projectId, this.form)
      : this.api.createProject(this.form);

    obs.subscribe({
      next: () => {
        this.success.set('Project saved successfully!');
        this.saving.set(false);
        setTimeout(() => this.router.navigate(['/admin/portfolio']), 1200);
      },
      error: (e) => {
        this.error.set(e?.error?.message || 'Failed to save project.');
        this.saving.set(false);
      }
    });
  }
}
