import React from 'react';

function Badge({ cls, txt }) {
  if (!txt) return null;
  return <span className={`badge ${cls}`}>{txt}</span>;
}

export default function CustomerCard({ c, selected, onSelect, isExpanded, onToggleExpand }) {
  const nSites = c.accounts.reduce((n, a) => n + a.sites.length, 0);
  
  const flags = c.flags.map((f, i) => {
    const err = /mismatch|Inactive|Invalid/i.test(f);
    return (
      <span key={i} className={`flag ${err ? 'err' : ''}`}>
        ⚠ {f}
      </span>
    );
  });

  return (
    <div className={`cust ${selected ? 'sel' : ''}`} data-id={c.id}>
      <div className="cust-row">
        <input 
          type="checkbox" 
          className="box" 
          checked={selected} 
          onChange={(e) => onSelect(c.id, e.target.checked)} 
        />
        <div className="cust-main">
          <div className="cust-title">
            <span className="nm">{c.name}</span>
            <span className="no">{c.custNo}</span>
            <Badge cls="b-ou" txt={c.operatingUnit} />
            <Badge cls="b-reg" txt={c.region} />
            <Badge cls="b-ctry" txt={c.country} />
            <Badge cls={c.status === 'Active' ? 'b-active' : 'b-inactive'} txt={c.status} />
            <Badge cls={c.profileClass === 'EXPORT' ? 'b-export' : 'b-domestic'} txt={c.profileClass} />
          </div>
          <div className="cust-sub">
            <span className="kv">Sales Person <b>{c.salesperson || '—'}</b></span>
            <span className="kv">Email <b>{c.email || <span className="warn-cell">missing</span>}</b></span>
            <span className="kv">Payment Term <b>{c.paymentTerm || <span className="warn-cell">missing</span>}</b></span>
            <span className="kv">Credit Limit <b>{c.creditLimit}</b></span>
            <span className="kv">Sites <b>{nSites}</b></span>
            {c.pan && <span className="kv">PAN <b>{c.pan}</b></span>}
          </div>
          {flags.length > 0 && (
            <div className="flags" style={{ marginTop: '7px' }}>
              {flags}
            </div>
          )}
        </div>
        <div className="cust-right">
          <button 
            className={`expand-btn ${isExpanded ? 'open' : ''}`} 
            onClick={() => onToggleExpand(c.id)} 
            title="Expand"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className={`detail ${isExpanded ? 'show' : ''}`} id={`det-${c.id}`}>
        {c.accounts.map((a, i) => (
          <div className="acct" key={i}>
            <div className="acct-head">
              <div className="ic">A</div>
              <div><div className="an">{a.accName}</div></div>
              <span className="anum">#{a.accNo}</span>
              <div className="acct-meta">
                <span className="kv">Status <b>{a.status}</b></span>
                <span className="kv">Currency <b>{a.currency}</b></span>
                <span className="kv">Credit Limit <b>{a.currency} {a.creditLimit}</b></span>
              </div>
            </div>
            <div className="sites-wrap">
              <div className="sites-title">Sites · {a.sites.length}</div>
              <table className="sites">
                <thead>
                  <tr>
                    <th>Site No.</th>
                    <th>Site Name</th>
                    <th>Use</th>
                    <th>Country / City</th>
                    <th>Sales Person</th>
                    <th>Email</th>
                    <th>Payment Term</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {a.sites.map((s, j) => (
                    <tr key={j}>
                      <td style={{ fontFamily: 'monospace' }}>{s.siteNo}</td>
                      <td>{s.siteName}</td>
                      <td>{s.useCode}</td>
                      <td>{s.country} / {s.city}</td>
                      <td>{s.salesperson || <span className="warn-cell">—</span>}</td>
                      <td>{s.email || <span className="warn-cell">missing</span>}</td>
                      <td>{s.paymentTerm || <span className="warn-cell">missing</span>}</td>
                      <td>
                        <span className={`pill ${s.status === 'Active' ? 'on' : 'off'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
