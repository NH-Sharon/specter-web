import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Industry {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  challenges: string[];
  solutions: string[];
  compliance: string[];
  color: string;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './industries.html',
  styleUrl: './industries.scss'
})
export class IndustriesComponent {
  readonly industries: Industry[] = [
    {
      icon: '🏛️',
      title: 'Government & Public Sector',
      subtitle: 'Secure, inclusive digital public services',
      description: 'We help government agencies modernize citizen services, digitize administrative workflows, and build secure, compliant platforms that meet the highest public sector standards.',
      challenges: ['Legacy system modernization', 'Interoperability across agencies', 'Citizen data privacy', 'Budget constraints', 'Procurement complexity'],
      solutions: ['e-Governance portals', 'Digital identity systems', 'Open data platforms', 'e-Procurement systems', 'G2G integration hubs'],
      compliance: ['ISO 27001', 'NIST', 'FedRAMP'],
      color: '#4f6ef7'
    },
    {
      icon: '🏦',
      title: 'Banking & Financial Services',
      subtitle: 'High-performance fintech at enterprise scale',
      description: 'From core banking modernization to real-time fraud detection, we build the high-performance, compliant financial systems that power modern banking experiences.',
      challenges: ['Core system technical debt', 'Real-time fraud at scale', 'Open banking compliance', 'Regulatory reporting burdens', 'Customer experience gaps'],
      solutions: ['Core banking API modernization', 'Real-time fraud detection AI', 'Regulatory reporting automation', 'Digital onboarding platforms', 'Wealth management portals'],
      compliance: ['PCI-DSS', 'SOX', 'Basel III', 'GDPR'],
      color: '#10b981'
    },
    {
      icon: '🏥',
      title: 'Healthcare & Life Sciences',
      subtitle: 'Patient-centric digital health platforms',
      description: 'We build HIPAA-compliant clinical systems, telehealth platforms, and healthcare data interoperability solutions that improve patient outcomes and operational efficiency.',
      challenges: ['Data silos across systems', 'HIPAA/GDPR compliance', 'Interoperability (HL7/FHIR)', 'Clinical workflow complexity', 'Patient data security'],
      solutions: ['FHIR interoperability platforms', 'Telehealth systems', 'Clinical analytics dashboards', 'EHR/EMR integrations', 'Medical IoT platforms'],
      compliance: ['HIPAA', 'HL7 FHIR', 'ISO 13485', 'SOC 2'],
      color: '#0ea5e9'
    },
    {
      icon: '🏭',
      title: 'Manufacturing & Logistics',
      subtitle: 'Smart factory and supply chain intelligence',
      description: 'We deliver industrial IoT platforms, supply chain visibility systems, and predictive maintenance solutions that reduce downtime and optimize throughput across global operations.',
      challenges: ['OT/IT integration complexity', 'Supply chain visibility gaps', 'Unplanned downtime costs', 'Quality control at scale', 'Multi-site data fragmentation'],
      solutions: ['MES and SCADA integration', 'Digital twin platforms', 'Predictive maintenance AI', 'Supply chain control towers', 'Warehouse automation systems'],
      compliance: ['ISO 9001', 'IEC 62443', 'OSHA'],
      color: '#f59e0b'
    },
    {
      icon: '🛍️',
      title: 'Retail & E-Commerce',
      subtitle: 'Omnichannel experiences that convert',
      description: 'We build personalized, scalable commerce platforms that unify in-store, online, and mobile experiences — powered by AI recommendation engines and real-time inventory intelligence.',
      challenges: ['Channel fragmentation', 'Personalization at scale', 'Inventory accuracy', 'Cart abandonment', 'Seasonal traffic spikes'],
      solutions: ['Omnichannel commerce platforms', 'AI recommendation engines', 'Real-time inventory systems', 'Customer loyalty platforms', 'Headless commerce architecture'],
      compliance: ['PCI-DSS', 'GDPR', 'CCPA'],
      color: '#ec4899'
    },
    {
      icon: '🎓',
      title: 'Education & EdTech',
      subtitle: 'Scalable digital learning ecosystems',
      description: 'From LMS platforms to adaptive learning systems and administrative automation, we build digital education infrastructure that scales to millions of learners.',
      challenges: ['Engagement at remote scale', 'Diverse accessibility needs', 'Assessment integrity', 'Content management complexity', 'Student data governance'],
      solutions: ['LMS and virtual classroom platforms', 'Adaptive learning systems', 'Student analytics dashboards', 'Online examination platforms', 'University ERP systems'],
      compliance: ['FERPA', 'COPPA', 'GDPR', 'WCAG 2.1'],
      color: '#8b5cf6'
    },
    {
      icon: '📡',
      title: 'Telecom & Media',
      subtitle: 'Next-gen network and content platforms',
      description: 'We help telecom operators and media companies build scalable BSS/OSS systems, content delivery platforms, and real-time subscriber analytics for the 5G era.',
      challenges: ['5G network complexity', 'Subscriber churn', 'Revenue assurance', 'Content delivery at edge', 'Real-time billing systems'],
      solutions: ['BSS/OSS modernization', 'Real-time billing systems', 'Network performance analytics', 'Content delivery platforms', 'Subscriber data management'],
      compliance: ['GDPR', 'CPNI', 'SOX'],
      color: '#06b6d4'
    },
    {
      icon: '🏢',
      title: 'Insurance',
      subtitle: 'Intelligent underwriting and claims automation',
      description: 'We modernize insurance operations with AI-powered underwriting, automated claims processing, and digital policy management platforms that reduce loss ratios and improve customer satisfaction.',
      challenges: ['Manual underwriting bottlenecks', 'Claims fraud detection', 'Legacy policy systems', 'Actuarial data quality', 'Regulatory reporting'],
      solutions: ['AI underwriting platforms', 'Automated claims processing', 'Digital policy management', 'Fraud detection systems', 'Actuarial analytics platforms'],
      compliance: ['Solvency II', 'IFRS 17', 'NAIC', 'GDPR'],
      color: '#f97316'
    }
  ];
}
