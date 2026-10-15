import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

export const profile = {
  name: "Pankaj Kumar",
  initials: "PK",
  role: ".NET Full Stack Developer",
  company: "Coretegra Technologies",
  location: "Zirakpur, Punjab, India",
  timezone: "IST (UTC+5:30)",
  email: "kp8613765@gmail.com",
  /** First professional role; experience is derived from this so it never goes stale. */
  careerStart: new Date(2024, 3, 1),
  available: true,
  /** One-page CV served from /public. */
  resume: "/Pankaj-Kumar-Resume.pdf",
};

/** Home-page sections, in page order (navbar + command menu). */
export const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export type Social = { label: string; handle: string; href: string; icon: LucideIcon };

export const socials: Social[] = [
  { label: "GitHub", handle: "Pankajkapoor123", href: "https://github.com/Pankajkapoor123", icon: Github },
  { label: "LinkedIn", handle: "pankaj-kumar", href: "https://www.linkedin.com/in/pankaj-kumar-63820b29a/", icon: Linkedin },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}`, icon: Mail },
];

/** Whole and half years since `careerStart`, e.g. "2.5". */
export const yearsOfExperience = () => {
  const months =
    (new Date().getFullYear() - profile.careerStart.getFullYear()) * 12 +
    (new Date().getMonth() - profile.careerStart.getMonth());
  return (Math.floor(months / 6) / 2).toString();
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: { title: string; text: string; project?: string }[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: ".NET Full Stack Developer",
    company: "Coretegra Technologies Pvt Ltd",
    period: "Apr 2024 — Present",
    location: "Zirakpur, Punjab",
    current: true,
    summary:
      "Building enterprise healthcare, inventory, logistics and document-management systems end to end — API design, business logic, data modelling and integration with Angular and mobile clients.",
    highlights: [
      {
        title: "Hospital Management System",
        text: "Built the HIMS backend (.NET Core + Angular) covering patient records, prescriptions, admissions and billing; contributed to ABHA M1/M2/M3 modules for health-data interoperability.",
        project: "hims",
      },
      {
        title: "Responsive Angular frontends",
        text: "Built responsive Angular frontends for HIMS and Authentiko: reusable components, reactive forms with validation, route guards, and HTTP interceptors for JWT auth, integrated with the .NET APIs through RxJS.",
      },
      {
        title: "SNEVVA medical report analysis",
        text: "Designed the SNEVVA report-processing pipeline: PDF/OCR extraction, knowledge-base matching, reference-range validation and AI fallback for uncertain values, on AWS S3, CloudFront and SQS.",
        project: "snevva",
      },
      {
        title: "Navitra school transport",
        text: "Delivered the complete backend for Navitra, a school transport platform, serving both web and mobile clients from one ASP.NET Core Web API.",
        project: "navitra",
      },
      {
        title: "MIMS, built solo end to end",
        text: "Built MIMS solo, end to end, on ASP.NET Core MVC and SQL Server — models, views, controllers and database — with multi-level approvals and low-stock alerts, replacing manual inventory paperwork.",
        project: "mims",
      },
      {
        title: "Authentiko document platform",
        text: "Built Authentiko: secure document storage on S3, SFTP-based bank file workflows and shipment tracking.",
        project: "authentiko",
      },
    ],
    stack: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "Angular", "PostgreSQL", "SQL Server", "AWS"],
  },
  {
    role: ".NET Full Stack Trainee",
    company: "CS Infotech",
    period: "Sep 2023 — Mar 2024",
    location: "Chandigarh",
    summary:
      "Full-stack training on ASP.NET Core MVC, Entity Framework and Angular, applied by building an e-commerce platform.",
    highlights: [
      {
        title: "E-commerce platform",
        text: "Built an e-commerce platform with ASP.NET Core MVC and Entity Framework, including authentication, order management and payment gateway integration.",
        project: "ecommerce",
      },
      { title: "Query optimisation", text: "Optimized database queries to cut page load times and server load." },
    ],
    stack: ["ASP.NET Core MVC", "Entity Framework", "SQL Server"],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Lovely Professional University",
    period: "2025 — Present",
    location: "Jalandhar, Punjab",
    note: "Distance / online programme",
  },
  {
    degree: "Diploma in Computer",
    institution: "Sejal Education Center",
    period: "2020",
    location: "Baijnath, Himachal Pradesh",
  },
];

export const skillGroups = [
  {
    title: "Backend",
    items: ["C#", ".NET 8", ".NET Core", "ASP.NET Core Web API", "ASP.NET Core MVC", "Entity Framework Core", "REST APIs", "JWT", "RBAC"],
  },
  {
    title: "Frontend",
    items: [
      "Angular",
      "TypeScript",
      "RxJS",
      "Reactive Forms",
      "Routing & Guards",
      "HTTP Interceptors",
      "Responsive Design",
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
    ],
  },
  { title: "Data", items: ["PostgreSQL", "SQL Server", "pgvector"] },
  { title: "Cloud", items: ["AWS S3", "CloudFront", "SQS", "SFTP"] },
  { title: "AI & documents", items: ["LLM integration", "OCR", "PDF parsing", "Knowledge-base matching", "Output validation"] },
  { title: "Tooling & integrations", items: ["Git", "Swagger / OpenAPI", "Postman", "ABHA / ABDM", "Payment gateways"] },
];

/** The handful of technologies everything else is built on, shown in the hero stats. */
export const coreTech = ["C# / .NET", "ASP.NET Core", "Angular", "SQL", "AWS"];
