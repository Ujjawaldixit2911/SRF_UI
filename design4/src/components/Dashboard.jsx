import React, { useState, useMemo } from 'react';
import { CUSTOMERS, RT_ACTIONABLE } from '../data/mockData';

export default function Dashboard({ isActive, selectedIds, toggleSelect }) {
  const [filters, setFilters] = useState({ name: '', sp: '', pc: '', country: '', region: '', acct: '', ou: '', status: '', city: '' });
  const [groupBy, setGroupBy] = useState('none');
  const [dqOnly, setDqOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const getOptions = (key) => [...new Set(CUSTOMERS.map(c => c[key]).filter(Boolean))].sort();
  const spOptions = getOptions('salesperson');
  const countryOptions = getOptions('country');
  const regionOptions = getOptions('region');
  const ouOptions = getOptions('operatingUnit');
  const statusOptions = getOptions('status');

  const toggleExpand = (id) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
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

  const activeCount = useMemo(() => CUSTOMERS.filter(c => c.status === 'Active').length, []);
  const issueCount = useMemo(() => CUSTOMERS.filter(c => c.flags && c.flags.length > 0).length, []);
  const pendingCount = RT_ACTIONABLE.length;

  if (!isActive) return null;

  return (
    <div className="view active" id="view-dash">
      
      {/* Corporate KPIs */}
      <div className="corp-kpis">
        <div className="kpi-card">
          <div className="kpi-title">Total Customers</div>
          <div className="kpi-val">{CUSTOMERS.length}</div>
          <div className="kpi-sub">Total records in master</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Active Accounts</div>
          <div className="kpi-val text-green">{activeCount}</div>
          <div className="kpi-sub">+12% from last month</div>
        </div>
        <div className="kpi-card error">
          <div className="kpi-title">Data Quality Issues</div>
          <div className="kpi-val text-red">{issueCount}</div>
          <div className="kpi-sub">Action required to push to ERP</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending Requests</div>
          <div className="kpi-val text-blue">{pendingCount}</div>
          <div className="kpi-sub">Awaiting approval in Tracker</div>
        </div>
      </div>

      {/* Advanced Filter Accordion */}
      <div className="corp-panel mb-4" style={{marginTop: '24px'}}>
        <div className="panel-header" onClick={() => setShowFilters(!showFilters)} style={{cursor: 'pointer'}}>
          <div className="ph-title">
            <span className="icon">🔍</span> Advanced Search & Filters
          </div>
          <div className="ph-action">
            {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </div>
        </div>
        
        {showFilters && (
          <div className="panel-body bg-gray">
            <div className="filter-grid">
              <div className="fg-item">
                <label>Search Name / No.</label>
                <input type="text" placeholder="e.g. Acme Corp" value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})} />
              </div>
              <div className="fg-item">
                <label>Sales Person</label>
                <select value={filters.sp} onChange={e => setFilters({...filters, sp: e.target.value})}>
                  <option value="">All Personnel</option>
                  {spOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="fg-item">
                <label>Profile Class</label>
                <select value={filters.pc} onChange={e => setFilters({...filters, pc: e.target.value})}>
                  <option value="">All Classes</option>
                  <option>EXPORT</option>
                  <option>DOMESTIC</option>
                </select>
              </div>
              <div className="fg-item">
                <label>Country</label>
                <select value={filters.country} onChange={e => setFilters({...filters, country: e.target.value})}>
                  <option value="">All Countries</option>
                  {countryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="fg-item">
                <label>Region</label>
                <select value={filters.region} onChange={e => setFilters({...filters, region: e.target.value})}>
                  <option value="">All Regions</option>
                  {regionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="fg-item">
                <label>Account No.</label>
                <input type="text" placeholder="e.g. 3210..." value={filters.acct} onChange={e => setFilters({...filters, acct: e.target.value})} />
              </div>
              <div className="fg-item">
                <label>Operating Unit</label>
                <select value={filters.ou} onChange={e => setFilters({...filters, ou: e.target.value})}>
                  <option value="">All Units</option>
                  {ouOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="fg-item">
                <label>Status</label>
                <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                  <option value="">All Statuses</option>
                  {statusOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="fg-item">
                <label>City</label>
                <input type="text" placeholder="City Name" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} />
              </div>
              <div className="fg-item">
                <label>Group By</label>
                <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
                  <option value="none">Flat List</option>
                  <option value="salesperson">Sales Person</option>
                  <option value="region">Region</option>
                </select>
              </div>
              
              <div className="fg-item fg-full flex-row">
                <label className="checkbox-label">
                  <input type="checkbox" checked={dqOnly} onChange={e => setDqOnly(e.target.checked)}/> 
                  Show ONLY Records with Data Quality Issues
                </label>
                <button className="btn btn-primary ml-auto" onClick={() => setShowFilters(false)}>Apply Filters</button>
                <button className="btn btn-outline" style={{marginLeft: '8px'}} onClick={() => {setFilters({name:'', sp:'', pc:'', country:'', region:'', acct:'', ou:'', status:'', city:''}); setDqOnly(false); setGroupBy('none');}}>Reset</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Corporate Data Table */}
      <div className="corp-panel">
        <div className="panel-header">
          <div className="ph-title">
            Customer Master Data <span className="badge">{filteredData.length} Records</span>
          </div>
          <div className="ph-actions">
            <button className="btn btn-outline">Export XLS</button>
            <button className="btn btn-outline">Bulk Edit</button>
            <button className="btn btn-primary">+ New Customer</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="corp-table">
            <thead>
              <tr>
                <th className="t-chk"><input type="checkbox" onChange={() => {}} checked={selectedIds.size === filteredData.length && filteredData.length > 0} /></th>
                <th className="t-exp"></th>
                <th>Customer Name</th>
                <th>Account No.</th>
                <th>Sales Person</th>
                <th>Profile Class</th>
                <th>Status</th>
                <th>Data Quality</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">No records found matching your filters.</td>
                </tr>
              ) : grouped ? (
                Object.entries(grouped).map(([gName, items]) => (
                  <React.Fragment key={gName}>
                    <tr className="group-row">
                      <td colSpan="8">
                        <span className="grp-label">Group:</span> <span className="grp-val">{gName}</span> <span className="badge">{items.length}</span>
                      </td>
                    </tr>
                    {items.map(c => <CustomerRow key={c.id} c={c} selectedIds={selectedIds} toggleSelect={toggleSelect} expanded={expandedIds.has(c.id)} toggleExpand={toggleExpand} />)}
                  </React.Fragment>
                ))
              ) : (
                filteredData.map(c => <CustomerRow key={c.id} c={c} selectedIds={selectedIds} toggleSelect={toggleSelect} expanded={expandedIds.has(c.id)} toggleExpand={toggleExpand} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomerRow({ c, selectedIds, toggleSelect, expanded, toggleExpand }) {
  const isSel = selectedIds.has(c.id);
  const hasErrors = c.flags && c.flags.length > 0;
  
  return (
    <React.Fragment>
      <tr className={`data-row ${isSel ? 'selected' : ''}`}>
        <td className="t-chk"><input type="checkbox" checked={isSel} onChange={() => toggleSelect(c.id)} /></td>
        <td className="t-exp">
          <button className="exp-btn" onClick={() => toggleExpand(c.id)}>{expanded ? '▼' : '▶'}</button>
        </td>
        <td className="font-bold text-navy">{c.name}</td>
        <td className="font-mono text-muted">{c.custNo}</td>
        <td>{c.salesperson}</td>
        <td><span className={`pill ${c.profileClass === 'EXPORT' ? 'pill-export' : 'pill-domestic'}`}>{c.profileClass}</span></td>
        <td>
          <span className={`status-badge ${c.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
            <span className="dot"></span> {c.status}
          </span>
        </td>
        <td>
          {hasErrors ? (
            <span className="text-red font-bold">⚠ {c.flags.length} Issue(s)</span>
          ) : (
            <span className="text-green font-bold">✓ Valid</span>
          )}
        </td>
      </tr>

      {expanded && (
        <tr className="expanded-row">
          <td></td>
          <td colSpan="7">
            <div className="sub-panel">
              <div className="sp-header">Associated Sites & Accounts</div>
              <table className="sub-table">
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>Account No</th>
                    <th>Region</th>
                    <th>City</th>
                    <th>Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {c.accounts && c.accounts.map(acc => (
                    (acc.sites || []).map(site => (
                      <tr key={site.siteNo}>
                        <td className="font-bold text-navy">{site.siteName}</td>
                        <td className="font-mono">{acc.accNo}</td>
                        <td>{c.region}</td>
                        <td>{site.city}</td>
                        <td>
                          {hasErrors ? (
                            <span className="text-red text-sm font-bold">⚠ See Dashboard</span>
                          ) : (
                            <span className="text-green text-sm">✓ None</span>
                          )}
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
