import React, { useRef, useState } from "react";
import "../css/uploadDoc.css";
import {
  IconUserCircle,
  IconCloudUpload,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

function UploadDoc() {
  const fileInputRef = useRef(null);

  const [status, setStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(2) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setStatus("Upload Failed");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (
      !allowedTypes.includes(file.type) ||
      file.size > 50 * 1024 * 1024
    ) {
      setStatus("Upload Failed");
      return;
    }

    const newFile = {
      name: file.name,
      size: formatSize(file.size),
    };

    setUploadedFiles((prev) => [newFile, ...prev]);

    setStatus("File Uploaded Successfully");

    // =============================
    // Backend Integration
    // =============================

    /*
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/api/upload",{
      method:"POST",
      body:formData
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    });
    */
  };

  return (
    <div className="upOne">

      <div className="upHeader">

        <div className="up1">

          <h2 className="upl1">
            Upload Document
          </h2>

          <span className="upl2">
            Upload your document and let AI organize for you
          </span>

        </div>

        <div className="upTwo">

          <IconUserCircle
            size={34}
            color="#4F46E5"
            stroke={1.5}
          />

        </div>

      </div>

      <div className="up3">

        <IconCloudUpload
          size={120}
          color="#4F46E5"
          stroke={1.5}
        />

        <span className="up6">
          Drag & Drop your Document here
        </span>

        <span className="up7">
          OR
        </span>

        <button
          className="browseBtn"
          onClick={() => fileInputRef.current.click()}
        >
          Browse File
        </button>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept=".pdf,.docx,.pptx"
          onChange={handleFileUpload}
        />

        <span className="up8">
          Supported formats: PDF, DOCX, PPTX (MAX 50MB)
        </span>

        {status && (
          <span
            className={
              status === "File Uploaded Successfully"
                ? "successMsg"
                : "errorMsg"
            }
          >
            {status}
          </span>
        )}

      </div>

      <div className="recentFiles">

        <h2>
          Uploaded Documents (Recent)
        </h2>

        <table>

          <thead>

            <tr>

              <th>Document Name</th>

              <th>Size</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {uploadedFiles.length === 0 ? (

              <tr>

                <td colSpan="3">
                  No Files Uploaded Yet
                </td>

              </tr>

            ) : (

              uploadedFiles.map((file, index) => (

                <tr key={index}>

                  <td>{file.name}</td>

                  <td>{file.size}</td>

                  <td>

                    <IconCircleCheckFilled
                      color="limegreen"
                      size={22}
                    />

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UploadDoc;