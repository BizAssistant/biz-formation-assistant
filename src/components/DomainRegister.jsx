import { useState } from 'react';

export default function DomainRegister() {
  const [domainName, setDomainName] = useState('');
  const [years, setYears] = useState(1);
  const [contact, setContact] = useState('');
  const [result, setResult] = useState("");

  const registerDomain = async () => {
    const response = await fetch('/api/domains/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domainName, years, contact })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Register Domain</h2>
      <input value={domainName} onChange={e => setDomainName(e.target.value)} placeholder="Domain name" />
      <input value={years} onChange={e => setYears(e.target.value)} placeholder="Years" type="number" />
      <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Contact info" />
      <button onClick={registerDomain}>Register</button>
      {result && <pre>{JSON.stringify(result, "", 2)}</pre>}
    </div>
  );
}
