import { useState } from 'react';

export default function DomainSearch() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);

  const searchDomain = async () => {
    const response = await fetch('/api/domains/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain })
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="domain-search">
      <h2>Search Domain</h2>
      <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="Enter domain" />
      <button onClick={searchDomain}>Search</button>
      {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
    </div>
  );
}
