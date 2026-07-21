import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Wallet, Apple, Smartphone, Building2, Lock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

const paymentMethods = [
  { id: 'card', icon: CreditCard, label: 'Credit Card' },
  { id: 'paypal', icon: Wallet, label: 'PayPal' },
  { id: 'apple', icon: Apple, label: 'Apple Pay' },
  { id: 'google', icon: Smartphone, label: 'Google Pay' },
  { id: 'bank', icon: Building2, label: 'Bank Transfer' },
];

export default function Payment() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const total = location.state?.total || subtotal;
  const [method, setMethod] = useState('card');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (method === 'card') {
      if (!cardData.number || cardData.number.replace(/\s/g, '').length < 15) e.number = 'Invalid card number';
      if (!cardData.name) e.name = 'Name is required';
      if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) e.expiry = 'MM/YY';
      if (!cardData.cvv || cardData.cvv.length < 3) e.cvv = 'Invalid CVV';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const orderNumber = 'RAKKA' + Date.now().toString().slice(-8);
    clearCart();
    navigate('/order-success', { state: { orderNumber, total } });
  };

  const formatCardNumber = (v) => v.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout', to: '/checkout' }, { label: 'Payment' }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-8">Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePay} className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${method === m.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-gray-200 dark:border-dark-border hover:border-gray-300'}`}
                >
                  <m.icon className={`w-6 h-6 ${method === m.id ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${method === m.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {method === 'card' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Card Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                  <input
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                    placeholder="4242 4242 4242 4242"
                    className={`input-field ${errors.number ? 'border-red-500' : ''}`}
                  />
                  {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name on Card</label>
                  <input value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} placeholder="John Doe" className={`input-field ${errors.name ? 'border-red-500' : ''}`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry</label>
                  <input value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} className={`input-field ${errors.expiry ? 'border-red-500' : ''}`} />
                  {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                  <input value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="123" className={`input-field ${errors.cvv ? 'border-red-500' : ''}`} />
                  {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {method !== 'card' && (
            <div className="card p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">You will be redirected to {paymentMethods.find((m) => m.id === method)?.label} to complete your payment securely.</p>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Lock className="w-4 h-4" /> Your payment information is encrypted and secure.
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Check className="w-5 h-5" /> Pay ${total.toFixed(2)}
          </Button>
        </form>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">${(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-dark-border">
              <div className="flex justify-between"><span className="font-semibold text-gray-900 dark:text-white">Total</span><span className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
