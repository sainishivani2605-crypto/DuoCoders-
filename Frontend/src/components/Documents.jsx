import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/documents.css";

import {
  IconSparkles,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconColorFilter
} from "@tabler/icons-react";


function Documents() {


  const [query, setQuery] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [activeMenu, setActiveMenu] = useState(null);

  const [deletePopup, setDeletePopup] = useState(null);

  const [message, setMessage] = useState("");




  const [documents, setDocuments] = useState([

    {
      id:1,
      name:"Vendor Agreement.pdf",
      category:"Legal - Vendor",
      tags:["Vendor","Payment"],
      uploaded:"2 hours ago",
      size:"2.4 MB"
    },

    {
      id:2,
      name:"Invoice January.pdf",
      category:"Finance - Invoice",
      tags:["Invoice","GST"],
      uploaded:"3 hours ago",
      size:"1.2 MB"
    },

    {
      id:3,
      name:"Employee Policy.pdf",
      category:"HR - Policy",
      tags:["Employee","Rules"],
      uploaded:"5 hours ago",
      size:"3 MB"
    },

    {
      id:4,
      name:"Project Report.pdf",
      category:"Projects - Report",
      tags:["Project","Analysis"],
      uploaded:"1 day ago",
      size:"4.5 MB"
    },

    {
      id:5,
      name:"Client Contract.pdf",
      category:"Legal - Contract",
      tags:["Client","Agreement"],
      uploaded:"2 days ago",
      size:"2 MB"
    },

    {
      id:6,
      name:"Salary Sheet.xlsx",
      category:"Finance - Payroll",
      tags:["Salary","Payroll"],
      uploaded:"3 days ago",
      size:"1.8 MB"
    },

    {
      id:7,
      name:"Marketing Plan.pdf",
      category:"Marketing - Plan",
      tags:["Campaign","Strategy"],
      uploaded:"4 days ago",
      size:"5 MB"
    },

    {
      id:8,
      name:"Purchase Order.pdf",
      category:"Finance - Purchase",
      tags:["Order","Vendor"],
      uploaded:"5 days ago",
      size:"900 KB"
    },

    {
      id:9,
      name:"Attendance Report.xlsx",
      category:"HR - Attendance",
      tags:["Attendance","Monthly"],
      uploaded:"1 week ago",
      size:"2.2 MB"
    },

    {
      id:10,
      name:"Business Proposal.pdf",
      category:"Projects - Proposal",
      tags:["Proposal","Client"],
      uploaded:"1 week ago",
      size:"6 MB"
    }

  ]);





  const categories = [

    "All",
    "Finance",
    "HR",
    "Legal",
    "Projects",
    "Marketing",
    "Others"

  ];





  // Backend Integration

  useEffect(()=>{


    /*
    
    GET API

    axios.get("/api/documents")

    Response:

    [
      {
       name:"",
       category:"",
       tags:[],
       uploaded:"",
       size:""
      }
    ]


    setDocuments(response.data)

    */


  },[]);

  const filteredDocuments = documents.filter((doc)=>{


    const searchMatch =

    doc.name
    .toLowerCase()
    .includes(query.toLowerCase());



    const categoryMatch =

    selectedCategory === "All" ||

    doc.category
    .toLowerCase()
    .includes(selectedCategory.toLowerCase());



    return searchMatch && categoryMatch;


  });







  const handleDelete = (id)=>{


    /*
    
    Backend Integration:

    DELETE /api/documents/:id


    */


    setDocuments(

      documents.filter(
        (doc)=>doc.id !== id
      )

    );


    setDeletePopup(null);

    setMessage("File deleted successfully");


    setTimeout(()=>{

      setMessage("");

    },2000);


  };

return (

<div className="first-cont">
<div className="first1">


<h2 className="one">
Documents
</h2>


<span className="two">
Manage and Organize all your uploaded documents
</span>


</div>

<div className="top-actions">



<div className="action-box">


<IconSearch size={18}/>


<input

type="text"

placeholder="Search Documents..."

value={query}

onChange={(e)=>setQuery(e.target.value)}

/>


</div>

<Link

to="/UploadDoc"

className="action-box upload-box"

>


<IconSparkles size={22} />


Upload Documents


</Link>







<div

className="action-box filter-button"

onClick={()=>setShowFilter(!showFilter)}

>


<IconFilter size={18}/>

Filter





{

showFilter &&


<div className="filter-dropdown">


{

categories.map((category)=>(


<div

key={category}

className="filter-option"

onClick={()=>{

setSelectedCategory(category);

setShowFilter(false);

}}

>

{category}

</div>


))

}



</div>


}





</div>



</div>


<div className="table-container">


<table>


<thead>

<tr>

<th>
Document
</th>


<th>
Category
</th>


<th>
Tags
</th>


<th>
Uploaded
</th>


<th>
Size
</th>


<th>
Actions
</th>


</tr>


</thead>





<tbody>


{

filteredDocuments.length > 0 ?


filteredDocuments.map((doc)=>(


<tr key={doc.id}>


<td>

📄 {doc.name}

</td>



<td>

{doc.category}

</td>




<td>


{

doc.tags.map((tag,index)=>(


<span

className="tag"

key={index}

>

{tag}

</span>


))


}


</td>




<td>

{doc.uploaded}

</td>




<td>

{doc.size}

</td>





<td>


<div className="dots-container">


<button

onClick={()=>setActiveMenu(

activeMenu === doc.id

?

null

:

doc.id

)}

>

⋯

</button>
{

activeMenu === doc.id &&


<div className="menu-popup">


<div>

<IconEdit size={15}/>

Edit File

</div>
<div

onClick={()=>setDeletePopup(doc)}

>

<IconTrash size={15}/>

Delete File

</div>



</div>


}



</div>


</td>



</tr>


))


:

<tr>

<td colSpan="6">

Document Not Found

</td>

</tr>


}



</tbody>



</table>


</div>

{

deletePopup &&


<div className="modal-overlay">


<div className="delete-modal">


<h3>

Delete Document?

</h3>


<p>

Are you sure you want to delete this file?

</p>



<button

onClick={()=>setDeletePopup(null)}

>

Cancel

</button>



<button

onClick={()=>handleDelete(deletePopup.id)}

>

Confirm

</button>



</div>


</div>


}

{

message &&


<div className="success-message">

✔ {message}

</div>


}

</div>


);

}


export default Documents;