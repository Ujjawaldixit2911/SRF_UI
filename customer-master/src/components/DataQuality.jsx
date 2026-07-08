import React from 'react';

export default function DataQuality() {
  return (
    <div className="view active" id="view-dq">
      <div className="dq-grid">
        <div className="dq-card">
          <div className="h"><span className="dot" style={{ background: 'var(--red)' }}></span>Email mismatch across sites</div>
          <div className="big">34</div>
          <div className="sub">Sites with differing email IDs under one customer</div>
        </div>
        <div className="dq-card">
          <div className="h"><span className="dot" style={{ background: 'var(--amber)' }}></span>Missing Region</div>
          <div className="big">21</div>
          <div className="sub">Customer sites without a valid Oracle region LOV</div>
        </div>
        <div className="dq-card">
          <div className="h"><span className="dot" style={{ background: 'var(--amber)' }}></span>Missing / Inactive Sales Person</div>
          <div className="big">18</div>
          <div className="sub">Blocks order creation in Oracle</div>
        </div>
        <div className="dq-card">
          <div className="h"><span className="dot" style={{ background: 'var(--amber)' }}></span>Missing Payment Term</div>
          <div className="big">15</div>
          <div className="sub">Bill-to / Ship-to term unresolved</div>
        </div>
        <div className="dq-card">
          <div className="h"><span className="dot" style={{ background: 'var(--red)' }}></span>Invalid Country-State-City-Region</div>
          <div className="big">8</div>
          <div className="sub">Combination fails ERP validation on push</div>
        </div>
        <div className="dq-card">
          <div className="h"><span className="dot" style={{ background: 'var(--violet)' }}></span>Non-standard Sales Person names</div>
          <div className="big">12</div>
          <div className="sub">e.g. “Vikas”, “V. Pansari”, “Vikas Pansari”</div>
        </div>
      </div>
      <div className="info-box" style={{ maxWidth: 'none' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        Customers flagged here also appear in the Dashboard with a ⚠ marker. Use “Only data-quality issues” on the Dashboard to work through them, then bulk-fix with Modify or Find &amp; Replace.
      </div>
    </div>
  );
}
