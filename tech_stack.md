# 🛠️ Tech Stack Document – Onboarding System

This document describes the technologies chosen for the **Onboarding System**, explaining their purpose and how they will be used in the project. The goal is to ensure alignment across the team and provide a clear reference for development.

---

## 1. Frontend

- **Framework**: [Next.js](https://nextjs.org/)  
  Used for building the frontend application with React. Provides server-side rendering, static generation, and powerful routing features.  

- **Language**: TypeScript  
  Adds static typing to JavaScript, improving maintainability and reducing runtime errors.  

- **UI / Components**:  
  - [shadcn/ui](https://ui.shadcn.com/) → Prebuilt components styled with Tailwind and powered by Radix UI.  
  - [Radix UI](https://www.radix-ui.com/) → Accessible headless UI primitives.  
  - [Tailwind CSS](https://tailwindcss.com/) → Utility-first CSS framework for styling.  

- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)  
  Lightweight and scalable state management for React.  

- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)  
  Simplifies form handling and ensures data validation with strong typing.  

- **Icons**: [Lucide React](https://lucide.dev/)  
  Icon library for modern React projects.  

- **Charts (optional)**: [Recharts](https://recharts.org/)  
  Used for dashboards and data visualization.  

---

## 2. Backend

- **Framework**: [NestJS](https://nestjs.com/)  
  Node.js framework with TypeScript support, structured for scalability and testability.  

- **Architecture**: Hexagonal (Ports & Adapters)  
  This architecture isolates the **business logic (Domain)** from external technologies.  
  - Domain Layer → Entities, business rules, and use cases.  
  - Application Layer → Ports (interfaces) and services.  
  - Infrastructure Layer → Adapters for database, APIs, and external services.  
  - Interface Layer → REST controllers for client communication.  

  ✅ **Advantages**:  
  - Decouples business logic from frameworks and databases.  
  - Easier testing (domain can be tested without infrastructure).  
  - Allows replacing tools (e.g., Prisma → TypeORM) without changing core rules.  
  - Facilitates long-term scalability and maintenance.  

- **ORM**: [Prisma](https://www.prisma.io/)  
  Modern TypeScript ORM with strong typing, reliable migrations, and an excellent developer experience.  

- **Database**: PostgreSQL  
  Relational database chosen for reliability, scalability, Prisma support and license (MIT).  

- **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth)  
  Handles user authentication and session management. The frontend integrates directly with Firebase (email/password, OAuth providers

  ✅ **Advantages**:  
  - Ready-to-use authentication with multiple providers (Google, GitHub, etc.).  
  - Secure token-based system without custom implementation.  
  - Scales automatically with Firebase infrastructure.  


- **Validation**: Class-validator / Zod  
  Ensures incoming requests are validated against defined schemas.  

- **API Documentation**: Swagger (`@nestjs/swagger`)  
  Auto-generates REST API documentation for developers.  

- **Testing**: Jest  
  Framework for unit, integration, and end-to-end testing.  

---

## 3. Infrastructure & DevOps

- **Hosting**:  GCP Cloud Run
- **Database Hosting**: Supabase / Railway (PostgreSQL as a managed service).  
- **Version Control**: Git + BitBucket  
  For source code versioning and collaboration.  
- **Containerization**: GCP Artifact Registry
- **Monitoring and Observability**: GCP Cloud Monitoring and GCP Cloud Logging
- **IaaS** Terraform
---

## 4. Quality

- **Linting**: ESLint  
  Ensures code quality and consistent standards.  

- **Formatting**: Prettier  
  Automatic code formatting for readability and consistency.  

- **Unit Testing**: Jest  
  Verifies correctness of small, isolated parts of the application.  

- **E2E Testing**: Supertest or Pactum  
  Ensures API endpoints and integrations work correctly.  

- **SAST (Static Application Security Testing)**: SonarQube  
  Analyzes source code to detect security vulnerabilities, bugs, and code smells before deployment.  

- **SCA (Software Composition Analysis)**: SonarQube  
  Identifies and manages risks in third-party dependencies, such as known vulnerabilities or outdated libraries.  

- **Docker Image Security Scan**: Docker Scout  
  Scans container images for vulnerabilities, outdated packages, and misconfigurations to ensure secure deployments.  






📌 This document should be updated as the stack evolves to keep the entire team aligned.
