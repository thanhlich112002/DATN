import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data?.map((row) => row.name),
        datasets: [
          {
            label: "Sản phẩm",
            data: data?.map((row) => row.value),
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 205, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
        layout: {
          padding: {
            right: 0,
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: "100%", height: "270px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
