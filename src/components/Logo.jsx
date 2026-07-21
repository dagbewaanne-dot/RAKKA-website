import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo({ size = 'md', className = '' }) {
  const sizeClass = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }[size];

  return (
    <Link to="/" className={`inline-block ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-sans font-black tracking-[0.2em] ${sizeClass} text-gray-900 dark:text-white`}
      >
        RAKKA
      </motion.span>
    </Link>
  );
}
