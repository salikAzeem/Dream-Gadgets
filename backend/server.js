import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARES (VERY IMPORTANT)
app.use(cors());
app.use(express.json()); // ❗ REQUIRED for POST JSON

// ROUTES (THIS IS THE ISSUE)
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// TEST ROUTE (ADD THIS)
app.get("/", (req, res) => {
  res.send("Dream Gadgets Backend Running");
});

// PORT (RENDER NEEDS THIS)
const PORT = process.env.PORT || 5000;

// DB + SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
