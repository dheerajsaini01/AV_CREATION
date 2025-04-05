import { timeStamp } from "console";
import mongoose from "mongoose";

export const db_url = "mongodb+srv://dheerajsaini:dheeraj123@clusterone.o509o.mongodb.net/AVcreation";


 const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    // category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' },
    tags: { type: [String], default: [] },  // Array of tags
},{ timestamps: true });

export const product = mongoose.model('product', productSchema)

