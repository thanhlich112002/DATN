import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const maxValue = Math.max(...data.map((row) => row.value)) + 1;
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data?.map((row) => row.times),
        datasets: [
          {
            label: "Thàn tiền",
            data: data?.map((row) => row.totalRevenue),
            backgroundColor: "#07503d",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        layout: {
          padding: {
            top: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: maxValue,
          },
        },
        maxBarThickness: 30,
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: "100%", height: "300px", overflowX: "auto" }}>
      <canvas ref={chartRef} style={{ width: "100%", minHeight: "250px" }} />
    </div>
  );
};

export default ChartComponent;
