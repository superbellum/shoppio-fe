import {Chart} from "primereact/chart";
import type {CircularChartData} from "../../model/common/CircularChartData.ts";


export interface CircularChartProps {
  type?: "pie" | "doughnut";
  chartData: CircularChartData[];
}

export default function CircularChart({chartData, type}: CircularChartProps) {
  const data = {
    labels: chartData.map(d => d.label),
    datasets: [
      {
        data: chartData.map(d => d.value),
        backgroundColor: chartData.map(d => d.color),
      }
    ]
  }
  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true
        }
      }
    }
  };

  return (
    <Chart
      className="w-full flex justify-content-center"
      type={type ?? "pie"}
      data={data}
      options={options}
    />
  );
}
