import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = (props) => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const monthToIndex = new Map();
  monthToIndex.set("Jan", 0);
  monthToIndex.set("Feb", 1);
  monthToIndex.set("Mar", 2);
  monthToIndex.set("Apr", 3);
  monthToIndex.set("May", 4);
  monthToIndex.set("Jun", 5);
  monthToIndex.set("Jul", 6);
  monthToIndex.set("Aug", 7);
  monthToIndex.set("Sep", 8);
  monthToIndex.set("Oct", 9);
  monthToIndex.set("Nov", 10);
  monthToIndex.set("Dec", 11);
  for (var i = 0; i < props.expenses.length; i++) {
    dataValues[monthToIndex.get(props.expenses[i].month)] += Number(
      props.expenses[i].amount
    );
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Expenses (in USD)",
        data: dataValues,
        backgroundColor: "#e5f7ab",
        color: "#e5f7ab",
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#e5f7ab",
        },
      },
      y: {
        ticks: {
          color: "#e5f7ab",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#e5f7ab",
        text: "Expenses",
        size: 10,
      },
    },
  };
  return <Bar options={options} data={data} />;
};
export default ChartContainer;
