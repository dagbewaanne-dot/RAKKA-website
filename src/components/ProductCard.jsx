import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import Rating from './ui/Rating';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const badgeClass = {
  new: 'badge-new',
  sale: 'badge-sale',
  hot: 'badge-hot',
  bestseller: 'badge-new',
};
const badgeLabel = {
  new: 'NEW',
  sale: 'SALE',
  hot: 'TRENDING',
  bestseller: 'BESTSELLER',
};

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const wished = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1, product.sizes[0], product.colors[0]);
    addToast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(wished ? 'Removed from wishlist' : 'Added to wishlist', wished ? 'info' : 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="group block card overflow-hidden product-card-hover">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-dark-hover">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={badgeClass[product.badge]}>{badgeLabel[product.badge]}</span>
            )}
            {product.discount > 0 && (
              <span className="tag bg-primary-500 text-white">-{product.discount}%</span>
            )}
          </div>

          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              wished
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-black/40 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-black/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${wished ? 'fill-white' : ''}`} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
            <button
              onClick={handleQuickAdd}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-dark-card text-gray-900 dark:text-white rounded-xl text-xs font-semibold hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all shadow-luxury"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
            </button>
            <div className="flex items-center justify-center w-10 bg-white dark:bg-dark-card text-gray-900 dark:text-white rounded-xl shadow-luxury">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 capitalize">{product.category.replace('-', ' ')}</p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1.5">{product.name}</h3>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="flex items-center gap-2 mt-2.5">
            <span className="text-base font-bold text-gray-900 dark:text-white">${product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
