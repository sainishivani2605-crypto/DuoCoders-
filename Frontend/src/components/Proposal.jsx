import React, { useState } from "react";
import "../css/proposal.css";
import {
  IconUserCircle,
  IconDownload,
  IconFileDescription,
  IconLoader2
} from "@tabler/icons-react";

function Proposal() {

  const [projectTitle, setProjectTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  const generateProposal = async () => {

    if (
      projectTitle === "" ||
      clientName === "" ||
      description === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    // ==============================
    // AI BACKEND INTEGRATION
    // ==============================

    /*
    try{

      const response = await fetch(
      "http://localhost:5000/api/proposal",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          projectTitle,
          clientName,
          description
        })
      });

      const data = await response.json();

      setProposal(data.proposal);

    }

    catch(error){

      console.log(error);

    }
    */

    // Dummy AI Output

    setTimeout(() => {

      setProposal(`

# ${projectTitle}

Prepared for ${clientName}

## Executive Summary

This proposal outlines a complete solution for your project requirements.

Our team will design and develop a modern, secure and scalable application tailored specifically for your business.

## Scope of Work

• Modern Responsive UI

• Admin Dashboard

• Authentication System

• Database Integration

• REST API Development

• AI Features

• Deployment

## Estimated Timeline

4-6 Weeks

## Deliverables

✔ Source Code

✔ Documentation

✔ Deployment Support

✔ Bug Fixes

✔ Maintenance

Thank you for choosing our services.

`);

      setLoading(false);

    },2000);

  };
  return (

    <div className="proposalContainer">

      <div className="proposalHeader">

        <div>

          <h1>Proposal Generator</h1>

          <p>Create professional proposals using AI</p>

        </div>

        <IconUserCircle
          size={38}
          color="#6C63FF"
        />

      </div>

      <div className="proposalMain">

        <div className="leftPanel">

          <h2>Project Details</h2>

          <label>Project Title</label>

          <input
            type="text"
            placeholder="Website Development"
            value={projectTitle}
            onChange={(e)=>setProjectTitle(e.target.value)}
          />

          <label>Client Name</label>

          <input
            type="text"
            placeholder="Tech Solutions Pvt. Ltd."
            value={clientName}
            onChange={(e)=>setClientName(e.target.value)}
          />

          <label>Project Description</label>

          <textarea
            rows="8"
            placeholder="Describe your project..."
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <button
            className="generateBtn"
            onClick={generateProposal}
          >

            {loading ?

            <>

            <IconLoader2
              className="loader"
              size={20}
            />

            Generating...

            </>

            :

            "Generate Proposal"

            }

          </button>

        </div>

        {/* RIGHT PANEL */}

        <div className="rightPanel">

          <div className="proposalTitle">

            <h2>Generated Proposal</h2>

            <IconDownload
              size={24}
              className="downloadIcon"
            />

          </div>

          <div className="proposalPreview">

            {

              proposal ?

              <pre>

                {proposal}

              </pre>

              :

              <div className="emptyProposal">

                <IconFileDescription
                  size={70}
                  color="#6C63FF"
                />

                <h3>

                  No Proposal Generated

                </h3>

                <p>

                  Fill the form and click
                  Generate Proposal.

                </p>

              </div>

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Proposal;