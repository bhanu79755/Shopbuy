
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Review, Question } from '../types';
import { Rating } from '../components/Rating';
import { useAppContext } from '../hooks/useAppContext';
import { ProductReviews } from '../components/ProductReviews';
import { HeartIcon } from '../components/icons';
import { getSimilarProducts } from '../services/geminiService';
import { ProductCard } from '../components/ProductCard';

type ActiveTab = 'description' | 'specifications' | 'qa';

const QAndAItem: React.FC<{ item: Question }> = ({ item }) => (
    <div className="py-4 border-b last:border-b-0">
        <p className="font-semibold text-gray-800">Q: {item.question}</p>
        <p className="mt-1 text-gray-600">A: {item.answer || 'No answer yet.'}</p>
        <p className="text-xs text-gray-400 mt-2">Asked by {item.author} on {new Date(item.date).toLocaleDateString()}</p>
    </div>
);


export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { products, addToCart, addToHistory, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('description');
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const productId = Number(id);
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setReviews(foundProduct.reviews);
        setQuestions(foundProduct.questions);
        addToHistory(foundProduct);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products]);
  
  useEffect(() => {
    const fetchSimilarProducts = async () => {
        if (!product) return;

        setLoadingSimilar(true);
        try {
            const recommendedIds = await getSimilarProducts(product, products);
            const recommendedProducts = products.filter(p => recommendedIds.includes(p.id) && p.id !== product.id);
            setSimilarProducts(recommendedProducts);
        } catch (err) {
            console.error("Failed to fetch similar products:", err);
            // Silently fail, don't show an error to the user
        } finally {
            setLoadingSimilar(false);
        }
    };

    if (product) {
        fetchSimilarProducts();
    }
  }, [product, products]);


  const handleAddReview = (newReview: Review) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() === '') return;

    const question: Question = {
        id: Date.now(),
        author: 'Guest', // In a real app, this would be the logged-in user
        question: newQuestion.trim(),
        answer: null,
        date: new Date().toISOString()
    };
    setQuestions(prev => [question, ...prev]);
    setNewQuestion('');
  };

  if (!product) {
    return <div className="text-center py-20 text-xl">Product not found.</div>;
  }
  
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
      if (isWishlisted) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product);
      }
  };

  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
    : product.averageRating; // Fallback to original rating if there are no reviews

  const TabButton: React.FC<{tab: ActiveTab, label: string}> = ({ tab, label }) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-3 font-semibold text-lg rounded-t-lg transition-colors ${
            activeTab === tab 
            ? 'bg-white border-b-0 border-gray-200 border-l border-r border-t text-amazon-blue' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
        {label}
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-lg max-h-96" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
            <p className="text-md text-gray-500 mb-2">Brand: <span className="text-blue-600 font-semibold">{product.brand}</span></p>
            <Rating averageRating={averageRating} reviewCount={reviewCount || product.reviewCount} />
            <hr className="my-4"/>
            <div className="mb-4">
              <span className="text-3xl font-bold text-red-700">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="font-semibold">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2"
              >
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
                <button
                onClick={() => addToCart(product, quantity)}
                className="flex-grow bg-amazon-yellow hover:bg-amazon-yellow-light text-black font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                >
                Add to Cart
                </button>
                <button
                    onClick={handleWishlistToggle}
                    className="p-3 border-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <HeartIcon className={`h-7 w-7 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200 flex space-x-2">
            <TabButton tab="description" label="Description" />
            <TabButton tab="specifications" label="Specifications" />
            <TabButton tab="qa" label="Customer Q&A" />
        </div>
        <div className="bg-white p-8 rounded-b-lg rounded-r-lg shadow-lg border-t-0 border-gray-200 border">
            {activeTab === 'description' && (
                <div className="prose max-w-none">
                    <p>{product.description}</p>
                </div>
            )}
            {activeTab === 'specifications' && (
                <div>
                    <h3 className="text-xl font-bold mb-4">Technical Details</h3>
                    <table className="w-full text-left">
                        <tbody>
                            {product.specifications.map((spec, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4 bg-gray-50 font-semibold">{spec.name}</td>
                                    <td className="py-2 px-4">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeTab === 'qa' && (
                <div>
                    <h3 className="text-xl font-bold mb-4">Questions & Answers</h3>
                    <form onSubmit={handleAskQuestion} className="mb-6 flex gap-2">
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-grow p-2 border rounded-md"
                        />
                        <button type="submit" className="bg-amazon-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-amazon-blue-light">Ask</button>
                    </form>
                    <div>
                        {questions.length > 0 ? (
                            questions.map(q => <QAndAItem key={q.id} item={q} />)
                        ) : (
                            <p>No questions have been asked yet. Be the first!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>

      <ProductReviews reviews={reviews} onAddReview={handleAddReview} />
      
      {(loadingSimilar || similarProducts.length > 0) && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            {loadingSimilar ? (
                 <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amazon-blue"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {similarProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
      )}
    </div>
  );
};