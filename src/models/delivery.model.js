import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'La orden asociada es obligatoria']
  },
  trackingCode: {
    type: String,
    required: [true, 'El código de seguimiento es obligatorio'],
    unique: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'delivered'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;

