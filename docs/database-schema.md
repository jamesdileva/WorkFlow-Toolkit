# Database Schema

## Overview

WorkFlow Toolkit uses SQLite as its local database.

The database is responsible for:

* Project management
* Dataset tracking
* Import history
* Generated reports
* Workflow templates
* Audit logging
* Application settings

The database does **not** store entire spreadsheets. Large datasets remain on disk and are loaded into memory as needed.

---

# Design Principles

## Local First

All data is stored locally.

No cloud infrastructure is required.

## Lightweight

SQLite should remain fast even with thousands of imports and reports.

## Extensible

The schema should support future modules such as:

* Payroll Toolkit
* Budget Analysis
* HR Toolkit
* Inventory Toolkit
* AI Assistant

without requiring major database redesigns.

---

# Entity Relationship Overview

Projects
├── Imports
├── Reports
├── Datasets
├── Notes
└── Audit Logs

Templates
└── Workflow Definitions

Settings
└── Application Configuration

---

# Table: projects

Stores user-created workspaces.

```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Purpose

Allows users to organize work by project.

### Examples

* March Payroll Audit
* Q2 Budget Review
* Employee Roster Analysis

---

# Table: chart_definitions

Stores reusable chart configurations.

Charts are treated as data-driven objects rather than image files.

This table supports:

* Analytics Dashboards
* PDF Reports
* Excel Reports
* Future PowerPoint Reports
* Workflow Templates
* Scheduled Reports

---

## Schema

```sql
CREATE TABLE chart_definitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    project_id INTEGER NOT NULL,

    name TEXT NOT NULL,

    chart_type TEXT NOT NULL,

    configuration_json TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
    REFERENCES projects(id)
);
```

---

## Purpose

Stores chart definitions independently from reports.

A chart can be reused across:

* Dashboards
* Reports
* Templates
* Future Scheduled Workflows

without recreating the chart configuration.

---

## Example Chart Types

```text
Bar Chart
Line Chart
Pie Chart
Area Chart
Trend Chart
KPI Summary
```

---

## Example Record

```json
{
  "name": "Overtime By Department",

  "chart_type": "bar",

  "configuration_json": {
    "x_axis": "department",
    "y_axis": "overtime_hours",
    "sort_descending": true,
    "show_legend": true
  }
}
```

---

## Design Principles

### Store Configuration

Store chart definitions and rendering configuration.

---

### Do Not Store Images

Do not store:

* PNG Files
* JPEG Files
* Dashboard Screenshots

except for optional temporary caching.

---

### Single Source of Truth

The same chart definition should be capable of generating:

* Dashboard Visualizations
* PDF Charts
* Excel Charts
* Future PowerPoint Charts

without modification.

---

## Future Enhancements

Potential future columns:

```text
dataset_id
template_id
created_by
is_shared
is_favorite
```

These are intentionally excluded from Version 1 to keep the schema lightweight.

```
```


# Table: datasets

Stores metadata about imported datasets.

```sql
CREATE TABLE datasets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    file_path TEXT NOT NULL,
    row_count INTEGER,
    column_count INTEGER,
    imported_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
    REFERENCES projects(id)
);
```

## Purpose

Tracks imported files.

### Examples

* payroll_march.xlsx
* employees.csv
* budget_q2.xlsx

---

# Table: dataset_columns

Stores column metadata.

```sql
CREATE TABLE dataset_columns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_id INTEGER,
    column_name TEXT,
    data_type TEXT,

    FOREIGN KEY(dataset_id)
    REFERENCES datasets(id)
);
```

## Purpose

Allows the application to understand file structure.

### Examples

| Column Name  | Type    |
| ------------ | ------- |
| Employee ID  | Integer |
| Name         | Text    |
| Hours Worked | Decimal |

---

# Table: imports

Tracks import activity.

```sql
CREATE TABLE imports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_id INTEGER,
    imported_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT,
    notes TEXT,

    FOREIGN KEY(dataset_id)
    REFERENCES datasets(id)
);
```

## Purpose

Import history and troubleshooting.

---

# Table: reports

Stores generated reports.

```sql
CREATE TABLE reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    report_name TEXT,
    report_type TEXT,
    file_path TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
    REFERENCES projects(id)
);
```

## Report Types

* Audit Report
* Payroll Summary
* Executive Summary
* Trend Analysis
* Variance Report

---

# Table: templates

Stores workflow templates.

```sql
CREATE TABLE templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    version TEXT,
    configuration_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Purpose

Stores reusable automation workflows.

### Examples

* Payroll Audit
* Budget Review
* Employee Roster Audit

---

# Table: audit_logs

Stores application activity.

```sql
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    action TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
    REFERENCES projects(id)
);
```

## Purpose

Tracks important actions.

### Examples

* Dataset Imported
* Report Generated
* Template Executed
* Dataset Deleted

---

# Table: notes

Stores project notes.

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    title TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
    REFERENCES projects(id)
);
```

## Purpose

Allows users to save observations and findings.

---

# Table: settings

Stores application settings.

```sql
CREATE TABLE settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT UNIQUE,
    setting_value TEXT
);
```

## Examples

| Key                 | Value      |
| ------------------- | ---------- |
| theme               | dark       |
| default_export_path | C:/Reports |
| auto_save           | true       |

---

# Table: workflow_runs

Stores execution history for workflow templates.

```sql
CREATE TABLE workflow_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    template_id INTEGER NOT NULL,

    status TEXT NOT NULL,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,

    dataset_id INTEGER,
    output_report_id INTEGER,

    execution_log TEXT,

    FOREIGN KEY(project_id)
    REFERENCES projects(id),

    FOREIGN KEY(template_id)
    REFERENCES templates(id),

    FOREIGN KEY(dataset_id)
    REFERENCES datasets(id),

    FOREIGN KEY(output_report_id)
    REFERENCES reports(id)
);
```

## Purpose

Tracks every workflow execution within the application.

This provides:

* Execution history
* Workflow auditing
* Troubleshooting
* Performance tracking
* Repeatability

---

## Status Values

```text
Pending
Running
Completed
Failed
Cancelled
```

---

## Example

Template:

```text
Payroll Audit
```

Input:

```text
payroll_march.xlsx
```

Workflow Steps:

```text
Validate Dataset
Check Duplicates
Calculate Overtime
Generate Charts
Generate PDF Report
```

Execution Result:

```text
Status: Completed
Duration: 14 Seconds
Output: Payroll_Audit_Report.pdf
```

Stored in:

```text
workflow_runs
```

---

## Future Enhancements

The table is designed to support future functionality without schema changes.

Potential additions:

* Scheduled workflows
* Recurring jobs
* Batch processing
* AI-assisted workflows
* Workflow performance metrics

---

## Example Queries

View workflow history:

```sql
SELECT *
FROM workflow_runs
ORDER BY started_at DESC;
```

View all runs for a project:

```sql
SELECT *
FROM workflow_runs
WHERE project_id = 1;
```

View failed workflow executions:

```sql
SELECT *
FROM workflow_runs
WHERE status = 'Failed';
```


# Future Tables

The following tables are reserved for future expansion.

## payroll_runs

Tracks payroll audits.

## employee_records

Stores normalized employee data.

## budget_analyses

Stores budget review results.

## inventory_audits

Stores inventory variance reports.

## ai_conversations

Stores optional future AI chat history.

---

# Storage Strategy

## Database Stores

* Metadata
* History
* Configurations
* Templates
* Reports

## File System Stores

* CSV Files
* Excel Files
* PDF Reports
* Exported Documents

This keeps the SQLite database small and performant.

---

# Directory Structure

```text
data/

├── database/
│   └── workflow_toolkit.db
│
├── projects/
│   ├── Project_A/
│   ├── Project_B/
│
├── imports/
│   ├── payroll/
│   ├── budgets/
│
├── reports/
│   ├── pdf/
│   ├── excel/
│
└── templates/
```

---

# Version 1 Database Goals

The Version 1 schema must support:

* Project Workspaces
* Dataset Tracking
* Import History
* Report Generation
* Workflow Templates
* Audit Logging

without requiring schema changes during MVP development.
