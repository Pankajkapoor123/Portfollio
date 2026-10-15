import { Bot, Bus, Hospital, Pill, ShieldCheck, ShoppingCart, type LucideIcon } from "lucide-react";

export type ProjectModule = { title: string; points: string[] };

export type Project = {
  slug: string;
  title: string;
  short: string;
  category: string;
  summary: string;
  highlights: string[];
  facts?: { label: string; value: string }[];
  tech: string[];
  icon: LucideIcon;
  /** Cover photo in /public/projects, used on cards and the case-study header. */
  image?: string;
  featured?: boolean;
  overview: string;
  /** Heading for the workflow section; defaults to "How it works". */
  workflowTitle?: string;
  workflow?: { title: string; text: string }[];
  modules: ProjectModule[];
  role: string;
  /** Optional breakdown of the contribution, shown as a checklist under `role`. */
  roleDetails?: string[];
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "hims",
    image: "/projects/hims.jpg",
    title: "Hospital Management System",
    short: "HIMS",
    category: "Healthcare · ABHA-related modules",
    summary:
      "A comprehensive platform that digitizes hospital operations — the complete patient lifecycle from registration and consultation to admission, discharge and billing.",
    highlights: [
      "Patient lifecycle: registration to discharge",
      "Clinical records, prescriptions and billing",
      "ABHA-related M1, M2 and M3 modules",
    ],
    tech: [".NET Core", "ASP.NET Core Web API", "Angular", "PostgreSQL", "Entity Framework Core", "REST APIs"],
    icon: Hospital,
    featured: true,
    facts: [{"label":"Domain","value":"Healthcare"},{"label":"Backend","value":".NET Core Web API"},{"label":"Frontend","value":"Angular"},{"label":"Database","value":"PostgreSQL"}],
    overview:
      "HIMS digitizes hospital operations, manages patient information, streamlines clinical workflows, automates billing and supports standardized healthcare data exchange through ABHA-related modules.",
    modules: [
      {
        title: "Patient Registration & Management",
        points: [
          "Patient registration and demographic information",
          "Patient profiles and medical history",
          "Search and retrieval of patient records",
          "Unique patient identification and record management",
        ],
      },
      {
        title: "Appointments & Doctors",
        points: [
          "Doctor profiles, departments and specializations",
          "Appointment scheduling and management",
          "Appointment status and patient visit workflows",
          "Doctor-wise patient records and consultation history",
        ],
      },
      {
        title: "Clinical Records & Prescriptions",
        points: [
          "Patient vitals and clinical observations",
          "Consultation notes and diagnosis records",
          "Prescription management",
          "Medical history and treatment tracking",
        ],
      },
      {
        title: "Inpatient & Bed Management",
        points: [
          "Admission and discharge workflows",
          "Bed and room allocation",
          "Inpatient status and stay management",
          "Coordination of patient movement and available resources",
        ],
      },
      {
        title: "Laboratory & Diagnostics",
        points: [
          "Diagnostic test records",
          "Test requests and result management",
          "Diagnostic records linked to patient encounters",
          "Clinical information available for treatment and billing",
        ],
      },
      {
        title: "Billing & Finance",
        points: [
          "Consultation fee management",
          "Test charges and patient billing records",
          "Automated bill generation",
          "Billing linked to patient visits and hospital services",
        ],
      },
      {
        title: "Roles & Access Control",
        points: [
          "Role-based access for authorized hospital users",
          "API-level validation and controlled access to records",
          "Separation of administrative and clinical operations",
        ],
      },
      {
        title: "ABHA-related Modules (M1, M2, M3)",
        points: [
          "ABHA identity integration in applicable workflows",
          "Linking patient records with digital health identity",
          "Standardized healthcare information handling",
          "Consent-based exchange and interoperability",
          "Validation and error handling for identity and API responses",
        ],
      },
    ],
    role: "Backend API development, business logic, database operations and integration between the Angular frontend and the .NET backend. Focused on streamlining hospital operations, keeping patient records consistent and improving data flow between departments.",
    note: "ABHA integration supports ABDM-aligned workflows; full compliance depends on verified integrations, consent flows and conformance requirements.",
  },
  {
    slug: "snevva",
    image: "/projects/snevva.jpg",
    title: "SNEVVA",
    short: "SNEVVA",
    category: "AI · Health & Wellness App",
    summary:
      "An everyday wellness companion on Google Play: mood, sleep, steps, diet, period and vitals tracking, an AI health companion named Elly, meditation, and AI analysis of lab reports with personalised diet and exercise plans and report-to-report comparison.",
    highlights: [
      "Daily tracking: mood, sleep, steps, water, diet and periods",
      "Blood glucose, blood pressure and heart rate with Health Connect sync",
      "AI report analysis with diet & exercise plans and report comparison",
    ],
    tech: [".NET 8", "ASP.NET Core Web API", "EF Core", "PostgreSQL", "pgvector", "OCR", "LLM", "AWS", "Android", "Health Connect"],
    icon: Bot,
    featured: true,
    facts: [
      { label: "Domain", value: "Health & Wellness · AI" },
      { label: "Platform", value: "Android · Google Play" },
      { label: "Backend", value: ".NET 8 Web API" },
      { label: "Database", value: "PostgreSQL + pgvector" },
      { label: "My scope", value: "Medical report analysis" },
    ],
    overview:
      "SNEVVA helps people build healthier daily habits and stay on top of their wellbeing from one calm, easy-to-use app. It brings together habit tracking, vitals monitoring for diabetes and blood pressure, women's health, diet plans, meditation and an AI health companion — and it can read uploaded lab reports, turn them into clear, validated health insights, build diet and exercise plans from the results, and compare reports over time.",
    workflowTitle: "How report analysis works",
    workflow: [
      { title: "Report upload", text: "PDF / image reports with API validation" },
      { title: "Text & table extraction", text: "PDF parsing, OCR where required, all pages" },
      { title: "Knowledge-base matching", text: "Aliases, units, reference ranges, noise filtering" },
      { title: "AI-assisted gap filling", text: "Missing or uncertain parameters, then validated" },
      { title: "Merge & validation", text: "Resolve duplicates, check units, apply ranges" },
      { title: "Structured response", text: "Results, findings, review flags and insights" },
    ],
    modules: [
      {
        title: "Elly — AI Health Companion",
        points: [
          "In-app chat with Elly, the app's friendly health companion",
          "Profile-aware answers backed by knowledge-base retrieval",
          "Date-wise symptom history that can be looked up later",
        ],
      },
      {
        title: "AI Medical Report Analysis",
        points: [
          "Upload lab reports as PDF or a photo, including scanned and multi-page reports",
          "Every test's name, result, unit and reference range extracted automatically",
          "Each value classified against its reference range — normal, low or high — with review flags",
          "Original report values kept exactly as printed; AI only fills gaps and is checked against the source",
          "Plain-language findings and health insights instead of a raw table of numbers",
        ],
      },
      {
        title: "Diet & Exercise Plans from Your Report",
        points: [
          "Personalised diet plan built around the values flagged in the user's report",
          "Exercise plan matched to the report findings and the user's profile",
          "Plans that update when a newer report is uploaded",
        ],
      },
      {
        title: "Report Comparison",
        points: [
          "Compare a new report with earlier ones, parameter by parameter",
          "See which values improved, worsened or stayed the same over time",
          "Trends that make follow-up conversations with a doctor easier",
        ],
      },
      {
        title: "Daily Wellness Tracking",
        points: [
          "Water intake, sleep, daily steps and mood in one My Health dashboard",
          "Daily goals and progress for each habit",
          "Reminders for medication, meals and hydration",
        ],
      },
      {
        title: "Blood Glucose & Blood Pressure",
        points: [
          "Dedicated screens for people managing diabetes, pre-diabetes or blood pressure",
          "Readings classified as Low, Healthy, Pre-Diabetic, High or Critical",
          "Heart-rate tracking alongside blood pressure",
          "Automatic sync from Health Connect-linked glucose meters, CGMs and BP monitors, or manual entry",
        ],
      },
      {
        title: "BMI & Vital Monitoring",
        points: [
          "BMI calculator from gender, age, weight and height",
          "Vital monitor that keeps key health numbers in one place",
        ],
      },
      {
        title: "Women's Health",
        points: [
          "Period tracking with cycle phases",
          "Calendar view with upcoming period and cycle insights",
        ],
      },
      {
        title: "Health Tips & Meditation",
        points: [
          "General diet plans and daily health tips",
          "Meditation and calming audio sessions for relaxation and mindfulness",
        ],
      },
      {
        title: "Exportable Health Report",
        points: [
          "Tracking history compiled into a shareable health report",
          "Export as PDF or Excel to share with a doctor",
        ],
      },
    ],
    role: "I built the medical report analysis feature end to end on the .NET backend — the part of SNEVVA that reads a user's uploaded lab report and turns it into structured, trustworthy results. The engineering focus was database-first extraction, selective AI fallback and deterministic validation, so AI output never replaces the values printed on the original report.",
    roleDetails: [
      "Report intake API: accepts PDF and image uploads with validation, stored on AWS S3 and processed asynchronously through SQS",
      "Extraction: PDF text and table parsing across all pages, with OCR for scanned or photographed reports",
      "Field detection: patient age and gender, test name, result, unit and reference range for every row",
      "Original values preserved exactly, including formats such as >10, <5 and 1:160",
      "Database-driven knowledge base of parameters, aliases, unit mappings and reference ranges, replacing per-test hardcoded rules",
      "Noise filtering so headers, footers and lab boilerplate are not mistaken for results",
      "AI used only for missing or uncertain parameters, and its output checked against the source report before it is accepted",
      "Merge and validation: duplicate resolution, unit checks and reference-range classification with review flags",
      "Structured JSON response with results, findings and readable insights for the app",
      "Learning and caching of validated aliases, patterns and reusable responses to cut repeat AI calls",
      "Monitoring of API usage, AI token consumption, knowledge-base hits and processing time",
    ],
    note: "My work covered the report-analysis feature; the other app features were built by the wider SNEVVA team. Insights are informational and not a clinical diagnosis.",
  },
  {
    slug: "navitra",
    image: "/projects/navitra.jpg",
    title: "Navitra — School Transport Management System",
    short: "Navitra",
    category: "School Transport",
    summary:
      "Complete backend for the web and mobile applications that run school transportation — students, vehicles, drivers, routes and daily trips.",
    highlights: [
      "One set of REST APIs serving web and mobile",
      "Student, vehicle, driver and route management",
      "Validation, exception handling and access control",
    ],
    tech: ["C#", ".NET", "ASP.NET Core Web API", "Entity Framework Core", "PostgreSQL"],
    icon: Bus,
    facts: [
      { label: "Domain", value: "School transportation" },
      { label: "Platforms", value: "Web + Mobile" },
      { label: "Backend", value: "ASP.NET Core Web API" },
      { label: "Database", value: "PostgreSQL" },
    ],
    overview:
      "Navitra is a web and mobile-based School Transport Management System. It digitizes student transport records, vehicles, drivers, routes and day-to-day transport workflows, with a single backend shared by both applications.",
    modules: [
      {
        title: "Student Management",
        points: [
          "Student records and school details",
          "Transport-related information for every student",
        ],
      },
      {
        title: "Vehicle Management",
        points: [
          "Vehicle registration and vehicle details",
          "Availability tracking and transport assignments",
        ],
      },
      {
        title: "Driver Management",
        points: ["Driver profiles", "Driver assignment and operational records"],
      },
      {
        title: "Route Management",
        points: ["Transport routes and stops", "Route-related information for planning"],
      },
      {
        title: "Transport Allocation & Trips",
        points: [
          "Connects students with the appropriate vehicles and routes",
          "Transport assignments and trip status workflows",
        ],
      },
      {
        title: "Web & Mobile API Support",
        points: [
          "Shared RESTful APIs consumed by both the web and mobile frontends",
          "Consistent API responses across platforms",
        ],
      },
      {
        title: "Data Layer",
        points: [
          "Entity Framework Core for querying, inserting and updating data",
          "PostgreSQL for reliable transport records",
        ],
      },
      {
        title: "Quality & Security",
        points: [
          "Input validation on every request",
          "Centralized exception handling",
          "Authentication and authorization based on the configured security model",
        ],
      },
    ],
    role: "Developed the complete backend for both the web and mobile applications using C#, .NET, ASP.NET Core Web API, Entity Framework Core and PostgreSQL. Responsibilities included designing RESTful APIs, implementing business logic, building CRUD functionality for transport records, data validation, authentication and authorization, exception handling, and seamless integration with the web and mobile frontends.",
  },
  {
    slug: "mims",
    image: "/projects/mims.jpg",
    title: "Medicine Inventory Management System",
    short: "MIMS",
    category: "Inventory · Full stack",
    summary:
      "Centralized medicine stock management across multiple offices, replacing manual paperwork with approvals and automatic alerts — built solo, end to end, on ASP.NET Core MVC.",
    highlights: [
      "Built A to Z: models, views, controllers and database",
      "Multi-level approvals and role-based access across offices",
      "Low-stock threshold alerts and stock tracking",
    ],
    tech: ["ASP.NET Core MVC", "C#", "Razor Views", "HTML", "CSS", "JavaScript", "SQL Server"],
    icon: Pill,
    facts: [
      { label: "Domain", value: "Medicine inventory" },
      { label: "Framework", value: "ASP.NET Core MVC" },
      { label: "Database", value: "SQL Server" },
      { label: "Access", value: "Multi-office, role-based" },
      { label: "My scope", value: "Full stack, end to end" },
    ],
    overview:
      "MIMS centralizes medicine inventory across offices. Instead of paper registers, every office records stock in one system, requests and approvals move through defined levels, and the system raises an alert before a medicine runs low — improving data accuracy and cutting manual data entry.",
    workflowTitle: "How the MVC app is built",
    workflow: [
      { title: "Model", text: "C# entities for medicines, stock, offices, users and approvals, with validation rules" },
      { title: "Controller", text: "Handles each request, applies business rules and role checks, then picks the view" },
      { title: "View", text: "Razor pages with HTML, CSS and JavaScript for forms, lists and dashboards" },
      { title: "Database", text: "SQL Server tables, relationships and queries behind every screen" },
      { title: "Security", text: "Login, roles and office-level access on every controller action" },
      { title: "Alerts & reports", text: "Low-stock checks, approval status and stock summaries" },
    ],
    modules: [
      {
        title: "Medicine & Stock Management",
        points: [
          "Add, edit and search medicines with their stock details",
          "Stock in and stock out entries with a full history",
          "Real-time stock availability for each office",
          "Centralized inventory records shared across offices",
        ],
      },
      {
        title: "Multi-level Approvals",
        points: [
          "Stock requests move through defined approval levels",
          "Approve, reject or send back with remarks",
          "Approval status visible at every step",
        ],
      },
      {
        title: "Low-stock Alerts",
        points: [
          "Threshold set per medicine",
          "Automatic notification when stock falls below the threshold",
        ],
      },
      {
        title: "Offices, Users & Roles",
        points: [
          "Multiple offices managed from one system",
          "Role-based access so each user sees only what their role allows",
          "User management for administrators",
        ],
      },
      {
        title: "Dashboards & Reports",
        points: [
          "Stock overview and pending approvals at a glance",
          "Stock summaries by medicine and office",
        ],
      },
      {
        title: "Data Integrity",
        points: [
          "Server-side and client-side validation on every form",
          "Database checks that keep inventory updates consistent",
        ],
      },
    ],
    role: "I built MIMS on my own, from A to Z, on ASP.NET Core MVC — frontend, backend and database. I designed the data model, wrote every controller and view, implemented the business rules for stock, approvals and alerts, and set up authentication and role-based access, turning a paper-based inventory process into a working multi-office system.",
    roleDetails: [
      "Requirements and planning: turned the manual inventory process into screens, rules and data",
      "Database design in SQL Server: tables, relationships and keys for medicines, stock, offices, users and approvals",
      "Models: C# entity and view models with data annotations for validation",
      "Controllers: all actions for CRUD, stock movements, approval steps and reports",
      "Views: Razor views with HTML, CSS and JavaScript — forms, searchable lists, dashboards and layouts",
      "Business logic: stock in/out calculations, approval levels and low-stock threshold checks",
      "Authentication and role-based authorization, with office-level access control",
      "Validation on both client and server, plus friendly error handling",
      "Notifications for low stock and pending approvals",
      "Testing, bug fixing and deployment of the complete application",
    ],
  },
  {
    slug: "authentiko",
    image: "/projects/authentiko.jpg",
    title: "Authentiko",
    short: "Authentiko",
    category: "Files · Payments · Logistics",
    summary:
      "Enterprise platform combining secure document management, bank-related file processing and transport operations.",
    highlights: [
      "Secure document storage on AWS S3",
      "SFTP transfers and reconciliation workflows",
      "Vehicle, driver and shipment tracking",
    ],
    tech: [".NET Core", "Angular", "PostgreSQL", "AWS S3", "SFTP"],
    icon: ShieldCheck,
    facts: [{"label":"Domain","value":"Files · Payments · Logistics"},{"label":"Backend","value":".NET Core"},{"label":"Frontend","value":"Angular"},{"label":"Storage","value":"AWS S3 + SFTP"}],
    overview:
      "Authentiko brings controlled file access, payment-related file processing and end-to-end transport visibility into a single multi-role system.",
    modules: [
      {
        title: "Document Management",
        points: [
          "Secure file upload, storage, retrieval and access control",
          "AWS S3 for scalable document storage",
          "SFTP for secure transfer of files to external systems",
        ],
      },
      {
        title: "Payment Workflow",
        points: ["Bank-related file transfer", "Reconciliation processes"],
      },
      {
        title: "Transport Management",
        points: [
          "Vehicle records and driver assignment",
          "Pickup-to-delivery workflows",
          "Shipment status updates and operations visibility",
        ],
      },
      {
        title: "Platform",
        points: [
          "Multi-role operations based on user access",
          ".NET backend APIs for file, payment and transport workflows",
        ],
      },
    ],
    role: "Backend business logic, API integration and database operations, plus coordination between the file, payment and logistics modules.",
  },
  {
    slug: "ecommerce",
    image: "/projects/ecommerce.jpg",
    title: "E-commerce Platform",
    short: "E-commerce",
    category: "E-commerce",
    summary:
      "Full-featured online store built with ASP.NET Core MVC and optimized database queries.",
    highlights: [
      "Payment gateway integration",
      "Product, user and order management",
      "Faster load times via query optimization",
    ],
    tech: ["ASP.NET Core MVC", "Entity Framework", "Payment Gateway"],
    icon: ShoppingCart,
    facts: [{"label":"Domain","value":"E-commerce"},{"label":"Framework","value":"ASP.NET Core MVC"},{"label":"ORM","value":"Entity Framework"},{"label":"Built at","value":"CS Infotech"}],
    overview:
      "Built during full-stack training at CS Infotech with a focus on performance optimization.",
    modules: [
      {
        title: "Features",
        points: [
          "Product management and user authentication",
          "Order management and payment gateway integration",
          "Optimized queries that reduce load times and server load",
        ],
      },
    ],
    role: "Developed the platform with ASP.NET Core MVC and Entity Framework, implemented authentication and order management, and enhanced MVC views and controllers.",
  },
];
