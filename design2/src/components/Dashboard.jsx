import React, { useState, useMemo } from 'react';
import { CUSTOMERS, RT_ACTIONABLE } from '../data/mockData';

export default function Dashboard({ isActive, selectedIds, toggleSelect }) {
  const [filters, setFilters] = useState({ name: '', sp: '', pc: '', country: '', region: '', acct: '', ou: '', status: '', city: '' });
  const [groupBy, setGroupBy] = useState('none');
  const [dqOnly, setDqOnly] = useState(false);

  const getOptions = (key) => [...new Set(CUSTOMERS.map(c => c[key]).filter(Boolean))].sort();
  const spOptions = getOptions('salesperson');
  const countryOptions = getOptions('country');
  const regionOptions = getOptions('region');
  const ouOptions = getOptions('operatingUnit');
  const statusOptions = getOptions('status');
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedIds(next);
  };

  const activeCount = useMemo(() => CUSTOMERS.filter(c => c.status === 'Active').length, []);
  const dataIssuesCount = useMemo(() => CUSTOMERS.filter(c => c.flags && c.flags.length > 0).length, []);
  
  const filteredData = useMemo(() => {
    return CUSTOMERS.filter(c => {
      if (dqOnly && (!c.flags || c.flags.length === 0)) return false;
      if (filters.name && !c.name.toLowerCase().includes(filters.name.toLowerCase()) && (!c.custNo || !c.custNo.toLowerCase().includes(filters.name.toLowerCase()))) return false;
      if (filters.sp && c.salesperson !== filters.sp) return false;
      if (filters.pc && c.profileClass !== filters.pc) return false;
      if (filters.country && c.country !== filters.country) return false;
      if (filters.region && c.region !== filters.region) return false;
      if (filters.ou && c.operatingUnit !== filters.ou) return false;
      if (filters.status && c.status !== filters.status) return false;
      if (filters.city && (!c.city || !c.city.toLowerCase().includes(filters.city.toLowerCase()))) return false;
      if (filters.acct) {
        const hasAcct = c.accounts && c.accounts.some(a => a.accNo && a.accNo.includes(filters.acct));
        if (!hasAcct) return false;
      }
      return true;
    });
  }, [filters, dqOnly]);

  const grouped = useMemo(() => {
    if (groupBy === 'none') return null;
    const groups = {};
    filteredData.forEach(c => {
      let key = 'Other';
      if (groupBy === 'salesperson') key = c.salesperson || 'Unassigned';
      if (groupBy === 'region') key = c.region || 'Unknown Region';
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });
    return groups;
  }, [filteredData, groupBy]);

  if (!isActive) return null;

  return (
    <div className="view active" id="view-dash">
      <div className="dashboard-split">
        {/* Left Filter Sidebar */}
        <div className="filter-sidebar">
          <div className="fs-header">
            <h3>Filters</h3>
            <button className="reset-btn" onClick={() => setFilters({name:'', sp:'', pc:'', country:'', region:'', acct:'', ou:'', status:'', city:''})}>Reset</button>
          </div>
          <div className="fs-body">
            <div className="f-group">
              <label>Search Name / No.</label>
              <input placeholder="e.g. Acme Corp" value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})}/>
            </div>

            <div className="f-group">
              <label>Account No.</label>
              <input placeholder="e.g. 3210..." value={filters.acct} onChange={e => setFilters({...filters, acct: e.target.value})} />
            </div>

            <div className="f-group">
              <label>Match Type</label>
              <div className="fs-seg">
                <button className="on">ALL (AND)</button>
                <button>ANY (OR)</button>
              </div>
            </div>

            <div className="f-group">
              <label>Sales Person</label>
              <select value={filters.sp} onChange={e => setFilters({...filters, sp: e.target.value})}>
                <option value="">All Personnel</option>
                {spOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            
            <div className="f-group">
              <label>Country</label>
              <select value={filters.country} onChange={e => setFilters({...filters, country: e.target.value})}>
                <option value="">All Countries</option>
                {countryOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="f-group">
              <label>Region</label>
              <select value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})}>
                <option value="">All Regions</option>
                {regionOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="f-group">
              <label>Operating Unit</label>
              <select value={filters.ou} onChange={e => setFilters({...filters, ou: e.target.value})}>
                <option value="">All Units</option>
                {ouOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="f-group">
              <label>Profile Class</label>
              <select value={filters.pc} onChange={e => setFilters({...filters, pc: e.target.value})}>
                <option value="">All Classes</option>
                <option>EXPORT</option>
                <option>DOMESTIC</option>
              </select>
            </div>

            <div className="f-group">
              <label>Status</label>
              <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                <option value="">All Statuses</option>
                {statusOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="f-group">
              <label>City</label>
              <input placeholder="City Name" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} />
            </div>

            <hr className="fs-divider" />

            <label className="fs-chk">
              <input type="checkbox" checked={dqOnly} onChange={e => setDqOnly(e.target.checked)}/> 
              Show ONLY Issues
            </label>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main">
          
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Total Customers', val: '2,418', color: '#3b82f6', bg: '#eff6ff', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { label: 'Active', val: '2,190', color: '#10b981', bg: '#ecfdf5', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
              { label: 'Inactive', val: '228', color: '#64748b', bg: '#f1f5f9', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> },
              { label: 'Countries', val: '63', color: '#8b5cf6', bg: '#f5f3ff', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              { label: 'Regions', val: '11', color: '#8b5cf6', bg: '#f5f3ff', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
              { label: 'New (30d)', val: '47', color: '#0ea5e9', bg: '#f0f9ff', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg> },
              { label: 'Modified (30d)', val: '132', color: '#f59e0b', bg: '#fffbeb', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
              { label: 'Data Issues', val: '96', color: '#ef4444', bg: '#fef2f2', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
            ].map((k, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '12px 16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}} onMouseLeave={e => {e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</div>
                  <div style={{ background: k.bg, color: k.color, padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{k.icon}</div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>{k.val}</div>
              </div>
            ))}
          </div>

          <div className="table-wrapper">
            <div className="table-toolbar">
              <div className="tt-left">
                Viewing <b>{filteredData.length}</b> records
              </div>
              <div className="tt-right">
                <button className="btn-export">Export Excel</button>
              </div>
            </div>

            <table className="stripe-table">
              <thead>
                <tr>
                  <th className="th-chk">
                    <input type="checkbox" checked={selectedIds.size === filteredData.length && filteredData.length > 0} onChange={() => {}} />
                  </th>
                  <th className="th-act"></th>
                  <th>Customer</th>
                  <th>Sales Rep</th>
                  <th>Profile</th>
                  <th>Status</th>
                  <th>Data Quality</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">No customers match your filters.</td>
                  </tr>
                ) : grouped ? (
                  Object.entries(grouped).map(([gName, items]) => (
                    <React.Fragment key={gName}>
                      <tr className="group-row">
                        <td colSpan="7">
                          <div className="grp-label">
                            <span className="gt">Group:</span>
                            <span className="gn">{gName}</span>
                            <span className="gc">{items.length} records</span>
                          </div>
                        </td>
                      </tr>
                      {items.map(cust => <StripeRow key={cust.id} cust={cust} selectedIds={selectedIds} toggleSelect={toggleSelect} expanded={expandedIds.has(cust.id)} toggleExpand={toggleExpand} />)}
                    </React.Fragment>
                  ))
                ) : (
                  filteredData.map(cust => <StripeRow key={cust.id} cust={cust} selectedIds={selectedIds} toggleSelect={toggleSelect} expanded={expandedIds.has(cust.id)} toggleExpand={toggleExpand} />)
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StripeRow({ cust, selectedIds, toggleSelect, expanded, toggleExpand }) {
  const isSel = selectedIds.has(cust.id);
  const hasErrors = cust.flags && cust.flags.length > 0;
  
  return (
    <React.Fragment>
      <tr className={isSel ? 'selected' : ''}>
        <td className="td-chk"><input type="checkbox" checked={isSel} onChange={() => toggleSelect(cust.id)}/></td>
        <td className="td-act">
          <button className={`exp-btn ${expanded ? 'open' : ''}`} onClick={() => toggleExpand(cust.id)}>
            {expanded ? 'Close' : 'View'}
          </button>
        </td>
        <td>
          <div className="td-name">{cust.name}</div>
          <div className="td-no">{cust.custNo}</div>
        </td>
        <td>
          <div className="td-text" style={{fontWeight: '600', color: 'var(--navy)'}}>{cust.salesperson}</div>
        </td>
        <td><span className={`pill p-${(cust.profileClass || '').toLowerCase()}`}>{cust.profileClass}</span></td>
        <td>
          <div className="status-dot-wrap">
            <span className={`status-dot ${cust.status === 'Active' ? 'd-active' : 'd-inactive'}`}></span>
            {cust.status}
          </div>
        </td>
        <td>
          {hasErrors ? (
            <div className="flags">
              {cust.flags.map((f, i) => <span key={i} className="flag">⚠ {f}</span>)}
            </div>
          ) : (
            <span style={{color: 'var(--green)', fontWeight: '600', fontSize: '12px'}}>✓ OK</span>
          )}
        </td>
      </tr>
      
      {expanded && (
        <tr className="expanded-row">
          <td colSpan="7">
            <div className="exp-inner">
              <div className="acct-box">
                <div className="acct-title">Associated Accounts & Sites</div>
                <table className="sub-table">
                  <thead>
                    <tr>
                      <th>Account</th>
                      <th>Site Name</th>
                      <th>Operating Unit</th>
                      <th>Region / Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cust.accounts && cust.accounts.map(acc => (
                      (acc.sites || []).map(site => (
                        <tr key={site.siteNo}>
                          <td style={{ verticalAlign: 'top', paddingTop: '16px', paddingBottom: '16px' }}>
                            <div className="st-name" style={{ lineHeight: '1.4', marginBottom: '8px' }}>{acc.accName}</div>
                            <span className="td-no">{acc.accNo}</span>
                          </td>
                          <td style={{ verticalAlign: 'top', paddingTop: '16px', paddingBottom: '16px' }}>
                            <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '13px', lineHeight: '1.4', marginBottom: '8px' }}>{site.siteName}</div>
                            <span style={{ fontSize: '11px', color: 'var(--muted)', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--line2)', display: 'inline-block' }}>
                              {site.siteNo} &bull; {site.useCode}
                            </span>
                          </td>
                          <td style={{ verticalAlign: 'top', paddingTop: '16px', paddingBottom: '16px' }}>
                            <span className="ppill">{site.ou}</span>
                          </td>
                          <td style={{ verticalAlign: 'top', paddingTop: '16px', paddingBottom: '16px' }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--muted)', lineHeight: '1.4' }}>
                              {cust.region} / {cust.country}
                            </div>
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
