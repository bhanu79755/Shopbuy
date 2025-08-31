import React, { useState } from 'react';
import { Review } from '../types';
import { StarIcon } from './icons';
import { Rating } from './Rating';

interface ProductReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <div className="border-b py-4">
    <div className="flex items-center mb-2">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="ml-4 text-lg font-semibold">{review.author}</p>
    </div>
    <p className="text-gray-500 text-sm mb-2">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
    <p className="text-gray-700">{review.comment}</p>
  </div>
);

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return(
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                >
                    <StarIcon className={`h-8 w-8 cursor-pointer transition-colors ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`} />
                </button>
            ))}
        </div>
    );
};

export const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, onAddReview }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment || rating === 0) {
        setError('Please fill out all fields and select a rating.');
        return;
    }
    setError('');

    const newReview: Review = {
      id: Date.now(),
      author,
      comment,
      rating,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    onAddReview(newReview);
    setAuthor('');
    setComment('');
    setRating(0);
  };
  
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded-md" required/>
                    </div>
                     <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                        <StarRatingInput rating={rating} setRating={setRating} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full p-2 border rounded-md" required></textarea>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-amazon-blue hover:bg-amazon-blue-light text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Submit Review
                    </button>
                </form>
            </div>
            <div className="md:col-span-2">
                 <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {reviews.length > 0 ? (
                    <div>
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                            <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                            <div className="flex-grow">
                                <Rating averageRating={averageRating} reviewCount={reviews.length} />
                                <p className="text-sm text-gray-500 mt-1">based on {reviews.length} reviews</p>
                            </div>
                        </div>
                        {reviews.map(review => <ReviewItem key={review.id} review={review} />)}
                    </div>
                ) : (
                    <p>No reviews yet. Be the first to add one!</p>
                )}
            </div>
        </div>
    </div>
  );
};
