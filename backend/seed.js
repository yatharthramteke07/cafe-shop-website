const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  { name: 'Classic Espresso', description: 'Rich and bold single shot espresso', category: 'espresso', price: 3.50, badge: 'Popular', status: 'available' },
  { name: 'Double Espresso', description: 'Intense double shot for the brave', category: 'espresso', price: 4.50, badge: '', status: 'available' },
  { name: 'Americano', description: 'Espresso diluted with hot water', category: 'espresso', price: 4.00, badge: '', status: 'available' },
  { name: 'Vanilla Latte', description: 'Smooth espresso with steamed milk and vanilla', category: 'latte', price: 5.50, badge: 'Best Seller', status: 'available' },
  { name: 'Caramel Latte', description: 'Rich caramel blended with espresso and milk', category: 'latte', price: 5.75, badge: '', status: 'available' },
  { name: 'Matcha Latte', description: 'Premium Japanese matcha with steamed milk', category: 'latte', price: 6.00, badge: 'New', status: 'available' },
  { name: 'Mocha Delight', description: 'Chocolate and espresso harmony', category: 'specialty', price: 6.25, badge: '', status: 'available' },
  { name: 'Hazelnut Dream', description: 'Hazelnut infused espresso with cream', category: 'specialty', price: 6.50, badge: 'Premium', status: 'available' },
  { name: 'Pumpkin Spice Latte', description: 'Seasonal favorite with warm spices', category: 'specialty', price: 6.75, badge: 'Seasonal', status: 'available' },
  { name: 'Iced Coffee', description: 'Cold brewed and served over ice', category: 'cold', price: 4.50, badge: '', status: 'available' },
  { name: 'Cold Brew', description: '20-hour slow steeped cold brew', category: 'cold', price: 5.00, badge: 'Refreshing', status: 'available' },
  { name: 'Frappuccino', description: 'Blended ice coffee with whipped cream', category: 'cold', price: 6.00, badge: '', status: 'available' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(products);
    console.log('Seeded 12 products successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
