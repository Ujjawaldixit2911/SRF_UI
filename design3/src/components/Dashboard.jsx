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
      <div className="kpi-ticker">
        <div className="ticker-item"><span className="t-lbl">Total Customers:</span><span className="t-val">{stats.total}</span></div><span className="ticker-sep">|</span>
        <div className="ticker-item"><span className="t-lbl">Active Accounts:</span><span className="t-val green">{stats.active}</span></div><span className="ticker-sep">|</span>
        <div className="ticker-item"><span className="t-lbl">Data Issues:</span><span className="t-val red">{stats.errors}</span></div>
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
