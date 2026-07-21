import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { getNewArrivals } from '../data/products';

export default function NewArrivals() {
  const products = getNewArrivals();
  return (
    <div className="page-container py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'New Arrivals' }]} />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">New Arrivals</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">The latest additions to the RAKKA collection.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
