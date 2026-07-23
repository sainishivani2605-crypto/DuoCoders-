const model = require("../config/gemini");
const Document = require("../model/Document.model");


const askAI = async (req, res) => {

    try {

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                message: "Prompt required"
            });
        }


        const result = await model.generateContent(prompt);

        const response =
            result.response.text();


        res.status(200).json({
            reply: response
        });


    } catch (error) {
            console.log(error)
        res.status(500).json({
            message: error.message
        });

    }
};

const askDocument = async(req,res)=>{
    try{
        const { documentId, question }=req.body;
        if(!documentId || !question){
            return res.status(400).json({
                message: "Document ID and question are required",
            });
        }

        const document = await Document.findById(documentId);

        if(!document){
            return res.status(404).json({
                message:"Document not found",

            });
        }

         const prompt = `
You are DocAI AI, an intelligent document assistant.

Use ONLY the information provided in the document below.
If the answer is not present in the document, reply:
"I couldn't find that information in this document."

Document:
${document.extractText}

User Question:
${question}

Answer in the same language as the user's question.
Keep the answer clear and concise.
`;


const result = await model.generateContent(prompt);
const answer = result.response.text();

res.status(200).json({
    answer,
});

    } catch(err){
        res.status(500).json({
            message:err.message,

        });
    }
};


const summarizeDocument = async(req,res)=>{
    try{
        const { documentId } = req.body;

        if(!documentId){
            return res.status(400).json({
                message:"Document ID is required",

            });
        }

        const document = await Document.findById(documentId);
        if(!documentId){
            return res.status(404).json({
                message:"Document not found",
            });
        }
        const prompt = `You are DocAI AI.

Read the following document and provide:
1. A short summary.
2. Key points in bullet form.

Document:
${document.extractText}
;`

const result = await model.generateContent(prompt);

const summary = result.response.text();

res.status(200).json({
    summary,
});

    }
    catch(err){
        res.status(500).json({
            message:err.message

        });
    }
};

module.exports = {
    askAI,askDocument,summarizeDocument
};