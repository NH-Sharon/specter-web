import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE = `${environment.apiUrl}/api/v1/admin`;

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private http: HttpClient) {}

  // Dashboard stats
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${BASE}/dashboard/stats`);
  }

  // Blog
  getBlogs(page = 0, size = 10): Observable<any> {
    return this.http.get<any>(`${BASE}/blog`, { params: { page, size } });
  }
  getBlog(id: number): Observable<any> {
    return this.http.get<any>(`${BASE}/blog/${id}`);
  }
  createBlog(data: any): Observable<any> {
    return this.http.post<any>(`${BASE}/blog`, data);
  }
  updateBlog(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${BASE}/blog/${id}`, data);
  }
  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(`${BASE}/blog/${id}`);
  }
  toggleBlogPublish(id: number): Observable<any> {
    return this.http.patch<any>(`${BASE}/blog/${id}/toggle-publish`, {});
  }

  // Portfolio
  getProjects(page = 0, size = 10): Observable<any> {
    return this.http.get<any>(`${BASE}/portfolio`, { params: { page, size } });
  }
  getProject(id: number): Observable<any> {
    return this.http.get<any>(`${BASE}/portfolio/${id}`);
  }
  createProject(data: any): Observable<any> {
    return this.http.post<any>(`${BASE}/portfolio`, data);
  }
  updateProject(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${BASE}/portfolio/${id}`, data);
  }
  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${BASE}/portfolio/${id}`);
  }

  // Jobs
  getJobs(): Observable<any> {
    return this.http.get<any>(`${BASE}/jobs`);
  }
  getJob(id: number): Observable<any> {
    return this.http.get<any>(`${BASE}/jobs/${id}`);
  }
  createJob(data: any): Observable<any> {
    return this.http.post<any>(`${BASE}/jobs`, data);
  }
  updateJob(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${BASE}/jobs/${id}`, data);
  }
  deleteJob(id: number): Observable<any> {
    return this.http.delete<any>(`${BASE}/jobs/${id}`);
  }
  toggleJobActive(id: number): Observable<any> {
    return this.http.patch<any>(`${BASE}/jobs/${id}/toggle-active`, {});
  }

  // Inquiries
  getInquiries(page = 0, size = 20): Observable<any> {
    return this.http.get<any>(`${BASE}/inquiries`, { params: { page, size } });
  }
  updateInquiryStatus(id: number, status: string): Observable<any> {
    return this.http.patch<any>(`${BASE}/inquiries/${id}/status`, { status });
  }

  // Content
  getAllContent(): Observable<any> {
    return this.http.get<any>(`${BASE}/content`);
  }
  getContent(key: string): Observable<any> {
    return this.http.get<any>(`${BASE}/content/${key}`);
  }
  updateContent(key: string, contentJson: string): Observable<any> {
    return this.http.put<any>(`${BASE}/content/${key}`, { sectionKey: key, contentJson });
  }
}
