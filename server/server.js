import "dotenv/config";
// (removed) import dotenv from "dotenv"; dotenv.config();
// (removed) import imagekit from "./config/imagekit.js";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
// (removed) import User from "./models/User.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection and server start
async function startServer() {
  // ...existing code...
  await connectDB();

  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Server is live.......");
  });

  // fixed: add leading slashes to route mount paths
  app.use("/api/users", userRouter);
  app.use("/api/resumes", resumeRouter);
  app.use("/api/ai", aiRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();