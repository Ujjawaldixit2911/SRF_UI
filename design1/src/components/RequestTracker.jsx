import React from 'react';
import { RT_ACTIONABLE, RT_NONACT, RT_DRAFTS } from '../data/mockData';

export default function RequestTracker() {
  const stClass = (s) => {
    if (/SAVED/.test(s)) return 'saved';
    if (/ORACLE/.test(s)) return 'oracle';
    if (/FINANCE|POOL/.test(s)) return 'fin';
    if (/APPROV/.test(s)) return 'pend';
    return 'pend';
  };

  return (
    <div className="view active" id="view-tracker">
      <div className="rt-sec">
        <h2>Actionable Requests <span className="cnt">{RT_ACTIONABLE.length}</span></h2>
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
              {RT_ACTIONABLE.map((r, i) => (
                <tr key={i}>
                  <td className="rid">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2] || '—'}</td>
                  <td><span className={`st ${stClass(r[3])}`}>{r[3]}</span></td>
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

      <div className="rt-sec">
        <h2>Non-Actionable Requests <span className="cnt">{RT_NONACT.length}</span></h2>
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
              {RT_NONACT.map((r, i) => (
                <tr key={i}>
                  <td className="rid">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2] || '—'}</td>
                  <td><span className={`st ${stClass(r[3])}`}>{r[3]}</span></td>
                  <td>{r[4]}</td>
                  <td>{r[5]}</td>
                  <td>{r[6]}</td>
                  <td>{r[7]}</td>
                  <td>{r[8]}</td>
                  <td>{r[9]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rt-sec">
        <h2>Drafts <span className="cnt">{RT_DRAFTS.length}</span></h2>
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
              {RT_DRAFTS.map((r, i) => (
                <tr key={i}>
                  <td className="rid">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td><span className="st saved">{r[2]}</span></td>
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
  );
}
