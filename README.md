# TruEstate - Retail Sales Management System

## 1. Overview

A full-stack Retail Sales Management System that demonstrates essential software engineering capabilities across both frontend and backend components. The system supports advanced Search, Filtering, Sorting, and Pagination functionalities for managing retail sales data. Built with clean, maintainable, and modular architecture following professional coding standards.

## 2. Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- CSS3

**Backend:**
- Node.js
- Express.js
- csv-parser

## 3. Search Implementation Summary

- Full-text search on Customer Name and Phone Number fields
- Case-insensitive matching
- Debounced input with 300ms delay to optimize API calls
- Works alongside active filters and sorting
- Server-side processing for performance

## 4. Filter Implementation Summary

Multi-select and range-based filtering:
- Customer Region (multi-select)
- Gender (multi-select)
- Age Range (min/max inputs)
- Product Category (multi-select)
- Tags (multi-select chips)
- Payment Method (multi-select)
- Date Range (from/to date pickers)

Filters work independently and in combination with state preservation.

## 5. Sorting Implementation Summary

- Date (Newest First / Oldest First)
- Quantity (High to Low / Low to High)
- Customer Name (A-Z / Z-A)

Sorting preserves active search and filter states.

## 6. Pagination Implementation Summary

- Page size: 10 items per page
- Previous/Next navigation with disabled states at boundaries
- Page number display with ellipsis for large datasets
- Retains active search, filter, and sort states
- Auto resets to page 1 when filters or search change

## 7. Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/LOKESH2622/TruEstate.git
cd TruEstate
```

2. Install dependencies:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

3. Add the dataset:
   - Place `truestate_assignment_dataset (1).csv` in the project root folder

4. Start the application:
```bash
npm run dev
```

5. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
