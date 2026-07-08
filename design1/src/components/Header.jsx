import React from 'react';

export default function Header({ currentView, setCurrentView }) {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="header-navbar">
      <div className="header-navbar-left">
        <div style={{
          display: 'flex',
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          borderRadius: '12px',
          padding: '6px',
          gap: '8px',
          boxShadow: 'var(--shadow)'
        }}>
          <button 
            onClick={() => setCurrentView('dash')}
            style={{
              background: currentView === 'dash' ? '#fff' : 'transparent',
              color: currentView === 'dash' ? 'var(--navy)' : 'var(--muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: currentView === 'dash' ? 'var(--shadow-sm)' : 'none',
              transition: '0.2s'
            }}
          >Dashboard</button>
          
          <button 
            onClick={() => setCurrentView('tracker')}
            style={{
              background: currentView === 'tracker' ? '#fff' : 'transparent',
              color: currentView === 'tracker' ? 'var(--navy)' : 'var(--muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: currentView === 'tracker' ? 'var(--shadow-sm)' : 'none',
              transition: '0.2s'
            }}
          >Request Tracker</button>

          <button 
            onClick={() => setCurrentView('dq')}
            style={{
              background: currentView === 'dq' ? '#fff' : 'transparent',
              color: currentView === 'dq' ? 'var(--navy)' : 'var(--muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: currentView === 'dq' ? 'var(--shadow-sm)' : 'none',
              transition: '0.2s'
            }}
          >Data Quality</button>
        </div>
      </div>
      <div className="header-navbar-right">
        
        <div className="nav-wallet">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="18" cy="12" r="2" />
          </svg>
          <span>Pending Approvals: 12</span>
        </div>
        
        <button className="icon-btn" onClick={toggleTheme}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        
        <div className="user-chip">
          <div className="avatar">SK</div>
          <span>SKUMAR</span>
        </div>
      </div>
    </div>
  );
}
