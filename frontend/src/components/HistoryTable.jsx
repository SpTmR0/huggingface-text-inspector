import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const HistoryTable = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/history`);
        if (Array.isArray(res.data)) {
          setHistory(res.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, [refreshTrigger]);

  //Auto scrolling to top on page change.
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const totalPages = Math.ceil(history.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = history.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="card mt-4" ref={tableRef} style={{ backgroundColor: "#f0f6fb" }}>
      <div className="card-body">
        <h5 className="card-title mb-3">History</h5>
        {history.length === 0 ? (
          <p className="text-muted">No data yet.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark text-center">
                  <tr>
                    <th>#</th>
                    <th>Text</th>
                    <th>Emotion</th>
                    <th>Emotion Score</th>
                    <th>Toxicity</th>
                    <th>Toxicity Score</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentEntries.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td>{indexOfFirstEntry + index + 1}</td>
                      <td>{entry.text}</td>
                      <td>{entry.emotion.label}</td>
                      <td>{entry.emotion.score.toFixed(3)}</td>
                      <td>{entry.toxicity.label}</td>
                      <td>{entry.toxicity.score.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ⏮ Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next ⏭
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
