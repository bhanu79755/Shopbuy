import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Rating } from './Rating';
import { useAppContext } from '../hooks/useAppContext';
import { HeartIcon } from './icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full group relative">
       <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full hover:bg-white transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon className={`h-6 w-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
        </button>
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="hover:text-red-700">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:underline">
                {product.name}
            </h3>
        </Link>
        <Rating averageRating={product.averageRating} reviewCount={product.reviewCount} />
        <div className="mt-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow-light text-black font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
