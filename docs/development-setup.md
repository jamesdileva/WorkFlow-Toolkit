# Development Setup

## Overview

This document explains how to set up, run, build, and package WorkFlow Toolkit for development.

The goal is to allow a new developer to clone the repository and begin development with minimal configuration.

---

# Prerequisites

Install the following software before starting.

---

## Git

Required for source control.

Verify installation:

```bash
git --version
```

Expected output:

```text
git version x.x.x
```

---

## Node.js

Required for:

* React
* Vite
* Electron

Recommended Version:

```text
Node.js 22 LTS
```

Verify installation:

```bash
node --version
npm --version
```

---

## Python

Required for:

* FastAPI
* Data Processing
* Reporting
* Workflow Engine

Recommended Version:

```text
Python 3.12+
```

Verify installation:

```bash
python --version
```

---

## Visual Studio Code

Recommended IDE.

Suggested Extensions:

* Python
* Pylance
* ESLint
* Prettier
* GitLens
* SQLite Viewer

---

# Clone Repository

```bash
git clone <repository-url>
```

```bash
cd WorkFlow-Toolkit
```

---

# Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start development server.

```bash
npm run dev
```

Default URL:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to backend.

```bash
cd backend
```

Create virtual environment.

Windows:

```bash
python -m venv venv
```

Activate virtual environment.

```bash
venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start FastAPI server.

```bash
uvicorn app.main:app --reload
```

Default URL:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

# Electron Setup

Navigate to project root.

Install Electron dependencies.

```bash
npm install
```

Run Electron.

```bash
npm run electron
```

---

# Recommended Development Workflow

Open three terminals.

---

## Terminal 1

Frontend

```bash
cd frontend

npm run dev
```

---

## Terminal 2

Backend

```bash
cd backend

venv\Scripts\activate

uvicorn app.main:app --reload
```

---

## Terminal 3

Electron

```bash
npm run electron
```

---

# Database Initialization

The application automatically creates the SQLite database on first launch.

Database location:

```text
data/database/workflow_toolkit.db
```

---

# Database Migrations

Create migration:

```bash
alembic revision --autogenerate -m "description"
```

Apply migration:

```bash
alembic upgrade head
```

View current migration:

```bash
alembic current
```

---

# Folder Creation

Create required runtime folders.

```text
data/

├── database/
├── imports/
├── reports/
├── projects/
└── templates/
```

The application will automatically create missing directories during startup.

---

# Build Commands

## Frontend Production Build

```bash
cd frontend

npm run build
```

---

## Backend Validation

```bash
pytest
```

---

## Package Desktop Application

```bash
npm run package
```

Generated files:

```text
releases/

├── installers/
└── portable/
```

---

# Testing

## Frontend Tests

```bash
npm run test
```

---

## Backend Tests

```bash
pytest
```

---

## Run All Tests

```bash
npm run test:all
```

---

# Development Standards

## Frontend

Use:

```text
TypeScript
React
Functional Components
```

Avoid:

```text
Class Components
Inline Styling
Large Global State Objects
```

---

## Backend

Use:

```text
FastAPI
Services
Repositories
SQLAlchemy
```

Avoid:

```text
Direct Database Access From Routes
Business Logic Inside Routes
```

---

## Database

Use:

```text
SQLAlchemy Models
Alembic Migrations
Repository Pattern
```

Avoid:

```text
Raw SQL In UI Components
Direct SQLite Access
```

---

# Logging

Application logs:

```text
data/logs/
```

Examples:

```text
application.log

workflow.log

error.log
```

---

# Troubleshooting

## Port Already In Use

Frontend:

```text
5173
```

Backend:

```text
8000
```

Stop existing processes or change port configuration.

---

## Missing Python Packages

Reinstall dependencies.

```bash
pip install -r requirements.txt
```

---

## Missing Node Modules

Reinstall packages.

```bash
npm install
```

---

## Database Issues

Delete local development database.

```text
data/database/workflow_toolkit.db
```

Restart application.

The database will be recreated automatically.

---

# Release Process

## Step 1

Run tests.

```bash
npm run test:all
```

---

## Step 2

Build frontend.

```bash
npm run build
```

---

## Step 3

Package application.

```bash
npm run package
```

---

## Step 4

Verify installer.

Install and test locally.

---

## Step 5

Create GitHub release.

Include:

* Installer
* Portable Build
* Changelog

---

# First Development Milestone

After setup is complete, Sprint 1 should achieve:

* Electron launches
* React loads
* FastAPI responds
* SQLite initializes
* Dashboard renders
* Navigation functions

Once these are working, the application foundation is complete and feature development can begin.

---

# Quick Start Checklist

```text
□ Install Git

□ Install Node.js

□ Install Python

□ Clone Repository

□ Install Frontend Dependencies

□ Create Python Virtual Environment

□ Install Backend Dependencies

□ Start FastAPI

□ Start React

□ Start Electron

□ Verify Dashboard Loads
```

Following this checklist should allow a developer to begin contributing to WorkFlow Toolkit in less than 30 minutes.
