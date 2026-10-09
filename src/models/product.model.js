import mongoose from 'mongoose';
import {PRODUCT_STATUS} from "../constants/index.js"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio']
  },
  status: {
    type: String,
    enum: Object.values(PRODUCT_STATUS),
    default: PRODUCT_STATUS.AVAILABLE
  },
  image: {
    type: String,
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
