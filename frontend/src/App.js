import React, { useState } from "react";
import TextInputForm from "./components/TextInputForm";
import ChartsDashboard from "./components/ChartsDashboard";
import HistoryTable from "./components/HistoryTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAnalyzeSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app-container" style={{/* backgroundColor: "#e7f0f8",*/ minHeight: "100vh" }}>
      <header className="bg-dark text-white py-3 text-center shadow-sm">
        <h2 className="m-0">Emotion & Toxicity Analyzer</h2>
      </header>

      <main className="container py-4" style={{ backgroundColor: "#f0f6fb" }}>
        <TextInputForm onAnalyzeSuccess={handleAnalyzeSuccess} />
        <ChartsDashboard refreshTrigger={refreshTrigger} />
        <HistoryTable refreshTrigger={refreshTrigger} />
      </main>

      <footer className="bg-dark text-center text-white py-3 mt-auto">
        © {new Date().getFullYear()} Built by Sripada Reddy
      </footer>
    </div>
  );
}

export default App;
