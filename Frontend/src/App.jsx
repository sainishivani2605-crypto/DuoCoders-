import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AiChat from "./components/AiChat.jsx";
import AlertsDeadline from "./components/AlertsDeadline.jsx";
import ClauseAnalyzer from "./components/ClauseAnalyzer.jsx";
import CompareDoc from "./components/CompareDoc.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Documents from "./components/Documents.jsx";
import Login from "./components/Login.jsx";
import Proposal from "./components/Proposal.jsx";
import Setting from "./components/Setting.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import UploadDoc from "./components/UploadDoc.jsx";
import "./css/dashboard.css";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname.toLowerCase() === "/login";
  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      ) : (
        <div className="dashboard-wrapper">
          <Sidebar />
          <div className="dashboard-main">
          
            <div className="dashboard-content">
              <Routes>
                <Route path="Topbar" element={<Topbar />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/Documents" element={<Documents />} />
                <Route path="/UploadDoc" element={<UploadDoc />} />
                <Route path="/AiChat" element={<AiChat />} />
                <Route path="/Proposal" element={<Proposal />} />
                <Route path="/CompareDoc" element={<CompareDoc />} />
                <Route path="/ClauseAnalyzer" element={<ClauseAnalyzer />} />
                <Route path="/AlertsDeadline" element={<AlertsDeadline />} />
                <Route path="/Setting" element={<Setting />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;