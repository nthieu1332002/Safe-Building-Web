import React from "react";
import Chart from "chart.js/auto";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "./styles.scss";

const CustomChart = ({ type }) => {
  var data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [130, 170, 50, 266, 204],
        tension: 0.5,
        fill: true,
        backgroundColor: "rgba(255, 179, 95, 0.2)",
        pointBackgroundColor: "rgb(255, 179, 95)",
        borderColor: "#ffbc80",
        pointBorderColor: "#ffbc80",
        borderWidth: 2,
      },
    ],
  };

  var dataPie = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [130, 170, 50, 266, 204],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  var option = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
      },
      xAxes: [{ gridLines: { zeroLineColor: "red" } }],
      yAxes: [{ gridLines: { zeroLineColor: "red" } }],
    },
  };
  var optionPie = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  // return (<Line data={data} options={options} />);
  return (
    <div className="chart-container">
      {(() => {
        switch (type) {
          case "line":
            return <Line data={data} options={option} />;
          case "bar":
            return <Bar data={dataPie} options={optionPie} />;
          case "doughnut":
            return <Doughnut data={dataPie} options={optionPie} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default CustomChart;
