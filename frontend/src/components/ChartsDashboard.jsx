import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartsDashboard = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/history`).then((res) => {
      if (Array.isArray(res.data)) {
        setHistory(res.data);
      }
    });
  }, [refreshTrigger]);

  const emotionCounts = {};
  const toxicityCounts = {};

  history.forEach((entry) => {
    const emotion = entry.emotion.label;
    const toxicity = entry.toxicity.label;

    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    toxicityCounts[toxicity] = (toxicityCounts[toxicity] || 0) + 1;
  });

  const emotionData = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        data: Object.values(emotionCounts),
        backgroundColor: [
          "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8ddc82",
        ],
      },
    ],
  };

  const toxicityData = {
    labels: Object.keys(toxicityCounts),
    datasets: [
      {
        label: "Toxicity Labels",
        data: Object.values(toxicityCounts),
        backgroundColor: "#003153",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mb-5" style={{ backgroundColor: "#f0f6fb" }}>
      <h4 className="mt-5 mb-3 text-center">Insights</h4>
      <div className="row">
        <div className="col-md-6 mb-4 d-flex">
          <div className="card p-3 w-100" style={{ height: "400px" }}>
            <h6 className="text-center">Emotion Distribution</h6>
            <div style={{ flex: 1 }}>
              <Pie data={emotionData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4 d-flex">
          <div className="card p-3 w-100" style={{ height: "400px" }}>
            <h6 className="text-center">Toxicity Labels</h6>
            <div style={{ flex: 1 }}>
              <Bar data={toxicityData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsDashboard;
