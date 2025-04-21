import React, { useState } from "react";
import axios from "axios";

const TextInputForm = ({ onAnalyzeSuccess }) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!text.trim()) return;

    try {
      const res = await axios.post(`${BASE_URL}/analyze`, { text });
      setResult(res.data);
      onAnalyzeSuccess(); //Triggering refresh
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      className="mb-4 p-4 rounded shadow-sm"
      style={{ backgroundColor: "#f0f6fb" }} 
    >
      <h5 className="fw-bold text-center mb-3" style={{ color: "#003153" }}>
        Enter Your Text
      </h5>

      <form onSubmit={handleSubmit} className="text-center">
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
        >
          Analyze
        </button>
      </form>

      {result && (
        <div className="alert alert-success mt-4 text-center">
          <strong>Emotion:</strong> {result.emotion.label} ({result.emotion.score}) <br />
          <strong>Toxicity:</strong> {result.toxicity.label} ({result.toxicity.score})
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4 text-center">{error}</div>
      )}
    </div>
  );
};

export default TextInputForm;
