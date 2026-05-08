import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import questionRoutes from "./modules/questions/questions.routes.js";
import lettersRoutes from "./modules/letters/letters.routes.js";
import adminsRoutes from "./modules/admins/admins.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/letters", lettersRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
