const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['espresso', 'latte', 'specialty', 'cold'] },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
  badge: { type: String, default: '' },
  status: { type: String, default: 'available', enum: ['available', 'unavailable'] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
