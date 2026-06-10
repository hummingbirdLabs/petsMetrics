'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

type GrowthPoint = {
  ageWeeks: number;
  weightKg: number;
};

type Props = {
  data: GrowthPoint[];
  currentAgeWeeks: number;
  chartTitle: string;
  chartXLabel: string;
  chartYLabel: string;
  primaryColor: string;
  primaryAlpha: string;
  gridColor: string;
  tickColor: string;
};

export default function PuppyGrowthChart({
  data,
  currentAgeWeeks,
  chartTitle,
  chartXLabel,
  chartYLabel,
  primaryColor,
  primaryAlpha,
  gridColor,
  tickColor,
}: Props) {
  const chartData = {
    labels: data.map((p) => `${p.ageWeeks}`),
    datasets: [
      {
        label: chartTitle,
        data: data.map((p) => p.weightKg),
        borderColor: primaryColor,
        backgroundColor: primaryAlpha,
        fill: true,
        tension: 0.3,
        pointRadius: data.map((p) =>
          p.ageWeeks === currentAgeWeeks ? 6 : 2,
        ),
        pointBackgroundColor: data.map((p) =>
          p.ageWeeks === currentAgeWeeks ? '#92400E' : primaryColor,
        ),
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} kg`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: chartXLabel },
        grid: { color: gridColor },
        ticks: { color: tickColor },
      },
      y: {
        title: { display: true, text: chartYLabel },
        grid: { color: gridColor },
        ticks: { color: tickColor },
      },
    },
  };

  return (
    <div style={{ height: '360px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
