import React from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";

import {
  IconLayoutDashboard,
  IconUpload,
  IconRobot,
  IconBrain,
  IconBell,
  IconSettings,
  IconFolders,
  IconFileText,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";

import logoD from "../assets/logoD.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logos">
        <img className="logod" src={logoD} alt="logo" />

        <div className="logo-text">
          <h2>DocAI</h2>
          <p>AI Document Assistant</p>
        </div>
      </div>

      <div className="dash">

        <div className="dash-item active">
          <IconLayoutDashboard size={22} />
          <Link className="menu-link" to="/">
            Dashboard
          </Link>
        </div>

        <div className="dashboard">
          <IconFolders size={22} />
          <Link className="dashLink" to="/Documents">
            Documents
          </Link>
        </div>

        <div className="dashboard">
          <IconUpload size={22} />
          <Link className="dashLink" to="/UploadDoc">
            Upload Document
          </Link>
        </div>

        <div className="dashboard">
          <IconRobot size={22} />
          <Link className="dashLink" to="/AiChat">
            AI Chat Assistant
          </Link>
        </div>

        <div className="dashboard">
          <IconBrain size={22} />
          <Link className="dashLink" to="/Proposal">
            Proposal Generator
          </Link>
        </div>

        <div className="dashboard">
          <IconAdjustmentsHorizontal size={22} />
          <Link className="dashLink" to="/CompareDoc">
            Compare Documents
          </Link>
        </div>

        <div className="dashboard">
          <IconFileText size={22} />
          <Link className="dashLink" to="/ClauseAnalyzer">
            Clause Analyzer
          </Link>
        </div>

        <div className="dashboard">
          <IconBell size={22} />
          <Link className="dashLink" to="/AlertsDeadline">
            Alerts & Deadline
          </Link>
        </div>

        <div className="dashboard">
          <IconSettings size={22} />
          <Link className="dashLink" to="/Setting">
            Settings
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
