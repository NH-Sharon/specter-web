import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio-list.html',
  styleUrl: './portfolio-list.scss'
})
export class PortfolioListComponent implements OnInit {
  projects = signal<any[]>([]);
  loading = signal(true);
  page = 0;
  totalPages = 0;

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getProjects(this.page).subscribe({
      next: (res) => {
        this.projects.set(res.data?.content || res.data || []);
        this.totalPages = res.data?.totalPages || 1;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  delete(id: number) {
    if (!confirm('Delete this project?')) return;
    this.api.deleteProject(id).subscribe(() => this.load());
  }
}
