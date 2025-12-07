import { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) onChange(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, value, onChange]);

  useEffect(() => { setInputValue(value); }, [value]);

  return (
    <div className="search-bar">
      <div className="search-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
      </div>
      <input type="text" className="search-input" placeholder="Name, Phone no." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      {inputValue && (
        <button className="search-clear" onClick={() => { setInputValue(''); onChange(''); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
