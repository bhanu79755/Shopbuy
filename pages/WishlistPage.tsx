import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Product } from '../types';

const WishlistItem: React.FC<{ item: Product }> = ({ item }) => {
    const { addToCart, removeFromWishlist } = useAppContext();

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b py-4">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md" />
            <div className="flex-grow text-center sm:text-left">
                <Link to={`/product/${item.id}`} className="hover:text-red-700">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                </Link>
                <p className="text-gray-500 text-lg font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-stretch sm:items-end gap-2 w-full sm:w-auto">
                <button 
                    onClick={() => addToCart(item, 1)}
                    className="bg-amazon-yellow hover:bg-amazon-yellow-light text-black font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-36"
                >
                    Add to Cart
                </button>
                <button 
                    onClick={() => removeFromWishlist(item.id)} 
                    className="text-red-500 hover:underline text-sm"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export const WishlistPage: React.FC = () => {
  const { wishlist } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-10">
              <p className="text-gray-600 text-xl">Your wishlist is empty.</p>
              <p className="text-gray-500 mt-2">Add items you want to save for later.</p>
              <Link to="/" className="bg-amazon-blue text-white font-bold py-3 px-6 rounded-lg inline-block mt-6 hover:bg-amazon-blue-light transition-colors">
                  Discover Products
              </Link>
          </div>
        ) : (
          <div>
            {wishlist.map(item => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
