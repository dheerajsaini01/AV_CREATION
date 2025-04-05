import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.Objectid,
        ref: "User",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number, 
            default: 1
        },
        size: String
    }]
},{ timestamps: true });

export default mongoose.model("Cart", cartSchema);