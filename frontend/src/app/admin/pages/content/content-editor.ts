import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const ADMIN_API = `${environment.apiUrl}/api/v1/admin/content`;

interface ContentSection {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-content-editor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './content-editor.html',
  styleUrl: './content-editor.scss'
})
export class ContentEditorComponent implements OnInit {
  readonly sections: ContentSection[] = [
    { key: 'hero',         label: 'Hero Section',        icon: '🚀' },
    { key: 'stats',        label: 'At a Glance Stats',   icon: '📊' },
    { key: 'services',     label: 'Services',            icon: '⚙️' },
    { key: 'testimonials', label: 'Testimonials',        icon: '💬' },
    { key: 'clients',      label: 'Client List',         icon: '🏢' },
    { key: 'about',        label: 'About Section',       icon: 'ℹ️' },
    { key: 'industries',   label: 'Industries',          icon: '🏭' },
    { key: 'process',      label: 'Our Process',         icon: '🔄' },
    { key: 'cta_banner',   label: 'CTA Banner',          icon: '📢' },
    { key: 'contact_info', label: 'Contact Info',        icon: '📞' },
    { key: 'company_info', label: 'Company Info',        icon: '🏠' },
  ];

  activeKey = signal('hero');
  data = signal<any>({});
  loading = signal(false);
  saving = signal(false);
  success = signal('');
  error = signal('');

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadSection('hero'); }

  selectSection(key: string) {
    this.activeKey.set(key);
    this.loadSection(key);
  }

  activeSection() {
    return this.sections.find(s => s.key === this.activeKey()) || this.sections[0];
  }

  loadSection(key: string) {
    this.loading.set(true);
    this.error.set('');
    this.success.set('');
    const token = localStorage.getItem('specter_admin_token');
    this.http.get<any>(`${ADMIN_API}/${key}`, { headers: { Authorization: `Bearer ${token}` } }).subscribe({
      next: (res) => {
        try {
          this.data.set(JSON.parse(res.data?.content_json || '{}'));
        } catch {
          this.data.set({});
        }
        this.loading.set(false);
      },
      error: () => { this.data.set({}); this.loading.set(false); }
    });
  }

  save() {
    this.saving.set(true);
    this.error.set('');
    const token = localStorage.getItem('specter_admin_token');
    this.http.put<any>(`${ADMIN_API}/${this.activeKey()}`,
      { sectionKey: this.activeKey(), contentJson: JSON.stringify(this.data()) },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    ).subscribe({
      next: () => {
        this.success.set('✅ Saved! Changes will appear on the website immediately.');
        this.saving.set(false);
        setTimeout(() => this.success.set(''), 4000);
      },
      error: (e) => {
        this.error.set(e?.error?.message || 'Failed to save.');
        this.saving.set(false);
      }
    });
  }

  // Helper methods for list operations
  addItem(listKey: string, template: any) {
    const d = { ...this.data() };
    if (!d[listKey]) d[listKey] = [];
    d[listKey] = [...d[listKey], { ...template }];
    this.data.set(d);
  }

  removeItem(listKey: string, index: number) {
    const d = { ...this.data() };
    d[listKey] = d[listKey].filter((_: any, i: number) => i !== index);
    this.data.set(d);
  }

  updateField(field: string, value: any) {
    this.data.set({ ...this.data(), [field]: value });
  }

  updateListItem(listKey: string, index: number, field: string, value: any) {
    const d = { ...this.data() };
    d[listKey] = d[listKey].map((item: any, i: number) =>
      i === index ? { ...item, [field]: value } : item
    );
    this.data.set(d);
  }

  addMiniStat() { this.addItem('miniStats', { value: '0+', label: 'New Stat' }); }
  removeMiniStat(i: number) { this.removeItem('miniStats', i); }

  addStatItem()      { this.addItem('items', { icon: '📌', value: 0, suffix: '+', label: 'New Stat' }); }
  removeStatItem(i: number) { this.removeItem('items', i); }

  addService()       { this.addItem('items', { icon: '⚙️', color: '#0A52CC', title: 'New Service', description: '', path: '/services' }); }
  removeService(i: number) { this.removeItem('items', i); }

  addTestimonial()   { this.addItem('items', { name: '', role: '', company: '', quote: '', avatar: 'A', country: '🇧🇩' }); }
  removeTestimonial(i: number) { this.removeItem('items', i); }

  addIndustry()      { this.addItem('items', { icon: '🏢', title: 'New Industry', sub: '' }); }
  removeIndustry(i: number) { this.removeItem('items', i); }

  addProcessStep()   { this.addItem('items', { num: '06', icon: '📌', title: 'New Step', desc: '' }); }
  removeProcessStep(i: number) { this.removeItem('items', i); }

  get clientsText(): string {
    return (this.data()?.items || []).join('\n');
  }
  set clientsText(val: string) {
    this.data.set({ ...this.data(), items: val.split('\n').map((s: string) => s.trim()).filter(Boolean) });
  }

  get highlightsText(): string {
    return (this.data()?.highlights || []).join('\n');
  }
  set highlightsText(val: string) {
    this.data.set({ ...this.data(), highlights: val.split('\n').map((s: string) => s.trim()).filter(Boolean) });
  }

  setEmailsFromText(val: string) {
    this.updateField('emails', val.split('\n').map((s: string) => s.trim()).filter(Boolean));
  }

  setPhonesFromText(val: string) {
    this.updateField('phones', val.split('\n').map((s: string) => s.trim()).filter(Boolean));
  }

  joinArray(arr: string[]): string {
    return (arr || []).join('\n');
  }
}
