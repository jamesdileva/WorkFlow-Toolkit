# Template Engine

## Overview

The Template Engine allows users to automate common workplace workflows.

A template is a predefined sequence of actions that operate on one or more datasets and produce reports, dashboards, or findings.

Templates eliminate repetitive manual processes and provide consistent results.

---

# Purpose

Transform multi-step workplace tasks into one-click workflows.

Example:

Without Template:

1. Import Payroll File
2. Run Validation
3. Find Duplicates
4. Calculate Overtime
5. Generate Charts
6. Create PDF Report

With Template:

```text
Run Payroll Audit Template
```

Result:

```text
Payroll Audit Report Generated
```

---

# Action Registry Architecture

## Overview

Templates must never call module functions directly.

All workflow actions must pass through the Action Registry.

This creates a single execution path for:

* Workflow Templates
* Scheduled Jobs
* Future AI Features
* Plugin Modules
* Workflow Logging
* Progress Tracking

The Action Registry acts as the central routing layer between templates and application functionality.

---

## Architecture

```text
Workflow Template
        │
        ▼

Action Registry
        │
        ▼

Execution Engine
        │
        ▼

Module Function
```

---

## Design Goal

Templates should only define *what* should happen.

The Action Registry determines *how* actions are executed.

This prevents templates from becoming tightly coupled to implementation details.

---

## Incorrect Design

```python
template.execute()

cleaning.find_duplicates()

reports.generate_pdf_report()
```

Problems:

* Tight coupling
* Difficult to refactor
* Difficult to extend
* Difficult to support custom templates

---

## Correct Design

```python
execute_action(
    "find_duplicates",
    context
)
```

Templates only reference action names.

The registry resolves the correct implementation.

---

# Action Registry

## Purpose

The Action Registry maps workflow action names to executable functions.

---

## Example Registry

```python
ACTION_REGISTRY = {

    "validate_dataset":
        validate_dataset,

    "find_duplicates":
        find_duplicates,

    "find_missing_values":
        find_missing_values,

    "compare_datasets":
        compare_datasets,

    "calculate_overtime":
        calculate_overtime,

    "generate_kpis":
        generate_kpis,

    "generate_charts":
        generate_charts,

    "generate_pdf_report":
        generate_pdf_report
}
```

---

## Registry Responsibilities

* Locate actions
* Execute actions
* Validate actions
* Return results
* Handle missing actions

---

# Execution Engine

## Purpose

The Execution Engine processes workflow steps sequentially.

---

## Example

```python
def execute_action(
    action_name,
    context
):

    action = ACTION_REGISTRY[action_name]

    return action(context)
```

---

## Workflow Processing

```text
Step 1
validate_dataset
        ↓

Step 2
find_duplicates
        ↓

Step 3
calculate_overtime
        ↓

Step 4
generate_pdf_report
```

Each step is resolved through the Action Registry.

---

# Workflow Context

## Purpose

All actions operate on a shared workflow context.

The context acts as the communication layer between workflow steps.

---

## Context Object

```python
class WorkflowContext:

    project_id

    dataset

    results

    metadata

    reports

    execution_log
```

---

## Example

Step 1:

```python
context.results[
    "duplicates"
] = duplicate_results
```

Step 2:

```python
context.results[
    "quality_score"
] = quality_score
```

Step 3:

```python
generate_pdf_report(
    context
)
```

The report generator can access all previous workflow results.

---

# Workflow Execution Example

## Template Definition

```json
{
  "name": "Payroll Audit",

  "steps": [
    "validate_dataset",
    "find_duplicates",
    "calculate_overtime",
    "generate_pdf_report"
  ]
}
```

---

## Execution Flow

```text
Load Template
      ↓

Create Workflow Context
      ↓

Execute Step 1
      ↓

Execute Step 2
      ↓

Execute Step 3
      ↓

Execute Step 4
      ↓

Store Results
      ↓

Log Workflow Run
      ↓

Return Output
```

---

# Error Handling

Every action returns a standardized response object.

## Success Response

```python
{
    "success": True,
    "message": "Action Completed",
    "data": {}
}
```

---

## Failure Response

```python
{
    "success": False,
    "message": "Action Failed",
    "error": "Missing Dataset"
}
```

---

## Failure Behavior

If an action fails:

1. Execution stops
2. Workflow status becomes Failed
3. Error details are logged
4. workflow_runs is updated

---

# Future Extensibility

## Scheduled Workflows

```text
Scheduler
     ↓

Action Registry
     ↓

Execution Engine
```

No architecture changes required.

---

## AI Workflows

```text
User Prompt
      ↓

AI Selects Actions
      ↓

Action Registry
      ↓

Execution Engine
```

No architecture changes required.

---

## Plugin Modules

Third-party modules can register actions.

Example:

```python
register_action(
    "inventory_audit",
    inventory_audit_function
)
```

The action immediately becomes available to templates.

---

# Benefits

## Decoupling

Templates remain independent from implementation details.

---

## Consistency

Every action executes through the same path.

---

## Logging

All actions are tracked automatically.

---

## Maintainability

Module implementations can change without modifying templates.

---

## Scalability

Supports:

* Custom Templates
* Scheduled Jobs
* Plugin Modules
* Future AI Integration

without redesigning the architecture.

---

# Final Workflow Architecture

```text
Project
   ↓

Dataset
   ↓

Workflow Template
   ↓

Action Registry
   ↓

Execution Engine
   ↓

Module Functions
   ↓

Workflow Context
   ↓

Report Engine
   ↓

Outputs
```

This architecture serves as the foundation for all workflow execution within WorkFlow Toolkit.


# Core Design Principles

## Reusable

Templates should work across different datasets.

---

## Modular

Templates are composed of reusable workflow steps.

---

## Traceable

Every execution is logged.

---

## Extensible

New modules should be able to register new workflow actions.

---

# Template Lifecycle

```text
Select Template
       │
       ▼

Select Dataset
       │
       ▼

Validate Inputs
       │
       ▼

Execute Workflow Steps
       │
       ▼

Generate Outputs
       │
       ▼

Log Execution
       │
       ▼

Display Results
```

---

# Template Structure

Templates are stored as JSON.

Example:

```json
{
  "name": "Payroll Audit",
  "category": "Payroll",
  "version": "1.0",

  "steps": [
    "validate_dataset",
    "find_duplicates",
    "calculate_overtime",
    "generate_payroll_report"
  ]
}
```

---

# Template Object

```python
class WorkflowTemplate:

    id: int

    name: str

    category: str

    version: str

    description: str

    steps: list
```

---

# Workflow Step Object

Every template consists of workflow steps.

```python
class WorkflowStep:

    name: str

    module: str

    action: str

    parameters: dict
```

Example:

```json
{
  "module": "cleaning",
  "action": "find_duplicates"
}
```

---

# Workflow Execution Engine

The execution engine processes each step sequentially.

```text
Step 1
   ↓

Step 2
   ↓

Step 3
   ↓

Step 4
```

If a step fails:

```text
Workflow Failed
```

Execution details are stored in workflow_runs.

---

# Execution States

Supported workflow statuses:

```text
Pending
Running
Completed
Failed
Cancelled
```

---

# Standard Workflow Actions

## Import Actions

```text
import_file
validate_dataset
```

---

## Cleaning Actions

```text
scan_dataset
find_duplicates
find_missing_values
standardize_columns
```

---

## Compare Actions

```text
compare_datasets
generate_variance_report
```

---

## Payroll Actions

```text
validate_employee_ids
validate_hours
calculate_overtime
```

---

## Dashboard Actions

```text
generate_kpis
generate_charts
```

---

## Reporting Actions

```text
generate_pdf_report
generate_excel_report
```

---

# Built-In Templates

## Data Quality Review

Purpose:

Evaluate dataset quality.

Workflow:

```text
Validate Dataset
Find Duplicates
Find Missing Values
Generate Quality Report
```

Output:

```text
Data Quality Report
```

---

## Dataset Comparison

Purpose:

Compare two datasets.

Workflow:

```text
Compare Datasets
Generate Variance Report
Generate PDF Report
```

Output:

```text
Variance Report
```

---

## Payroll Audit

Purpose:

Audit payroll data.

Workflow:

```text
Validate Employee IDs
Validate Hours
Calculate Overtime
Generate Payroll Report
```

Output:

```text
Payroll Audit Report
```

---

## Dashboard Builder

Purpose:

Create visual summaries.

Workflow:

```text
Generate KPIs
Generate Charts
Generate Dashboard Report
```

Output:

```text
Dashboard Package
```

---

# Template Categories

```text
Data Quality
Payroll
Analytics
Reporting
Comparison
Compliance
HR
Finance
Operations
```

---

# Template Library Screen

## Features

### Browse Templates

Display:

* Name
* Category
* Description
* Version

---

### Search Templates

Search by:

* Name
* Category

---

### Run Template

User selects:

* Template
* Dataset

Then executes workflow.

---

# Workflow History Screen

Displays:

```text
Template Name
Execution Date
Duration
Status
Generated Reports
```

Data comes from:

workflow_runs

---

# Template Versioning

Templates support version control.

Example:

```text
Payroll Audit v1.0
Payroll Audit v1.1
Payroll Audit v2.0
```

Purpose:

Prevent breaking historical workflows.

---

# Error Handling

Each workflow step returns:

```python
{
    "success": True,
    "message": "Step Completed",
    "data": {}
}
```

Or:

```python
{
    "success": False,
    "message": "Duplicate Detection Failed",
    "error": "Missing Dataset"
}
```

Failures are logged to workflow_runs.

---

# Future Enhancement: Visual Workflow Builder

Version 2+

Users can create templates using drag-and-drop blocks.

Example:

```text
Validate Dataset
        ↓

Find Duplicates
        ↓

Generate Report
```

without writing configuration files.

---

# Future Enhancement: Scheduled Workflows

Version 2+

Example:

```text
Run Payroll Audit Every Friday
```

Automatically execute and generate reports.

---

# Future Enhancement: AI-Assisted Templates

Version 3+

User Prompt:

```text
Analyze this payroll file and create an audit report.
```

AI selects and executes appropriate workflow templates.

---

# MVP Template Engine Goals

Version 1 must support:

* Built-in Templates
* Sequential Workflow Execution
* Workflow Logging
* Template Library
* Workflow History
* Report Generation

without requiring AI, cloud services, or custom scripting.
