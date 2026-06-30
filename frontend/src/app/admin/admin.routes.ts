import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./admin-layout/admin-layout').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog-list/blog-list').then(m => m.BlogListComponent)
      },
      {
        path: 'blog/new',
        loadComponent: () => import('./pages/blog/blog-edit/blog-edit').then(m => m.BlogEditComponent)
      },
      {
        path: 'blog/:id/edit',
        loadComponent: () => import('./pages/blog/blog-edit/blog-edit').then(m => m.BlogEditComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./pages/portfolio/portfolio-list/portfolio-list').then(m => m.PortfolioListComponent)
      },
      {
        path: 'portfolio/new',
        loadComponent: () => import('./pages/portfolio/portfolio-edit/portfolio-edit').then(m => m.PortfolioEditComponent)
      },
      {
        path: 'portfolio/:id/edit',
        loadComponent: () => import('./pages/portfolio/portfolio-edit/portfolio-edit').then(m => m.PortfolioEditComponent)
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/jobs/jobs-list/jobs-list').then(m => m.JobsListComponent)
      },
      {
        path: 'jobs/new',
        loadComponent: () => import('./pages/jobs/job-edit/job-edit').then(m => m.JobEditComponent)
      },
      {
        path: 'jobs/:id/edit',
        loadComponent: () => import('./pages/jobs/job-edit/job-edit').then(m => m.JobEditComponent)
      },
      {
        path: 'inquiries',
        loadComponent: () => import('./pages/inquiries/inquiries').then(m => m.InquiriesComponent)
      },
      {
        path: 'content',
        loadComponent: () => import('./pages/content/content-editor').then(m => m.ContentEditorComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then(m => m.SettingsComponent)
      }
    ]
  }
];
