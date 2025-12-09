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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Name, Phone no." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    </div>
  );
}

export default SearchBar;
