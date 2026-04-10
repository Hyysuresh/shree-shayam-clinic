import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { seedAdmin } from "./seedAdmin.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",") ?? [];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ message: "API is healthy" });
});

app.use("/api", authRoutes);
app.use("/api", appointmentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
