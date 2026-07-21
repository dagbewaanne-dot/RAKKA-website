import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Truck } from 'lucide-react';
import Button from '../components/ui/Button';

export default function OrderSuccess() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || 'RAKKA00000000';
  const total = location.state?.total || 0;

  return (
    <div className="page-container py-16">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-bold text-gray-900 dark:text-white">
          Order Confirmed!
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-500 dark:text-gray-400 mt-3">
          Thank you for your purchase. Your order is being prepared with love.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Order Number</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{orderNumber}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Paid</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">2-3 business days</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button to="/orders" size="lg" className="flex-1"><Package className="w-5 h-5" /> Track Order</Button>
          <Button to="/shop" size="lg" variant="secondary" className="flex-1">Continue Shopping <ArrowRight className="w-4 h-4" /></Button>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-500 dark:text-gray-400">
          <Truck className="w-4 h-4" /> A confirmation email has been sent to your inbox.
        </div>
      </div>
    </div>
  );
}
