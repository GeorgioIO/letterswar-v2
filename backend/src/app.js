import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import pool from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import questionRoutes from "./modules/questions/questions.routes.js";
import lettersRoutes from "./modules/letters/letters.routes.js";
import adminsRoutes from "./modules/admins/admins.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
import boardRoutes from "./modules/board/board.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ message: "Server is running and DB is connected" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "DB connection failed", error: error.message });
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/letters", lettersRoutes);
app.use("/api/v1/admins", adminsRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/board", boardRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
