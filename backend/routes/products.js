import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get new arrivals
router.get('/new-arrivals', async (req, res) => {
  try {
    const { sort = 'newest' } = req.query;
    let sortOptions = {};

    switch (sort) {
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'popular':
        sortOptions = { numReviews: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const products = await Product.find({
      createdAt: { $gte: thirtyDaysAgo }
    })
    .sort(sortOptions)
    .limit(20);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products with advanced filtering and search
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      inStock,
      onSale,
      sort,
      page = 1,
      limit = 12
    } = req.query;
    
    const query = {};
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }

    // Brand filter
    if (brand) {
      query.brand = brand;
    }
    
    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Stock status
    if (inStock === 'true') {
      query.countInStock = { $gt: 0 };
    }

    // Sale status
    if (onSale === 'true') {
      query.isOnSale = true;
    }

    // Sorting
    let sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions = { price: 1 };
        break;
      case 'price-desc':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      case 'reviews':
        sortOptions = { numReviews: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(query)
    ]);

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other routes remain the same...

export default router;