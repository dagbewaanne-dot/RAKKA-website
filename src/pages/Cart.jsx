import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = (e) => {
    e.preventDefault();
    const coupons = { RAKKA10: 0.1, LOVE20: 0.2, WELCOME: 0.15 };
    if (coupons[coupon.toUpperCase()]) {
      setAppliedCoupon({ code: coupon.toUpperCase(), discount: coupons[coupon.toUpperCase()] });
      addToast(`Coupon ${coupon.toUpperCase()} applied!`, 'success');
    } else {
      addToast('Invalid coupon code', 'error');
    }
    setCoupon('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-hover flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Discover our luxury collection and find something you love.</p>
        <Button to="/shop" size="lg">Continue Shopping <ArrowRight className="w-4 h-4" /></Button>
      </div>
    );
  }

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shopping Cart' }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-8">Shopping Cart ({itemCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="card p-4 flex gap-4">
              <Link to={`/product/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-hover flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.color && `Color: ${item.color}`}
                    {item.size && ` · Size: ${item.size}`}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">${item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-xl">
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <button onClick={() => { removeFromCart(item.id, item.size, item.color); addToast('Item removed from cart', 'info'); }} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            <form onSubmit={applyCoupon} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
              </div>
              <Button type="submit" size="sm" variant="secondary">Apply</Button>
            </form>
            {appliedCoupon && (
              <div className="flex items-center justify-between text-sm text-green-600 dark:text-green-400 mb-4">
                <span>Coupon {appliedCoupon.code}</span>
                <span>-${(subtotal * appliedCoupon.discount).toFixed(2)}</span>
              </div>
            )}

            <div className="space-y-3 py-4 border-t border-gray-100 dark:border-dark-border">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                <span className="text-gray-900 dark:text-white font-medium">${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400">Discount</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between py-4 border-t border-gray-100 dark:border-dark-border">
              <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
            </div>

            <Button onClick={() => navigate('/checkout')} size="lg" className="w-full mt-4">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Button>
            <Link to="/shop" className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mt-4 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
