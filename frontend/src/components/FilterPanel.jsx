import { useState } from 'react';
import './FilterPanel.css';

function FilterPanel({ filters, filterOptions, onChange, onClear, isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    region: true, gender: true, age: true, category: true, tags: false, payment: false, date: true
  });

  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const handleMultiSelect = (field, value) => {
    const currentValues = filters[field];
    const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
    onChange({ ...filters, [field]: newValues });
  };

  const handleRangeChange = (field, value) => onChange({ ...filters, [field]: value });

  const hasActiveFilters = filters.regions.length > 0 || filters.genders.length > 0 || filters.categories.length > 0 ||
    filters.tags.length > 0 || filters.paymentMethods.length > 0 || filters.ageMin || filters.ageMax || filters.dateFrom || filters.dateTo;

  return (
    <>
      {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
      <aside className={`filter-panel ${isOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-btn mobile-only" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        {hasActiveFilters && (
          <button className="clear-all-btn" onClick={onClear}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            Clear all filters
          </button>
        )}
        <div className="filter-sections">
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('region')}>
              <span>Region</span>
              <svg className={`chevron ${expandedSections.region ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.region && (
              <div className="section-content">
                {filterOptions.regions.map(region => (
                  <label key={region} className="checkbox-item">
                    <input type="checkbox" checked={filters.regions.includes(region)} onChange={() => handleMultiSelect('regions', region)} />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">{region}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('gender')}>
              <span>Gender</span>
              <svg className={`chevron ${expandedSections.gender ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.gender && (
              <div className="section-content">
                {filterOptions.genders.map(gender => (
                  <label key={gender} className="checkbox-item">
                    <input type="checkbox" checked={filters.genders.includes(gender)} onChange={() => handleMultiSelect('genders', gender)} />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">{gender}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('age')}>
              <span>Age Range</span>
              <svg className={`chevron ${expandedSections.age ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.age && (
              <div className="section-content">
                <div className="range-inputs">
                  <div className="range-input-group">
                    <label>Min</label>
                    <input type="number" placeholder={filterOptions.ageRange?.min || 0} value={filters.ageMin} onChange={(e) => handleRangeChange('ageMin', e.target.value)} />
                  </div>
                  <span className="range-separator">—</span>
                  <div className="range-input-group">
                    <label>Max</label>
                    <input type="number" placeholder={filterOptions.ageRange?.max || 100} value={filters.ageMax} onChange={(e) => handleRangeChange('ageMax', e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('category')}>
              <span>Product Category</span>
              <svg className={`chevron ${expandedSections.category ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.category && (
              <div className="section-content">
                {filterOptions.categories.map(category => (
                  <label key={category} className="checkbox-item">
                    <input type="checkbox" checked={filters.categories.includes(category)} onChange={() => handleMultiSelect('categories', category)} />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('tags')}>
              <span>Tags</span>
              <svg className={`chevron ${expandedSections.tags ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.tags && (
              <div className="section-content tags-content">
                {filterOptions.tags.map(tag => (
                  <button key={tag} className={`tag-chip ${filters.tags.includes(tag) ? 'active' : ''}`} onClick={() => handleMultiSelect('tags', tag)}>{tag}</button>
                ))}
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('payment')}>
              <span>Payment Method</span>
              <svg className={`chevron ${expandedSections.payment ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.payment && (
              <div className="section-content">
                {filterOptions.paymentMethods.map(method => (
                  <label key={method} className="checkbox-item">
                    <input type="checkbox" checked={filters.paymentMethods.includes(method)} onChange={() => handleMultiSelect('paymentMethods', method)} />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-label">{method}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-header" onClick={() => toggleSection('date')}>
              <span>Date Range</span>
              <svg className={`chevron ${expandedSections.date ? 'expanded' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {expandedSections.date && (
              <div className="section-content">
                <div className="date-inputs">
                  <div className="date-input-group">
                    <label>From</label>
                    <input type="date" value={filters.dateFrom} onChange={(e) => handleRangeChange('dateFrom', e.target.value)} />
                  </div>
                  <div className="date-input-group">
                    <label>To</label>
                    <input type="date" value={filters.dateTo} onChange={(e) => handleRangeChange('dateTo', e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="filter-footer mobile-only">
          <button className="apply-btn" onClick={onClose}>Apply Filters</button>
        </div>
      </aside>
    </>
  );
}

export default FilterPanel;
