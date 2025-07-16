require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const institutionRoute = require("./routes/institution");
const AdRoute = require("./routes/adRoutes");
const reviewRoute = require("./routes/review");
const courseRoutes = require("./routes/courseRoute");
const entranceExamRoutes = require("./routes/entranceExamRoute");
const searchRoutes = require("./routes/searchRoutes");


const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/reviews', reviewRoute);
app.use("/api/ad",AdRoute);
app.use("/api/courses", courseRoutes);
app.use("/api/entrance-exams", entranceExamRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", institutionRoute);


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();

