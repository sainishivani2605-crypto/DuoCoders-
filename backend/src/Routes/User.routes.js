const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/adminOnly.middleware")

const{
    createUser,
    getUser,
    loginUser,
} = require("../Controller/User.controller");

router.post("/",createUser);
router.get("/",auth,admin,getUser);
router.post("/login",loginUser);


module.exports = router;