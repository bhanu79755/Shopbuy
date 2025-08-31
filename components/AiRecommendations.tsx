
import React, { useState, useEffect } from 'react';
import { getAiRecommendations } from '../services/geminiService';
import { useAppContext } from '../hooks/useAppContext';
import { AiProduct } from '../types';

const AiProductCard: React.FC<{ product: AiProduct }> = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-64 group">
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        <img src={`https://picsum.photos/seed/${product.name.replace(/\s/g, '')}/400/300`} alt={product.name} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 truncate group-hover:underline">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="mt-1 mb-2">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow-light text-black font-bold py-2 px-4 rounded-lg text-sm">
          View Details
        </button>
      </div>
    </div>
);


export const AiRecommendations: React.FC = () => {
  const { browsingHistory } = useAppContext();
  const [recommendations, setRecommendations] = useState<AiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    if (browsingHistory.length > 0) {
      setLoading(true);
      setError(null);
      try {
        const result = await getAiRecommendations(browsingHistory);
        setRecommendations(result);
      } catch (err) {
        setError('Failed to fetch recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Debounce the API call slightly
    const handler = setTimeout(() => {
        fetchRecommendations();
    }, 500);

    return () => {
        clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browsingHistory]);

  if (browsingHistory.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 mt-8 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Inspired by your browsing history</h2>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amazon-blue"></div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recommendations.length > 0 && (
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {recommendations.map((rec, index) => (
            <AiProductCard key={index} product={rec} />
          ))}
        </div>
      )}
    </div>
  );
};
