import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");

// Middleware
app.use(express.json());
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check Route
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ status: "success", message: "Server is running smoothly!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
