import React, { useState } from 'react';
import { RT_ACTIONABLE, RT_NONACT, RT_DRAFTS } from '../data/mockData';

export default function RequestTracker() {
  const [expanded, setExpanded] = useState({ act: false, nonact: false, drafts: false });

  const stClass = (s) => {
    if (/SAVED/.test(s)) return 'saved';
    if (/ORACLE/.test(s)) return 'oracle';
    if (/FINANCE|POOL/.test(s)) return 'fin';
    if (/APPROV/.test(s)) return 'pend';
    return 'pend';
  };

  const toggle = (key) => setExpanded({ ...expanded, [key]: !expanded[key] });

  const assigneeCounts = RT_NONACT.reduce((acc, r) => {
    const assignee = r[7] || 'Unassigned';
    acc[assignee] = (acc[assignee] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="view active" id="view-tracker" style={{display: 'flex', gap: '24px', alignItems: 'flex-start', flexDirection: 'row'}}>
      
      <div className="rt-main" style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px', maxHeight: '100%'}}>
        {/* Actionable */}
        <div className="rt-sec" style={{flex: 'none'}}>
          <h2>
            Actionable Requests <span className="cnt">{RT_ACTIONABLE.length}</span>
            {RT_ACTIONABLE.length > 5 && (
              <button onClick={() => toggle('act')} style={{marginLeft: 'auto', fontSize: '13px', color: 'var(--blue)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600'}}>
                {expanded.act ? 'Show Less' : `View All (${RT_ACTIONABLE.length})`}
              </button>
            )}
          </h2>
          <div className="tbl-wrap">
            <table className="rt">
              <thead>
                <tr>
                  <th>Request ID</th><th>Customer Name</th><th>PAN</th><th>Status</th>
                  <th>Request Type</th><th>Created On</th><th>Created By</th>
                  <th>Operating Unit</th><th>Business Unit</th>
                </tr>
              </thead>
              <tbody>
                {(expanded.act ? RT_ACTIONABLE : RT_ACTIONABLE.slice(0, 5)).map((r, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: '700', color: 'var(--navy)'}}>{r[0]}</td>
                    <td style={{fontWeight: '600'}}>{r[1]}</td>
                    <td style={{fontFamily: 'monospace'}}>{r[2] || '—'}</td>
                    <td><span className={`st-badge ${stClass(r[3])}`}>{r[3]}</span></td>
                    <td>{r[4]}</td>
                    <td>{r[5]}</td>
                    <td>{r[6]}</td>
                    <td>{r[7]}</td>
                    <td>{r[8] || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-Actionable */}
        <div className="rt-sec" style={{flex: 'none'}}>
          <h2>
            Non-Actionable Requests <span className="cnt">{RT_NONACT.length}</span>
            {RT_NONACT.length > 5 && (
              <button onClick={() => toggle('nonact')} style={{marginLeft: 'auto', fontSize: '13px', color: 'var(--blue)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600'}}>
                {expanded.nonact ? 'Show Less' : `View All (${RT_NONACT.length})`}
              </button>
            )}
          </h2>
          <div className="tbl-wrap">
            <table className="rt">
              <thead>
                <tr>
                  <th>Request ID</th><th>Customer Name</th><th>PAN</th><th>Status</th>
                  <th>Request Type</th><th>Created By</th><th>Created On</th>
                  <th>Assignee</th><th>Level</th><th>Operating Unit</th>
                </tr>
              </thead>
              <tbody>
                {(expanded.nonact ? RT_NONACT : RT_NONACT.slice(0, 5)).map((r, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: '700', color: 'var(--navy)'}}>{r[0]}</td>
                    <td style={{fontWeight: '600'}}>{r[1]}</td>
                    <td style={{fontFamily: 'monospace'}}>{r[2] || '—'}</td>
                    <td><span className={`st-badge ${stClass(r[3])}`}>{r[3]}</span></td>
                    <td>{r[4]}</td>
                    <td>{r[5]}</td>
                    <td>{r[6]}</td>
                    <td style={{fontWeight: '600', color: 'var(--navy)'}}>{r[7]}</td>
                    <td>{r[8]}</td>
                    <td>{r[9]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drafts */}
        <div className="rt-sec" style={{flex: 'none'}}>
          <h2>
            Drafts <span className="cnt">{RT_DRAFTS.length}</span>
            {RT_DRAFTS.length > 5 && (
              <button onClick={() => toggle('drafts')} style={{marginLeft: 'auto', fontSize: '13px', color: 'var(--blue)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600'}}>
                {expanded.drafts ? 'Show Less' : `View All (${RT_DRAFTS.length})`}
              </button>
            )}
          </h2>
          <div className="tbl-wrap">
            <table className="rt">
              <thead>
                <tr>
                  <th>Request ID</th><th>Customer Name</th><th>Status</th>
                  <th>Created By</th><th>Operating Unit</th><th>Business Unit</th>
                  <th>Created On</th><th>Request Type</th>
                </tr>
              </thead>
              <tbody>
                {(expanded.drafts ? RT_DRAFTS : RT_DRAFTS.slice(0, 5)).map((r, i) => (
                  <tr key={i}>
                    <td style={{fontWeight: '700', color: 'var(--navy)'}}>{r[0]}</td>
                    <td style={{fontWeight: '600'}}>{r[1]}</td>
                    <td><span className="st-badge saved">{r[2]}</span></td>
                    <td>{r[3]}</td>
                    <td>{r[4]}</td>
                    <td>{r[5] || '—'}</td>
                    <td>{r[6]}</td>
                    <td>{r[7]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Assignees Summary */}
      <div className="rt-sidebar" style={{width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div className="rt-sec" style={{flex: 'none'}}>
          <h2>Tasks by Assignee</h2>
          <div style={{padding: '20px'}}>
            <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--line)'}}>
              <div style={{fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px'}}>Assigned To Me</div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: '600', color: 'var(--navy)', fontSize: '14px'}}>My Actionable</span>
                <span style={{background: 'var(--blue)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold'}}>{RT_ACTIONABLE.length}</span>
              </div>
            </div>

            <div>
              <div style={{fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px'}}>Pending With Others</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {Object.entries(assigneeCounts).sort((a,b) => b[1] - a[1]).map(([name, count]) => (
                  <div key={name} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontWeight: '600', color: 'var(--navy)', fontSize: '13px'}}>{name}</span>
                    <span style={{background: 'var(--line2)', color: 'var(--navy)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold'}}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
