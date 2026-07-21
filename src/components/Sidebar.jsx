import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { categories } from '../data/products';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-72 bg-white dark:bg-dark-card shadow-luxury-lg flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-dark-border">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Categories</h2>
              <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover hover:text-gray-600 dark:hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <Link to="/shop" className={`sidebar-link ${location.pathname === '/shop' ? 'active' : ''}`} onClick={onClose}>
                <span className="flex-1">All Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="my-2 border-t border-gray-100 dark:border-dark-border" />
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="sidebar-link"
                  onClick={onClose}
                >
                  <span className="flex-1">{cat.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-dark-border">
              <Link to="/collections" onClick={onClose} className="block text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                View All Collections
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
