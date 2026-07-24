import React, { useState } from "react";

import {
    IconUserCircle,
    IconFile,
    IconMicrophone,
    IconSend,
    IconDots
} from "@tabler/icons-react";

import "../css/aiChat.css";


function Aichat(){


const [question,setQuestion] = useState("");

const [file,setFile] = useState(null);


const [menu,setMenu] = useState(false);



const [history,setHistory] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
);



const [messages,setMessages] = useState([]);
d

const handleFile=(e)=>{

    setFile(e.target.files[0]);

};


const startVoice=()=>{


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert("Speech recognition not supported");

return;

}



const recognition =
new SpeechRecognition();


recognition.lang="en-IN";


recognition.start();



recognition.onresult=(event)=>{


const voiceText =
event.results[0][0].transcript;


setQuestion(voiceText);


};


};

const sendMessage=async()=>{


if(!question.trim())
return;



const userQuestion = question;
const updatedHistory=[

...history,

userQuestion

];



setHistory(updatedHistory);



localStorage.setItem(

"chatHistory",

JSON.stringify(updatedHistory)

);

setMessages(prev=>[

...prev,

{

sender:"user",

text:userQuestion

}

]);



setQuestion("");





/*

========================

BACKEND INTEGRATION

========================


const formData = new FormData();


formData.append(
"file",
file
);


formData.append(
"question",
userQuestion
);



const response =
await fetch(

"http://localhost:5000/api/chat",

{

method:"POST",

body:formData

}

);



const data =
await response.json();



setMessages(prev=>[

...prev,

{

sender:"ai",

text:data.answer

}

]);



========================

*/






// Temporary AI Answer


setTimeout(()=>{


setMessages(prev=>[

...prev,

{

sender:"ai",

text:

`AI answer for:
${userQuestion}`

}

]);


},1000);





};








// New Chat

const newChat=()=>{


setMessages([]);

setQuestion("");

};








return(


<div className="ai1">





{/* Header */}


<div className="ai2">


<div className="ai3">


<h2 className="ai4">

AI Chat Assistant

</h2>



<span className="ai5">

Ask questions and get instant answers from your documents

</span>


</div>





<div className="ai6">


<IconUserCircle

size={34}

color="#4F46E5"

/>


</div>


</div>



<div className="historyCard">



<div className="historyHeader">


<h3>
Chat History
</h3>




<button

className="newChat"

onClick={newChat}

>

+ New Chat

</button>



</div>





<div className="historyMenu">


<IconDots

size={25}

cursor="pointer"

onClick={()=>setMenu(!menu)}

/>





{

menu &&

<div className="menuBox">


<p

onClick={()=>{


setHistory([]);

localStorage.removeItem(
"chatHistory"
);

setMenu(false);


}}

>

Remove

</p>




<p

onClick={()=>setMenu(false)}

>

Cancel

</p>



</div>


}



</div>


<div className="historyList">


{

history.map((item,index)=>(


<div

className="historyItem"

key={index}

>


{item}


</div>


))


}



</div>

</div>


<div className="chatArea">


<div className="messages">


{

messages.map((msg,index)=>(


<div

key={index}

className={

msg.sender==="user"

?

"userMsg"

:

"aiMsg"

}

>


{msg.text}


</div>


))


}



</div>

<div className="inputBox">

<label className="fileBtn">


<IconFile

size={28}

color="#4F46E5"

/>
<input

type="file"

hidden

onChange={handleFile}

/>

</label>


<input

className="questionInput"

placeholder="Type your message..."

value={question}

onChange={(e)=>

setQuestion(e.target.value)

}

/>

<IconMicrophone

size={28}

color="#4F46E5"

className="voiceBtn"

onClick={startVoice}

/>

<IconSend

size={28}

color="#4F46E5"

className="sendBtn"

onClick={sendMessage}

/>

</div>

</div>

</div>


)


}



export default Aichat;
