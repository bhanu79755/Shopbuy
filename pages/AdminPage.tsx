import React, { ChangeEvent, useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Product } from '../types';

const AdminProductRow: React.FC<{ product: Product }> = ({ product }) => {
    const { updateProductImage } = useAppContext();
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                updateProductImage(product.id, result);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b py-4 px-2">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
            <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">ID: {product.id}</p>
            </div>
            <div className="w-full sm:w-auto">
                <label htmlFor={`upload-${product.id}`} className={`w-full block bg-amazon-blue hover:bg-amazon-blue-light text-white font-bold py-2 px-4 rounded-lg transition-colors text-center cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <input
                    id={`upload-${product.id}`}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                />
            </div>
        </div>
    );
};

export const AdminPage: React.FC = () => {
    const { products } = useAppContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 10;

    // Reset to page 1 when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 border-b pb-4">Admin - Manage Products</h1>
                
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-blue"
                        aria-label="Search products"
                    />
                </div>

                {paginatedProducts.length > 0 ? (
                    <>
                        <div className="space-y-2">
                            {paginatedProducts.map(product => (
                                <AdminProductRow key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6 pt-4 border-t">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="bg-amazon-blue hover:bg-amazon-blue-light text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="bg-amazon-blue hover:bg-amazon-blue-light text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-xl">No products found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};