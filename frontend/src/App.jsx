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
  const [filterOptions, setFilterOptions] = useState({ regions: [], genders: [], categories: [], tags: [], paymentMethods: [], ageRange: { min: 0, max: 100 }, dateRange: { min: null, max: null } });
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ regions: [], genders: [], ageMin: '', ageMax: '', categories: [], tags: [], paymentMethods: [], dateFrom: '', dateTo: '' });
  const [sortBy, setSortBy] = useState('customerName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10, hasNextPage: false, hasPrevPage: false });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { fetchFilterOptions().then(setFilterOptions).catch(console.error); }, []);

  const loadSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { search, regions: filters.regions.join(','), genders: filters.genders.join(','), ageMin: filters.ageMin, ageMax: filters.ageMax, categories: filters.categories.join(','), tags: filters.tags.join(','), paymentMethods: filters.paymentMethods.join(','), dateFrom: filters.dateFrom, dateTo: filters.dateTo, sortBy, sortOrder, page: pagination.currentPage, limit: 10 };
      const result = await fetchSales(params);
      setSales(result.data);
      setPagination(result.pagination);
      if (result.stats) setStats(result.stats);
    } catch (err) { setError('Failed to load sales data. Please try again.'); }
    finally { setLoading(false); }
  }, [search, filters, sortBy, sortOrder, pagination.currentPage]);

  useEffect(() => { loadSales(); }, [loadSales]);

  const handleSearch = (v) => { setSearch(v); setPagination(p => ({ ...p, currentPage: 1 })); };
  const handleFilterChange = (f) => { setFilters(f); setPagination(p => ({ ...p, currentPage: 1 })); };
  const handleSortChange = (by, order) => { setSortBy(by); setSortOrder(order); setPagination(p => ({ ...p, currentPage: 1 })); };
  const handlePageChange = (page) => setPagination(p => ({ ...p, currentPage: page }));
  const clearFilters = () => { setFilters({ regions: [], genders: [], ageMin: '', ageMax: '', categories: [], tags: [], paymentMethods: [], dateFrom: '', dateTo: '' }); setSearch(''); setPagination(p => ({ ...p, currentPage: 1 })); };

  const formatCurrency = (n) => '₹' + n.toLocaleString('en-IN');

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
            <button className="filter-btn" onClick={() => setShowFilters(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/></svg>
            </button>
            <button className={`filter-btn ${filters.regions.length ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Customer Region <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
            <button className={`filter-btn ${filters.genders.length ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Gender <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
            <button className={`filter-btn ${filters.ageMin || filters.ageMax ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Age Range <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
            <button className={`filter-btn ${filters.categories.length ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Product Category <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
            <button className={`filter-btn ${filters.tags.length ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Tags <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
            <button className={`filter-btn ${filters.paymentMethods.length ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Payment Method <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
            <button className={`filter-btn ${filters.dateFrom || filters.dateTo ? 'active' : ''}`} onClick={() => setShowFilters(true)}>Date <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></button>
          </div>
          <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onChange={handleSortChange} />
        </div>

        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-label">Total units sold <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>
            <div className="stat-value">{stats.totalUnits}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Amount <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>
            <div className="stat-value">{formatCurrency(stats.totalAmount)} <span className="stat-count">({stats.totalSRs} SRs)</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Discount <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>
            <div className="stat-value">{formatCurrency(stats.totalDiscount)} <span className="stat-count">({stats.totalSRs} SRs)</span></div>
          </div>
        </div>

        <FilterPanel filters={filters} filterOptions={filterOptions} onChange={handleFilterChange} onClear={clearFilters} isOpen={showFilters} onClose={() => setShowFilters(false)} />

        <div className="table-container">
          {error && <div className="error-message">{error} <button className="retry-btn" onClick={loadSales}>Retry</button></div>}
          <SalesTable data={sales} loading={loading} />
          {!loading && sales.length > 0 && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
          {!loading && sales.length === 0 && !error && (
            <div className="empty-state">
              <div className="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
              <h3>No results found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="clear-btn" onClick={clearFilters}>Clear all</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
