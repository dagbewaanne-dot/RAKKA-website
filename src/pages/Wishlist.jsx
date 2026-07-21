import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductById } from '../data/products';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const wishlistProducts = items.map((id) => getProductById(id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-hover flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Save your favorite pieces here for later.</p>
        <Button to="/shop" size="lg">Explore Collection <ArrowRight className="w-4 h-4" /></Button>
      </div>
    );
  }

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-8">My Wishlist ({wishlistProducts.length})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="card overflow-hidden group">
            <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-dark-hover">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-primary-600 transition-colors">{product.name}</h3>
              </Link>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">${product.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => { addToCart(product.id, 1, product.sizes[0], product.colors[0]); addToast('Added to cart', 'success'); }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                </Button>
                <Button size="sm" variant="secondary" className="!px-3" onClick={() => { removeFromWishlist(product.id); addToast('Removed from wishlist', 'info'); }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
