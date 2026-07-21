import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, Store, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

export default function Checkout() {
  const { cartItems, subtotal, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('express');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const shipping = subtotal > 500 ? 0 : 25;
  const expressFee = deliveryOption === 'express' ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + expressFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty.</p>
        <Button to="/shop">Continue Shopping</Button>
      </div>
    );
  }

  const steps = ['Shipping', 'Billing', 'Delivery', 'Review'];

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <div className="flex items-center justify-center gap-2 sm:gap-4 my-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 sm:gap-4">
            <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${i + 1 <= step ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-dark-hover text-gray-400'}`}>
                {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 ${i + 1 < step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-border'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-6">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label><input className="input-field" placeholder="John" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label><input className="input-field" placeholder="Doe" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label><input type="email" className="input-field" placeholder="john@example.com" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label><input className="input-field" placeholder="+1 (555) 000-0000" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label><input className="input-field" placeholder="123 Luxury Ave" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label><input className="input-field" placeholder="New York" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">ZIP Code</label><input className="input-field" placeholder="10001" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country</label><select className="input-field"><option>United States</option><option>United Kingdom</option><option>France</option><option>Italy</option><option>Japan</option></select></div>
                </div>
                <div className="flex justify-end mt-6"><Button onClick={() => setStep(2)}>Continue <ChevronRight className="w-4 h-4" /></Button></div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Billing Address</h2>
                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <input type="checkbox" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} className="w-4 h-4 rounded text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Same as shipping address</span>
                </label>
                {!sameAsShipping && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label><input className="input-field" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label><input className="input-field" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">ZIP Code</label><input className="input-field" /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country</label><select className="input-field"><option>United States</option><option>United Kingdom</option><option>France</option></select></div>
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)}>Continue <ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Delivery Options</h2>
                <div className="space-y-3">
                  {[
                    { id: 'express', icon: Truck, name: 'Express Delivery', desc: '2-3 business days', price: 'Free' },
                    { id: 'standard', icon: Truck, name: 'Standard Delivery', desc: '5-7 business days', price: '$15' },
                    { id: 'pickup', icon: Store, name: 'Store Pickup', desc: 'Available in 24 hours', price: 'Free' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDeliveryOption(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${deliveryOption === opt.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-gray-200 dark:border-dark-border hover:border-gray-300'}`}
                    >
                      <opt.icon className={`w-5 h-5 ${deliveryOption === opt.id ? 'text-primary-500' : 'text-gray-400'}`} />
                      <div className="flex-1"><p className="text-sm font-semibold text-gray-900 dark:text-white">{opt.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{opt.price}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={() => setStep(4)}>Continue <ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Review Your Order</h2>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-dark-border">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.product.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}{item.size && ` · ${item.size}`}{item.color && ` · ${item.color}`}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">${(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
                  <Button onClick={() => navigate('/payment', { state: { total } })}>Proceed to Payment <ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Items ({itemCount})</span><span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Shipping</span><span className="text-gray-900 dark:text-white font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Tax</span><span className="text-gray-900 dark:text-white font-medium">${tax.toFixed(2)}</span></div>
            </div>
            <div className="flex justify-between pt-4 mt-4 border-t border-gray-100 dark:border-dark-border">
              <span className="font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
