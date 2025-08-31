import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { WishlistPage } from './pages/WishlistPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { AdminPage } from './pages/AdminPage';


const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/search/:query" element={<SearchResultsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              
              {/* Placeholder Routes for Header & Footer */}
              <Route path="/account" element={<PlaceholderPage />} />
              <Route path="/orders" element={<PlaceholderPage />} />
              <Route path="/deals" element={<PlaceholderPage />} />
              <Route path="/customer-service" element={<PlaceholderPage />} />
              <Route path="/registry" element={<PlaceholderPage />} />
              <Route path="/gift-cards" element={<PlaceholderPage />} />
              <Route path="/sell" element={<PlaceholderPage />} />
              <Route path="/careers" element={<PlaceholderPage />} />
              <Route path="/blog" element={<PlaceholderPage />} />
              <Route path="/about" element={<PlaceholderPage />} />
              <Route path="/investor-relations" element={<PlaceholderPage />} />
              <Route path="/sell-products" element={<PlaceholderPage />} />
              <Route path="/sell-business" element={<PlaceholderPage />} />
              <Route path="/affiliate" element={<PlaceholderPage />} />
              <Route path="/advertise" element={<PlaceholderPage />} />
              <Route path="/business-card" element={<PlaceholderPage />} />
              <Route path="/shop-with-points" element={<PlaceholderPage />} />
              <Route path="/reload-balance" element={<PlaceholderPage />} />
              <Route path="/currency-converter" element={<PlaceholderPage />} />
              <Route path="/your-account" element={<PlaceholderPage />} />
              <Route path="/your-orders" element={<PlaceholderPage />} />
              <Route path="/shipping" element={<PlaceholderPage />} />
              <Route path="/help" element={<PlaceholderPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;