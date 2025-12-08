import { useState, useEffect } from 'react';

export default function DomainDashboard() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    fetch('/api/domains')
      .then(res => res.json())
      .then(data => setDomains(data));
  }, []);

  return (
    <div className="domain-dashboard">
      <h1>Your Domains</h1>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Registrar</th>
            <th>Expires</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {domains.map(domain => (
            <tr key={domain.id}>
              <td>{domain.name}</td>
              <td>{domain.registrar}</td>
              <td>{domain.expiresAt}</td>
              <td>{domain.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
