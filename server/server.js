import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.use(express.json());
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    app.get("/", (req, res) => {
      res.send("Server is live.......");
    });

    app.use("/api/users", userRouter);
    app.use("/api/resumes", resumeRouter);
    app.use("/api/ai", aiRouter);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}



startServer();
