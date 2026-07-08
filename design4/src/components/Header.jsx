import React from 'react';

export default function Header({ activeTab }) {
  const titles = {
    dash: 'Customer Master Dashboard',
    tracker: 'Request Tracker',
    dq: 'Data Quality Issues'
  };

  return (
    <div className="corp-header">
      <div className="header-left">
        <div className="breadcrumb">
          <span>Home</span> <span className="sep">/</span> 
          <span>Customers</span> <span className="sep">/</span> 
          <span className="current">{titles[activeTab]}</span>
        </div>
        <h1 className="page-title">{titles[activeTab]}</h1>
      </div>

      <div className="header-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Global Search..." />
        </div>
        <div className="header-actions">
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">💬</button>
        </div>
        <div className="user-profile">
          <div className="u-info">
            <div className="u-name">Simran Kaur</div>
            <div className="u-role">Sales Director</div>
          </div>
          <div className="avatar">SK</div>
        </div>
      </div>
    </div>
  );
}
