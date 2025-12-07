import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/AnalyticsDashboard.scss';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/admin/analytics')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="loading-text">Loading analytics...</p>;

  const chartData = {
    labels: Object.keys(data.weeklyCounts),
    datasets: [
      {
        label: 'Reports Exported',
        data: Object.values(data.weeklyCounts),
        borderColor: '#7C3AED', // purple
        backgroundColor: 'rgba(6,182,212,0.3)', // cyan glow
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="analytics-card safe-top">
      <h2 className="analytics-title">Analytics Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
}
