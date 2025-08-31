export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Specification {
  name: string;
  value: string;
}

export interface Question {
    id: number;
    author: string;
    question: string;
    answer: string | null;
    date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  averageRating: number;
  reviewCount: number;
  category: string;
  reviews: Review[];
  brand: string;
  specifications: Specification[];
  questions: Question[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PriceRange {
  min: number | null;
  max: number | null;
}

export type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface AppContextType {
  products: Product[];
  updateProductImage: (productId: number, imageUrl: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  browsingHistory: Product[];
  addToHistory: (product: Product) => void;

  // Filtering
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  
  // Sorting
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;

  clearFilters: () => void;
}

export interface AiProduct {
  name: string;
  price: number;
  description: string;
  category: string;
}