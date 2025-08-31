import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Product, CartItem, AppContextType, PriceRange, SortOrder } from '../types';
import { initialProducts } from '../services/productService';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // On initial load, merge initial product data with any custom images from localStorage.
    try {
        const loadedProducts = initialProducts.map(product => {
            const storedImage = localStorage.getItem(`product_image_${product.id}`);
            if (storedImage) {
                return { ...product, image: storedImage };
            }
            return product;
        });
        return loadedProducts;
    } catch (error) {
        console.error("Could not read from localStorage:", error);
        return initialProducts;
    }
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [browsingHistory, setBrowsingHistory] = useState<Product[]>([]);

  // State for filters & sort
  const [selectedCategory, setSelectedCategoryState] = useState<string | null>(null);
  const [priceRange, setPriceRangeState] = useState<PriceRange>({ min: null, max: null });
  const [sortOrder, setSortOrderState] = useState<SortOrder>('default');

  const updateProductImage = useCallback((productId: number, imageUrl: string) => {
    // Persist the new image URL in localStorage.
    try {
        localStorage.setItem(`product_image_${productId}`, imageUrl);
    } catch (error) {
        console.error("Could not write to localStorage:", error);
    }
    // Update the product state to reflect the change immediately.
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, image: imageUrl } : p
      )
    );
  }, []);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const addToHistory = useCallback((product: Product) => {
    setBrowsingHistory(prevHistory => {
      const isAlreadyInHistory = prevHistory.some(p => p.id === product.id);
      if (isAlreadyInHistory) {
        return prevHistory;
      }
      const newHistory = [product, ...prevHistory];
      // Keep history to a reasonable size for the AI prompt
      return newHistory.slice(0, 5);
    });
  }, []);

  // Functions for filters & sort
  const setSelectedCategory = useCallback((category: string | null) => {
    setSelectedCategoryState(category);
  }, []);

  const setPriceRange = useCallback((range: PriceRange) => {
    setPriceRangeState(range);
  }, []);

  const setSortOrder = useCallback((order: SortOrder) => {
    setSortOrderState(order);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategoryState(null);
    setPriceRangeState({ min: null, max: null });
    setSortOrderState('default');
  }, []);

  const value = {
    products,
    updateProductImage,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    browsingHistory,
    addToHistory,
    // Filters & Sort values
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortOrder,
    setSortOrder,
    clearFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};