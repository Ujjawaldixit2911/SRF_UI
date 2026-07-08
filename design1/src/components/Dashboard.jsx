import React, { useState, useMemo, useEffect } from 'react';
import { CUSTOMERS, FIELD_META } from '../data/mockData';
import CustomerCard from './CustomerCard';
import ActionBar from './ActionBar';
import { ModifyModal, ReplaceModal } from './Modals';

// Helper for unique sorted list without falsy values
const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort();

export default function Dashboard() {
  const [matchMode, setMatchMode] = useState('AND');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: '', sp: '', country: '', region: '', acct: '',
    ou: '', pt: '', pc: '', status: '', city: '', pan: '', date: '', dqOnly: false
  });
  
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [groupBy, setGroupBy] = useState('none');

  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isReplaceOpen, setIsReplaceOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, title: '', sub: '' });
  
  // Filter Options
  const spOptions = useMemo(() => uniq(CUSTOMERS.map(c => c.salesperson)), []);
  const countryOptions = useMemo(() => uniq(CUSTOMERS.map(c => c.country)), []);
  const regionOptions = useMemo(() => uniq(CUSTOMERS.map(c => c.region)), []);
  const ouOptions = useMemo(() => uniq(CUSTOMERS.map(c => c.operatingUnit)), []);
  const ptOptions = useMemo(() => uniq(CUSTOMERS.map(c => c.paymentTerm)), []);

  // KPIs calculation
  const total = CUSTOMERS.length;
  const active = CUSTOMERS.filter(c => c.status === 'Active').length;
  const inactive = CUSTOMERS.filter(c => c.status === 'Inactive').length;
  const countries = uniq(CUSTOMERS.map(c => c.country)).length;
  const regions = uniq(CUSTOMERS.map(c => c.region)).length;
  // Mock recent data KPIs
  const new30d = 47;
  const modified30d = 132;
  const dataIssues = CUSTOMERS.filter(c => c.flags.length > 0).length;

  // Filtering Logic
  const filtered = useMemo(() => {
    return CUSTOMERS.filter(c => {
      const conds = [];
      const v = (val) => (val || '').trim().toLowerCase();
      
      if (v(filters.name)) conds.push(c => c.name.toLowerCase().includes(v(filters.name)));
      if (v(filters.sp)) conds.push(c => c.salesperson.toLowerCase() === v(filters.sp));
      if (v(filters.country)) conds.push(c => c.country.toLowerCase() === v(filters.country));
      if (v(filters.region)) conds.push(c => c.region.toLowerCase() === v(filters.region));
      if (v(filters.acct)) conds.push(c => c.accounts.some(a => a.accNo.toLowerCase().includes(v(filters.acct))));
      if (v(filters.ou)) conds.push(c => c.operatingUnit.toLowerCase() === v(filters.ou));
      if (v(filters.pt)) conds.push(c => c.paymentTerm.toLowerCase() === v(filters.pt));
      if (v(filters.pc)) conds.push(c => c.profileClass.toLowerCase() === v(filters.pc));
      if (v(filters.status)) conds.push(c => c.status.toLowerCase() === v(filters.status));
      if (v(filters.city)) conds.push(c => c.city.toLowerCase().includes(v(filters.city)));
      if (v(filters.pan)) conds.push(c => (c.pan || '').toLowerCase().includes(v(filters.pan)));

      let ok = conds.length === 0 ? true : (matchMode === 'AND' ? conds.every(f => f(c)) : conds.some(f => f(c)));
      if (ok && filters.dqOnly) ok = c.flags.length > 0;
      return ok;
    });
  }, [filters, matchMode]);

  const handleFilterChange = (field, val) => {
    setFilters(prev => ({ ...prev, [field]: val }));
  };

  const resetFilters = () => {
    setFilters({
      name: '', sp: '', country: '', region: '', acct: '',
      ou: '', pt: '', pc: '', status: '', city: '', pan: '', date: '', dqOnly: false
    });
  };

  const toggleSelect = (id, checked) => {
    const newSel = new Set(selectedIds);
    if (checked) newSel.add(id); else newSel.delete(id);
    setSelectedIds(newSel);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      const all = new Set(selectedIds);
      filtered.forEach(c => all.add(c.id));
      setSelectedIds(all);
    } else {
      const all = new Set(selectedIds);
      filtered.forEach(c => all.delete(c.id));
      setSelectedIds(all);
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  const toggleExpand = (id) => {
    const newExp = new Set(expandedIds);
    if (newExp.has(id)) newExp.delete(id); else newExp.add(id);
    setExpandedIds(newExp);
  };

  const isAllSelected = filtered.length > 0 && filtered.every(c => selectedIds.has(c.id));
  const isIndeterminate = !isAllSelected && filtered.some(c => selectedIds.has(c.id));
  const selectedCustomers = CUSTOMERS.filter(c => selectedIds.has(c.id));

  const showToast = (title, sub) => {
    setToast({ show: true, title, sub });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 5200);
  };

  const handleModifySubmit = (field, newVal) => {
    setIsModifyOpen(false);
    const m = FIELD_META[field];
    showToast(`Request CM-${Math.floor(Math.random()*1000)+8000} created`, `Bulk update · ${m.name} → “${newVal}” for ${selectedIds.size} customer(s). Routed to ${m.flow[1]}.`);
    clearSelection();
  };

  const handleReplaceSubmit = (field, findVal, replVal) => {
    setIsReplaceOpen(false);
    const m = FIELD_META[field];
    showToast(`Request CM-${Math.floor(Math.random()*1000)+8000} created`, `Find & Replace · ${m ? m.name : field}: “${findVal}” → “${replVal}”. Routed to approval.`);
    clearSelection();
  };

  // Grouping logic
  const tagMap = {
    salesperson: 'Sales Person', country: 'Country', region: 'Region',
    operatingUnit: 'Operating Unit', paymentTerm: 'Payment Term'
  };
  const groupedBuckets = useMemo(() => {
    if (groupBy === 'none') return null;
    const buckets = {};
    filtered.forEach(c => {
      const k = c[groupBy] || '(blank)';
      if (!buckets[k]) buckets[k] = [];
      buckets[k].push(c);
    });
    return buckets;
  }, [filtered, groupBy]);

  const [collapsedBuckets, setCollapsedBuckets] = useState(new Set());
  const toggleBucket = (k) => {
    const next = new Set(collapsedBuckets);
    if (next.has(k)) next.delete(k); else next.add(k);
    setCollapsedBuckets(next);
  };

  return (
    <div className="view active" id="view-dash">
      
      {/* Header Banner */}
      <div className="welcome-banner">
        <div>
          <h2>Customer Master</h2>
          <p style={{ fontWeight: '600', color: 'var(--blue-dark)' }}>Bulk &amp; Single Update Console &middot; BPM &rlarr; Oracle R12</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'right' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
            <div style={{ fontWeight: '600', fontSize: '15px', color: 'inherit' }}>Welcome back, Admin! 👋</div>
            <div style={{ fontSize: '13px', color: 'inherit', opacity: 0.8 }}>
              <b style={{ color: 'var(--amber)' }}>12 pending requests</b> &bull; <b style={{ color: 'var(--red)' }}>{dataIssues} data issues</b>
            </div>
          </div>
          <button className="btn-review" onClick={() => document.getElementById('view-tracker')?.scrollIntoView({ behavior: 'smooth' })}>
            Review
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)' }}>Overview</h1>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Here's what's happening with your customers today.</p>
      </div>

      {/* KPIs */}
      <div className="kpis">
        {/* Row 1 */}
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Total Customers</div>
            <div className="kpi-icon blue"><svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          </div>
          <div className="val">{total.toLocaleString()}</div>
        </div>
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Active</div>
            <div className="kpi-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          </div>
          <div className="val">{active.toLocaleString()}</div>
        </div>
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Inactive</div>
            <div className="kpi-icon" style={{background:'#f1f5f9', color:'#64748b'}}><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
          </div>
          <div className="val">{inactive.toLocaleString()}</div>
        </div>
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Countries</div>
            <div className="kpi-icon violet"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
          </div>
          <div className="val">{countries}</div>
        </div>
        
        {/* Row 2 */}
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Regions</div>
            <div className="kpi-icon violet"><svg viewBox="0 0 24 24" fill="none"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
          </div>
          <div className="val">{regions}</div>
        </div>
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">New (30d)</div>
            <div className="kpi-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div>
          </div>
          <div className="val">{new30d}</div>
        </div>
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Modified (30d)</div>
            <div className="kpi-icon blue"><svg viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div>
          </div>
          <div className="val">{modified30d}</div>
        </div>
        <div className="kpi">
          <div className="kpi-top">
            <div className="lbl">Data Issues</div>
            <div className="kpi-icon red"><svg viewBox="0 0 24 24" fill="none"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          </div>
          <div className="val">{dataIssues}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="panel filter-panel">
        <div className="filter-head">
          <div className="t">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
            Search &amp; Filter Customers
          </div>
          <div className="match-toggle">
            Match conditions:
            <div className="seg">
              <button className={matchMode === 'AND' ? 'on' : ''} onClick={() => setMatchMode('AND')}>AND</button>
              <button className={matchMode === 'OR' ? 'on' : ''} onClick={() => setMatchMode('OR')}>OR</button>
            </div>
          </div>
        </div>

        <div className="filter-grid">
          <div className="fld">
            <label>Customer Name</label>
            <input placeholder="e.g. Candypink" value={filters.name} onChange={e => handleFilterChange('name', e.target.value)} />
          </div>
          <div className="fld">
            <label>Sales Person</label>
            <select value={filters.sp} onChange={e => handleFilterChange('sp', e.target.value)}>
              <option value="">All</option>
              {spOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="fld">
            <label>Country</label>
            <select value={filters.country} onChange={e => handleFilterChange('country', e.target.value)}>
              <option value="">All</option>
              {countryOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="fld">
            <label>Region</label>
            <select value={filters.region} onChange={e => handleFilterChange('region', e.target.value)}>
              <option value="">All</option>
              {regionOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="fld">
            <label>Account No.</label>
            <input placeholder="e.g. 3210…" value={filters.acct} onChange={e => handleFilterChange('acct', e.target.value)} />
          </div>
          <div className="fld">
            <label>Operating Unit</label>
            <select value={filters.ou} onChange={e => handleFilterChange('ou', e.target.value)}>
              <option value="">All</option>
              {ouOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className={`more-fields ${showMoreFilters ? 'show' : ''}`}>
          <div className="fld">
            <label>Payment Term</label>
            <select value={filters.pt} onChange={e => handleFilterChange('pt', e.target.value)}>
              <option value="">All</option>
              {ptOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="fld">
            <label>Profile Class</label>
            <select value={filters.pc} onChange={e => handleFilterChange('pc', e.target.value)}>
              <option value="">All</option>
              <option>EXPORT</option><option>DOMESTIC</option><option>SCRAP</option>
            </select>
          </div>
          <div className="fld">
            <label>Status</label>
            <select value={filters.status} onChange={e => handleFilterChange('status', e.target.value)}>
              <option value="">All</option>
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
          <div className="fld">
            <label>City</label>
            <input placeholder="City" value={filters.city} onChange={e => handleFilterChange('city', e.target.value)} />
          </div>
          <div className="fld">
            <label>PAN Number</label>
            <input placeholder="PAN" value={filters.pan} onChange={e => handleFilterChange('pan', e.target.value)} />
          </div>
          <div className="fld">
            <label>Created After</label>
            <input type="date" value={filters.date} onChange={e => handleFilterChange('date', e.target.value)} />
          </div>
        </div>

        <div className="filter-actions">
          <button className="btn btn-primary" onClick={() => {}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Search
          </button>
          <button className="btn btn-ghost" onClick={resetFilters}>Reset</button>
          <button className="btn btn-link" onClick={() => setShowMoreFilters(!showMoreFilters)}>
            {showMoreFilters ? '– Fewer filters' : '+ Add more filters'}
          </button>
          <div className="spacer"></div>
          <span className="mini" style={{ color: 'var(--muted)' }}>
            Tip: pick a Sales Person, then <b>Modify</b> or <b>Find &amp; Replace</b> in bulk
          </span>
        </div>
      </div>

      {/* Results Toolbar */}
      <div className="res-tool">
        <label className="chk">
          <input 
            type="checkbox" 
            checked={isAllSelected} 
            ref={input => { if (input) input.indeterminate = isIndeterminate; }} 
            onChange={toggleSelectAll} 
          /> 
          Select all
        </label>
        <div className="count">
          {filtered.length} <span>customer{filtered.length !== 1 ? 's' : ''}{filtered.length !== CUSTOMERS.length ? ' matched' : ''}</span>
        </div>
        <div className="spacer"></div>
        <label className="dq-toggle">
          <input 
            type="checkbox" 
            style={{ accentColor: 'var(--amber)' }} 
            checked={filters.dqOnly} 
            onChange={e => handleFilterChange('dqOnly', e.target.checked)} 
          /> 
          Only data-quality issues
        </label>
        <div className="mini">
          Group by:
          <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
            <option value="salesperson">Sales Person</option>
            <option value="country">Country</option>
            <option value="region">Region</option>
            <option value="operatingUnit">Operating Unit</option>
            <option value="paymentTerm">Payment Term</option>
            <option value="none">None (flat list)</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      <div className="results">
        {filtered.length === 0 ? (
          <div className="empty">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <div>No customers match your filters.</div>
          </div>
        ) : groupBy === 'none' ? (
          filtered.map(c => (
            <CustomerCard 
              key={c.id} 
              c={c} 
              selected={selectedIds.has(c.id)}
              onSelect={toggleSelect}
              isExpanded={expandedIds.has(c.id)}
              onToggleExpand={toggleExpand}
            />
          ))
        ) : (
          Object.keys(groupedBuckets).sort().map(k => {
            const items = groupedBuckets[k];
            const isCollapsed = collapsedBuckets.has(k);
            return (
              <div className="bucket" key={k}>
                <div className={`bucket-head ${isCollapsed ? 'collapsed' : ''}`} onClick={() => toggleBucket(k)}>
                  <svg className="chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                  <span className="bucket-tag">{tagMap[groupBy]}</span>
                  <span className="bucket-name">{k}</span>
                  <span className="bucket-count">{items.length} customer{items.length !== 1 ? 's' : ''}</span>
                </div>
                <div className={`bucket-body ${isCollapsed ? 'hide' : ''}`}>
                  {items.map(c => (
                    <CustomerCard 
                      key={c.id} 
                      c={c} 
                      selected={selectedIds.has(c.id)}
                      onSelect={toggleSelect}
                      isExpanded={expandedIds.has(c.id)}
                      onToggleExpand={toggleExpand}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <ActionBar 
        selectedCount={selectedIds.size} 
        onClear={clearSelection}
        onModify={() => setIsModifyOpen(true)}
        onReplace={() => setIsReplaceOpen(true)}
      />

      <ModifyModal 
        isOpen={isModifyOpen} 
        onClose={() => setIsModifyOpen(false)} 
        selectedCustomers={selectedCustomers} 
        onSubmit={handleModifySubmit}
      />
      
      <ReplaceModal 
        isOpen={isReplaceOpen} 
        onClose={() => setIsReplaceOpen(false)} 
        selectedCustomers={selectedCustomers}
        onSubmit={handleReplaceSubmit}
      />

      <div className={`toast ${toast.show ? 'show' : ''}`}>
        <div className="tic">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <div>
          <div className="tt">{toast.title}</div>
          <div className="ts">{toast.sub}</div>
        </div>
      </div>

    </div>
  );
}
