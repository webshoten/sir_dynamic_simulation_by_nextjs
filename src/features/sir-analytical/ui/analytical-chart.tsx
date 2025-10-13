'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { SirResult } from '../types/sir-analytical-types';

// Chart.jsの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface AnalyticalChartProps {
  result: SirResult;
}

export function AnalyticalChart({ result }: AnalyticalChartProps) {
  const data = {
    labels: result.time,
    datasets: [
      {
        label: '感受性保持者 (Susceptible)',
        data: result.susceptible,
        borderColor: 'hsl(210 80% 60%)',
        backgroundColor: 'hsl(210 80% 60% / 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
      {
        label: '感染者 (Infected)',
        data: result.infected,
        borderColor: 'hsl(0 80% 60%)',
        backgroundColor: 'hsl(0 80% 60% / 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
      {
        label: '回復者 (Recovered)',
        data: result.recovered,
        borderColor: 'hsl(120 60% 45%)',
        backgroundColor: 'hsl(120 60% 45% / 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'SIRモデル - 時系列グラフ',
        color: '#ffffff',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '日数 (Days)',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: '人口 (Population)',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
}
