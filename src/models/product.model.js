import mongoose from 'mongoose';

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
    enum: ["available", "out_of_stock"],
    default: "available"
  },
  image: {
    type: String,
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
