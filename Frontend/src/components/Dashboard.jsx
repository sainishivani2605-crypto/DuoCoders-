import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {  FileText, MessageSquare, AlertTriangle, CheckCircle2, 
  MoreHorizontal, ArrowUpRight, ArrowDownRight, Upload, 
  Bot, GitCompare, FileSpreadsheet, ChevronRight, ShieldAlert, Info, Calendar,
  Edit2, Trash2} from "lucide-react";
import "../css/dashboard.css";
import Topbar from "./Topbar";

export default function Dashboard() {
  const [recentDocs, setRecentDocs] = useState([
    { id: 1, name: "Vendor Agreement.pdf", type: "PDF", tags: ["Legal", "Vendor"], time: "Uploaded 2h ago", hasRisk: true, proposals: 2, queries: 40 },
    { id: 2, name: "NDA_2024.pdf", type: "PDF", tags: ["Legal", "NDA"], time: "Uploaded 1d ago", hasRisk: false, proposals: 3, queries: 60 },
    { id: 3, name: "HR Policy Manual.docx", type: "DOCX", tags: ["HR", "Policy"], time: "Uploaded 2d ago", hasRisk: true, proposals: 1, queries: 80 },
    { id: 4, name: "Client Contract.pdf", type: "PDF", tags: ["Legal", "Contract"], time: "Uploaded 3d ago", hasRisk: true, proposals: 4, queries: 90 },
    { id: 5, name: "Project Proposal.pptx", type: "PPTX", tags: ["Proposal", "Business"], time: "Uploaded 5d ago", hasRisk: false, proposals: 5, queries: 72 }
  ]);

  
  const [stats, setStats] = useState({
    totalDocs: 0,
    aiQueries: 0,
    risksDetected: 0,
    proposalsGenerated: 0,
    categoriesFound: 0,
    missingClauses: 0,
    contractsExpiring: 0,
    aiReadyPercentage: 0
  });

  const [loading, setLoading] = useState(true);

  
  const [activeDropdown, setActiveDropdown] = useState(null);

  
  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

 
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);


  const calculateStats = (docList) => {
    const totalDocs = docList.length;
    const totalQueries = docList.reduce((acc, doc) => acc + (doc.queries || 0), 0);
    const risksDetected = docList.filter((doc) => doc.hasRisk).length;
    const proposalsGenerated = docList.reduce((acc, doc) => acc + (doc.proposals || 0), 0);

  
    const categoriesSet = new Set();
    docList.forEach(doc => doc.tags?.forEach(tag => categoriesSet.add(tag)));
    
    const categoriesFound = categoriesSet.size;
    const missingClauses = docList.filter(doc => doc.hasRisk).length; // Example metric logic
    const contractsExpiring = docList.filter(doc => doc.tags?.includes("Legal")).length;
    const aiReadyPercentage = totalDocs > 0 ? Math.min(100, Math.round((totalDocs / 5) * 100)) : 0;

    return {
      totalDocs,
      aiQueries: totalQueries,
      risksDetected,
      proposalsGenerated,
      categoriesFound,
      missingClauses,
      contractsExpiring,
      aiReadyPercentage
    };
  };

  // =========================================================
  // 🔹 1. FETCH DASHBOARD DATA FROM BACKEND (Commented for now)
  // =========================================================
  useEffect(() => {
    /* 
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Backend returns real-time documents & updated cards stats
        setRecentDocs(res.data.recentDocuments);
        setStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
    */

    
    const initialStats = calculateStats(recentDocs);
    setStats(initialStats);
    setLoading(false);
  }, []);

  const handleDeleteFile = (docId, docName) => {
    setActiveDropdown(null);

    Swal.fire({
      title: "Confirm Delete?",
      text: `Are you sure you want to delete "${docName}"? This will update all stats and AI knowledge base.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      background: "#131825",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // -------------------------------------------------------------
          // 🔹 BACKEND API INTEGRATION FOR DELETE
          // -------------------------------------------------------------
          /*
          const token = localStorage.getItem("token");
          const res = await axios.delete(`http://localhost:5000/api/documents/${docId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Jab backend Document + Embeddings delete karega, naye dynamic stats sync honge:
          setRecentDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
          setStats(res.data.updatedStats); // Backend recalculated stats
          */

       
          setRecentDocs((prevDocs) => {
            const updatedDocs = prevDocs.filter((doc) => doc.id !== docId);
            const updatedStats = calculateStats(updatedDocs);
            setStats(updatedStats);
            return updatedDocs;
          });

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "File deleted. Dashboard cards and AI status updated.",
            confirmButtonColor: "#4f46e5",
            background: "#131825",
            color: "#fff",
          });

        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: err.response?.data?.message || "Could not delete the file. Try again!",
            confirmButtonColor: "#ef4444",
            background: "#131825",
            color: "#fff",
          });
        }
      }
    });
  };

  const handleEditFile = (docId, currentName) => {
    setActiveDropdown(null);

    Swal.fire({
      title: "Edit File Name",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      background: "#131825",
      color: "#fff",
      inputValidator: (value) => {
        if (!value) {
          return "File name cannot be empty!";
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const newName = result.value;

        try {
          // -------------------------------------------------------------
          // 🔹 BACKEND API INTEGRATION FOR EDIT
          // -------------------------------------------------------------
          /*
          const token = localStorage.getItem("token");
          await axios.put(`http://localhost:5000/api/documents/${docId}`, 
            { name: newName },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          */

        
          setRecentDocs((prevDocs) =>
            prevDocs.map((doc) =>
              doc.id === docId ? { ...doc, name: newName } : doc
            )
          );

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "File name updated successfully.",
            confirmButtonColor: "#4f46e5",
            background: "#131825",
            color: "#fff",
          });

        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: err.response?.data?.message || "Could not update file name.",
            confirmButtonColor: "#ef4444",
            background: "#131825",
            color: "#fff",
          });
        }
      }
    });
  };

  const getDocBadgeColor = (type) => {
    switch (type) {
      case "PDF": return "badge-pdf";
      case "DOCX": return "badge-docx";
      case "PPTX": return "badge-pptx";
      default: return "badge-default";
    }
  };

  return (
    <div className="dashboard-container">
      <Topbar />
      
   
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <FileText size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Total Documents</span>
            <h3 className="stat-value">{stats.totalDocs}</h3>
            <span className="stat-trend green"><ArrowUpRight size={14} /> 12% from tomorrow</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <MessageSquare size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-title">AI Queries</span>
            <h3 className="stat-value">{stats.aiQueries}</h3>
            <span className="stat-trend green"><ArrowUpRight size={14} /> 18% from tomorrow</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <AlertTriangle size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Risks Detected</span>
            <h3 className="stat-value">{stats.risksDetected}</h3>
            <span className="stat-trend red"><ArrowDownRight size={14} /> 3% from tomorrow</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-title">Proposals Generated</span>
            <h3 className="stat-value">{stats.proposalsGenerated}</h3>
            <span className="stat-trend green"><ArrowUpRight size={14} /> 25% from tomorrow</span>
          </div>
        </div>
      </div>

    
      <div className="main-grid">
        <div className="content-card recent-docs-card">
          <div className="card-header">
            <h3>Recent Documents</h3>
            <Link to="/Documents" className="view-all-link">View All</Link>
          </div>

          <div className="doc-list">
            {recentDocs.length === 0 ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px" }}>
                No documents found. Upload one to get started!
              </p>
            ) : (
              recentDocs.map((doc) => (
                <div className="doc-item" key={doc.id}>
                  <div className={`doc-icon ${getDocBadgeColor(doc.type)}`}>
                    <span>{doc.type}</span>
                  </div>
                  <div className="doc-info">
                    <span className="doc-name">{doc.name}</span>
                    <div className="doc-tags">
                      {doc.tags?.map((tag, i) => (
                        <span key={i} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="doc-time">{doc.time}</span>
                  
               
                  <div className="action-menu-container" style={{ position: "relative" }}>
                    <button 
                      className="icon-btn-ghost" 
                      onClick={(e) => toggleDropdown(doc.id, e)}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {activeDropdown === doc.id && (
                      <div className="dropdown-popup">
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleEditFile(doc.id, doc.name)}
                        >
                          <Edit2 size={14} /> Edit File
                        </button>
                        <button 
                          className="dropdown-item delete-option" 
                          onClick={() => handleDeleteFile(doc.id, doc.name)}
                        >
                          <Trash2 size={14} /> Delete File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="card-footer">
            <Link to="/Documents" className="footer-link">View All Documents →</Link>
          </div>
        </div>

        <div className="right-panel">
          <div className="content-card ai-status-card">
            <div className="card-header">
              <span className="title-with-icon"><Bot size={18} /> AI Knowledge Status</span>
            </div>
            <div className="ai-status-content">
              <div className="progress-circle-box">
                <div className="circle-inner">
                  <h2>{stats.aiReadyPercentage}%</h2>
                  <span>AI Ready</span>
                </div>
              </div>
              <div className="ai-metrics">
                <div className="metric-row">
                  <span className="dot blue"></span> Documents Indexed <strong>{stats.totalDocs}</strong>
                </div>
                <div className="metric-row">
                  <span className="dot purple"></span> Categories Found <strong>{stats.categoriesFound}</strong>
                </div>
                <div className="metric-row">
                  <span className="dot red"></span> Missing Clauses <strong>{stats.missingClauses}</strong>
                </div>
                <div className="metric-row">
                  <span className="dot orange"></span> Contracts Expiring <strong>{stats.contractsExpiring}</strong>
                </div>
              </div>
            </div>
            <div className="status-footer-badge green">
              <CheckCircle2 size={16} /> System Status: All Good
            </div>
          </div>

        
          <div className="content-card alerts-card">
            <div className="card-header">
              <h3>Smart Alerts</h3>
              <Link to="/AlertsDeadline" className="view-all-link">View All</Link>
            </div>
            <div className="alerts-list">
              <div className="alert-item">
                <div className="alert-icon orange"><Calendar size={18} /></div>
                <div className="alert-text">
                  <h4>{stats.contractsExpiring} contracts are expiring soon</h4>
                  <p>Earliest: 12 May 2024</p>
                </div>
                <ChevronRight size={16} className="arrow-icon" />
              </div>

              <div className="alert-item">
                <div className="alert-icon red"><ShieldAlert size={18} /></div>
                <div className="alert-text">
                  <h4>{stats.missingClauses} documents have missing clauses</h4>
                  <p>Review recommended</p>
                </div>
                <ChevronRight size={16} className="arrow-icon" />
              </div>

              <div className="alert-item">
                <div className="alert-icon blue"><Info size={18} /></div>
                <div className="alert-text">
                  <h4>New compliance updates available</h4>
                  <p>Check GDPR & DPDP Act updates</p>
                </div>
                <ChevronRight size={16} className="arrow-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS SECTION */}
      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/UploadDoc" className="action-card">
            <div className="action-icon purple"><Upload size={20} /></div>
            <div className="action-info">
              <h4>Upload Document</h4>
              <p>Upload and analyze new documents</p>
            </div>
          </Link>

          <Link to="/AiChat" className="action-card">
            <div className="action-icon blue"><Bot size={20} /></div>
            <div className="action-info">
              <h4>Ask AI Assistant</h4>
              <p>Ask questions about your documents</p>
            </div>
          </Link>

          <Link to="/CompareDoc" className="action-card">
            <div className="action-icon green"><GitCompare size={20} /></div>
            <div className="action-info">
              <h4>Compare Documents</h4>
              <p>Find differences between two documents</p>
            </div>
          </Link>

          <Link to="/Proposal" className="action-card">
            <div className="action-icon orange"><FileSpreadsheet size={20} /></div>
            <div className="action-info">
              <h4>Generate Proposal</h4>
              <p>Create proposals using AI templates</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}