import React, { useState, useEffect } from 'react';
import { FIELD_META } from '../data/mockData';

const REPLACE_FIELDS = {
  salesperson: 'Sales Person',
  email: 'Email ID',
  paymentTerm: 'Payment Term',
  region: 'Region',
  profileClass: 'Profile Class',
  classification: 'Classification'
};

export function ModifyModal({ isOpen, onClose, selectedCustomers, onSubmit }) {
  const [step, setStep] = useState(1);
  const [modifyField, setModifyField] = useState(null);
  const [newVal, setNewVal] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setModifyField(null);
      setNewVal('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSites = selectedCustomers.reduce((n, c) => n + c.accounts.reduce((m, a) => m + a.sites.length, 0), 0);
  const m = modifyField ? FIELD_META[modifyField] : null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      if (!newVal) return;
      onSubmit(modifyField, newVal);
    }
  };

  const currentVal = (c, f) => {
    const map = {
      salesperson: c.salesperson,
      email: c.email,
      paymentTerm: c.paymentTerm,
      creditLimit: c.creditLimit,
      region: c.region,
      profileClass: c.profileClass,
      classification: c.classification,
      address: c.city + ' ' + (c.state || ''),
      accountTag: '—'
    };
    return map[f] !== undefined && map[f] !== '' ? map[f] : '—';
  };

  return (
    <div className="overlay show" onClick={(e) => { if(e.target.classList.contains('overlay')) onClose() }}>
      <div className="modal">
        <div className="modal-head">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            What do you want to update?
          </h3>
          <button className="x" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          {step === 1 && (
            <>
              <div className="step-lbl">Step 1 · Choose one field to update</div>
              <div className="info-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                Each request updates <b>one field</b> across all selected customers/sites — this keeps validation &amp; auditing clean.
              </div>
              <div className="field-grid">
                {Object.entries(FIELD_META).map(([k, meta]) => (
                  <div 
                    key={k} 
                    className={`field-opt ${modifyField === k ? 'on' : ''}`} 
                    onClick={() => setModifyField(k)}
                  >
                    <div className="fi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </div>
                    <div className="fn">{meta.name}</div>
                    <div className="fd">{meta.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && m && (
            <>
              <div className="step-lbl">Step 2 · Set new value for “{m.name}”</div>
              <div className="frm-row">
                <label>New {m.name}</label>
                {m.lov ? (
                  <select value={newVal} onChange={e => setNewVal(e.target.value)}>
                    <option value="">Select {m.name}…</option>
                    {m.lov.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input 
                    type={m.type || 'text'} 
                    placeholder={`Enter new ${m.name}…`}
                    value={newVal}
                    onChange={e => setNewVal(e.target.value)}
                  />
                )}
              </div>
              
              <div className="step-lbl" style={{ marginTop: '16px' }}>Preview · current → new</div>
              <table className="preview-tbl">
                <thead><tr><th>Customer</th><th>Current</th><th>New</th></tr></thead>
                <tbody>
                  {selectedCustomers.map(c => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td className="old">{currentVal(c, modifyField)}</td>
                      <td className="new">{newVal || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="approve-note">
                Approval flow for <b>{m.name}</b>:
                <div className="flow">
                  {m.flow.map((f, i) => (
                    <React.Fragment key={i}>
                      <span className="n">{f}</span>
                      {i < m.flow.length - 1 && <span className="a">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="modal-foot">
          <span className="mini" style={{ color: 'var(--muted)' }}>
            {selectedCustomers.length} customer(s) · {totalSites} site(s) selected
          </span>
          <div className="spacer"></div>
          {step === 2 && (
            <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
          )}
          <button 
            className="btn btn-primary" 
            disabled={!modifyField || (step === 2 && !newVal)} 
            onClick={handleNext}
          >
            {step === 1 ? 'Next' : 'Submit for Approval'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReplaceModal({ isOpen, onClose, selectedCustomers, onSubmit }) {
  const [rpField, setRpField] = useState(Object.keys(REPLACE_FIELDS)[0]);
  const [rpFind, setRpFind] = useState('');
  const [rpRepl, setRpRepl] = useState('');

  // Uniq available options
  const presentVals = [...new Set(selectedCustomers.map(c => c[rpField]).filter(Boolean))].sort();
  const m = FIELD_META[rpField];
  const lovOptions = (m && m.lov) ? m.lov : presentVals;

  useEffect(() => {
    if (isOpen) {
      setRpField(Object.keys(REPLACE_FIELDS)[0]);
    }
  }, [isOpen]);

  useEffect(() => {
    setRpFind(presentVals[0] || '');
    setRpRepl(lovOptions[0] || '');
  }, [rpField, presentVals.length, lovOptions.length]);

  if (!isOpen) return null;

  return (
    <div className="overlay show" onClick={(e) => { if(e.target.classList.contains('overlay')) onClose() }}>
      <div className="modal wide">
        <div className="modal-head">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path d="M3 7v6h6" />
              <path d="M21 17v-6h-6" />
              <path d="M3 13a9 9 0 0 1 15-6.7L21 9" />
              <path d="M21 11a9 9 0 0 1-15 6.7L3 15" />
            </svg>
            Find &amp; Replace
          </h3>
          <button className="x" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="info-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Pick a field, choose the value to <b>find</b>, and the value to <b>replace</b> it with. Dropdowns avoid spelling mistakes (e.g. Simran → Siddharth).
          </div>
          
          <div className="frm-row">
            <label>Field</label>
            <select value={rpField} onChange={e => setRpField(e.target.value)}>
              {Object.entries(REPLACE_FIELDS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          
          <div className="fr-two">
            <div className="frm-row" style={{ margin: 0 }}>
              <label>Find</label>
              <select value={rpFind} onChange={e => setRpFind(e.target.value)}>
                {presentVals.length > 0 ? (
                  presentVals.map(v => <option key={v} value={v}>{v}</option>)
                ) : (
                  <option value="">(no values)</option>
                )}
              </select>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <div className="frm-row" style={{ margin: 0 }}>
              <label>Replace with</label>
              <select value={rpRepl} onChange={e => setRpRepl(e.target.value)}>
                {lovOptions.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          
          <div className="approve-note" style={{ marginTop: '16px' }}>
            Affects sites where <b>{REPLACE_FIELDS[rpField]}</b> matches the “find” value across the {selectedCustomers.length} selected customer(s).
          </div>
        </div>
        <div className="modal-foot">
          <span className="mini" style={{ color: 'var(--muted)' }}>
            {selectedCustomers.length} customer(s) selected
          </span>
          <div className="spacer"></div>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button 
            className="btn btn-primary" 
            disabled={!rpFind} 
            onClick={() => onSubmit(rpField, rpFind, rpRepl)}
          >
            Apply &amp; Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );
}
