const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existing = await Cart.findOne({ user: userId, product: productId });
    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
      return res.json(existing);
    }

    const cartItem = new Cart({
      user: userId,
      product: productId,
      productName: product.name,
      quantity: quantity || 1,
      price: product.price
    });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get cart by user ID
router.get('/:userId', async (req, res) => {
  try {
    const items = await Cart.find({ user: req.params.userId }).populate('product');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart total
router.get('/:userId/total', async (req, res) => {
  try {
    const items = await Cart.find({ user: req.params.userId });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update cart item quantity
router.put('/:cartId', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity <= 0) {
      await Cart.findByIdAndDelete(req.params.cartId);
      return res.json({ message: 'Item removed' });
    }
    const item = await Cart.findByIdAndUpdate(req.params.cartId, { quantity }, { new: true });
    if (!item) return res.status(404).json({ message: 'Cart item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove cart item
router.delete('/:cartId', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
