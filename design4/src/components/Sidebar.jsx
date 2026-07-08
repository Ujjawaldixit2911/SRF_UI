import React from 'react';
import logo from '../assets/download.png';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="corp-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-card">
          <img src={logo} alt="Company Logo" />
        </div>
      </div>
      <div className="sidebar-nav">
        <div className="nav-group">Main Menu</div>
        <button 
          className={`nav-btn ${activeTab === 'dash' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dash')}
        >
          <span className="icon">📊</span> Customer Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'tracker' ? 'active' : ''}`} 
          onClick={() => setActiveTab('tracker')}
        >
          <span className="icon">📋</span> Request Tracker
        </button>
        <button 
          className={`nav-btn ${activeTab === 'dq' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dq')}
        >
          <span className="icon">🛡️</span> Data Quality
        </button>

        <div className="nav-group mt-auto">Settings</div>
        <button className="nav-btn">
          <span className="icon">⚙️</span> Preferences
        </button>
        <button className="nav-btn">
          <span className="icon">❓</span> Help & Support
        </button>
      </div>
    </div>
  );
}
