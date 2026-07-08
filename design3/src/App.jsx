import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RequestTracker from './components/RequestTracker';
import DataQuality from './components/DataQuality';
import ActionBar from './components/ActionBar';
import { CUSTOMERS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dash');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleSelect = (id) => {
    const newSel = new Set(selectedIds);
    if (newSel.has(id)) newSel.delete(id);
    else newSel.add(id);
    setSelectedIds(newSel);
  };

  const clearSelection = () => setSelectedIds(new Set());
  const openModify = () => console.log('Modify clicked');
  const openReplace = () => console.log('Replace clicked');

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-scroll">
        <div className="wrap">
          <Dashboard 
            isActive={activeTab === 'dash'} 
            selectedIds={selectedIds} 
            toggleSelect={toggleSelect} 
          />
          {activeTab === 'tracker' && <RequestTracker />}
          {activeTab === 'dq' && <DataQuality />}
        </div>
      </div>

      <ActionBar 
        selectedCount={selectedIds.size} 
        onClear={clearSelection}
        onModify={openModify}
        onReplace={openReplace}
      />
    </div>
  );
}
