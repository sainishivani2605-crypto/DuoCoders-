import React, { useState, useRef } from "react";
import "../css/clauseAnalyzer.css";

const ClauseAnalyzer = () => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState("");

  const [analysisResult, setAnalysisResult] = useState(null);

  const validateFile = (file) => {
    if (!file) return false;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, DOC, DOCX and TXT files are allowed.");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Maximum file size is 10MB.");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (validateFile(file)) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.type === "dragenter" ||
      e.type === "dragover"
    ) {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (validateFile(file)) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };


  const removeFile = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setProgress(0);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload a document first.");
      return;
    }

    setLoading(true);
    setProgress(0);

    // Fake Progress Animation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return prev;
        }
        return prev + 10;
      });
    }, 250);

    try {

      // ============================================
      // BACKEND CALL
      // Friend backend banayegi
      // ============================================

      /*
      const formData = new FormData();
      formData.append("document", selectedFile);

      const response = await axios.post(
        "/api/analyze",
        formData
      );

      setAnalysisResult(response.data);
      */

      // ============================================
      // AI CALL
      // Gemini / OpenAI
      // ============================================

      /*
      const aiResult = await analyzeDocument(selectedFile);

      setAnalysisResult(aiResult);
      */

      // Temporary Dummy Response

      setTimeout(() => {

        clearInterval(timer);

        setProgress(100);

        setAnalysisResult({
          totalClauses: 24,

          missingClauses: 2,

          riskLevel: "Medium",

          overview: [
            {
              title: "Payment Terms",
              status: "safe",
            },
            {
              title: "Termination",
              status: "safe",
            },
            {
              title: "Confidentiality",
              status: "safe",
            },
            {
              title: "Indemnification",
              status: "warning",
            },
            {
              title: "Governing Law",
              status: "safe",
            },
            {
              title: "Force Majeure",
              status: "missing",
            },
          ],

          summary:
            "The uploaded agreement contains 24 clauses. Two important clauses are missing. Overall contract risk is Medium.",

          suggestions: [
            "Add Force Majeure clause.",
            "Include Arbitration clause.",
            "Clarify payment schedule.",
            "Mention liability limitations.",
          ],
        });

        setLoading(false);

      }, 2500);

    } catch (err) {

      console.log(err);

      setLoading(false);

      setError("Unable to analyze document.");
    }
  };

  return (
    <div className="clause-container">

      <div className="header">

        <h1>Clause Analyzer</h1>

        <p>
          Upload your agreement and let AI analyze all clauses.
        </p>

      </div>

      <div
        className={`upload-box ${
          dragActive ? "active" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >

        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />

        <h2>Upload Document</h2>

        <p>
          Drag & Drop PDF, DOCX or TXT file here
        </p>

        <button
          onClick={openFilePicker}
        >
          Browse File
        </button>

      </div>
  
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {selectedFile && (
        <div className="selected-file">

          <div className="file-info">

            <h3>{selectedFile.name}</h3>

            <p>
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>

          </div>

          <div className="file-actions">

            <button
              className="remove-btn"
              onClick={removeFile}
            >
              Remove
            </button>

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>

          </div>

        </div>
      )}

      {loading && (

        <div className="progress-section">

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

          <p>{progress}% Completed</p>

        </div>

      )}

      {analysisResult && (

        <div className="result-section">

          <div className="cards">

            <div className="card">

              <h4>Total Clauses</h4>

              <h2>
                {analysisResult.totalClauses}
              </h2>

            </div>

            <div className="card">

              <h4>Missing Clauses</h4>

              <h2>
                {analysisResult.missingClauses}
              </h2>

            </div>

            <div className="card">

              <h4>Risk Level</h4>

              <h2 className="risk">
                {analysisResult.riskLevel}
              </h2>

            </div>

          </div>

          <div className="overview">

            <h2>
              Clause Overview
            </h2>

            <div className="overview-list">

              {analysisResult.overview.map(
                (item, index) => (

                  <div
                    className="overview-item"
                    key={index}
                  >

                    <span>
                      {item.title}
                    </span>

                    <span
                      className={item.status}
                    >
                      {item.status === "safe" && "✔"}

                      {item.status ===
                        "warning" && "⚠"}

                      {item.status ===
                        "missing" && "✖"}

                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          <div className="summary">

            <h2>
              AI Summary
            </h2>

            <p>
              {analysisResult.summary}
            </p>

          </div>

          <div className="suggestions">

            <h2>
              AI Suggestions
            </h2>

            <ul>

              {analysisResult.suggestions.map(
                (item, index) => (

                  <li key={index}>
                    {item}
                  </li>

                )
              )}

            </ul>

          </div>
          <div className="bottom-buttons">

            <button
              className="download-btn"
              onClick={() => {

                const blob =
                  new Blob(
                    [
                      JSON.stringify(
                        analysisResult,
                        null,
                        2
                      ),
                    ],
                    {
                      type:
                        "application/json",
                    }
                  );

                const url =
                  URL.createObjectURL(
                    blob
                  );

                const a =
                  document.createElement(
                    "a"
                  );

                a.href = url;

                a.download =
                  "analysis-report.json";

                a.click();

              }}
            >
              Download Report
            </button>

            <button
              className="save-btn"
              onClick={() => {

                // ========================
                // BACKEND SAVE
                // ========================

                /*
                axios.post(
                  "/api/save-analysis",
                  analysisResult
                );
                */

                alert(
                  "Ready for Backend Integration."
                );

              }}
            >
              Save Report
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default ClauseAnalyzer;