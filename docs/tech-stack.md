# Technology Stack

## Overview

WorkFlow Toolkit is a local-first desktop application designed for workplace automation, data analysis, payroll auditing, reporting, and workflow execution.

The technology stack prioritizes:

* Simplicity
* Maintainability
* Performance
* Offline operation
* Professional desktop application development

The project avoids unnecessary complexity and external services.

---

# Architecture Overview

```text
Electron
    │

React + Typescript Frontend
    │

Python + FastAPI Backend
    │

SQLite + SQLAlchemy Database
```

---

# Frontend

## Framework

```text
React + typescript
```

Purpose:

* Component-based UI
* Large ecosystem
* Strong developer experience

---

## Build Tool

```text
Vite
```

Purpose:

* Fast development
* Fast builds
* Modern tooling

---

## Language

```text
Typescript
```

Version 1 uses Typescript.

Future migration to TypeScript is optional.

---

## Routing

```text
React Router
```

Purpose:

* Module navigation
* Screen routing

---

## State Management

```text
React Context API
```

Purpose:

* Global application state
* Active project state
* User settings

---

## UI Components

Custom components.

No large UI framework.

Avoid:

```text
Material UI
Bootstrap
Ant Design
```

Reason:

* Larger bundle size
* Reduced flexibility
* Less desktop-like appearance

---

## Styling

```text
CSS Modules
```

Purpose:

* Scoped styles
* Easy maintenance
* Predictable behavior

---

# Desktop Layer

## Framework

```text
Electron
```

Purpose:

* Cross-platform desktop support
* Local filesystem access
* Native desktop experience

---

## Responsibilities

Electron manages:

* Application window
* Native menus
* File dialogs
* Application lifecycle

Electron does not contain business logic.

---

# Backend

## Framework

```text
FastAPI
```

Purpose:

* High performance
* Simple API architecture
* Strong Python ecosystem

---

## Language

```text
Python 3.12+
```

Purpose:

* Data analysis
* Reporting
* Workflow execution

---

## API Style

```text
REST
```

Purpose:

Simple communication between frontend and backend.

---

# Database

## Database Engine

```text
SQLite
```

Purpose:

* Local-first architecture
* Zero server requirements
* Simple deployment

---

## ORM

```text
SQLAlchemy
```

Purpose:

* Database abstraction
* Cleaner queries
* Easier maintenance

---

## Migration Tool

```text
Alembic
```

Purpose:

* Database version control
* Schema migrations

---

# Data Processing

## Library

```text
Pandas
```

Purpose:

* Dataset management
* Analysis
* Cleaning
* Comparisons

---

## File Processing

Supported formats:

```text
CSV
XLSX
JSON
TXT
```

---

## Excel Support

```text
openpyxl
```

Purpose:

* Excel import
* Excel export

---

# Analytics

## Chart Library

```text
Chart.js
```

Purpose:

* Dashboard visualization
* KPI charts
* Trend analysis

---

## Chart Architecture

Charts are stored as:

```text
Chart Definitions
```

Not screenshots.

Charts are regenerated during report creation.

---

# Reporting

## PDF Generation

```text
ReportLab
```

Purpose:

* Professional PDF reports
* Structured layouts
* Consistent formatting

---

## Excel Export

```text
openpyxl
```

Purpose:

* Detailed workbook exports

---

## CSV Export

```text
Pandas
```

Purpose:

* Raw data exports

---

# Workflow Engine

## Core Components

```text
Action Registry
Execution Engine
Workflow Context
```

Purpose:

* Template execution
* Automation
* Workflow logging

---

# Logging

## Standard Library

```text
logging
```

Purpose:

* Application logs
* Error tracking
* Debugging

---

# Testing

## Frontend

```text
Vitest + typescript
```

Purpose:

* Component testing
* Utility testing

---

## Backend

```text
Pytest
```

Purpose:

* Service testing
* Workflow testing
* Report testing

---

# Packaging

## Desktop Packaging

```text
electron-builder
```

Purpose:

* Windows installers
* Portable builds
* Application releases

---

# Version Control

## Source Control

```text
Git
```

---

## Repository Hosting

```text
GitHub
```

Purpose:

* Source management
* Releases
* Portfolio presentation

---

# Future Technologies

These are intentionally excluded from Version 1.

```text
Docker
Redis
PostgreSQL
Cloud Infrastructure
AWS
Azure
OpenAI APIs
Local LLMs
WebSockets
Microservices
```

Reason:

Version 1 is a local desktop application.

---

# Optional Future Enhancements

## Local AI

Potential future support:

```text
Ollama
Llama
Gemma
Qwen
```

Use Cases:

* Data explanations
* Report summaries
* Workflow recommendations

Not required for MVP.

---

# Technology Decisions

## Chosen

```text
React
Typescript
Vite
Electron
FastAPI
Python
SQLite
SQLAlchemy
Alembic
Pandas
Chart.js
ReportLab
openpyxl
Pytest
Vitest
electron-builder
GitHub
```

---

## Avoided

```text
Cloud Services
Subscriptions
External APIs
Large UI Frameworks
Microservices
Complex Infrastructure
```

---

# MVP Philosophy

The application must be able to:

* Install locally
* Operate completely offline
* Store data locally
* Generate reports locally
* Execute workflows locally

without requiring internet access, subscriptions, cloud services, or AI.

This philosophy guides all technical decisions throughout the project.
