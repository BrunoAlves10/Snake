// External Dependencies
import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { leaderboardRouter } from "./routes/leaderboard.routes";

// Global Config
dotenv.config();

const app: Application = express();
app.use(cors({ origin: '*' }));
const port: number = parseInt(process.env.PORT!);

// Initialize API
connectToDatabase()
  .then(() => {
    app.use("/leaderboard", leaderboardRouter);

    app.listen(port, () => {
      console.log(`API started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed: ", error);
    process.exit();
  });
