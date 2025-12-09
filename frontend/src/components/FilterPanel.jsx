import { useState } from 'react';
import './FilterPanel.css';

function FilterPanel({ filters, filterOptions, onChange, onClear, isOpen, onClose }) {
  const [sections, setSections] = useState({ region: true, gender: true, age: true, category: true, tags: false, payment: false, date: true });

  const toggle = (s) => setSections(prev => ({ ...prev, [s]: !prev[s] }));
  const handleMulti = (field, val) => {
    const curr = filters[field];
    onChange({ ...filters, [field]: curr.includes(val) ? curr.filter(v => v !== val) : [...curr, val] });
  };
  const handleRange = (field, val) => onChange({ ...filters, [field]: val });

  const hasFilters = filters.regions.length || filters.genders.length || filters.categories.length || filters.tags.length || filters.paymentMethods.length || filters.ageMin || filters.ageMax || filters.dateFrom || filters.dateTo;

  if (!isOpen) return null;

  return (
    <>
      <div className="filter-overlay" onClick={onClose}/>
      <aside className="filter-panel">
        <div className="filter-header">
          <h3>Filters</h3>
          <button onClick={onClose}>×</button>
        </div>
        {hasFilters && <button className="clear-btn" onClick={onClear}>Clear all</button>}
        <div className="filter-sections">
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('region')}>Region <span>{sections.region ? '−' : '+'}</span></button>
            {sections.region && filterOptions.regions.map(r => (
              <label key={r}><input type="checkbox" checked={filters.regions.includes(r)} onChange={() => handleMulti('regions', r)}/>{r}</label>
            ))}
          </div>
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('gender')}>Gender <span>{sections.gender ? '−' : '+'}</span></button>
            {sections.gender && filterOptions.genders.map(g => (
              <label key={g}><input type="checkbox" checked={filters.genders.includes(g)} onChange={() => handleMulti('genders', g)}/>{g}</label>
            ))}
          </div>
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('age')}>Age Range <span>{sections.age ? '−' : '+'}</span></button>
            {sections.age && (
              <div className="range-row">
                <input type="number" placeholder="Min" value={filters.ageMin} onChange={e => handleRange('ageMin', e.target.value)}/>
                <span>-</span>
                <input type="number" placeholder="Max" value={filters.ageMax} onChange={e => handleRange('ageMax', e.target.value)}/>
              </div>
            )}
          </div>
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('category')}>Category <span>{sections.category ? '−' : '+'}</span></button>
            {sections.category && filterOptions.categories.map(c => (
              <label key={c}><input type="checkbox" checked={filters.categories.includes(c)} onChange={() => handleMulti('categories', c)}/>{c}</label>
            ))}
          </div>
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('tags')}>Tags <span>{sections.tags ? '−' : '+'}</span></button>
            {sections.tags && <div className="tags-wrap">{filterOptions.tags.map(t => (
              <button key={t} className={filters.tags.includes(t) ? 'tag active' : 'tag'} onClick={() => handleMulti('tags', t)}>{t}</button>
            ))}</div>}
          </div>
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('payment')}>Payment <span>{sections.payment ? '−' : '+'}</span></button>
            {sections.payment && filterOptions.paymentMethods.map(p => (
              <label key={p}><input type="checkbox" checked={filters.paymentMethods.includes(p)} onChange={() => handleMulti('paymentMethods', p)}/>{p}</label>
            ))}
          </div>
          <div className="filter-section">
            <button className="section-head" onClick={() => toggle('date')}>Date Range <span>{sections.date ? '−' : '+'}</span></button>
            {sections.date && (
              <div className="date-col">
                <input type="date" value={filters.dateFrom} onChange={e => handleRange('dateFrom', e.target.value)}/>
                <input type="date" value={filters.dateTo} onChange={e => handleRange('dateTo', e.target.value)}/>
              </div>
            )}
          </div>
        </div>
        <button className="apply-btn" onClick={onClose}>Apply</button>
      </aside>
    </>
  );
}

export default FilterPanel;
