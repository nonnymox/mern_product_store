// ES6
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();
app.use(express.json()); // MiddlewareFor Accepting Json data in body

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.image || !product.price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error Occurred:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Product deleted"})
  } catch (error){
    res.status(404).json({success: false, message: "product not found."})
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("Server started at http://localhost:3000");
});
