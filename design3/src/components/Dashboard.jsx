import React, { useState, useMemo } from 'react';
import { CUSTOMERS } from '../data/mockData';

export default function Dashboard({ isActive, selectedIds, toggleSelect }) {
  const [filters, setFilters] = useState({ name: '', sp: '', pc: '', country: '', region: '', acct: '', ou: '', status: '', city: '' });
  const [groupBy, setGroupBy] = useState('none');
  const [dqOnly, setDqOnly] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const getOptions = (key) => [...new Set(CUSTOMERS.map(c => c[key]).filter(Boolean))].sort();
  const spOptions = getOptions('salesperson');
  const countryOptions = getOptions('country');
  const regionOptions = getOptions('region');
  const ouOptions = getOptions('operatingUnit');
  const statusOptions = getOptions('status');

  const toggleExpand = (id) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedIds(next);
  };

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

  const stats = useMemo(() => {
    return {
      active: CUSTOMERS.filter(c => c.status === 'Active').length,
      errors: CUSTOMERS.filter(c => c.flags && c.flags.length > 0).length,
      total: CUSTOMERS.length
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="view active" id="view-dash">
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

      <div style={{ marginBottom: '16px', background: '#1e293b', padding: '12px 20px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', display: 'inline-block' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f8fafc', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Customer Details & Filters
        </h2>
      </div>

      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="tb-group search-group">
            <input placeholder="Search Name/No." value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})}/>
          </div>
          <div className="tb-divider"></div>
          <div className="tb-group">
            <select value={filters.sp} onChange={e => setFilters({...filters, sp: e.target.value})}>
              <option value="">All Sales Reps</option>
              {spOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="tb-group">
            <select value={filters.pc} onChange={e => setFilters({...filters, pc: e.target.value})}>
              <option value="">Profile Class</option>
              <option>EXPORT</option>
              <option>DOMESTIC</option>
            </select>
          </div>
          <div className="tb-group">
            <button className="tb-btn-link" onClick={() => setShowMore(!showMore)} style={{background:'transparent', border:'none', color:'var(--blue)', cursor:'pointer', fontWeight:'600'}}>
              {showMore ? '- Less' : '+ More'}
            </button>
          </div>
          <div className="tb-divider"></div>
          <div className="tb-group">
            <label className="tb-chk">
              <input type="checkbox" checked={dqOnly} onChange={e => setDqOnly(e.target.checked)}/> Only Issues
            </label>
          </div>
          <div className="tb-divider"></div>
          <div className="tb-group">
            <label>Group By:</label>
            <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
              <option value="none">None</option>
              <option value="salesperson">Sales Person</option>
              <option value="region">Region</option>
            </select>
          </div>
          <div className="tb-spacer"></div>
          <div className="tb-group">
            <span className="tb-count">{filteredData.length} Records</span>
            <button className="tb-btn-primary">Apply</button>
          </div>
        </div>

        {showMore && (
          <div className="table-toolbar" style={{borderTop: 'none', background: '#fafbfc'}}>
            <div className="tb-group">
              <label>Country</label>
              <select value={filters.country} onChange={e => setFilters({...filters, country: e.target.value})}>
                <option value="">All</option>
                {countryOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="tb-group">
              <label>Region</label>
              <select value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})}>
                <option value="">All</option>
                {regionOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="tb-group">
              <label>Account No.</label>
              <input placeholder="e.g. 3210..." value={filters.acct} onChange={e => setFilters({...filters, acct: e.target.value})} />
            </div>
            <div className="tb-group">
              <label>Operating Unit</label>
              <select value={filters.ou} onChange={e => setFilters({...filters, ou: e.target.value})}>
                <option value="">All</option>
                {ouOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="tb-group">
              <label>Status</label>
              <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                <option value="">All</option>
                {statusOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="tb-group">
              <label>City</label>
              <input placeholder="City Name" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} />
            </div>
          </div>
        )}

        <div className="table-scroll">
          <table className="dense-table">
            <thead>
              <tr>
                <th className="t-chk"><input type="checkbox" checked={selectedIds.size === filteredData.length && filteredData.length > 0} onChange={() => {}}/></th>
                <th className="t-exp">For more information</th>
                <th>Name & Number</th>
                <th>Sales Rep</th>
                <th>Region</th>
                <th>Profile</th>
                <th>Status</th>
                <th>Data Quality</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan="8" className="no-data">No data found matching your filters.</td></tr>
              ) : grouped ? (
                Object.entries(grouped).map(([gName, items]) => (
                  <React.Fragment key={gName}>
                    <tr className="group-header"><td colSpan="8"><b>{gName} ({items.length})</b></td></tr>
                    {items.map(cust => <OracleRow key={cust.id} cust={cust} selectedIds={selectedIds} toggleSelect={toggleSelect} expanded={expandedIds.has(cust.id)} toggleExpand={toggleExpand} />)}
                  </React.Fragment>
                ))
              ) : (
                filteredData.map(cust => <OracleRow key={cust.id} cust={cust} selectedIds={selectedIds} toggleSelect={toggleSelect} expanded={expandedIds.has(cust.id)} toggleExpand={toggleExpand} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OracleRow({ cust, selectedIds, toggleSelect, expanded, toggleExpand }) {
  const isSel = selectedIds.has(cust.id);
  const hasErr = cust.flags && cust.flags.length > 0;
  return (
    <React.Fragment>
      <tr className={`data-row ${isSel ? 'selected' : ''}`}>
        <td className="t-chk"><input type="checkbox" checked={isSel} onChange={() => toggleSelect(cust.id)}/></td>
        <td className="t-exp"><button className="expand-ico" onClick={() => toggleExpand(cust.id)}>{expanded ? '−' : '+'}</button></td>
        <td>
          <div className="c-name">{cust.name}</div>
          <div className="c-no">{cust.custNo}</div>
        </td>
        <td>{cust.salesperson}</td>
        <td>{cust.region}</td>
        <td><span className={cust.profileClass === 'EXPORT' ? 'badge b-export' : 'badge b-domestic'}>{cust.profileClass}</span></td>
        <td><span className={`c-stat ${cust.status === 'Active' ? 's-active' : 's-inactive'}`}>{cust.status}</span></td>
        <td>{hasErr ? <div className="c-err">{cust.flags.length} Issue(s)</div> : <div className="c-ok">Valid</div>}</td>
      </tr>
      {expanded && (
        <tr className="sub-row">
          <td></td>
          <td colSpan="7" className="sub-cell">
            <div className="nested-wrapper">
              <div className="na-head">Sites & Accounts</div>
              <table className="nested-table">
                <thead>
                  <tr>
                    <th>Account No</th>
                    <th>Site No / Name</th>
                    <th>Operating Unit</th>
                    <th>Status</th>
                    <th>Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {cust.accounts && cust.accounts.map(acc => (
                    (acc.sites || []).map(site => (
                      <tr key={site.siteNo}>
                        <td><b>{acc.accNo}</b></td>
                        <td>{site.siteNo} - {site.siteName}</td>
                        <td>{site.ou}</td>
                        <td><span className="s-active">Active</span></td>
                        <td>
                          {hasErr ? <span className="s-err">⚠ View Dashboard</span> : <span style={{color:'var(--green)'}}>None</span>}
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
