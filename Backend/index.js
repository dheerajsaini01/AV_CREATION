import createProduct from "./type.js";

import express from "express";
import mongoose from "mongoose";

import {db_url} from "./product-databse.js"

//const express = require("express");

const app = express();

app.use(express.json()); // Middleware to parse JSON request body
console.log(`connected to mongodb ${db_url}`)
async function connectDB() {
    try {
      await mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error.message);
      process.exit(1); // Exit if unable to connect
    }
  }
  
  connectDB(); 
app.listen(3001);
console.log(`connected to mongodb ${db_url}`)


app.post('/createProduct', async (req, res) => {
  const payload = req.body;
console.log(payload)
  const parsePayload = createProduct.safeParse(payload);
console.log("aa gya bhai", parsePayload)
  if (!parsePayload.success) {
    res.status(411).json({
      msg: "you sent the wrong inputs",
    });
    return;
  }

  try {
    await product.create({
      name: payload.name,
      sku: payload.sku,
     // category_id: payload.category_id,
      price: payload.price,
      stock: payload.stock,
      status: payload.status,
      tags: payload.tags,
    });

    res.status(201).json({ msg: "✅ Product created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "❌ Error while creating product", error: err.message });
  }
});


app.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params; // Get product ID from URL
    const payload = req.body; // Get updated data from request body

    // Validate incoming data using Zod
    const parsePayload = createProduct.safeParse(payload);
    if (!parsePayload.success) {
        return res.status(400).json({
            msg: "❌ Invalid input data",
            errors: parsePayload.error.errors,
        });
    }

    try {
        // Find product by ID and update
        const updatedProduct = await product.findByIdAndUpdate(id, payload, { new: true });

        // If product not found, return error
        if (!updatedProduct) {
            return res.status(404).json({ msg: "❌ Product not found!" });
        }

        res.status(200).json({
            msg: "✅ Product updated successfully!",
            product: updatedProduct,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "❌ Error while updating product",
            error: err.message,
        });
    }
});
