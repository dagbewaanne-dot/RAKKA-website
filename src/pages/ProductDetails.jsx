import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, ChevronRight,
  Minus, Plus, Star, Check, ZoomIn,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [activeTab, setActiveTab] = useState('description');
  const [zoom, setZoom] = useState(false);

  if (!product) {
    return (
      <div className="page-container py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Product not found.</p>
        <Button to="/shop" className="mt-4">Back to Shop</Button>
      </div>
    );
  }

  const related = getRelatedProducts(id);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedSize, selectedColor);
    addToast(`${product.name} added to cart`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    addToast(wished ? 'Removed from wishlist' : 'Added to wishlist', wished ? 'info' : 'success');
  };

  return (
    <div className="page-container py-8">
      <Breadcrumb items={[
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/shop' },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
        {/* Gallery */}
        <div>
          <div
            className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-hover cursor-zoom-in"
            onClick={() => setZoom(!zoom)}
          >
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[activeImage]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
            />
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md text-gray-700 dark:text-white">
              <ZoomIn className="w-4 h-4" />
            </div>
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 tag bg-primary-500 text-white">-{product.discount}%</span>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium capitalize mb-2">{product.category.replace('-', ' ')}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

          <div className="flex items-center gap-4 mt-4">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">In Stock ({product.stock})</span>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                <span className="tag bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">Save ${(product.originalPrice - product.price).toLocaleString()}</span>
              </>
            )}
          </div>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Color: <span className="text-gray-500 dark:text-gray-400 font-normal">{selectedColor}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${selectedColor === color ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-gray-300'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Size: <span className="text-gray-500 dark:text-gray-400 font-normal">{selectedSize}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${selectedSize === size ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{product.stock} available</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button onClick={handleAddToCart} size="lg" className="flex-1">
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </Button>
            <Button onClick={handleBuyNow} size="lg" variant="accent" className="flex-1">Buy Now</Button>
            <Button onClick={handleWishlist} size="lg" variant="secondary" className="!px-4">
              <Heart className={`w-5 h-5 ${wished ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-dark-border">
            {[
              { icon: Truck, label: 'Free Shipping' },
              { icon: ShieldCheck, label: '2-Year Warranty' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <item.icon className="w-5 h-5 text-primary-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-gray-200 dark:border-dark-border overflow-x-auto">
          {['description', 'specifications', 'shipping', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-all ${activeTab === tab ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Each RAKKA piece is meticulously crafted by master artisans, ensuring the highest standards of quality and attention to detail. This product embodies our commitment to timeless elegance and enduring luxury.
              </p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="max-w-2xl">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100 dark:border-dark-border">
                      <td className="py-3 text-sm font-semibold text-gray-900 dark:text-white w-1/3">{key}</td>
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Express Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.shipping}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Returns & Exchanges</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy. Items must be in original condition with tags attached.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Authenticity</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Every RAKKA product comes with a certificate of authenticity and a unique serial number.</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-dark-border">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900 dark:text-white">{product.rating}</p>
                  <Rating value={product.rating} showCount={false} size="md" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-3">{star}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-dark-hover rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 dark:border-dark-border last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-luxury flex items-center justify-center text-white font-semibold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</p>
                        <div className="flex items-center gap-2">
                          <Rating value={review.rating} showCount={false} />
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
