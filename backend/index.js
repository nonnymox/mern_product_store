// ES6
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json()); // MiddlewareFor Accepting Json data in body

app.use("/api/products", productRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server started at http://localhost:3000");
});
