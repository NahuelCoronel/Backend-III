import mongoose from 'mongoose';
import { DELIVERY_STATUS } from '../constants/index.js';

const deliverySchema = new mongoose.Schema({
  trackingCode: { type: String, required: true, unique: true },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Puede no estar asignado de inmediato
  },
  status: {
    type: String,
    enum: Object.values(DELIVERY_STATUS),
    default: DELIVERY_STATUS.ASSIGNED
  },
  deliveryAddress: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Delivery', deliverySchema);
