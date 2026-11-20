import mongoose from 'mongoose';

export const documentSubSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  documentType: { 
    type: String, 
    required: true,
    enum: ['identification', 'drivers_license', 'proof_of_address', 'delivery_receipt']
  },
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });
