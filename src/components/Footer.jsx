import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, Send, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { useToast } from '../context/ToastContext';

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', to: '/new-arrivals' },
    { label: 'Best Sellers', to: '/shop' },
    { label: 'Collections', to: '/collections' },
    { label: 'Categories', to: '/categories' },
  ],
  Account: [
    { label: 'My Profile', to: '/profile' },
    { label: 'My Orders', to: '/orders' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Shopping Cart', to: '/cart' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Store Locations', to: '/contact' },
    { label: 'Careers', to: '/about' },
  ],
  Support: [
    { label: 'Shipping Info', to: '/contact' },
    { label: 'Returns', to: '/contact' },
    { label: 'FAQ', to: '/contact' },
    { label: 'Privacy Policy', to: '/contact' },
  ],
};

export default function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Welcome to RAKKA. Check your inbox for exclusive access.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-100 dark:border-dark-border mt-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              RAKKA — inspired by the Finnish word for love. Timeless elegance, crafted for those who appreciate the extraordinary.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl bg-white dark:bg-dark-hover text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-1 group">
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Join the RAKKA Circle</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Exclusive access to collections, private events, and more.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
              />
              <button type="submit" className="btn-primary px-5">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 RAKKA. All rights reserved. Crafted with love.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> care@rakka.com</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +1 (800) 725-5272</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
