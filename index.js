const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const eventRoutes = require("./routes/eventRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/events", eventRoutes);

const mongoUri = process.env.MONGO_URI?.trim();
if (!mongoUri) {
  console.error("Missing MONGO_URI in .env. Please add MONGO_URI to your environment.");
  process.exit(1);
}

// connect to MongoDB and start server only after the DB connects
mongoose.connect(mongoUri)
  .then(() => {
    console.log("DB Connected");

    // test route
    app.get("/", (req, res) => {
      res.send("Planora server is running 🚀");
    });

    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });