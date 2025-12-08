import { useState } from 'react';
import domain-page from 'DomainPage';

export default function Navigation() {
  const [domainOpen, setDomainOpen] = useState(false);

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/onboarding">Onboarding</a></li>
        <li
          onMouseEnter={() => setDomainOpen(true)}
          onMouseLeave={() => setDomainOpen(false)}
        >
          <a href="#domains">Domains</a>
          {domainOpen && (
            <ul className="submenu">
              <li><a href="/domains/search">Search Domain</a></li>
              <li><a href="/domains/register">Register Domain</a></li>
              <li><a href="/domains/manage">Manage Domains</a></li>
            </ul>
          )}
        </li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  );
}
