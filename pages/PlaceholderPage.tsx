import React from 'react';
import { Link } from 'react-router-dom';

export const PlaceholderPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Under Construction</h1>
        <p className="text-gray-600 mb-6">This page is not yet available. Please check back later!</p>
        <Link 
          to="/" 
          className="bg-amazon-blue hover:bg-amazon-blue-light text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};