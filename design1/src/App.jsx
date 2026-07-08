import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RequestTracker from './components/RequestTracker';
import DataQuality from './components/DataQuality';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('dash');

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="main-content">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <div className="main-scroll">
          <div className="wrap">
            {currentView === 'dash' && <Dashboard />}
            {currentView === 'tracker' && <RequestTracker />}
            {currentView === 'dq' && <DataQuality />}
          </div>

          <div className="footer">
            © 2024 SRF Limited · Customer Master Data Management · Internal Use Only
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
