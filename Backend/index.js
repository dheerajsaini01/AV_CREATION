import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/authRoutes.js"
// import productRoutes from "./routes/productRoutes.js"


import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 3000

dotenv.config();


app.use(express.json())
app.use(cookieParser())// To parse the incoming request with JSON payloads (from req.body)


app.get('/', (req,res)=> {
    res.send("hey")
})

app.use('/api/auth', authRoutes);
// app.use('/api/product', productRoutes)


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
    console.log('MongoDB URL:', process.env.MongoDB_URL);
})