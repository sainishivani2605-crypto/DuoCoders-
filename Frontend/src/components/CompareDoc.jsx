import React, { useState, useRef } from "react";
import "../css/compareDoc.css";

import {
  IconUserCircle,
  IconUpload,
  IconFileText,
  IconScale,
  IconDownload,
  IconCopy,
  IconDeviceFloppy,
  IconLoader2
} from "@tabler/icons-react";

function CompareDoc() {

  const fileARef = useRef(null);
  const fileBRef = useRef(null);

  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);

  const [loading, setLoading] = useState(false);

  const [comparison, setComparison] = useState(null);

  const [activeTab, setActiveTab] = useState("summary");

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileA = (e) => {

    const file = e.target.files[0];

    if(file){

      setFileA(file);

    }

  };

  const handleFileB = (e) => {

    const file = e.target.files[0];

    if(file){

      setFileB(file);

    }

  };


  const compareDocuments = async()=>{

      if(!fileA || !fileB){

        alert("Please Select Both Documents");

        return;

      }

      setLoading(true);

      setUploadProgress(15);


      const formData=new FormData();

      formData.append("documentA",fileA);

      formData.append("documentB",fileB);


      // ===================================
      // REAL BACKEND + AI INTEGRATION
      // ===================================

      /*
      try{

        const response=await fetch(

        "http://localhost:5000/api/compare-documents",

        {

          method:"POST",

          body:formData

        });

        const data=await response.json();

        setComparison(data);

      }

      catch(error){

        console.log(error);

      }

      finally{

        setLoading(false);

      }

      */


      // Temporary frontend loading

      setTimeout(()=>{

        setUploadProgress(40);

      },700);

      setTimeout(()=>{

        setUploadProgress(75);

      },1500);

      setTimeout(()=>{

        setUploadProgress(100);

      },2200);

      setTimeout(()=>{

        setLoading(false);

      },2500);

  };


  const copyComparison=()=>{

      if(!comparison) return;

      navigator.clipboard.writeText(

      JSON.stringify(comparison,null,2)

      );

      alert("Comparison Copied");

  };


  const downloadComparison=()=>{

      alert("Backend PDF Download API");

      /*
      window.open(
      "http://localhost:5000/api/download-report"
      );
      */

  };


  const saveComparison=()=>{

      alert("Backend Save API");

      /*
      await fetch(

      "http://localhost:5000/api/save-comparison",

      {

      method:"POST",

      body:JSON.stringify(comparison),

      headers:{

      "Content-Type":"application/json"

      }

      }

      );
      */

  };
  return (

    <div className="comparePage">
      <div className="compareHeader">

        <div>

          <h1>Compare Documents</h1>

          <p>

            Upload two documents and let AI compare them.

          </p>

        </div>

        <IconUserCircle
          size={38}
          color="#6C63FF"
        />

      </div>



      <div className="documentSelection">

       

        <div className="documentBox">

          <label>

            Document A

          </label>

          <div className="fileSelect">

            <IconFileText
              size={20}
              color="#6C63FF"
            />

            <span>

              {

                fileA ?

                fileA.name

                :

                "Choose Document A"

              }

            </span>

            <button

              onClick={()=>

              fileARef.current.click()

              }

            >

              <IconUpload size={18}/>

              Browse

            </button>

            <input

              type="file"

              hidden

              ref={fileARef}

              accept=".pdf,.doc,.docx,.ppt,.pptx"

              onChange={handleFileA}

            />

          </div>

        </div>


        {/* Document B */}

        <div className="documentBox">

          <label>

            Document B

          </label>

          <div className="fileSelect">

            <IconFileText

              size={20}

              color="#6C63FF"

            />

            <span>

              {

                fileB ?

                fileB.name

                :

                "Choose Document B"

              }

            </span>

            <button

              onClick={()=>

              fileBRef.current.click()

              }

            >

              <IconUpload size={18}/>

              Browse

            </button>

            <input

              type="file"

              hidden

              ref={fileBRef}

              accept=".pdf,.doc,.docx,.ppt,.pptx"

              onChange={handleFileB}

            />

          </div>

        </div>

      </div>

      <button

        className="compareButton"

        onClick={compareDocuments}

        disabled={loading}

      >

        {

          loading ?

          <>

            <IconLoader2

              className="loader"

              size={20}

            />

            AI Comparing...

          </>

          :

          <>

            <IconScale size={20}/>

            Compare Documents

          </>

        }

      </button>

      {

        loading &&

        <div className="progressContainer">

          <div

            className="progressBar"

            style={{

              width:`${uploadProgress}%`

            }}

          >

          </div>

        </div>

      }

      <div className="compareTabs">

        <button

          className={

            activeTab==="summary"

            ?

            "activeTab"

            :

            ""

          }

          onClick={()=>setActiveTab("summary")}

        >

          Summary

        </button>

        <button

          className={

            activeTab==="text"

            ?

            "activeTab"

            :

            ""

          }

          onClick={()=>setActiveTab("text")}

        >

          Text Comparison

        </button>

        <button

          className={

            activeTab==="clause"

            ?

            "activeTab"

            :

            ""

          }

          onClick={()=>setActiveTab("clause")}

        >

          Clause Comparison

        </button>

      </div>
      {

        comparison &&

        activeTab==="summary" &&

        <div className="summarySection">

          <div className="overviewCard">

            <h2>AI Comparison Summary</h2>

            <p>

              {comparison.summary}

            </p>

          </div>

          <div className="scoreCards">

            <div className="scoreCard">

              <h3>Similarity Score</h3>

              <span>

                {comparison.similarity}%

              </span>

            </div>

            <div className="scoreCard">

              <h3>Risk Level</h3>

              <span>

                {comparison.riskLevel}

              </span>

            </div>

            <div className="scoreCard">

              <h3>Modified Clauses</h3>

              <span>

                {comparison.modifiedClauses.length}

              </span>

            </div>

          </div>

          <div className="overviewGrid">

            <div className="overviewBox">

              <h3>Added Clauses</h3>

              <ul>

                {

                  comparison.addedClauses.map((item,index)=>(

                    <li key={index}>

                      {item}

                    </li>

                  ))

                }

              </ul>

            </div>

            <div className="overviewBox">

              <h3>Removed Clauses</h3>

              <ul>

                {

                  comparison.removedClauses.map((item,index)=>(

                    <li key={index}>

                      {item}

                    </li>

                  ))

                }

              </ul>

            </div>

          </div>

          <div className="overviewBox">

            <h3>AI Risk Analysis</h3>

            <p>

              {comparison.riskAnalysis}

            </p>

          </div>

          <div className="actionButtons">

            <button

              onClick={downloadComparison}

            >

              <IconDownload size={18}/>

              Download Report

            </button>

            <button

              onClick={copyComparison}

            >

              <IconCopy size={18}/>

              Copy Result

            </button>

            <button

              onClick={saveComparison}

            >

              <IconDeviceFloppy size={18}/>

              Save Comparison

            </button>

          </div>

        </div>

      }
    

      {

        comparison &&

        activeTab==="text" &&

        <div className="textComparison">

          <h2>AI Text Comparison</h2>

          {

            comparison.textComparison.map((item,index)=>(

              <div

                className="textCompareCard"

                key={index}

              >

                <div className="oldVersion">

                  <h3>

                    Document A

                  </h3>

                  <p>

                    {item.oldText}

                  </p>

                </div>

                <div className="newVersion">

                  <h3>

                    Document B

                  </h3>

                  <p>

                    {item.newText}

                  </p>

                </div>

              </div>

            ))

          }

        </div>

      }

      {

        comparison &&

        activeTab==="clause" &&

        <div className="clauseComparison">

          <h2>

            Clause Comparison

          </h2>

          <table>

            <thead>

              <tr>

                <th>Clause</th>

                <th>Status</th>

                <th>Severity</th>

              </tr>

            </thead>

            <tbody>

              {

                comparison.modifiedClauses.map((item,index)=>(

                  <tr key={index}>

                    <td>

                      {item.clause}

                    </td>

                    <td>

                      {item.status}

                    </td>

                    <td>

                      <span className={

                        item.severity==="High"

                        ?

                        "highRisk"

                        :

                        item.severity==="Medium"

                        ?

                        "mediumRisk"

                        :

                        "lowRisk"

                      }>

                        {item.severity}

                      </span>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      }
  { 
        !comparison && !loading &&

        <div className="emptyState">

          <IconFileText
            size={70}
            color="#6C63FF"
          />

          <h2>

            No Comparison Available

          </h2>

          <p>

            Upload two documents and click
            <strong> Compare Documents </strong>
            to let AI analyze the differences.

          </p>

        </div>

  }

    </div>

  );

}

export default CompareDoc;