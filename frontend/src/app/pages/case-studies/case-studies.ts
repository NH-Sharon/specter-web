import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface CaseStudy {
  id: number;
  client: string;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  results: { label: string; value: string; highlight?: boolean }[];
  technologies: string[];
  duration: string;
  team: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ScrollRevealDirective],
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.scss'
})
export class CaseStudiesComponent {
  readonly caseStudies: CaseStudy[] = [
    {
      id: 1,
      client: 'National Revenue Authority',
      industry: 'Government',
      title: 'Transforming Tax Collection for 40M Citizens',
      problem: 'The Revenue Authority operated a 20-year-old monolithic tax system that processed only 200K transactions per day, experienced frequent outages during peak periods, and had a 3-day processing lag for refunds. Manual processes consumed 60% of staff time.',
      solution: 'We designed and delivered a cloud-native, microservices-based revenue management platform on AWS. The architecture included event-driven processing via Apache Kafka, a real-time analytics layer, and an Angular-based citizen portal with digital identity integration.',
      results: [
        { label: 'Daily Transaction Capacity', value: '2M+', highlight: true },
        { label: 'System Uptime', value: '99.99%', highlight: true },
        { label: 'Operational Cost Reduction', value: '60%', highlight: true },
        { label: 'Refund Processing Time', value: '4hrs vs 3 days' },
        { label: 'Staff Productivity Gain', value: '+85%' },
        { label: 'Project Duration', value: '18 months' }
      ],
      technologies: ['Angular', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'AWS', 'Keycloak'],
      duration: '18 months',
      team: '24 engineers',
      icon: '🏛️',
      color: '#4f6ef7'
    },
    {
      id: 2,
      client: 'National Commerce Bank',
      industry: 'Finance',
      title: 'Real-Time Fraud Detection at Millisecond Speed',
      problem: 'The bank was losing $18M annually to payment fraud, with a legacy rule-based system catching only 60% of fraudulent transactions and generating a 35% false-positive rate that frustrated legitimate customers and overwhelmed the investigation team.',
      solution: 'We built a streaming ML platform using Apache Kafka for event ingestion, Spark Structured Streaming for feature computation, and an ensemble ML model (XGBoost + neural network) deployed on AWS SageMaker with real-time inference endpoints.',
      results: [
        { label: 'Fraud Detection Rate', value: '94%', highlight: true },
        { label: 'False Positive Reduction', value: '-78%', highlight: true },
        { label: 'Annual Loss Prevention', value: '$16M+', highlight: true },
        { label: 'Inference Latency', value: '<8ms' },
        { label: 'Transactions/Second', value: '12,000' },
        { label: 'Model Retraining', value: 'Weekly automated' }
      ],
      technologies: ['Apache Kafka', 'PySpark', 'XGBoost', 'AWS SageMaker', 'Grafana', 'PostgreSQL'],
      duration: '9 months',
      team: '12 engineers',
      icon: '🏦',
      color: '#10b981'
    },
    {
      id: 3,
      client: 'Apex Insurance Group',
      industry: 'Insurance',
      title: 'Intelligent Document Processing for Claims',
      problem: 'Claims adjusters manually processed 2,000+ documents daily — medical reports, invoices, and police reports — taking an average of 14 days to resolve a claim. Error rates were high and customer satisfaction scores were declining.',
      solution: 'We deployed a Generative AI document processing pipeline using Azure Document Intelligence for OCR, a fine-tuned LLM for document classification and entity extraction, and LangChain orchestration for automated decision routing to the claims system.',
      results: [
        { label: 'Claims Processing Time', value: '3 days avg', highlight: true },
        { label: 'Automation Rate', value: '68%', highlight: true },
        { label: 'Customer Satisfaction', value: '+42 NPS pts', highlight: true },
        { label: 'Extraction Accuracy', value: '98.7%' },
        { label: 'Adjuster Capacity', value: '3x throughput' },
        { label: 'Annual Cost Savings', value: '$4.2M' }
      ],
      technologies: ['Azure OpenAI', 'LangChain', 'Azure Document Intelligence', 'FastAPI', 'PostgreSQL', 'React'],
      duration: '7 months',
      team: '9 engineers',
      icon: '🏢',
      color: '#8b5cf6'
    },
    {
      id: 4,
      client: 'National Health Network',
      industry: 'Healthcare',
      title: 'FHIR-Compliant Patient Data Exchange',
      problem: '200+ hospitals across the national health network operated isolated EMR systems. Physicians treating patients from other facilities had no access to medical history, leading to duplicate tests, medication errors, and delayed diagnoses.',
      solution: 'We architected and built an HL7 FHIR R4-compliant interoperability hub on GCP using HAPI FHIR server, Apache Camel for EHR integration, and a React-based unified patient timeline view accessible to authorized clinicians across all facilities.',
      results: [
        { label: 'Hospitals Integrated', value: '214', highlight: true },
        { label: 'Patient Records Available', value: '28M+', highlight: true },
        { label: 'Duplicate Tests Reduced', value: '-45%', highlight: true },
        { label: 'Patient Lookup Time', value: '<2 seconds' },
        { label: 'Data Completeness', value: '99.2%' },
        { label: 'Annual Cost Avoidance', value: '$8M' }
      ],
      technologies: ['HAPI FHIR', 'Apache Camel', 'GCP', 'PostgreSQL', 'React', 'Keycloak'],
      duration: '24 months',
      team: '18 engineers',
      icon: '🏥',
      color: '#0ea5e9'
    },
    {
      id: 5,
      client: 'Meridian Retail Group',
      industry: 'Retail',
      title: 'AI-Powered Omnichannel Commerce Platform',
      problem: 'The retailer operated 5 separate e-commerce systems, a legacy POS, and a mobile app with no shared inventory or customer data. Overselling caused 12% order cancellation rates and customer data fragmentation prevented effective personalization.',
      solution: 'We built a unified commerce platform with a headless React frontend, Spring Boot microservices backend, Elasticsearch-powered product search, real-time inventory ledger on Kafka, and an AI recommendation engine that personalized experiences for 3M customers.',
      results: [
        { label: 'Order Cancellations', value: '-89%', highlight: true },
        { label: 'Revenue Increase (Y1)', value: '+35%', highlight: true },
        { label: 'Recommendation CTR', value: '24%', highlight: true },
        { label: 'Inventory Accuracy', value: '99.6%' },
        { label: 'Page Load Time', value: '<1.2s' },
        { label: 'Customer Retention', value: '+18%' }
      ],
      technologies: ['React', 'Spring Boot', 'Kafka', 'Elasticsearch', 'AWS', 'PyTorch'],
      duration: '14 months',
      team: '22 engineers',
      icon: '🛍️',
      color: '#f59e0b'
    },
    {
      id: 6,
      client: 'Vertex Telecom',
      industry: 'Telecom',
      title: 'Cloud-Native BSS Transformation',
      problem: 'The telco operated a 15-year-old monolithic BSS stack that took 6+ months to launch new products, had a 40-hour monthly maintenance window, and could not support the data volumes expected from their 5G rollout.',
      solution: 'We executed a phased cloud migration and re-architecture of the BSS stack using the strangler fig pattern, decomposing the monolith into 60 microservices deployed on Kubernetes across AWS, with an event-driven real-time billing engine on Kafka.',
      results: [
        { label: 'Product Launch Time', value: '2 weeks', highlight: true },
        { label: 'System Availability', value: '99.97%', highlight: true },
        { label: 'Infrastructure Cost', value: '-52%', highlight: true },
        { label: 'Maintenance Windows', value: 'Eliminated' },
        { label: 'Deployment Frequency', value: '20+ per day' },
        { label: 'Billing Accuracy', value: '99.999%' }
      ],
      technologies: ['AWS', 'Kubernetes', 'Kafka', 'Terraform', 'ArgoCD', 'Grafana'],
      duration: '20 months',
      team: '30 engineers',
      icon: '📡',
      color: '#06b6d4'
    }
  ];
}
