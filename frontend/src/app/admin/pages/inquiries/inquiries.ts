import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-inquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiries.html',
  styleUrl: './inquiries.scss'
})
export class InquiriesComponent implements OnInit {
  inquiries = signal<any[]>([]);
  loading = signal(true);
  selectedInquiry = signal<any>(null);
  page = 0;
  totalPages = 0;

  readonly statuses = ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'];

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getInquiries(this.page).subscribe({
      next: (res) => {
        this.inquiries.set(res.data?.content || res.data || []);
        this.totalPages = res.data?.totalPages || 1;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  select(inq: any) { this.selectedInquiry.set(inq); }
  close() { this.selectedInquiry.set(null); }

  updateStatus(inq: any, status: string) {
    this.api.updateInquiryStatus(inq.id, status).subscribe(() => {
      inq.status = status;
      if (this.selectedInquiry()?.id === inq.id) {
        this.selectedInquiry.update(v => ({ ...v, status }));
      }
    });
  }

  statusClass(s: string) {
    const m: Record<string, string> = {
      NEW: 'badge-new',
      IN_PROGRESS: 'badge-progress',
      RESPONDED: 'badge-responded',
      CLOSED: 'badge-closed'
    };
    return m[s] || 'badge-new';
  }
}
