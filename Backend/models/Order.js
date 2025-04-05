import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User",
        required: true
    },
    products: [{
        product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product" },
        quantity: Number,
        size: String
    }],
    totalAmount: Number,
    status:{
        type: String,
        enum: ["pending","shipped", "delivered", "cancelled"],
        default: "pending"
    },
    shippingAddress:{
        fullName:{
            type: String,
            required: true
        },
        phone:{
            type: Number,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        postalCode:{
            type: String,
            required: true
        }
    },
    paymentMethod: String,


},{ timestamps: true});


export default mongoose.model("Order", orderSchema);