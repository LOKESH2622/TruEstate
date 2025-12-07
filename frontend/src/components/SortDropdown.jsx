import { useState, useRef, useEffect } from 'react';
import './SortDropdown.css';

const sortOptions = [
  { value: 'customerName', label: 'Customer Name', orders: ['asc', 'desc'], orderLabels: ['A-Z', 'Z-A'] },
  { value: 'date', label: 'Date', orders: ['desc', 'asc'], orderLabels: ['Newest First', 'Oldest First'] },
  { value: 'quantity', label: 'Quantity', orders: ['desc', 'asc'], orderLabels: ['High to Low', 'Low to High'] },
  { value: 'finalAmount', label: 'Amount', orders: ['desc', 'asc'], orderLabels: ['High to Low', 'Low to High'] }
];

function SortDropdown({ sortBy, sortOrder, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = sortOptions.find(opt => opt.value === sortBy);
  const orderIndex = currentOption?.orders.indexOf(sortOrder) || 0;
  const currentLabel = currentOption ? `${currentOption.label} (${currentOption.orderLabels[orderIndex >= 0 ? orderIndex : 0]})` : 'Customer Name (A-Z)';

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button className={`sort-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="sort-prefix">Sort by:</span>
        <span className="sort-label">{currentLabel}</span>
        <svg className={`chevron ${isOpen ? 'rotated' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      {isOpen && (
        <div className="sort-menu">
          {sortOptions.map(option => (
            <div key={option.value} className="sort-group">
              <div className="sort-group-label">{option.label}</div>
              {option.orders.map((order, index) => (
                <button key={`${option.value}-${order}`} className={`sort-option ${sortBy === option.value && sortOrder === order ? 'active' : ''}`} onClick={() => { onChange(option.value, order); setIsOpen(false); }}>
                  <span>{option.orderLabels[index]}</span>
                  {sortBy === option.value && sortOrder === order && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
