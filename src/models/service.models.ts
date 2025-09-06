import mongoose from "mongoose";
import { config } from "dotenv";
config();
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please State your name"]
    },
    email: {
        type: String,
        required: [true, "Please State your email"]

    },
    service: {
        type: String,
        required: [true, "Please State your service"]
    }
    ,
    requirements: {
        type: String,
        required: [true, "Please State your requirements"]
    },
    budget: {
        type: Number,
        required: [true, "Please State your budget"]
    }
})

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);