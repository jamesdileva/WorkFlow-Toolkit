# WorkFlow Toolkit

A local-first desktop application for workplace automation, data analysis, payroll auditing, reporting, and workflow execution.

WorkFlow Toolkit is designed to help analysts, finance teams, payroll specialists, HR professionals, operations staff, and administrative teams automate common workplace processes without relying on cloud services, subscriptions, or external APIs.

---

## Key Features

### Data Management

* Import CSV, Excel, JSON, and text files
* Dataset preview and validation
* Project-based organization

### Data Quality

* Duplicate detection
* Missing value analysis
* Data quality scoring
* Dataset standardization

### Dataset Comparison

* Added record detection
* Removed record detection
* Changed record analysis
* Variance reporting

### Payroll Toolkit

* Employee validation
* Hours validation
* Overtime analysis
* Payroll auditing

### Analytics

* KPI generation
* Interactive dashboards
* Reusable chart definitions
* Business reporting

### Reporting

* PDF exports
* Excel exports
* CSV exports
* Report history

### Workflow Automation

* Workflow templates
* Action Registry architecture
* Execution Engine
* Workflow history

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite

### Desktop

* Electron

### Backend

* Python
* FastAPI

### Database

* SQLite
* SQLAlchemy
* Alembic

### Data Processing

* Pandas
* openpyxl

### Reporting

* ReportLab
* openpyxl

---

## Project Philosophy

WorkFlow Toolkit follows a local-first architecture.

The application must:

* Run completely offline
* Store data locally
* Generate reports locally
* Execute workflows locally
* Require no subscriptions
* Require no cloud infrastructure

Optional AI capabilities may be added in future versions but are not required for core functionality.

---

## Documentation

Project documentation is located in the `/docs` directory.

### Architecture

* architecture.md
* database-schema.md
* project-structure.md

### Development

* development-setup.md
* sprint-plan.md
* tech-stack.md

### Application Design

* module-specifications.md
* template-engine.md
* report-engine.md
* ui-wireframes.md

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Run Development Environment

Frontend:

```bash
npm run dev
```

Backend:

```bash
uvicorn app.main:app --reload
```

Electron:

```bash
npm run electron
```

For complete setup instructions, see:

```text
docs/development-setup.md
```

---

## MVP Roadmap

Version 1 includes:

* Project Management
* Import Hub
* Data Cleaning Engine
* Dataset Comparison Engine
* Payroll Toolkit
* Analytics Dashboard
* Report Engine
* Template Engine

---

## Repository Structure

```text
frontend/
backend/
electron/
data/
docs/
scripts/
tests/
releases/
```

For detailed architecture information, see:

```text
docs/project-structure.md
```

---

## License

MIT License

---

## Status

Current Phase:

```text
Planning & Architecture
```

Next Milestone:

```text
Sprint 1 - Foundation & Application Shell
```
