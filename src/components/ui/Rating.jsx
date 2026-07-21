import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 'sm', showCount = true }) {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          {value.toFixed(1)}{count !== undefined && ` (${count})`}
        </span>
      )}
    </div>
  );
}
