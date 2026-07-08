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

      {/* NAVIGATION MOVED TO HEADER */}
      <div style={{ flex: 1, padding: '0 18px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--navy), var(--blue))',
          borderRadius: '16px',
          padding: '16px',
          color: '#fff',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ fontSize: '14px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px', color: '#ffeb3b' }}>
            About SRF
          </h3>
          
          <div className="marquee-container" style={{ flex: 1, overflow: 'hidden', marginTop: '4px', position: 'relative' }}>
            <div className="marquee-content">
              {/* Set 1 */}
              <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.95, textAlign: 'justify' }}>
                <strong>SRF Limited</strong> is a multi-business chemicals conglomerate engaged in the manufacturing of industrial and specialty intermediates.
              </p>
              <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.95, textAlign: 'justify' }}>
                Discover SRF’s advanced packaging films and industrial material solutions, including PETLAR BOPET and OPLAR BOPP films.
              </p>
              <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.95, textAlign: 'justify' }}>
                Innovative products for food packaging, industrial use & global converting needs. We always find a better way!
              </p>

              {/* Set 2 (Duplicated for seamless loop) */}
              <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.95, textAlign: 'justify' }}>
                <strong>SRF Limited</strong> is a multi-business chemicals conglomerate engaged in the manufacturing of industrial and specialty intermediates.
              </p>
              <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.95, textAlign: 'justify' }}>
                Discover SRF’s advanced packaging films and industrial material solutions, including PETLAR BOPET and OPLAR BOPP films.
              </p>
              <p style={{ fontSize: '12.5px', lineHeight: '1.5', opacity: 0.95, textAlign: 'justify' }}>
                Innovative products for food packaging, industrial use & global converting needs. We always find a better way!
              </p>
            </div>
          </div>
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
