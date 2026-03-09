const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const demoUsers = [
  {
    fullName: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    password: 'Test@123',
    role: 'CUSTOMER'
  },
  {
    fullName: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'ADMIN'
  },
  {
    fullName: 'John Coffee',
    username: 'johncoffee',
    email: 'john@example.com',
    password: 'Coffee@123',
    role: 'CUSTOMER'
  }
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Create demo users
    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${userData.username}`);
    }

    console.log('\n✅ Database seeded with demo users!');
    console.log('\n📝 Demo Credentials:');
    console.log('─'.repeat(50));
    demoUsers.forEach(user => {
      console.log(`\nUsername: ${user.username}`);
      console.log(`Password: ${user.password}`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
    });
    console.log('\n─'.repeat(50));

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seedUsers();
