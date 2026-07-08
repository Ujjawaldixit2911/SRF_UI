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
          
          {/* Hero KPIs */}
          <div className="hero-kpis">
            <div className="hero-card accent">
              <div className="hc-title">Total Customers</div>
              <div className="hc-val">{CUSTOMERS.length}</div>
              <div className="hc-sub">Master DB Records</div>
            </div>
            <div className="hero-card">
              <div className="hc-title">Active Customers</div>
              <div className="hc-val">{activeCount}</div>
              <div className="hc-sub">Can transact</div>
            </div>
            <div className="hero-card error">
              <div className="hc-title">Data Quality Issues</div>
              <div className="hc-val">{dataIssuesCount}</div>
              <div className="hc-sub">Require immediate fix</div>
            </div>
          </div>

          <div className="minor-kpis">
            <div className="mkpi k-blue">Pending Approvals: <b>{RT_ACTIONABLE.length}</b></div>
            <div className="mkpi k-green">New This Month: <b>24</b></div>
            <div className="mkpi k-amber">Dormant Accounts: <b>15</b></div>
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
