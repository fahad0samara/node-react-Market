import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Package, Menu, X, Heart, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transition } from '@headlessui/react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    'Electronics',
    'Fashion',
    'Home',
    'Beauty',
    'Sports',
    'Books',
  ];

  return (
    <nav className="bg-white border-b">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 text-sm flex justify-between items-center">
          <p>Free shipping on orders over $50</p>
          <div className="flex gap-4">
            <Link to="/track-order" className="hover:text-orange-400">Track Order</Link>
            <Link to="/help" className="hover:text-orange-400">Help</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500 flex items-center gap-2">
            <Package className="w-8 h-8" />
            EStore
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="hover:text-orange-500">Home</Link>
            <div className="relative group">
              <button className="hover:text-orange-500">Categories</button>
              <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${category}`}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/deals" className="hover:text-orange-500">Deals</Link>
            <Link to="/new-arrivals" className="hover:text-orange-500">New Arrivals</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <Transition
                show={showNotifications}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2"
              >
                <div className="px-4 py-2 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {/* Sample notifications */}
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm">Your order has been shipped!</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm">New deals available on electronics</p>
                    <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                  </div>
                </div>
              </Transition>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full">
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500"
                  >
                    Orders
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search (visible below md breakpoint) */}
      <div className="md:hidden px-4 py-2 border-t">
        <SearchBar />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
          >
            <div className="px-4 py-2">
              <Link to="/" className="block py-2">Home</Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="block py-2"
                >
                  {category}
                </Link>
              ))}
              <Link to="/deals" className="block py-2">Deals</Link>
              <Link to="/new-arrivals" className="block py-2">New Arrivals</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}