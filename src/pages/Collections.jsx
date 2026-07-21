import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';

const collections = [
  { name: 'The Love Collection', desc: 'A celebration of romance in every stitch.', image: 'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 12 },
  { name: 'Winter Essentials', desc: 'Timeless warmth for the discerning.', image: 'https://images.pexels.com/photos/8386665/pexels-photo-8386665.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 8 },
  { name: 'Atelier Leather', desc: 'Handcrafted leather goods from Florence.', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 15 },
  { name: 'Fine Jewelry', desc: 'Ethically sourced diamonds and gold.', image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 6 },
  { name: 'Signature Scents', desc: 'Fragrances crafted in Grasse.', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 4 },
  { name: 'Timepieces', desc: 'Swiss-made precision and elegance.', image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 3 },
];

export default function Collections() {
  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Collections' }]} />
      <div className="text-center mt-6 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Luxury Collections</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Discover curated collections, each telling a unique story of craftsmanship and love.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 2) * 0.1 }}
          >
            <Link to="/shop" className="group relative block aspect-[16/10] rounded-2xl overflow-hidden">
              <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white/60 text-xs font-medium">{col.count} pieces</span>
                <h2 className="text-2xl font-bold text-white mt-1">{col.name}</h2>
                <p className="text-white/70 text-sm mt-1 mb-3">{col.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
