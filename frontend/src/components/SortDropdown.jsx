import { useState, useRef, useEffect } from 'react';
import './SortDropdown.css';

const sortOptions = [
  { value: 'customerName', label: 'Customer Name', orders: ['asc', 'desc'], orderLabels: ['A-Z', 'Z-A'] },
  { value: 'date', label: 'Date', orders: ['desc', 'asc'], orderLabels: ['Newest', 'Oldest'] },
  { value: 'quantity', label: 'Quantity', orders: ['desc', 'asc'], orderLabels: ['High', 'Low'] },
];

function SortDropdown({ sortBy, sortOrder, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = sortOptions.find(o => o.value === sortBy);
  const orderIdx = current?.orders.indexOf(sortOrder) || 0;
  const label = current ? `${current.label} (${current.orderLabels[orderIdx >= 0 ? orderIdx : 0]})` : 'Customer Name (A-Z)';

  return (
    <div className="sort-dropdown" ref={ref}>
      <button className="sort-btn" onClick={() => setIsOpen(!isOpen)}>
        Sort by: {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {isOpen && (
        <div className="sort-menu">
          {sortOptions.map(opt => (
            <div key={opt.value}>
              {opt.orders.map((order, i) => (
                <button key={order} className={sortBy === opt.value && sortOrder === order ? 'active' : ''} onClick={() => { onChange(opt.value, order); setIsOpen(false); }}>
                  {opt.label} ({opt.orderLabels[i]})
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
