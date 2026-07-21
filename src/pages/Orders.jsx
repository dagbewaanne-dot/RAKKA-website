import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { products } from '../data/products';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

const mockOrders = [
  { id: 'RAKKA84215690', date: '2026-07-15', status: 'delivered', total: 2499, items: [{ id: 'p1', qty: 1 }] },
  { id: 'RAKKA84215691', date: '2026-07-18', status: 'shipped', total: 1099, items: [{ id: 'p8', qty: 1 }] },
  { id: 'RAKKA84215692', date: '2026-07-19', status: 'processing', total: 1598, items: [{ id: 'p4', qty: 2 }] },
  { id: 'RAKKA84215693', date: '2026-07-10', status: 'cancelled', total: 399, items: [{ id: 'p10', qty: 1 }] },
];

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusConfig = {
  processing: { icon: Clock, color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30' },
  shipped: { icon: Truck, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
  delivered: { icon: CheckCircle, color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
  cancelled: { icon: XCircle, color: 'text-red-500 bg-red-100 dark:bg-red-900/30' },
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? mockOrders : mockOrders.filter((o) => o.status === activeTab);

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Orders' }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-8">My Orders</h1>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary-500 text-white shadow-primary' : 'bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No orders in this category.</p>
          <Button to="/shop">Start Shopping</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const status = statusConfig[order.status];
            return (
              <div key={order.id} className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Placed on {order.date}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${status.color}`}>
                    <status.icon className="w-3.5 h-3.5" /> {order.status}
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
                  {order.items.map((item, i) => {
                    const product = products.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <Link key={i} to={`/product/${product.id}`} className="flex items-center gap-2 group">
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.qty}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="ml-auto text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">${order.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
