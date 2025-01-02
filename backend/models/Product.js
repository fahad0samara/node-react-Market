import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  images: [String],
  category: { type: String, required: true },
  subcategory: String,
  brand: String,
  countInStock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  features: [String],
  specifications: [{
    name: String,
    value: String
  }],
  isOnSale: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  isFlashDeal: { type: Boolean, default: false },
  flashDealEndsAt: Date,
  isWeeklyDeal: { type: Boolean, default: false },
  isClearance: { type: Boolean, default: false },
  tags: [String],
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    rating: Number,
    comment: String,
    helpful: { type: Number, default: 0 },
    images: [String],
    createdAt: { type: Date, default: Date.now }
  }],
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  warranty: {
    available: { type: Boolean, default: false },
    duration: String,
    description: String
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: { type: Boolean, default: false },
    estimatedDays: { type: Number, default: 3 }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for calculating current price with discount
productSchema.virtual('currentPrice').get(function() {
  if (this.isOnSale && this.discountPercentage > 0) {
    return this.price * (1 - this.discountPercentage / 100);
  }
  return this.price;
});

// Index for text search
productSchema.index({
  name: 'text',
  description: 'text',
  brand: 'text',
  category: 'text',
  'specifications.value': 'text'
});

// Method to check if deal is still valid
productSchema.methods.isDealValid = function() {
  if (this.isFlashDeal && this.flashDealEndsAt) {
    return new Date() < this.flashDealEndsAt;
  }
  return this.isOnSale;
};

// Static method to find similar products
productSchema.statics.findSimilar = async function(productId) {
  const product = await this.findById(productId);
  if (!product) return [];

  return this.find({
    _id: { $ne: productId },
    category: product.category,
    price: {
      $gte: product.price * 0.7,
      $lte: product.price * 1.3
    }
  }).limit(4);
};

export default mongoose.model('Product', productSchema);