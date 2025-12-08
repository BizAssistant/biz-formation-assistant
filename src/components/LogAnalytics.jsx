import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles/LogAnalytics.scss';

export default function LogAnalytics() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/admin/analytics/logs')
      .then(res => res.json())
      .then(setLogs)
      .catch(() => {});
  }, []);

  if (!logs || logs.length === 0) {
    return <p className="loading-text">Loading log analytics...</p>;
  }

  const chartData = {
    labels: logs.map(l => l.day),
    datasets: [
      {
        label: 'Requests per Day',
        data: logs.map(l => l.requests),
        backgroundColor: 'rgba(124,58,237,0.6)', // purple bars
        borderColor: '#06B6D4', // cyan outline
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="log-card safe-top">
      <h2 className="log-title">Log Analytics</h2>
      <Bar data={chartData} />
    </div>
  );
}
