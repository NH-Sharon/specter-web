import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss'
})
export class JobsListComponent implements OnInit {
  jobs = signal<any[]>([]);
  loading = signal(true);

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getJobs().subscribe({
      next: (res) => {
        this.jobs.set(res.data || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  toggleActive(job: any) {
    this.api.toggleJobActive(job.id).subscribe(() => this.load());
  }

  delete(id: number) {
    if (!confirm('Delete this job posting?')) return;
    this.api.deleteJob(id).subscribe(() => this.load());
  }
}
