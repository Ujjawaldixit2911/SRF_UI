import React from 'react';
import logo from '../assets/download.png';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <div className="logo-box" style={{ background: '#fff', padding: '4px 8px', borderRadius: '4px', height: '36px', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '28px', objectFit: 'contain', filter: 'contrast(1.05)' }} />
          </div>
          <div className="titles" style={{ marginLeft: '12px' }}>
            <div className="title">Customer Master Console</div>
            <div className="subtitle">Enterprise Data Management</div>
          </div>
        </div>
        <nav className="tabs" style={{ marginLeft: '32px' }}>
          <button className={`tab ${activeTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveTab('dash')}>Dashboard</button>
          <button className={`tab ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>Request Tracker</button>
          <button className={`tab ${activeTab === 'dq' ? 'active' : ''}`} onClick={() => setActiveTab('dq')}>Data Quality</button>
        </nav>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <div className="u-info">
            <div className="u-name">Simran Kaur</div>
            <div className="u-role">Operations</div>
          </div>
          <div className="avatar">SK</div>
        </div>
      </div>
    </header>
  );
}
