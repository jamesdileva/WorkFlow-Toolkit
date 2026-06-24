# Project Structure

## Overview

This document defines the official folder structure for WorkFlow Toolkit.

The structure is designed to support:

* Local desktop deployment
* Modular architecture
* Future expansion
* Maintainability
* Professional development practices

All future development should follow this structure.

---

# High-Level Architecture

```text
WorkFlow-Toolkit/

├── frontend/
├── backend/
├── electron/
├── data/
├── docs/
├── scripts/
├── tests/
├── releases/
└── README.md
```

---

# Root Directory

## Purpose

Contains project-level configuration and documentation.

```text
WorkFlow-Toolkit/

├── README.md
├── LICENSE
├── .gitignore
├── package.json
├── requirements.txt
├── tsconfig.json
└── electron-builder.yml
```

---

# Frontend

## Purpose

Contains all React + TypeScript UI code.

```text
frontend/

├── src/
├── public/
└── package.json
```

---

# Frontend Source

```text
frontend/src/

├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── context/
├── types/
├── utils/
├── styles/
├── assets/
├── routes/
└── App.tsx
```

---

# Components

Reusable UI components.

```text
components/

├── DataGrid/
├── KPICard/
├── ChartContainer/
├── Sidebar/
├── Header/
├── SearchBar/
├── LoadingSpinner/
└── ReportViewer/
```

---

# Pages

Application screens.

```text
pages/

├── Dashboard/
├── Projects/
├── ImportHub/
├── DataCleaning/
├── Compare/
├── Payroll/
├── Analytics/
├── Reports/
├── Templates/
└── Settings/
```

---

# Layouts

Application shell layouts.

```text
layouts/

├── MainLayout.tsx
└── AuthLayout.tsx
```

(AuthLayout reserved for future use.)

---

# Services

Frontend API communication.

```text
services/

├── api.ts
├── projectService.ts
├── datasetService.ts
├── reportService.ts
└── workflowService.ts
```

---

# Context

Global application state.

```text
context/

├── ProjectContext.tsx
├── SettingsContext.tsx
└── ThemeContext.tsx
```

---

# Types

Shared TypeScript interfaces.

```text
types/

├── Project.ts
├── Dataset.ts
├── Report.ts
├── Workflow.ts
└── Chart.ts
```

---

# Backend

## Purpose

Contains business logic and data processing.

```text
backend/

├── app/
├── migrations/
├── requirements.txt
└── workflow_toolkit.db
```

---

# Backend Application

```text
backend/app/

├── api/
├── core/
├── database/
├── models/
├── schemas/
├── repositories/
├── services/
├── workflow/
├── reporting/
├── analytics/
└── main.py
```

---

# API Layer

FastAPI routes.

```text
api/

├── projects.py
├── datasets.py
├── reports.py
├── workflows.py
└── settings.py
```

---

# Core

Application-wide configuration.

```text
core/

├── config.py
├── logging.py
└── constants.py
```

---

# Database

Database setup and sessions.

```text
database/

├── database.py
├── session.py
└── migrations.py
```

---

# Models

SQLAlchemy models.

```text
models/

├── project.py
├── dataset.py
├── report.py
├── template.py
├── workflow_run.py
└── chart_definition.py
```

---

# Schemas

Pydantic schemas.

```text
schemas/

├── project_schema.py
├── dataset_schema.py
├── report_schema.py
└── workflow_schema.py
```

---

# Repositories

Database access layer.

```text
repositories/

├── project_repository.py
├── dataset_repository.py
├── report_repository.py
└── workflow_repository.py
```

---

# Services

Business logic layer.

```text
services/

├── project_service.py
├── dataset_service.py
├── cleaning_service.py
├── comparison_service.py
├── payroll_service.py
├── analytics_service.py
└── report_service.py
```

---

# Workflow Engine

Core automation architecture.

```text
workflow/

├── action_registry.py
├── execution_engine.py
├── workflow_context.py
├── workflow_executor.py
└── templates/
```

---

# Workflow Templates

Built-in templates.

```text
workflow/templates/

├── payroll_audit.json
├── data_quality_review.json
└── dataset_comparison.json
```

---

# Reporting Engine

```text
reporting/

├── report_builder.py
├── report_renderer.py
├── pdf_renderer.py
├── excel_renderer.py
└── csv_renderer.py
```

---

# Analytics

Charting architecture.

```text
analytics/

├── chart_builder.py
├── chart_renderer.py
├── chart_definitions.py
└── kpi_generator.py
```

---

# Electron

## Purpose

Desktop application shell.

```text
electron/

├── main.ts
├── preload.ts
└── menu.ts
```

---

# Data Directory

## Purpose

User-generated local files.

Not committed to Git.

```text
data/

├── database/
├── imports/
├── reports/
├── projects/
└── templates/
```

---

# Imports

```text
imports/

├── payroll/
├── analytics/
└── comparisons/
```

---

# Reports

```text
reports/

├── pdf/
├── excel/
└── csv/
```

---

# Projects

```text
projects/

├── Project_A/
├── Project_B/
└── Project_C/
```

---

# Documentation

```text
docs/

├── architecture.md
├── database-schema.md
├── module-specifications.md
├── template-engine.md
├── report-engine.md
├── ui-wireframes.md
├── sprint-plan.md
├── tech-stack.md
└── project-structure.md
```

---

# Scripts

Developer utilities.

```text
scripts/

├── build.bat
├── run_frontend.bat
├── run_backend.bat
└── package_release.bat
```

---

# Tests

```text
tests/

├── frontend/
├── backend/
├── workflows/
└── reports/
```

---

# Release Artifacts

Generated application packages.

```text
releases/

├── installers/
├── portable/
└── changelogs/
```

---

# Dependency Flow

```text
Frontend
     │
     ▼

FastAPI API
     │
     ▼

Services
     │
     ▼

Repositories
     │
     ▼

SQLite
```

---

# Workflow Dependency Flow

```text
Template
     │
     ▼

Action Registry
     │
     ▼

Execution Engine
     │
     ▼

Services
     │
     ▼

Report Engine
```

---

# Architecture Rules

## Rule 1

Pages never access the database directly.

---

## Rule 2

Services contain business logic.

---

## Rule 3

Repositories contain database logic.

---

## Rule 4

Templates execute only through the Action Registry.

---

## Rule 5

Modules never generate reports directly.

All reports must pass through the Report Engine.

---

## Rule 6

Charts are generated from chart definitions.

Never from screenshots.

---

# MVP Development Order

1. Electron Shell
2. React Layout
3. Database Setup
4. Project Management
5. Import Hub
6. Data Cleaning
7. Compare Engine
8. Payroll Toolkit
9. Analytics Dashboard
10. Report Engine
11. Template Engine

This order follows all architectural dependencies and minimizes rework during development.
