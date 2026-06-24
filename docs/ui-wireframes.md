# UI Wireframes

## Overview

The WorkFlow Toolkit user interface is designed around productivity and data analysis.

The application prioritizes:

* Information density
* Workflow efficiency
* Discoverability
* Consistency
* Professional desktop application standards

The UI should resemble analyst and business software rather than consumer applications.

---

# Design Principles

## Local Desktop First

The application should feel like a desktop productivity tool.

Not a web application wrapped in Electron.

---

## Information Rich

Display meaningful information without excessive whitespace.

Users should be able to see:

* Projects
* Datasets
* Reports
* Activity

without excessive navigation.

---

## Consistent Navigation

Every module should be reachable within one or two clicks.

---

## Dark Theme Default

Primary theme:

Dark Mode

Secondary theme:

Light Mode

---

# Application Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ WorkFlow Toolkit                              Search   User │
├──────────────┬───────────────────────────────────────────────┤
│              │                                               │
│ Navigation   │                                               │
│              │                                               │
│ Dashboard    │                                               │
│ Projects     │                                               │
│ Import Hub   │                                               │
│ Data Cleaning│             Main Content Area                │
│ Compare      │                                               │
│ Payroll      │                                               │
│ Analytics    │                                               │
│ Reports      │                                               │
│ Templates    │                                               │
│ Settings     │                                               │
│              │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

---

# Main Navigation

## Dashboard

Application home screen.

---

## Projects

Workspace management.

---

## Import Hub

Dataset import and preview.

---

## Data Cleaning

Data quality analysis.

---

## Compare

Dataset comparison.

---

## Payroll

Payroll auditing tools.

---

## Analytics

Dashboard and chart generation.

---

## Reports

Generated report center.

---

## Templates

Workflow automation.

---

## Settings

Application configuration.

---

# Dashboard Screen

## Purpose

Provide a high-level overview of recent activity.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Dashboard                                   │
├─────────────────────────────────────────────┤

┌───────────┐ ┌───────────┐ ┌───────────┐
│ Projects  │ │ Datasets  │ │ Reports   │
└───────────┘ └───────────┘ └───────────┘

┌─────────────────────────────────────────────┐
│ Recent Projects                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Recent Activity                             │
└─────────────────────────────────────────────┘
```

---

# Project Workspace

## Purpose

Central location for project assets.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ March Payroll Audit                         │
├─────────────────────────────────────────────┤

Datasets

Reports

Notes

Workflow Runs

Activity Log
```

---

## Project Tabs

* Overview
* Datasets
* Reports
* Notes
* Workflow History

---

# Import Hub

## Purpose

Import external data.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Import Dataset                              │
├─────────────────────────────────────────────┤

[ Drag Files Here ]

[ Browse Files ]

──────────────────────────────────────────────

Dataset Preview

┌───────────────────────────────────────────┐
│ Employee ID │ Name │ Hours │ Rate         │
└───────────────────────────────────────────┘
```

---

# Data Cleaning Screen

## Purpose

Analyze and improve dataset quality.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Data Quality Dashboard                      │
├─────────────────────────────────────────────┤

Quality Score: 92%

Duplicates: 12

Missing Values: 4

──────────────────────────────────────────────

Issues Grid

┌───────────────────────────────────────────┐
│ Type │ Column │ Issue │ Action            │
└───────────────────────────────────────────┘
```

---

# Compare Screen

## Purpose

Compare two datasets.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Dataset Comparison                          │
├─────────────────────────────────────────────┤

Dataset A: [ Dropdown ]

Dataset B: [ Dropdown ]

Key Column: [ Dropdown ]

[ Compare ]

──────────────────────────────────────────────

Results

Added Records

Removed Records

Changed Records
```

---

# Payroll Screen

## Purpose

Payroll auditing and validation.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Payroll Audit                               │
├─────────────────────────────────────────────┤

Employees: 842

Warnings: 6

Errors: 2

──────────────────────────────────────────────

Findings Grid

┌───────────────────────────────────────────┐
│ Employee │ Issue │ Severity               │
└───────────────────────────────────────────┘
```

---

# Analytics Dashboard

## Purpose

Create visualizations and KPI summaries.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Analytics Dashboard                         │
├─────────────────────────────────────────────┤

KPI Cards

┌─────────┐ ┌─────────┐ ┌─────────┐
│ Total   │ │ Avg     │ │ Count   │
└─────────┘ └─────────┘ └─────────┘

──────────────────────────────────────────────

Chart Area

┌───────────────────────────────────────────┐
│                                           │
│                 Chart                     │
│                                           │
└───────────────────────────────────────────┘
```

---

# Reports Center

## Purpose

Manage generated reports.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Reports                                     │
├─────────────────────────────────────────────┤

Search Reports

──────────────────────────────────────────────

┌───────────────────────────────────────────┐
│ Name │ Type │ Date │ Export               │
└───────────────────────────────────────────┘
```

---

# Template Library

## Purpose

Execute workflow templates.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Template Library                            │
├─────────────────────────────────────────────┤

Search Templates

──────────────────────────────────────────────

Payroll Audit

Data Quality Review

Dataset Comparison

──────────────────────────────────────────────

[ Run Template ]
```

---

# Workflow History

## Purpose

Track template executions.

---

## Layout

```text
┌─────────────────────────────────────────────┐
│ Workflow History                            │
├─────────────────────────────────────────────┤

┌───────────────────────────────────────────┐
│ Template │ Status │ Runtime │ Date        │
└───────────────────────────────────────────┘
```

---

# Global Search

Future enhancement.

Search across:

* Projects
* Datasets
* Reports
* Templates

from a single search bar.

---

# MVP Screen List

Version 1 includes:

1. Dashboard
2. Projects
3. Import Hub
4. Data Cleaning
5. Compare
6. Payroll
7. Analytics
8. Reports
9. Templates
10. Settings

These screens provide complete coverage for all MVP functionality while maintaining a professional analyst-focused user experience.
