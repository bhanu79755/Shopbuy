import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { ShoppingCartIcon, SearchIcon, MenuIcon, HeartIcon } from './icons';

export const Header: React.FC = () => {
  const { cart, wishlist } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
    }
  };

  return (
    <header className="bg-amazon-blue text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-white hover:text-amazon-yellow transition-colors">
          Amaze
        </Link>
        
        <div className="flex-grow hidden md:block">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              className="w-full rounded-l-md border-r-0 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
              placeholder="Search Amaze-Clone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-amazon-yellow hover:bg-amazon-yellow-light text-black px-4 rounded-r-md flex items-center justify-center">
              <SearchIcon className="h-6 w-6" />
            </button>
          </form>
        </div>

        <nav className="flex items-center gap-5">
          <Link to="/account" className="hidden md:block hover:border-white border-transparent border rounded p-1 transition-colors">
            <span className="text-xs block">Hello, Sign in</span>
            <span className="font-bold text-sm block">Account & Lists</span>
          </Link>
           <Link to="/orders" className="hidden md:block hover:border-white border-transparent border rounded p-1 transition-colors">
            <span className="text-xs block">Returns</span>
            <span className="font-bold text-sm block">& Orders</span>
          </Link>
          <Link to="/wishlist" className="relative flex items-end">
            <HeartIcon className="h-8 w-8" />
            {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-amazon-yellow text-amazon-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalWishlistItems}
                </span>
            )}
            <span className="hidden lg:inline font-bold ml-1">Wishlist</span>
          </Link>
          <Link to="/cart" className="relative flex items-end">
            <ShoppingCartIcon className="h-8 w-8" />
            <span className="absolute -top-1 -right-2 bg-amazon-yellow text-amazon-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartItems}
            </span>
            <span className="hidden lg:inline font-bold ml-1">Cart</span>
          </Link>
        </nav>
      </div>
       <div className="bg-amazon-blue-light py-1 px-4 text-sm flex items-center gap-4">
        <button className="flex items-center gap-1 font-bold">
            <MenuIcon className="h-5 w-5" />
            All
        </button>
        <Link to="/deals" className="hover:underline">Today's Deals</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/customer-service" className="hover:underline">Customer Service</Link>
        <Link to="/registry" className="hover:underline">Registry</Link>
        <Link to="/gift-cards" className="hover:underline">Gift Cards</Link>
        <Link to="/sell" className="hover:underline">Sell</Link>
      </div>
    </header>
  );
};