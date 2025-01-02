import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: bcrypt.hashSync('user123', 10),
    isAdmin: false,
  },
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Premium Backpack',
    description: 'Durable and stylish backpack for everyday use',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    countInStock: 15,
    rating: 4.8,
    numReviews: 15,
  },
];

async function seedData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Product.deleteMany();

    // Seed users
    console.log('Seeding users...');
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully');

    // Add admin user reference to products
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(product => ({ ...product, user: adminUser }));

    // Seed products
    console.log('Seeding products...');
    await Product.insertMany(sampleProducts);
    console.log('Products seeded successfully');

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

seedData();