import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        image: { type: String, required: true }, // stored as S3 key or relative path
        date: { type: Date, required: true },
    },
    { timestamps: true } // adds createdAt and updatedAt
);

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
export default Certificate;
