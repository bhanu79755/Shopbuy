
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../hooks/useAppContext';
import { processSearchQuery } from '../services/geminiService';
import { Product } from '../types';

interface AiSearchCriteria {
    searchTerm: string;
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
}

export const SearchResultsPage: React.FC = () => {
    const { query } = useParams<{ query: string }>();
    const { products: allProducts, selectedCategory, priceRange, sortOrder } = useAppContext();
    
    const [aiCriteria, setAiCriteria] = useState<AiSearchCriteria | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const performAiSearch = async () => {
            if (!query) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const categories = [...new Set(allProducts.map(p => p.category))];
                const criteria = await processSearchQuery(query, categories);
                setAiCriteria(criteria);
            } catch (err) {
                console.error(err);
                setError("There was an issue with the AI search. Using standard search instead.");
                // Fallback to standard search
                setAiCriteria({ searchTerm: query, category: null, minPrice: null, maxPrice: null });
            } finally {
                setIsLoading(false);
            }
        };

        performAiSearch();
    }, [query, allProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        if (!aiCriteria) return [];

        let products: Product[] = [];

        // Step 1: Apply AI-driven filters first
        const lowercasedSearchTerm = aiCriteria.searchTerm.toLowerCase();
        products = allProducts.filter(p => 
            p.name.toLowerCase().includes(lowercasedSearchTerm) || 
            p.description.toLowerCase().includes(lowercasedSearchTerm)
        );

        if (aiCriteria.category) {
            products = products.filter(p => p.category === aiCriteria.category);
        }
        if (aiCriteria.minPrice !== null) {
            products = products.filter(p => p.price >= aiCriteria.minPrice!);
        }
        if (aiCriteria.maxPrice !== null) {
            products = products.filter(p => p.price <= aiCriteria.maxPrice!);
        }
        
        // Step 2: Apply user's sidebar filters on top of AI results
        if (selectedCategory) {
          products = products.filter(p => p.category === selectedCategory);
        }
        if (priceRange.min !== null) {
          products = products.filter(p => p.price >= (priceRange.min ?? 0));
        }
        if (priceRange.max !== null) {
          products = products.filter(p => p.price <= (priceRange.max ?? Infinity));
        }

        // Step 3: Apply sorting
        switch (sortOrder) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                products.sort((a, b) => b.averageRating - a.averageRating);
                break;
            default:
                products.sort((a, b) => a.id - b.id);
                break;
        }
        
        return products;
      }, [aiCriteria, allProducts, selectedCategory, priceRange, sortOrder]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amazon-blue"></div>
                    <p className="ml-4 text-lg">Analyzing your search with AI...</p>
                </div>
            );
        }

        if (error) {
            return <p className="text-red-500 text-center">{error}</p>;
        }

        return (
            <>
                {filteredAndSortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <h2 className="text-xl text-gray-700">No products found.</h2>
                        <p className="text-gray-500 mt-2">Try a different search term or adjust your filters.</p>
                    </div>
                )}
            </>
        );
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">Results for "{query}"</h1>
            {!isLoading && <p className="text-gray-600 mb-6">{filteredAndSortedProducts.length} results found.</p>}
            
            {aiCriteria && (aiCriteria.category || aiCriteria.minPrice || aiCriteria.maxPrice) && !isLoading && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-6" role="alert">
                    <p className="font-bold">AI Search Applied</p>
                    <p>Showing results for "{aiCriteria.searchTerm}"{aiCriteria.category ? ` in the "${aiCriteria.category}" category` : ''}. You can use the filters to refine this further.</p>
                </div>
            )}

            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Sidebar />
                </div>
                <div className="lg:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </main>
    );
};
