const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
    askAI,askDocument,summarizeDocument,
} = require("../Controller/ai.controller");


router.post("/ask",auth, askAI);
router.post("/ask-document",auth,askDocument);
router.post("/summary",auth,summarizeDocument);


module.exports = router;