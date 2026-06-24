# Report Engine

## Overview

The Report Engine is responsible for transforming workflow results into professional, exportable reports.

The Report Engine serves as the central reporting layer for the entire application.

All modules and workflows generate structured report data that is passed to the Report Engine for rendering and export.

---

# Purpose

Provide a standardized reporting system for:

* Data Quality Analysis
* Dataset Comparisons
* Payroll Audits
* Analytics Dashboards
* Workflow Results
* Future Modules

The Report Engine ensures all reports share a consistent structure and appearance.

---

# Core Design Principles

## Standardized

Every report follows the same structure.

---

## Module Independent

Modules generate report data.

Modules do not generate files.

---

## Reusable

Any module can create reports using the same engine.

---

## Extensible

New export formats can be added without changing module logic.

---

# Architecture

```text
Module
   ↓

Workflow Context
   ↓

Report Object
   ↓

Report Engine
   ↓

PDF / Excel / CSV
```

---
# Chart Rendering Architecture

## Overview

Charts must never be exported as screenshots.

The Report Engine generates charts directly from stored chart definitions and source data.

This approach ensures:

* Consistent report quality
* Resolution-independent exports
* Theme independence
* Reduced storage requirements
* Future export compatibility

---

# Architecture

```text
Dataset
    │
    ▼

Chart Definition
    │
    ▼

Renderer
    │
    ▼

Output
```

---

# Design Principles

## Charts Are Data

Charts are not image files.

Charts are generated from structured data and configuration.

The application stores:

* Chart Type
* Chart Configuration
* Source Dataset
* Aggregated Data

The application does not store screenshots of dashboard charts.

---

## Single Source of Truth

A chart should be defined once and rendered anywhere.

The same chart definition should be capable of producing:

* Dashboard Charts
* PDF Charts
* Excel Charts
* Future PowerPoint Charts

without modification.

---

# Chart Definition Object

```python
class ChartDefinition:

    chart_type: str

    title: str

    x_axis: str

    y_axis: str

    dataset_id: int

    configuration: dict
```

---

# Example Chart Definition

```python
{
    "chart_type": "bar",

    "title": "Overtime By Department",

    "x_axis": "department",

    "y_axis": "overtime_hours",

    "configuration": {
        "show_legend": True,
        "sort_descending": True
    }
}
```

---

# Dashboard Rendering Flow

The Analytics Dashboard uses the chart definition to generate visualizations.

```text
Dataset
    │
    ▼

Chart Definition
    │
    ▼

Dashboard Renderer
    │
    ▼

Visible Dashboard Chart
```

---

# Report Rendering Flow

The Report Engine uses the same chart definition to generate charts for exported reports.

```text
Dataset
    │
    ▼

Chart Definition
    │
    ▼

PDF Renderer
    │
    ▼

Report Chart
```

---

# Benefits

## Consistency

Dashboard charts and exported report charts always match.

---

## Higher Quality Reports

Charts are rendered at export resolution.

No screenshots are required.

No image scaling issues occur.

---

## Smaller Storage Requirements

Store chart definitions rather than image files.

This reduces application storage needs.

---

## Improved Maintainability

Chart rendering logic exists in a single location.

Changes to chart behavior automatically benefit:

* Dashboards
* Reports
* Future Export Formats

---

## Future Compatibility

The same chart definition can support:

* PDF Reports
* Excel Reports
* PowerPoint Reports
* Scheduled Reports
* Automated Workflows

without redesigning the reporting system.

---

# Chart Storage Strategy

The application stores:

* Chart Name
* Chart Type
* Dataset Reference
* Configuration Settings
* Aggregation Rules

The application does not store:

* Dashboard Screenshots
* PNG Exports
* JPEG Exports

except for optional caching purposes.

---

# Future Database Support

A dedicated chart_definitions table may be used to persist reusable chart configurations.

Example structure:

```sql
CREATE TABLE chart_definitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    project_id INTEGER,

    name TEXT,

    chart_type TEXT,

    configuration_json TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
    REFERENCES projects(id)
);
```

---

# Summary

WorkFlow Toolkit treats charts as reusable data-driven objects rather than images.

This architecture provides:

* Consistent visualizations
* High-quality exports
* Reduced storage requirements
* Easier maintenance
* Future extensibility

and establishes a single charting system that can be reused throughout the entire application.


# Report Lifecycle

```text
Analysis Complete
        ↓

Build Report Object
        ↓

Validate Report Object
        ↓

Render Report
        ↓

Export File
        ↓

Store Report Metadata
```

---

# Standard Report Object

All reports must follow a common structure.

```python
class Report:

    title: str

    report_type: str

    generated_at: datetime

    summary: str

    findings: list

    charts: list

    tables: list

    recommendations: list

    metadata: dict
```

---

# Example Report Object

```python
{
    "title": "Payroll Audit Report",

    "report_type": "Payroll",

    "summary":
        "Payroll audit completed successfully.",

    "findings": [

        "12 duplicate employee IDs",

        "4 employees exceeded overtime threshold"
    ],

    "charts": [

        overtime_chart
    ],

    "tables": [

        overtime_table
    ],

    "recommendations": [

        "Review duplicate employee records"
    ]
}
```

---

# Report Sections

## Cover Page

Displays:

* Report Title
* Project Name
* Date Generated

---

## Executive Summary

Provides a high-level overview of results.

---

## Key Findings

Lists important observations.

Example:

```text
12 Duplicate Employee IDs

4 Missing Employee IDs

8 Employees Exceeded Overtime Threshold
```

---

## Visualizations

Charts generated by:

* Analytics Module
* Payroll Toolkit
* Future Modules

---

## Data Tables

Detailed tabular results.

---

## Recommendations

Suggested next actions.

---

## Appendix

Optional detailed supporting data.

---

# Report Types

## Data Quality Report

Generated by:

Data Cleaning Engine

Contains:

* Quality Score
* Duplicate Analysis
* Missing Data Analysis

---

## Dataset Comparison Report

Generated by:

File Compare Engine

Contains:

* Added Records
* Removed Records
* Changed Records

---

## Payroll Audit Report

Generated by:

Payroll Toolkit

Contains:

* Employee Validation
* Overtime Analysis
* Payroll Exceptions

---

## Analytics Report

Generated by:

Analytics Dashboard

Contains:

* KPI Summary
* Charts
* Trends

---

## Workflow Execution Report

Generated by:

Template Engine

Contains:

* Workflow Steps
* Execution Status
* Generated Outputs

---

# Export Formats

## PDF

Primary reporting format.

Purpose:

Professional sharing and archiving.

Library:

```python
reportlab
```

---

## Excel

Purpose:

Detailed data review.

Library:

```python
openpyxl
xlsxwriter
```

---

## CSV

Purpose:

Raw data exports.

Library:

```python
pandas
```

---

# Report Builder

The Report Builder assembles report objects.

---

## Example

```python
report = Report()

report.title = "Payroll Audit"

report.summary = summary

report.findings = findings

report.tables = tables

report.charts = charts
```

The completed report object is passed to the export engine.

---

# Report Renderer

The renderer converts report objects into exportable formats.

---

## PDF Renderer

```python
render_pdf(report)
```

Output:

```text
Payroll_Audit_Report.pdf
```

---

## Excel Renderer

```python
render_excel(report)
```

Output:

```text
Payroll_Audit_Report.xlsx
```

---

## CSV Renderer

```python
render_csv(report)
```

Output:

```text
Payroll_Audit_Data.csv
```

---

# Report Storage

Generated reports are saved to:

```text
data/

└── reports/

    ├── pdf/

    ├── excel/

    └── csv/
```

Metadata is stored in:

```text
reports
```

database table.

---

# Report Metadata

Stored fields:

```text
Report Name

Report Type

Project ID

Generation Date

File Path

Export Format
```

---

# Future Enhancements

## PowerPoint Export

Export executive presentations.

---

## Branded Reports

Company logos.

Custom themes.

Custom footers.

---

## Interactive Reports

Embedded dashboard elements.

Filterable sections.

---

## Scheduled Reports

Automatically generated reports from workflow schedules.

---

# Error Handling

Report generation failures must return:

```python
{
    "success": False,
    "message": "PDF Generation Failed",
    "error": "Missing Chart Data"
}
```

Successful generations return:

```python
{
    "success": True,
    "report_path":
        "reports/pdf/payroll_audit.pdf"
}
```

---

# Report Engine Responsibilities

The Report Engine is responsible for:

* Report Validation
* Report Rendering
* Export Generation
* File Storage
* Metadata Tracking

The Report Engine is not responsible for:

* Data Analysis
* Data Cleaning
* Dataset Comparison
* Payroll Calculations

Those responsibilities belong to their respective modules.

---

# MVP Goals

Version 1 must support:

* Standard Report Object
* PDF Export
* Excel Export
* CSV Export
* Report Storage
* Report History

without requiring cloud services or AI.

All application modules must use the Report Engine as the single reporting pathway.
