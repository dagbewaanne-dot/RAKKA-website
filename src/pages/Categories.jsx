import CategoryCard from '../components/CategoryCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { categories } from '../data/products';

export default function Categories() {
  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Categories' }]} />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">All Categories</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Explore our full range of luxury categories.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </div>
  );
}
