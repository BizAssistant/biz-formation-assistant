import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [user, setUser] = useState("");
  const [reports, setReports] = useState([]);
  const [audit, setAudit] = useState([]);

  useEffect(() => {
    fetch('/whoami').then(res => res.json()).then(setUser);
    fetch('/admin/reports').then(res => res.json()).then(setReports);
    fetch('/admin/audit').then(res => res.json()).then(setAudit);
  }, []);

  const cleanup = async () => {
    await fetch('/admin/cleanup', { method: 'POST' });
    alert('Cleanup triggered');
  };

  if (!user) return "";

  return (
    <div className="card--dark safe-top">
      <h2 className="text-orange-glow">Admin Dashboard</h2>
      <p style={{ color: '#9CA3AF' }}>Logged in as {user.email} ({user.role})</p>

      {user.role !== 'contributor' && (
        <>
          <section>
            <h3 className="text-emerald-glow">Report History</h3>
            <ul>
              {reports.map(r => (
                <li key={r.key}>
                  {r.key} — {new Date(r.uploaded).toLocaleString()} — {r.size} bytes
                  <a href={`/download/${r.key}`} target="_blank" rel="noreferrer" style={{ marginLeft: 8 }}>Download</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-emerald-glow">Audit Logs</h3>
            <ul>
              {audit.map((log, idx) => (
                <li key={idx}>{log.type} — {log.key} — {new Date(log.ts).toLocaleString()}</li>
              ))}
            </ul>
          </section>

          <button className="btn-metallic" onClick={cleanup}>Trigger Cleanup</button>
        </>
      )}
    </div>
  );
}
