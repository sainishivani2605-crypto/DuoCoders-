import React, { useState, useEffect } from "react";
import "../css/alertsDeadline.css";

import {
  IconUserCircle,
  IconAlertTriangle,
  IconClockHour4,
  IconCalendarEvent,
  IconSearch,
  IconBellRinging,
  IconRefresh,
  IconLoader2
} from "@tabler/icons-react";

function AlertsDeadline() {

  const [alerts,setAlerts]=useState([]);

  const [loading,setLoading]=useState(false);

  const [search,setSearch]=useState("");

  const [filter,setFilter]=useState("All");

  const [lastUpdated,setLastUpdated]=useState("");



  useEffect(()=>{

      fetchAlerts();

  },[]);



  const fetchAlerts=async()=>{

      setLoading(true);

      // ==========================
      // BACKEND + AI
      // ==========================

      /*
      try{

      const response=await fetch(

      "http://localhost:5000/api/alerts"

      );

      const data=await response.json();

      setAlerts(data.alerts);

      setLastUpdated(data.updatedAt);

      }

      catch(error){

      console.log(error);

      }

      finally{

      setLoading(false);

      }

      */


      // Remove this after backend integration

      setTimeout(()=>{

          setLoading(false);

      },1500);

  };



  const refreshAlerts=()=>{

      fetchAlerts();

  };



  const filteredAlerts=alerts.filter((item)=>{

      const matchSearch=

      item.title

      ?.toLowerCase()

      .includes(search.toLowerCase())

      ||

      item.file

      ?.toLowerCase()

      .includes(search.toLowerCase());



      const matchFilter=

      filter==="All"

      ||

      item.priority===filter;



      return matchSearch && matchFilter;

  });
  return (

    <div className="alertsPage">
      <div className="alertsHeader">

        <div>

          <h1>

            Alerts & Deadlines

          </h1>

          <p>

            Stay updated with important dates and AI generated reminders.

          </p>

        </div>

        <IconUserCircle

          size={38}

          color="#6C63FF"

        />

      </div>



      {/* Search + Filter */}

      <div className="topControls">

        <div className="searchBox">

          <IconSearch

            size={20}

          />

          <input

            type="text"

            placeholder="Search Alerts..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>



        <div className="filterButtons">

          <button

            onClick={()=>setFilter("All")}

          >

            All

          </button>

          <button

            onClick={()=>setFilter("High")}

          >

            High

          </button>

          <button

            onClick={()=>setFilter("Medium")}

          >

            Medium

          </button>

          <button

            onClick={()=>setFilter("Low")}

          >

            Low

          </button>

        </div>



        <button

          className="refreshBtn"

          onClick={refreshAlerts}

        >

          <IconRefresh

            size={20}

          />

          Refresh

        </button>

      </div>
      {

        lastUpdated &&

        <div className="lastUpdated">

          Last Updated :

          {lastUpdated}

        </div>

      }

      {

        loading &&

        <div className="loadingBox">

          <IconLoader2

            className="loader"

            size={35}

          />

          <h3>

            AI is scanning uploaded documents...

          </h3>

          <p>

            Extracting expiry dates, renewal dates,

            notice periods and payment deadlines.

          </p>

        </div>

      }
      {
        !loading &&

        <div className="alertsContainer">

          {

            filteredAlerts.length>0 ?

            filteredAlerts.map((item,index)=>(

              <div

                key={index}

                className={`alertCard ${item.priority.toLowerCase()}`}

              >

                <div className="leftAlert">

                  {

                    item.priority==="High"

                    ?

                    <IconAlertTriangle

                      size={34}

                      color="#EF4444"

                    />

                    :

                    item.priority==="Medium"

                    ?

                    <IconClockHour4

                      size={34}

                      color="#F59E0B"

                    />

                    :

                    <IconCalendarEvent

                      size={34}

                      color="#3B82F6"

                    />

                  }

                  <div>

                    <h3>

                      {item.title}

                    </h3>

                    <p>

                      {item.file}

                    </p>

                  </div>

                </div>

                <div className="rightAlert">

                  <span>

                    {item.date}

                  </span>

                </div>

              </div>

            ))

            :
            <div className="emptyAlerts">

              <IconBellRinging
                size={70}
                color="#6C63FF"
              />

              <h2>

                No Alerts Found

              </h2>

              <p>

                AI couldn't find any deadlines,
                expiry dates or renewal reminders
                from your uploaded documents.

              </p>

            </div>

          }

        </div>

      }

      {

        !loading && alerts.length>0 &&

        <div className="aiSuggestionSection">

          <h2>

            AI Recommendations

          </h2>

          <div className="suggestionGrid">

            <div className="suggestionCard">

              <h3>

                Renew Contracts

              </h3>

              <p>

                AI detected contracts that will
                expire within the next 30 days.
                Renew them to avoid service interruption.

              </p>

            </div>

            <div className="suggestionCard">

              <h3>

                Payment Reminder

              </h3>

              <p>

                Some agreements contain payment
                deadlines approaching this week.

              </p>

            </div>

            <div className="suggestionCard">

              <h3>

                Legal Review

              </h3>

              <p>

                AI recommends reviewing modified
                clauses before contract renewal.

              </p>

            </div>

          </div>

        </div>

      }

      {

        !loading && alerts.length>0 &&

        <div className="deadlineSummary">

          <h2>

            Upcoming Deadlines

          </h2>

          <div className="deadlineCards">

            <div className="deadlineCard">

              <h3>

                Today

              </h3>

              <span>

                {
                  alerts.filter(item=>item.category==="Today").length
                }

              </span>

            </div>

            <div className="deadlineCard">

              <h3>

                This Week

              </h3>

              <span>

                {
                  alerts.filter(item=>item.category==="Week").length
                }

              </span>

            </div>

            <div className="deadlineCard">

              <h3>

                This Month

              </h3>

              <span>

                {
                  alerts.filter(item=>item.category==="Month").length
                }

              </span>

            </div>

          </div>

        </div>

      }

      {

        !loading &&

        <div className="viewAllSection">

          <button className="viewAllBtn">

            View All Alerts

          </button>

        </div>

      }
  

      {

        !loading &&

        <div className="notificationSection">

          <h2>

            AI Notification Settings

          </h2>

          <div className="notificationCard">

            <div>

              <h3>

                Smart AI Alerts

              </h3>

              <p>

                AI automatically scans uploaded documents
                and reminds you before expiry, renewal,
                payment due dates and important legal deadlines.

              </p>

            </div>

            <button

              className="enableBtn"

            >

              Enable Notifications

            </button>

          </div>

        </div>

      }

      <div className="footerInfo">

        <p>

          Powered by AI Document Intelligence

        </p>

      </div>

    </div>

  );

}

export default AlertsDeadline;