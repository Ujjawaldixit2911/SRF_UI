import React from 'react';
import logo from '../assets/download.png';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <div className="header">
      <div className="header-left">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#fff', 
          border: '1px solid var(--line)', 
          borderRadius: '4px', 
          padding: '8px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <img src={logo} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
        <div className="header-title" style={{ marginLeft: '24px' }}>
          Customer Master
          <span className="tag">BPM &rlarr; Oracle R12</span>
        </div>
        <div className="tabs">
          <button className={`tab ${activeTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveTab('dash')}>Dashboard</button>
          <button className={`tab ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>Request Tracker</button>
          <button className={`tab ${activeTab === 'dq' ? 'active' : ''}`} onClick={() => setActiveTab('dq')}>Data Quality</button>
        </div>
      </div>
      <div className="header-right">
        <div className="user-chip">
          SKUMAR
          <div className="avatar">SK</div>
        </div>
      </div>
    </div>
  );
}
