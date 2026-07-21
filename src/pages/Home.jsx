import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw, Star, Quote } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/ui/Button';
import { useState, useEffect } from 'react';
import { products, categories, getBestSellers, getNewArrivals, getHotProducts } from '../data/products';

const features = [
  { icon: Truck, title: 'Free Express Shipping', desc: 'On all orders worldwide' },
  { icon: ShieldCheck, title: 'Authenticity Guaranteed', desc: 'Every piece certified' },
  { icon: RotateCcw, title: '30-Day Returns', desc: 'Hassle-free returns' },
  { icon: Sparkles, title: 'RAKKA Concierge', desc: 'Personal styling service' },
];

const testimonials = [
  { name: 'Isabella Moretti', role: 'Fashion Editor, Vogue', text: 'RAKKA has redefined what luxury means in the modern era. Every piece tells a story of craftsmanship and love.', rating: 5 },
  { name: 'James Chen', role: 'Creative Director', text: 'The attention to detail is unparalleled. RAKKA is my go-to for timeless, investment-worthy pieces.', rating: 5 },
  { name: 'Sophie Laurent', role: 'Art Collector', text: 'From the packaging to the product, every interaction with RAKKA feels like a celebration of beauty.', rating: 5 },
];

function AnimatedCounter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame;
    const duration = 2000;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [to]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const trending = getHotProducts();
  const featuredCategories = categories.slice(0, 8);
  const flashDeals = products.filter((p) => p.discount >= 20).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[85vh] min-h-[600px] flex items-center">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="RAKKA Luxury Fashion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" /> New Winter Collection 2026
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                Where Love<br />Meets Luxury
              </h1>
              <p className="mt-6 text-lg text-white/80 max-w-lg leading-relaxed">
                Discover RAKKA — inspired by the Finnish word for love. Timeless elegance crafted for those who appreciate the extraordinary.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/shop" size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-none">
                  Shop the Collection <ArrowRight className="w-4 h-4" />
                </Button>
                <Button to="/about" size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  Our Story
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Curated Selection</p>
              <h2 className="section-title">Featured Categories</h2>
            </div>
            <Link to="/categories" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Loved by Many</p>
              <h2 className="section-title">Best Sellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Shop all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img src="https://images.pexels.com/photos/8386665/pexels-photo-8386665.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="RAKKA Editorial" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pl-8"
            >
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">The RAKKA Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Crafted with Love,<br />Worn for Generations
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Every RAKKA piece is born from a simple belief: that true luxury is found in the details. From the ateliers of Florence to the workshops of Geneva, our artisans pour their hearts into creating objects of enduring beauty.
              </p>
              <Button to="/about" variant="outline">Discover Our Story <ArrowRight className="w-4 h-4" /></Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Just Arrived</p>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Limited Time</p>
                <h2 className="text-3xl md:text-4xl font-bold">Flash Deals</h2>
                <p className="text-white/80 mt-2">Up to 30% off selected pieces. While stocks last.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-bold">02</div>
                  <p className="text-xs mt-1 text-white/80">Days</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-bold">14</div>
                  <p className="text-xs mt-1 text-white/80">Hours</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-bold">38</div>
                  <p className="text-xs mt-1 text-white/80">Mins</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {flashDeals.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group bg-white rounded-2xl overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-primary-600 font-bold">${p.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">${p.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">Most Wanted</p>
              <h2 className="section-title">Trending Now</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 250000, suffix: '+', label: 'Happy Customers' },
              { value: 500, suffix: '+', label: 'Artisans Worldwide' },
              { value: 120, suffix: '+', label: 'Countries Served' },
              { value: 15, suffix: '', label: 'Years of Craft' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl md:text-4xl font-bold text-gradient"><AnimatedCounter to={stat.value} suffix={stat.suffix} /></p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">What They Say</p>
            <h2 className="section-title">Loved by Connoisseurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <Quote className="w-8 h-8 text-primary-500/30 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-luxury flex items-center justify-center text-white font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-16 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">@rakka on Instagram</p>
            <h2 className="section-title">Follow Our Journey</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/972996/pexels-photo-972996.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400',
            ].map((src, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-hover"
              >
                <img src={src} alt="Instagram" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">♥</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
