import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import { fetchSales, fetchFilterOptions } from './services/api';
import './App.css';

function App() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalUnits: 0, totalAmount: 0, totalDiscount: 0, totalSRs: 0 });
  const [filterOptions, setFilterOptions] = useState({
    regions: [], genders: [], categories: [], tags: [], paymentMethods: [],
    ageRange: { min: 0, max: 100 }, dateRange: { min: null, max: null }
  });
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    regions: [], genders: [], ageMin: '', ageMax: '',
    categories: [], tags: [], paymentMethods: [], dateFrom: '', dateTo: ''
  });
  const [sortBy, setSortBy] = useState('customerName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pagination, setPagination] = useState({
    currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10, hasNextPage: false, hasPrevPage: false
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchFilterOptions().then(setFilterOptions).catch(console.error);
  }, []);

  const loadSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search,
        regions: filters.regions.join(','),
        genders: filters.genders.join(','),
        ageMin: filters.ageMin,
        ageMax: filters.ageMax,
        categories: filters.categories.join(','),
        tags: filters.tags.join(','),
        paymentMethods: filters.paymentMethods.join(','),
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        sortBy, sortOrder,
        page: pagination.currentPage,
        limit: 10
      };
      const result = await fetchSales(params);
      setSales(result.data);
      setPagination(result.pagination);
      if (result.stats) setStats(result.stats);
    } catch (err) {
      setError('Failed to load sales data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, filters, sortBy, sortOrder, pagination.currentPage]);

  useEffect(() => { loadSales(); }, [loadSales]);

  const handleSearch = (value) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const clearFilters = () => {
    setFilters({
      regions: [], genders: [], ageMin: '', ageMax: '',
      categories: [], tags: [], paymentMethods: [], dateFrom: '', dateTo: ''
    });
    setSearch('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const activeFilterCount = filters.regions.length + filters.genders.length + filters.categories.length +
    filters.tags.length + filters.paymentMethods.length +
    (filters.ageMin ? 1 : 0) + (filters.ageMax ? 1 : 0) + (filters.dateFrom ? 1 : 0) + (filters.dateTo ? 1 : 0);

  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Sales Management System</h1>
          <SearchBar value={search} onChange={handleSearch} />
        </div>

        <div className="filters-bar">
          <div className="filter-buttons">
            <button className={`filter-btn ${filters.regions.length > 0 ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Customer Region
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button className={`filter-btn ${filters.genders.length > 0 ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Gender
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button className={`filter-btn ${filters.ageMin || filters.ageMax ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Age Range
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button className={`filter-btn ${filters.categories.length > 0 ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Product Category
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button className={`filter-btn ${filters.tags.length > 0 ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Tags
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button className={`filter-btn ${filters.paymentMethods.length > 0 ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Payment Method
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button className={`filter-btn ${filters.dateFrom || filters.dateTo ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              Date
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
          <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onChange={handleSortChange} />
        </div>

        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-label">Total units sold <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
            <div className="stat-value">{stats.totalUnits}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Amount <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
            <div className="stat-value">{formatCurrency(stats.totalAmount)} <span className="stat-count">({stats.totalSRs} SRs)</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Discount <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
            <div className="stat-value">{formatCurrency(stats.totalDiscount)} <span className="stat-count">({stats.totalSRs} SRs)</span></div>
          </div>
        </div>

        <FilterPanel filters={filters} filterOptions={filterOptions} onChange={handleFilterChange} onClear={clearFilters} isOpen={showFilters} onClose={() => setShowFilters(false)} />

        <div className="table-container">
          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {error}
              <button onClick={loadSales} className="retry-btn">Retry</button>
            </div>
          )}
          <SalesTable data={sales} loading={loading} />
          {!loading && sales.length > 0 && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
          {!loading && sales.length === 0 && !error && (
            <div className="empty-state">
              <div className="empty-icon"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></div>
              <h3>No results found</h3>
              <p>Try adjusting your search or filter criteria</p>
              {(search || activeFilterCount > 0) && <button onClick={clearFilters} className="clear-btn">Clear all filters</button>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
