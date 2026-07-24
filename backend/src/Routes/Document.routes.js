const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
 
const {
    uploadedDoc,
    deleteDocument,
    editDocument,
    getDocuments,
} = require("../Controller/Document.controller");

router.post("/upload", auth, upload.single("file"),uploadedDoc);
router.get("/",auth,getDocuments);
router.delete("/:id", auth, deleteDocument);
router.put("/:id",auth,editDocument)
module.exports = router;
