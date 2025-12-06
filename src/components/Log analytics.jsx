import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

export default function LogAnalytics() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/admin/analytics/logs').then(res => res.json()).then(setLogs).catch(() => {});
  }, []);

  if (!logs || logs.length === 0) return <p>Loading log analytics...</p>;

  const chartData = {
    labels: logs.map(l => l.day),
    datasets: [{ label: 'Requests per Day', data: logs.map(l => l.requests), backgroundColor: 'rgba(16,185,129,0.6)' }]
  };

  return (
    <div className="card--dark safe-top">
      <h2 className="text-orange-glow">Log Analytics</h2>
      <Bar data={chartData} />
    </div>
  );
}
