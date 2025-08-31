import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { PriceRange, SortOrder } from '../types';

export const Sidebar: React.FC = () => {
    const { 
        products,
        selectedCategory, 
        setSelectedCategory, 
        priceRange, 
        setPriceRange,
        sortOrder,
        setSortOrder,
        clearFilters 
    } = useAppContext();
    const [categories, setCategories] = useState<string[]>([]);
    const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(priceRange);

    const sortOptions: { key: SortOrder; label: string }[] = [
        { key: 'default', label: 'Featured' },
        { key: 'price-asc', label: 'Price: Low to High' },
        { key: 'price-desc', label: 'Price: High to Low' },
        { key: 'rating-desc', label: 'Avg. Customer Review' },
    ];

    useEffect(() => {
        const productCategories = products.map(p => p.category);
        setCategories([...new Set(productCategories)].sort());
    }, [products]);
    
    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [priceRange]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalPriceRange(prev => ({
            ...prev,
            [name]: value ? Number(value) : null,
        }));
    };
    
    const applyPriceFilter = () => {
        setPriceRange(localPriceRange);
    };

    return (
        <aside className="w-full">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Filters</h2>
                
                {/* Category Filter */}
                <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full text-left p-2 rounded ${!selectedCategory ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100'}`}
                            >
                                All Categories
                            </button>
                        </li>
                        {categories.map(category => (
                            <li key={category}>
                                <button 
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left p-2 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100'}`}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr className="my-4" />

                {/* Price Range Filter */}
                <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            name="min"
                            placeholder="Min"
                            value={localPriceRange.min ?? ''}
                            onChange={handlePriceChange}
                            className="w-full p-2 border rounded-md text-sm"
                            aria-label="Minimum price"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            name="max"
                            placeholder="Max"
                            value={localPriceRange.max ?? ''}
                            onChange={handlePriceChange}
                            className="w-full p-2 border rounded-md text-sm"
                            aria-label="Maximum price"
                        />
                    </div>
                    <button 
                        onClick={applyPriceFilter}
                        className="w-full mt-2 bg-amazon-blue hover:bg-amazon-blue-light text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                        Apply Price
                    </button>
                </div>
                
                <hr className="my-4" />
                
                {/* Sort By */}
                <div>
                    <h3 className="font-semibold mb-2">Sort By</h3>
                    <ul className="space-y-1 text-sm">
                        {sortOptions.map(option => (
                            <li key={option.key}>
                                <button 
                                    onClick={() => setSortOrder(option.key)}
                                    className={`w-full text-left p-2 rounded ${sortOrder === option.key ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100'}`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                <hr className="my-4" />

                <button 
                    onClick={clearFilters}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    Clear All Filters
                </button>
            </div>
        </aside>
    );
};