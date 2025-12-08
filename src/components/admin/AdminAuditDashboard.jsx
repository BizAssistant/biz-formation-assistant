import React, { useEffect, useState } from 'react';
import '../styles/AdminAuditDashboard.scss';

export default function AdminAuditDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/audit') // Durable Object GET endpoint
      .then(res => res.json())
      .then(setLogs)
      .catch(() => {});
  }, []);

  if (!logs || logs.length === 0) {
    return <p className="loading-text">Loading audit logs...</p>;
  }

  return (
    <div className="audit-card safe-top">
      <h2 className="audit-title">Audit Log Dashboard</h2>
      <table className="audit-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.timestamp}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
