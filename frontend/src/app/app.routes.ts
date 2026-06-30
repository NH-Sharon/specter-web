import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent)
  },
  {
    path: 'services/:slug',
    loadComponent: () => import('./pages/services/service-detail/service-detail').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'solutions',
    loadComponent: () => import('./pages/solutions/solutions').then(m => m.SolutionsComponent)
  },
  {
    path: 'industries',
    loadComponent: () => import('./pages/industries/industries').then(m => m.IndustriesComponent)
  },
  {
    path: 'technologies',
    loadComponent: () => import('./pages/technologies/technologies').then(m => m.TechnologiesComponent)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.PortfolioComponent)
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./pages/case-studies/case-studies').then(m => m.CaseStudiesComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/post-detail/post-detail').then(m => m.PostDetailComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: 'careers',
    loadComponent: () => import('./pages/careers/careers').then(m => m.CareersComponent)
  },
  {
    path: 'careers/:slug',
    loadComponent: () => import('./pages/careers/job-detail/job-detail').then(m => m.JobDetailComponent)
  },
  {
    path: 'partners',
    loadComponent: () => import('./pages/partners/partners').then(m => m.PartnersComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then(m => m.FaqComponent)
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/resources/resources').then(m => m.ResourcesComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
