import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Drawer({ isOpen, onClose, title, children, side = 'right', width = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const widthClass = { sm: 'max-w-xs', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' }[width];
  const sideClass = side === 'right' ? 'right-0' : 'left-0';
  const animFrom = side === 'right' ? { x: '100%' } : { x: '-100%' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={animFrom}
            animate={{ x: 0 }}
            exit={animFrom}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`absolute top-0 ${sideClass} h-full w-full ${widthClass} bg-white dark:bg-dark-card shadow-luxury-lg flex flex-col`}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-border">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover hover:text-gray-600 dark:hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
