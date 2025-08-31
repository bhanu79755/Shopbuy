
import React from 'react';
import { StarIcon } from './icons';

interface RatingProps {
  averageRating: number;
  reviewCount: number;
}

export const Rating: React.FC<RatingProps> = ({ averageRating, reviewCount }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{reviewCount} reviews</span>
    </div>
  );
};
