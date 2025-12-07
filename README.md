# TruEstate - Retail Sales Management System

## Overview

A full-stack Retail Sales Management System built with React and Node.js/Express. The application provides comprehensive search, filtering, sorting, and pagination capabilities for managing retail sales data. Features a modern, responsive UI with real-time data updates and efficient state management.

## Tech Stack

### Frontend
- React 18 with hooks for state management
- Vite build tool and development server
- Axios HTTP client for API requests
- CSS3 with CSS variables and animations

### Backend
- Node.js runtime environment
- Express.js web framework
- csv-parser for CSV file parsing

## Dataset Setup

The CSV dataset is not included in this repository due to GitHub's file size limits.

**To use the application:**
1. Download the dataset file `truestate_assignment_dataset (1).csv`
2. Place it in the project root folder: `C:\TruEstate\truestate_assignment_dataset (1).csv`
3. The backend will automatically load the data on startup

## Search Implementation Summary

Full-text search across Customer Name and Phone Number fields:
- Case-insensitive matching
- Debounced input (300ms delay)
- Real-time results update
- State preservation with filters and sorting
- Backend processing for performance

## Filter Implementation Summary

Multi-select and range-based filtering:
- Customer Region - Multi-select dropdown
- Gender - Multi-select checkboxes
- Age Range - Min/Max numeric inputs
- Product Category - Multi-select checkboxes
- Tags - Clickable tag chips
- Payment Method - Multi-select checkboxes
- Date Range - From/To date pickers

All filters work independently and in combination.

## Sorting Implementation Summary

Sorting available for key data fields:
- Date - Newest First / Oldest First
- Quantity - High to Low / Low to High
- Customer Name - A to Z / Z to A
- Amount - High to Low / Low to High

## Pagination Implementation Summary

Efficient pagination with 10 items per page:
- Previous/Next navigation
- Page number display with ellipsis
- State preservation across operations
- Result count display
- Auto reset to page 1 on filter/search change

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LOKESH2622/TruEstate.git
cd TruEstate
```

2. Install all dependencies:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

3. Add the dataset file:
   - Place `truestate_assignment_dataset (1).csv` in the project root folder

4. Start the development servers:
```bash
npm run dev
```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Build

```bash
npm run build
npm start
```
