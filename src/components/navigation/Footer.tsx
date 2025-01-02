import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports',
    'Books', 'Beauty', 'Toys', 'Automotive'
  ];

  const customerService = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'Track Order', href: '/track-order' },
  ];

  const company = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Affiliates', href: '/affiliates' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Connected</h3>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-500 px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 EStore. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-orange-500">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-orange-500">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-orange-500">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}