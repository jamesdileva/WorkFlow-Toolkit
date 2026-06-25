Sprint 2 Objective

Build the foundation entity of the entire application:

Project
    ↓
Datasets
    ↓
Analysis
    ↓
Reports
    ↓
Workflows

Nothing exists without a project.

Sprint 2 Scope

I would intentionally limit Sprint 2 to:

Create Project
View Projects
Delete Project
Select Active Project

That's it.

No imports.

No datasets.

No reports.

No workflows.

Database Design

We already defined a projects table.

For Sprint 2 we only need:

projects

id
name
description
created_at
updated_at

Example:

1 | Payroll Audit 2026
2 | Budget Variance Review
3 | Employee Hours Analysis
Backend Architecture

Request Flow:

React UI
    ↓

projectService.ts
    ↓

FastAPI Route
    ↓

Project Service
    ↓

Project Repository
    ↓

SQLite

Exactly the architecture we documented earlier.

Backend Endpoints

Sprint 2 only needs four endpoints.

Get Projects
GET /api/projects

Returns:

[
  {
    "id": 1,
    "name": "Payroll Audit",
    "description": "June payroll review"
  }
]
Create Project
POST /api/projects

Request:

{
  "name": "Payroll Audit",
  "description": "June payroll review"
}
Delete Project
DELETE /api/projects/{id}
Get Single Project
GET /api/projects/{id}

Useful later.

Backend Files

Sprint 2 introduces:

backend/app/

api/
    projects.py

models/
    project.py

schemas/
    project_schema.py

repositories/
    project_repository.py

services/
    project_service.py

This will become our reference pattern for every future module.

Frontend Architecture

New files:

frontend/src/

services/
    projectService.ts

types/
    Project.ts

pages/
    Projects/
        index.tsx
Project Type
export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
Project Service

Frontend never talks directly to FastAPI.

Everything goes through:

projectService.ts

Example:

getProjects()

createProject()

deleteProject()
UI Design

Projects page becomes:

┌─────────────────────────────────┐
│ Projects                        │
│                                 │
│ [+ New Project]                 │
│                                 │
├─────────────────────────────────┤
│ Payroll Audit                   │
│ June Payroll Review             │
│ [Open] [Delete]                 │
├─────────────────────────────────┤
│ Budget Review                   │
│ Monthly Budget Analysis         │
│ [Open] [Delete]                 │
└─────────────────────────────────┘

Simple.

Professional.

Functional.

Create Project Flow

User clicks:

+ New Project

Modal opens:

Project Name

[____________]

Description

[____________]

[Create]

Submit:

Frontend
    ↓
POST /api/projects
    ↓
SQLite
    ↓
Refresh Project List
Active Project Architecture

This is the important part.

We should add this now.

Create:

frontend/src/context/

ProjectContext.tsx

Stores:

activeProject
setActiveProject

Why?

Because eventually:

Dashboard
Imports
Reports
Workflows

all need to know:

Which project is currently open?

Without this context we'd refactor later.

Delete Behavior

Do NOT physically delete project data yet.

Instead:

Sprint 2
=
Hard Delete

Keep it simple.

Later:

Archive Project

can be added.

Sprint 2 Deliverables

When Sprint 2 finishes:

✅ SQLite Project Table

✅ SQLAlchemy Model

✅ Project Repository

✅ Project Service

✅ FastAPI Endpoints

✅ Project Context

✅ Create Project Modal

✅ Project List

✅ Delete Project

✅ Active Project Selection