# TruEstate - Retail Sales Management System

## Overview

A full-stack Retail Sales Management System built with React and Node.js/Express. The application provides comprehensive search, filtering, sorting, and pagination capabilities for managing retail sales data. Features a modern, responsive UI with real-time data updates.

## Tech Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- csv-parser

## Search Implementation Summary

Full-text search across Customer Name and Phone Number fields with case-insensitive matching, debounced input (300ms delay), and state preservation alongside filters and sorting.

## Filter Implementation Summary

Multi-select and range-based filtering:
- Customer Region
- Gender
- Age Range (Min/Max)
- Product Category
- Tags
- Payment Method
- Date Range (From/To)

All filters work independently and in combination.

## Sorting Implementation Summary

Available sorting options:
- Date (Newest/Oldest First)
- Quantity (High/Low)
- Customer Name (A-Z/Z-A)
- Amount (High/Low)

Sorting preserves active search and filter selections.

## Pagination Implementation Summary

- 10 items per page
- Previous/Next navigation
- Page number display with ellipsis
- State preservation across all operations
- Result count display

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd TruEstate
npm run install:all
```

### Running

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Production

```bash
npm run build
npm start
```
