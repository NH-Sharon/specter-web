import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = `${environment.apiUrl}/api/v1/content`;

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private http: HttpClient) {}

  getSection<T>(key: string, fallback: T) {
    return this.http.get<any>(`${API}/${key}`).pipe(
      catchError(() => of({ success: true, data: { content_json: JSON.stringify(fallback) } }))
    );
  }

  parse<T>(res: any, fallback: T): T {
    try {
      if (res?.data?.content_json) return JSON.parse(res.data.content_json) as T;
    } catch {}
    return fallback;
  }
}
