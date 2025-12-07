# Architecture Document

## Backend Architecture

### Structure

```
backend/
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── salesRoutes.js
│   ├── controllers/
│   │   └── salesController.js
│   ├── services/
│   │   └── salesService.js
│   └── utils/
│       └── dataLoader.js
└── data/
    └── sales_data.csv
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/sales | GET | Sales with filters, sort, pagination |
| /api/sales/filters | GET | Available filter options |
| /api/sales/:id | GET | Single sale by ID |

### Query Parameters

- search, regions, genders, ageMin, ageMax
- categories, tags, paymentMethods
- dateFrom, dateTo
- sortBy, sortOrder
- page, limit

## Frontend Architecture

### Structure

```
frontend/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx/css
│   │   ├── SearchBar.jsx/css
│   │   ├── FilterPanel.jsx/css
│   │   ├── SortDropdown.jsx/css
│   │   ├── SalesTable.jsx/css
│   │   └── Pagination.jsx/css
│   └── services/
│       └── api.js
└── index.html
```

### State Management

React hooks (useState, useEffect, useCallback) for:
- Sales data and loading state
- Filter options and active filters
- Search, sort, and pagination state

## Data Flow

1. User interaction updates component state
2. App state triggers API call
3. Backend processes with all parameters
4. Response updates UI

## Module Responsibilities

### Backend
- index.js: Server setup
- salesRoutes.js: Route definitions
- salesController.js: Request handling
- salesService.js: Business logic
- dataLoader.js: CSV parsing

### Frontend
- App.jsx: State management, layout
- Header.jsx: Sidebar navigation
- SearchBar.jsx: Debounced search
- FilterPanel.jsx: Filter controls
- SortDropdown.jsx: Sort selection
- SalesTable.jsx: Data display
- Pagination.jsx: Page navigation
