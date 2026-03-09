const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  // Coffee
  { name: 'Classic Espresso', description: 'Rich and bold single shot espresso', category: 'coffee', price: 3.50, badge: 'Popular', status: 'available' },
  { name: 'Double Espresso', description: 'Intense double shot for the brave', category: 'coffee', price: 4.50, badge: '', status: 'available' },
  { name: 'Americano', description: 'Espresso diluted with hot water', category: 'coffee', price: 4.00, badge: '', status: 'available' },
  { name: 'Vanilla Latte', description: 'Smooth espresso with steamed milk and vanilla', category: 'coffee', price: 5.50, badge: 'Best Seller', status: 'available' },
  { name: 'Caramel Latte', description: 'Rich caramel blended with espresso and milk', category: 'coffee', price: 5.75, badge: '', status: 'available' },
  { name: 'Matcha Latte', description: 'Premium Japanese matcha with steamed milk', category: 'coffee', price: 6.00, badge: 'New', status: 'available' },
  { name: 'Mocha Delight', description: 'Chocolate and espresso harmony', category: 'coffee', price: 6.25, badge: '', status: 'available' },
  { name: 'Hazelnut Dream', description: 'Hazelnut infused espresso with cream', category: 'coffee', price: 6.50, badge: 'Premium', status: 'available' },
  { name: 'Pumpkin Spice Latte', description: 'Seasonal favorite with warm spices', category: 'coffee', price: 6.75, badge: 'Seasonal', status: 'available' },
  { name: 'Iced Coffee', description: 'Cold brewed and served over ice', category: 'coffee', price: 4.50, badge: '', status: 'available' },
  { name: 'Cold Brew', description: '20-hour slow steeped cold brew', category: 'coffee', price: 5.00, badge: 'Refreshing', status: 'available' },
  { name: 'Frappuccino', description: 'Blended ice coffee with whipped cream', category: 'coffee', price: 6.00, badge: '', status: 'available' },
  
  // Breakfast
  { name: 'Croissant', description: 'Buttery French pastry, fresh and crispy', category: 'breakfast', price: 4.50, badge: '', status: 'available' },
  { name: 'Chocolate Croissant', description: 'Croissant with rich chocolate filling', category: 'breakfast', price: 5.00, badge: 'Popular', status: 'available' },
  { name: 'Avocado Toast', description: 'Whole grain bread with fresh avocado and eggs', category: 'breakfast', price: 7.50, badge: 'Healthy', status: 'available' },
  { name: 'Bagel with Cream Cheese', description: 'Fresh bagel with smooth cream cheese spread', category: 'breakfast', price: 5.00, badge: '', status: 'available' },
  { name: 'Breakfast Burrito', description: 'Scrambled eggs, bacon, cheese, and vegetables', category: 'breakfast', price: 8.50, badge: 'Hearty', status: 'available' },
  { name: 'Pancakes', description: 'Fluffy pancakes with maple syrup and butter', category: 'breakfast', price: 8.00, badge: '', status: 'available' },
  { name: 'Oatmeal Bowl', description: 'Warm oatmeal with fruits and nuts', category: 'breakfast', price: 6.50, badge: 'Vegan', status: 'available' },
  
  // Snacks
  { name: 'Chocolate Chip Cookie', description: 'Classic cookie with chocolate chips', category: 'snacks', price: 2.50, badge: '', status: 'available' },
  { name: 'Blueberry Muffin', description: 'Moist muffin loaded with fresh blueberries', category: 'snacks', price: 3.50, badge: 'Fresh', status: 'available' },
  { name: 'Mixed Nuts', description: 'Roasted almonds, cashews, and walnuts', category: 'snacks', price: 4.50, badge: '', status: 'available' },
  { name: 'Granola Bar', description: 'Crunchy granola with honey and oats', category: 'snacks', price: 3.00, badge: 'Healthy', status: 'available' },
  { name: 'Apple Pie', description: 'Homemade apple pie with cinnamon', category: 'snacks', price: 4.00, badge: '', status: 'available' },
  { name: 'Cheese & Crackers', description: 'Assorted cheeses with gourmet crackers', category: 'snacks', price: 6.00, badge: 'Premium', status: 'available' },
  { name: 'Brownie', description: 'Rich and fudgy chocolate brownie', category: 'snacks', price: 3.50, badge: '', status: 'available' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(products);
    console.log('Seeded 27 products successfully (12 Coffee, 8 Breakfast, 7 Snacks');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
