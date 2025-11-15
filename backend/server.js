const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
