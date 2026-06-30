import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-job-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './job-edit.html',
  styleUrl: './job-edit.scss'
})
export class JobEditComponent implements OnInit {
  isEdit = false;
  jobId: number | null = null;
  loading = signal(false);
  saving = signal(false);
  error = signal('');
  success = signal('');

  form = {
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    level: 'Mid',
    description: '',
    requirements: '',
    responsibilities: '',
    salaryRange: '',
    active: true
  };

  readonly types = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];
  readonly levels = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager'];
  readonly departments = ['Engineering', 'Data & AI', 'Cloud', 'Mobile', 'Design', 'Sales', 'Marketing', 'HR', 'Operations'];

  constructor(private api: AdminApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEdit = !!this.jobId;
    if (this.isEdit && this.jobId) {
      this.loading.set(true);
      this.api.getJob(this.jobId).subscribe({
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
    const obs = this.isEdit && this.jobId
      ? this.api.updateJob(this.jobId, this.form)
      : this.api.createJob(this.form);

    obs.subscribe({
      next: () => {
        this.success.set('Job posting saved successfully!');
        this.saving.set(false);
        setTimeout(() => this.router.navigate(['/admin/jobs']), 1200);
      },
      error: (e) => {
        this.error.set(e?.error?.message || 'Failed to save job posting.');
        this.saving.set(false);
      }
    });
  }
}
