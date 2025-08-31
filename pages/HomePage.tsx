import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { AiRecommendations } from '../components/AiRecommendations';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../hooks/useAppContext';

export const HomePage: React.FC = () => {
  const { products: allProducts, selectedCategory, priceRange, sortOrder } = useAppContext();

  const filteredAndSortedProducts = React.useMemo(() => {
    let products = [...allProducts];

    // Filtering
    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }
    if (priceRange.min !== null) {
      products = products.filter(p => p.price >= (priceRange.min ?? 0));
    }
    if (priceRange.max !== null) {
      products = products.filter(p => p.price <= (priceRange.max ?? Infinity));
    }

    // Sorting
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
        case 'default':
        default:
            // Maintain a stable default order (e.g., by ID)
            products.sort((a, b) => a.id - b.id);
            break;
    }

    return products;
  }, [allProducts, selectedCategory, priceRange, sortOrder]);


  return (
    <main className="container mx-auto px-4">
      <div className="my-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <img src="https://picsum.photos/seed/banner/1200/256" alt="Promotional Banner" className="w-full h-full object-cover rounded-lg"/>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
            <Sidebar />
        </div>
        <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-md shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Deals for you</h2>
                 {filteredAndSortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-xl text-gray-700">No products found.</h2>
                        <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
            <AiRecommendations />
        </div>
      </div>
    </main>
  );
};