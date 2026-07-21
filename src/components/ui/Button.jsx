import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-primary',
  secondary: 'border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover',
  ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white',
  outline: 'border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
  icon: 'p-2.5',
};

export default function Button({ children, variant = 'primary', size = 'md', to, href, onClick, className = '', type = 'button', disabled, ...props }) {
  const base = `inline-flex items-center justify-center gap-2 font-medium rounded-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={base} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
