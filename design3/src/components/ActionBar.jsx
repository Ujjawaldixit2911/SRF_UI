import React from 'react';

export default function ActionBar({ selectedCount, onModify, onReplace, onClear }) {
  return (
    <div className={`actionbar ${selectedCount > 0 ? 'show' : ''}`} id="actionbar">
      <div className="selinfo"><b>{selectedCount}</b> selected</div>
      <div className="divider"></div>
      <button className="ab-btn ab-modify" onClick={onModify}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Modify / Update
      </button>
      <button className="ab-btn ab-replace" onClick={onReplace}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7v6h6" />
          <path d="M21 17v-6h-6" />
          <path d="M3 13a9 9 0 0 1 15-6.7L21 9" />
          <path d="M21 11a9 9 0 0 1-15 6.7L3 15" />
        </svg>
        Find &amp; Replace
      </button>
      <button className="ab-btn ab-clear" onClick={onClear}>Clear</button>
    </div>
  );
}
