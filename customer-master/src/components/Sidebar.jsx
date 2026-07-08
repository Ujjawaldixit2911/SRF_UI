import React from 'react';
import logo from '../assets/download.png';

export default function Sidebar({ currentView, setCurrentView }) {
  return (
    <div className="sidebar" style={{ padding: 0 }}>
      {/* LOGO PARTITION */}
      <div className="sidebar-logo" style={{ padding: '24px 18px', borderBottom: '1px solid var(--line)' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow)',
          width: '100%'
        }}>
          <img 
            className="header-logo"
            src={logo} 
            alt="SRF" 
            style={{ height: '70px', width: '100%', objectFit: 'contain', filter: 'contrast(1.05)' }}
          />
        </div>
      </div>

      {/* NAVIGATION BLOCK */}
      <div style={{ flex: 1, padding: '24px 18px', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow)'
        }}>
          <button 
            className={`sidebar-link ${currentView === 'dash' ? 'active' : ''}`}
            onClick={() => setCurrentView('dash')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Dashboard
          </button>

          <button 
            className={`sidebar-link ${currentView === 'tracker' ? 'active' : ''}`}
            onClick={() => setCurrentView('tracker')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Request Tracker
          </button>

          <button 
            className={`sidebar-link ${currentView === 'dq' ? 'active' : ''}`}
            onClick={() => setCurrentView('dq')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Data Quality
          </button>
        </div>
      </div>

      {/* BOTTOM LOGOUT PARTITION */}
      <div className="sidebar-bottom" style={{ padding: '24px 18px', borderTop: '1px solid var(--line)' }}>
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          padding: '8px',
          boxShadow: 'var(--shadow)'
        }}>
          <button className="sidebar-link logout">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
