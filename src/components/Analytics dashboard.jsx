import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/admin/analytics').then(res => res.json()).then(setData); }, []);
  if (!data) return <p>Loading analytics...</p>;
  const chartData = {
    labels: Object.keys(data.weeklyCounts),
    datasets: [{ label: 'Reports Exported', data: Object.values(data.weeklyCounts), borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.2)', fill: true }]
  };
  return (
    <div className="card--dark safe-top">
      <h2 className="text-orange-glow">Analytics Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
}
