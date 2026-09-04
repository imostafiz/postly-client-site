"use client";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions, // Import ChartOptions type
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const AnalysisPage = () => {
  // Data for User Analysis Bar Chart
  const userData = {
    labels: ["Admin", "Moderator", "User", "Guest"], // Example user roles
    datasets: [
      {
        label: "User Count",
        data: [5, 12, 100, 30], // Example user count for each role
        backgroundColor: ["#003580", "#d4e2f4", "#ffcc00", "#ff0000"], // Custom colors for bars
      },
    ],
  };

  // Data for Post Analysis Pie Chart
  const postData = {
    labels: ["Lifestyle", "Travel", "Food", "Music"], // Example post categories
    datasets: [
      {
        label: "Post Count",
        data: [40, 30, 20, 10], // Example post count for each category
        backgroundColor: ["#003580", "#ffcc00", "#ff6b6b", "#51cf66"], // Custom colors for pie segments
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Role Distribution",
      },
    },
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Post Category Distribution",
      },
    },
  };

  return (
    <div className="p-6 text-[#1C2430]/30">
      <h1 className="text-2xl font-semibold mb-6">Analysis Dashboard</h1>

      {/* User Analysis (Bar Chart) */}
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto mb-8">
        <h2 className="text-lg font-medium mb-4">User Analysis</h2>
        <Bar data={userData} options={barOptions} />
      </div>

      {/* Post Analysis (Pie Chart) */}
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <h2 className="text-lg font-medium mb-4">Post Analysis</h2>
        <Pie data={postData} options={pieOptions} />
      </div>
    </div>
  );
};

export default AnalysisPage;
