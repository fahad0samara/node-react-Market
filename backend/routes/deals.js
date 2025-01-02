import express from 'express';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get flash deals
router.get('/flash', async (req, res) => {
  try {
    const deals = await Product.find({
      isFlashDeal: true,
      flashDealEndsAt: { $gt: new Date() },
    }).sort({ discountPercentage: -1 }).limit(8);
    
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get weekly deals
router.get('/weekly', async (req, res) => {
  try {
    const deals = await Product.find({
      isWeeklyDeal: true,
    }).sort({ createdAt: -1 }).limit(8);
    
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get clearance items
router.get('/clearance', async (req, res) => {
  try {
    const deals = await Product.find({
      isClearance: true,
    }).sort({ discountPercentage: -1 }).limit(12);
    
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get personalized deals (requires authentication)
router.get('/personalized', protect, async (req, res) => {
  try {
    // Get user's purchase history and preferences
    const userPreferences = await getUserPreferences(req.user._id);
    
    // Find deals based on user's interests
    const deals = await Product.find({
      category: { $in: userPreferences.preferredCategories },
      isOnSale: true,
    }).limit(8);
    
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get deal details
router.get('/:id', async (req, res) => {
  try {
    const deal = await Product.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;