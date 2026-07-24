import React, { useState, useEffect } from "react";
import { Search, Bell, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/topbar.css";


const docsList = [
  {
    name: "Vendor Agreement.pdf",
    path: "/documents/Vendor Agreement.pdf",
  },
  {
    name: "NDA_2024.pdf",
    path: "/documents/NDA_2024.pdf",
  },
  {
    name: "HR Policy Manual.docx",
    path: "/documents/HR Policy Manual.docx",
  },
  {
    name: "Client Contract.pdf",
    path: "/documents/Client Contract.pdf",
  },
  {
    name: "Project Proposal.pptx",
    path: "/documents/Project Proposal.pptx",
  },
];


function Topbar({ user }) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();


  const handleSearch = (e) => {

    const value = e.target.value;

    setQuery(value);


    if(value.trim() === ""){
      setResults([]);
      return;
    }


    const searchResult = docsList.filter((doc)=>
      doc.name.toLowerCase().includes(value.toLowerCase())
    );


    setResults(searchResult);

  };



  useEffect(()=>{

    const handleKey = (e)=>{

      if((e.ctrlKey || e.metaKey) && e.key==="k"){

        e.preventDefault();

        document.getElementById("docSearch")?.focus();

      }

    };


    window.addEventListener("keydown",handleKey);


    return ()=>{
      window.removeEventListener("keydown",handleKey);
    };


  },[]);



  return (

    <header className="topbar">


      <div className="user-welcome">

        <h2>
          Welcome back, {user?.name || "User"}! 👋
        </h2>

        <p>
          Here's what's happening with your documents today.
        </p>

      </div>




      <div className="topbar-actions">


        <div className="search-container">


          <div className="search-input-box">


            <Search 
              size={16}
              className="search-icon"
            />


            <input

              id="docSearch"

              type="text"

              placeholder="Search documents..."

              value={query}

              onChange={handleSearch}

            />


            <span className="kbd-badge">
              Ctrl K
            </span>


          </div>




          {
            results.length > 0 &&

            <div className="search-result">

              {
                results.map((doc,index)=>(

                  <div

                    key={index}

                    className="result-item"

                    onClick={() => window.open(doc.path,"_blank")}

                  >

                    📄 {doc.name}

                  </div>

                ))
              }

            </div>

          }


        </div>





        <button className="icon-button">

          <Bell size={18}/>

          <span className="dot-badge">
            3
          </span>

        </button>





        {
          user ?

          (

            <div className="profile-chip">


              <div className="avatar">

                {user.name ? user.name[0] : "U"}

              </div>



              <div className="profile-details">


                <span className="name">

                  {user.name}

                </span>



                <span className="email">

                  {user.email}

                </span>


              </div>


            </div>


          )


          :

          (

            <button

              className="btn-primary"

              onClick={() => navigate("/login")}

            >

              <LogIn size={16}/>

              Login


            </button>

          )

        }



      </div>


    </header>

  );

}
export default Topbar;
