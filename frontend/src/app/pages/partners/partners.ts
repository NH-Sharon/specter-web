import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Partner {
  name: string;
  tier: string;
  description: string;
  icon: string;
  type: string;
}

interface PartnerBenefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './partners.html',
  styleUrl: './partners.scss'
})
export class PartnersComponent {
  readonly cloudPartners: Partner[] = [
    { name: 'Amazon Web Services', tier: 'Advanced Consulting Partner', description: 'AWS Advanced Consulting Partner with competencies in Cloud Migration, DevOps, and Security.', icon: '☁️', type: 'cloud' },
    { name: 'Microsoft Azure', tier: 'Solutions Partner', description: 'Microsoft Solutions Partner for Azure Infrastructure and Digital & App Innovation.', icon: '🔷', type: 'cloud' },
    { name: 'Google Cloud', tier: 'Service Partner', description: 'Google Cloud Service Partner with expertise in data analytics, AI/ML, and cloud-native development.', icon: '🌐', type: 'cloud' }
  ];

  readonly techPartners: Partner[] = [
    { name: 'Confluent', tier: 'Partner', description: 'Certified Confluent Partner for Apache Kafka-based data streaming and event-driven architectures.', icon: '📨', type: 'tech' },
    { name: 'Snowflake', tier: 'Partner', description: 'Snowflake Partner delivering cloud data warehousing and analytics solutions for enterprise clients.', icon: '❄️', type: 'tech' },
    { name: 'HashiCorp', tier: 'Partner', description: 'HashiCorp Partner specializing in Terraform infrastructure automation and Vault secrets management.', icon: '🏗️', type: 'tech' },
    { name: 'Elastic', tier: 'Partner', description: 'Elasticsearch and ELK Stack partner for observability, SIEM, and enterprise search solutions.', icon: '🔍', type: 'tech' },
    { name: 'Databricks', tier: 'Partner', description: 'Databricks partner for lakehouse architecture, data engineering, and unified analytics platforms.', icon: '⚡', type: 'tech' },
    { name: 'Red Hat', tier: 'Partner', description: 'Red Hat partner for OpenShift Kubernetes platform, RHEL enterprise Linux, and Ansible automation.', icon: '🎩', type: 'tech' }
  ];

  readonly implementationPartners: Partner[] = [
    { name: 'Accenture', tier: 'Alliance Partner', description: 'Strategic alliance for large-scale digital transformation engagements across Southeast Asia and MENA.', icon: '🤝', type: 'impl' },
    { name: 'Infosys', tier: 'Alliance Partner', description: 'Technology delivery alliance for enterprise ERP implementation and managed services projects.', icon: '🔷', type: 'impl' },
    { name: 'PwC', tier: 'Advisory Partner', description: 'Advisory partnership for technology strategy, digital transformation consulting, and risk management.', icon: '🏢', type: 'impl' }
  ];

  readonly programBenefits: PartnerBenefit[] = [
    { icon: '💰', title: 'Revenue Sharing', description: 'Competitive referral fees and revenue sharing for opportunities you bring to Specter Technologies.' },
    { icon: '🏆', title: 'Joint Credentials', description: 'Co-branded case studies, joint press releases, and shared credentials for won engagements.' },
    { icon: '📚', title: 'Technical Enablement', description: 'Access to our technical documentation, solution accelerators, and architecture reference guides.' },
    { icon: '🎯', title: 'Sales Collaboration', description: 'Joint go-to-market activities, shared pipeline reviews, and coordinated proposal support.' },
    { icon: '🔑', title: 'Partner Portal', description: 'Dedicated partner portal with deal registration, marketing materials, and pipeline management tools.' },
    { icon: '🌍', title: 'Market Access', description: 'Leverage our established presence in South Asia, MENA, and Southeast Asian markets.' }
  ];

  readonly partnerTiers = [
    {
      name: 'Strategic',
      color: '#f59e0b',
      icon: '🥇',
      description: 'Our deepest partnerships with shared go-to-market motions and joint P&L alignment.',
      perks: ['Dedicated partner manager', 'Joint business planning', 'Executive sponsorship', 'Priority deal registration', 'Co-marketing budget']
    },
    {
      name: 'Premier',
      color: '#0ea5e9',
      icon: '🥈',
      description: 'Active partnerships with strong delivery collaboration and mutual business development.',
      perks: ['Partner manager access', 'Quarterly business reviews', 'Training and enablement', 'Deal registration', 'Co-selling support']
    },
    {
      name: 'Registered',
      color: '#10b981',
      icon: '🥉',
      description: 'Entry-level partnership with referral capabilities and access to partner resources.',
      perks: ['Partner portal access', 'Referral program', 'Technical documentation', 'Joint collateral', 'Online training']
    }
  ];
}
