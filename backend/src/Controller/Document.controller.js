const Document = require("../model/Document.model");
const { extractText } = require("../services/pdf.services");

const uploadedDoc = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a document"
            });
        }

        const text = await extractText(req.file.path);

        const document = await Document.create({
            title: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            size: req.file.size,
            extractText:text,
            uploadedBy: req.user.id
        });
       
        return res.status(201).json({
            message: "Document uploaded successfully",
            data: document
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const deleteDocument = async(req,res)=>{
    try{
        const doc = await Document.findByIdAndDelete(req.params.id);
        res.json({
            message:"Document deleted"
        });
    } catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const editDocument = async(req,res)=>{
    try{

        const editDoc = await Document.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );

        if(!editDoc){
            return res.status(404).json({
                message:"Document not found"
            });
        }

        res.json({
            message:"Document edited",
            data:editDoc
        });

    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getDocuments = async(req,res)=>{
    try{

        const docs = await Document.find({
            uploadedBy:req.user.id
        });

        res.json(docs);

    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};
module.exports = {
    uploadedDoc,deleteDocument,editDocument,getDocuments,
};