require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require("./src/Routes/user.routes");

const connectDB = require("./src/config/db");

connectDB();

app.use("/user", userRoutes);

const documentRoutes = require("./src/Routes/Document.routes");
app.use("/document",documentRoutes);

const aiRoutes = require("../backend/src/Routes/ai.routes");
app.use("/api/ai", aiRoutes);


app.listen(process.env.PORT, () => {
    console.log("Server running");
});