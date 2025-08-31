import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amazon-blue-light text-white mt-12">
        <div className="bg-gray-700 hover:bg-gray-600 transition-colors">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full py-4 text-sm">
                Back to top
            </button>
        </div>
      <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-2">Get to Know Us</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/about" className="hover:underline">About Amaze-Clone</Link></li>
            <li><Link to="/investor-relations" className="hover:underline">Investor Relations</Link></li>
            <li><Link to="/admin" className="hover:underline">Admin Panel</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Make Money with Us</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><Link to="/sell-products" className="hover:underline">Sell products on Amaze-Clone</Link></li>
            <li><Link to="/sell-business" className="hover:underline">Sell on Amaze-Clone Business</Link></li>
            <li><Link to="/affiliate" className="hover:underline">Become an Affiliate</Link></li>
            <li><Link to="/advertise" className="hover:underline">Advertise Your Products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Amaze-Clone Payment Products</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><Link to="/business-card" className="hover:underline">Amaze-Clone Business Card</Link></li>
            <li><Link to="/shop-with-points" className="hover:underline">Shop with Points</Link></li>
            <li><Link to="/reload-balance" className="hover:underline">Reload Your Balance</Link></li>
            <li><Link to="/currency-converter" className="hover:underline">Amaze-Clone Currency Converter</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Let Us Help You</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><Link to="/your-account" className="hover:underline">Your Account</Link></li>
            <li><Link to="/your-orders" className="hover:underline">Your Orders</Link></li>
            <li><Link to="/shipping" className="hover:underline">Shipping Rates & Policies</Link></li>
            <li><Link to="/help" className="hover:underline">Help</Link></li>
          </ul>
        </div>
      </div>
      <div className="bg-amazon-blue py-6 text-center text-sm border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Amaze-Clone, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};