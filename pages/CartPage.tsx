
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { CartItem as CartItemType } from '../types';

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useAppContext();

    return (
        <div className="flex items-center gap-4 border-b py-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="text-sm">Qty:</label>
                    <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="border border-gray-300 rounded-md p-1"
                    >
                        {[...Array(10).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline text-sm ml-4">Remove</button>
                </div>
            </div>
            <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    );
};


export const CartPage: React.FC = () => {
  const { cart, getCartTotal } = useAppContext();
  const total = getCartTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 border-b pb-4">Shopping Cart</h1>
          {cart.length === 0 ? (
            <div>
                <p className="text-gray-600 text-xl">Your cart is empty.</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    Continue Shopping
                </Link>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2 text-lg">
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow-light text-black font-bold py-3 px-4 rounded-lg transition-colors mt-4 text-lg">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
