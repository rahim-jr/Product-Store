import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes";
import authRoutes from "./routes/auth";
import connectDB from "./config/db";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// connect database
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});
app.use("/api/auth", authRoutes);
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

