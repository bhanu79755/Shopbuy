
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

export const CheckoutPage: React.FC = () => {
  const { getCartTotal, clearCart, cart } = useAppContext();
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const total = getCartTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg mx-auto">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you for your order!</h1>
          <p className="text-gray-600">Your order has been placed successfully. You will be redirected to the home page shortly.</p>
        </div>
      </div>
    );
  }
  
  if (cart.length === 0 && !isOrderPlaced) {
      return (
          <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-2xl">Your cart is empty. Cannot proceed to checkout.</h1>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Shipping Information</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="First Name" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" required />
            </div>
            <input type="text" placeholder="Address" className="w-full p-2 border rounded mb-4" required />
            <input type="text" placeholder="City" className="w-full p-2 border rounded mb-4" required />
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <input type="text" placeholder="State" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="ZIP Code" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Country" className="w-full p-2 border rounded" required />
            </div>

            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Payment Information</h2>
            <input type="text" placeholder="Card Number" className="w-full p-2 border rounded mb-4" required />
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <input type="text" placeholder="Name on Card" className="sm:col-span-2 w-full p-2 border rounded" required />
                <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded" required />
                <input type="text" placeholder="CVC" className="w-full p-2 border rounded" required />
            </div>

            <button type="submit" className="w-full bg-amazon-yellow hover:bg-amazon-yellow-light text-black font-bold py-3 px-4 rounded-lg transition-colors text-lg">
              Place Your Order
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-4 border-b pb-4">Order Summary</h2>
          {cart.map(item => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
          ))}
          <div className="flex justify-between mt-4 pt-4 border-t text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
