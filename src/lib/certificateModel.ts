import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfAcquisition: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the model
export default mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);
