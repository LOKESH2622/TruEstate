import './Header.css';

function Header() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="url(#grad)"/>
              <defs>
                <linearGradient id="grad" x1="2" y1="2" x2="22" y2="22">
                  <stop stopColor="#8b5cf6"/>
                  <stop offset="1" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">Vault</span>
            <span className="logo-subtitle">Anurag Yadav</span>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </a>
        <a href="#" className="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          Nexus
        </a>
        <a href="#" className="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Intake
        </a>
        <div className="nav-section">
          <div className="nav-section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            Services
          </div>
          <div className="nav-section-items">
            <a href="#" className="nav-item sub-item"><span className="dot"></span>Pre-active</a>
            <a href="#" className="nav-item sub-item active"><span className="dot active"></span>Active</a>
            <a href="#" className="nav-item sub-item"><span className="dot"></span>Blocked</a>
            <a href="#" className="nav-item sub-item"><span className="dot"></span>Closed</a>
          </div>
        </div>
        <div className="nav-section">
          <div className="nav-section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Invoices
          </div>
          <div className="nav-section-items">
            <a href="#" className="nav-item sub-item"><span className="dot"></span>Proforma Invoices</a>
            <a href="#" className="nav-item sub-item"><span className="dot"></span>Final Invoices</a>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Header;
