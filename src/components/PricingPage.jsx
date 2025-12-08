import { useState, useEffect } from 'react';

export default function PricingPage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => setPlans(data));
  }, []);

  return (
    <div className="pricing-page">
      <h1>Choose Your Plan</h1>
      <div className="plans">
        {plans.map(plan => (
          <div key={plan.id} className="plan">
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
            <p><strong>Price:</strong> {plan.price}</p>
            <ul>
              {plan.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => window.location.href = `/signup?plan=${plan.id}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
