const pool = require('./pool');

const DEFAULT_CONTENT = {
  hero: {
    badge: "🏆 Bangladesh's Premier Technology Partner",
    headline: "Best Technology Partner For Your",
    headlineHighlight: "Digital Transformation",
    subtext: "Specter Technologies has 7+ years of experience delivering cloud, AI, data and enterprise software to businesses across 15+ countries. Over 20 ready-made solutions and 150+ successful projects delivered globally.",
    cta1Label: "Contact Us",
    cta1Link: "/contact",
    cta2Label: "View Our Work",
    cta2Link: "/portfolio",
    miniStats: [
      { value: "150+", label: "Projects" },
      { value: "500+", label: "Clients" },
      { value: "15+",  label: "Countries" },
      { value: "7+",   label: "Years" }
    ]
  },
  stats: {
    items: [
      { icon: "📁", value: 150, suffix: "+", label: "Projects Delivered" },
      { icon: "🏆", value: 20,  suffix: "+", label: "Products Built" },
      { icon: "👨‍💻", value: 60,  suffix: "+", label: "Expert Engineers" },
      { icon: "🌍", value: 15,  suffix: "+", label: "Countries Served" },
      { icon: "😊", value: 500, suffix: "+", label: "Happy Clients" },
      { icon: "📅", value: 7,   suffix: "+", label: "Years Experience" }
    ]
  },
  services: {
    items: [
      { icon: "💻", color: "#0A52CC", title: "Software Development", description: "Custom enterprise software, web apps, APIs, and SaaS platforms built with modern technologies and best practices.", path: "/services/software-development" },
      { icon: "☁️", color: "#0EA5E9", title: "Cloud Engineering",    description: "Cloud architecture, migration, infrastructure as code, and managed cloud operations on AWS, Azure & GCP.", path: "/services/cloud-engineering" },
      { icon: "🤖", color: "#8B5CF6", title: "AI & Machine Learning", description: "ML model development, GenAI integration, RAG systems, NLP, and computer vision solutions for enterprises.", path: "/services/artificial-intelligence" },
      { icon: "📊", color: "#10B981", title: "Data Engineering",     description: "End-to-end data pipelines, real-time streaming, data warehouse, lakehouse, and analytics engineering.", path: "/services/data-engineering" },
      { icon: "📱", color: "#F59E0B", title: "Mobile Development",   description: "Native iOS & Android and cross-platform Flutter/React Native apps with beautiful UI and seamless UX.", path: "/services/mobile-development" },
      { icon: "🛡️", color: "#EF4444", title: "Cybersecurity",        description: "Penetration testing, security audits, SIEM, SOC, and compliance consulting for regulated industries.", path: "/services/cybersecurity" }
    ]
  },
  testimonials: {
    items: [
      { name: "Ahmed Al-Rashid",  role: "CTO",            company: "Gulf Digital Holdings",        quote: "Specter Technologies transformed our legacy banking system into a modern cloud-native platform. The team delivered on time, on budget, and exceeded our performance expectations.", avatar: "A", country: "🇦🇪" },
      { name: "Sarah Thompson",   role: "VP Engineering", company: "MediTech Solutions, UK",       quote: "Their AI/ML team built a diagnostic prediction model that improved our clinical accuracy by 34%. Exceptional technical depth and professional communication throughout.", avatar: "S", country: "🇬🇧" },
      { name: "Rajesh Patel",     role: "CEO",            company: "LogiCore Technologies, India", quote: "From data warehouse to real-time dashboards, Specter handled our entire data stack. Our team now makes decisions in minutes, not days. Highly recommended.", avatar: "R", country: "🇮🇳" },
      { name: "Emma Johansson",   role: "Head of IT",     company: "Nordic Retail Group",          quote: "The cloud migration project was seamless. Zero downtime, excellent documentation, and the post-deployment support has been outstanding.", avatar: "E", country: "🇸🇪" }
    ]
  },
  clients: {
    items: ["ILO", "ICT Division", "DNCC", "BTRC", "Dhaka WASA", "Grameen Bank", "BRAC", "Square Group", "Beximco", "Walton", "MTB Bank", "BRAC Bank", "SIBL", "Dutch-Bangla Bank", "Robi", "Banglalink", "SSL Wireless", "Shohoz", "ShajGoj", "Chaldal"]
  },
  about: {
    title: "Engineering The Future With",
    titleHighlight: "Cloud, Data & AI",
    text: "Specter Technologies Ltd. is a premium software company headquartered in Dhaka, Bangladesh. We architect and deliver cloud, AI, and data solutions that drive real business outcomes for enterprises and governments across Asia, the Middle East, and Europe.",
    highlights: [
      "✅ 7+ years delivering enterprise-grade solutions globally",
      "✅ ISO 9001:2015 certified development processes",
      "✅ 60+ in-house engineers, architects & data scientists",
      "✅ Agile delivery with 2-week sprints and full transparency",
      "✅ 12-month post-launch support on every project"
    ],
    cta1Label: "More About Us",
    cta1Link: "/about",
    cta2Label: "Free Consultation",
    cta2Link: "/contact"
  },
  industries: {
    items: [
      { icon: "🏛️", title: "Government",    sub: "& Public Sector" },
      { icon: "🏦", title: "Banking",        sub: "& Finance" },
      { icon: "🏥", title: "Healthcare",     sub: "& Pharma" },
      { icon: "🏭", title: "Manufacturing",  sub: "& Industry 4.0" },
      { icon: "🛍️", title: "Retail",         sub: "& E-Commerce" },
      { icon: "🎓", title: "Education",      sub: "& EdTech" },
      { icon: "📡", title: "Telecom",        sub: "& ISP" },
      { icon: "✈️", title: "Travel",         sub: "& Hospitality" },
      { icon: "🔋", title: "Energy",         sub: "& Utilities" },
      { icon: "🚢", title: "Logistics",      sub: "& Supply Chain" },
      { icon: "📺", title: "Media",          sub: "& Entertainment" },
      { icon: "🌾", title: "Agriculture",    sub: "& AgriTech" }
    ]
  },
  contact_info: {
    offices: [
      { city: "Dhaka", country: "Bangladesh", address: "Mannan Plaza, Khilkhet, Dhaka 1229, Bangladesh", icon: "📍" },
      { city: "Dubai",  country: "UAE",         address: "Silver Tower, Business Bay, Dubai, UAE",           icon: "📍" }
    ],
    emails: ["hello@spectertech.com.bd", "support@spectertech.com.bd"],
    phones: ["+880 1700-000000", "+971 50-0000000"],
    workingHours: "Sun–Thu: 9am – 6pm (BST)"
  },
  process: {
    items: [
      { num: "01", icon: "🔍", title: "Discovery & Scoping",  desc: "We understand your business goals, technical requirements, and define a clear project roadmap." },
      { num: "02", icon: "📐", title: "Architecture & Design", desc: "Our architects design a scalable, secure solution with wireframes, prototypes, and tech stack selection." },
      { num: "03", icon: "⚙️", title: "Agile Development",    desc: "We build in 2-week sprints with continuous delivery, code reviews, and stakeholder demos." },
      { num: "04", icon: "🧪", title: "QA & Security Testing", desc: "Rigorous automated testing, penetration testing, and performance benchmarking before release." },
      { num: "05", icon: "🚀", title: "Deployment & Support", desc: "Production deployment with CI/CD pipelines and dedicated 12-month post-launch support." }
    ]
  },
  cta_banner: {
    headline: "Ready to Transform Your Business?",
    subtext: "Let's discuss your project. Get a free consultation and project estimate within 24 hours.",
    cta1Label: "Start a Project →",
    cta1Link: "/contact",
    cta2Label: "See Our Work",
    cta2Link: "/portfolio"
  },
  company_info: {
    name: "Specter Technologies Ltd.",
    tagline: "Engineering the Future with Cloud, Data & AI",
    founded: "2017",
    employees: "60+",
    headquarters: "Dhaka, Bangladesh",
    website: "https://spectertech.com.bd",
    linkedIn: "",
    github: "",
    twitter: "",
    facebook: "",
    youtube: "",
    iso: "ISO 9001:2015",
    certifications: ["ISO 9001:2015", "AWS Partner", "Google Cloud Partner", "Microsoft Partner", "BASIS Member", "BACCO Member"]
  }
};

async function seedContent() {
  for (const [key, value] of Object.entries(DEFAULT_CONTENT)) {
    await pool.query(
      `INSERT INTO site_content (section_key, content_json)
       VALUES ($1, $2)
       ON CONFLICT (section_key) DO NOTHING`,
      [key, JSON.stringify(value)]
    );
  }
  console.log('✅ Default content seeded into site_content table');
}

module.exports = { seedContent, DEFAULT_CONTENT };
