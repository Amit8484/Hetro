import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const productImage = product.image || '/images/hero-bg.avif';
  const categoryLabel = ['Compact', 'Mid-Range', 'Professional', 'Budget', 'Tractors'].includes(product.category)
    ? 'Tractors'
    : product.category;
  const specEntries = Object.entries(product.specifications || {})
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .slice(0, 2);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gray-200 p-2">
        <img
          src={productImage}
          alt={product.name}
          className="h-full w-full object-contain object-center transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          {categoryLabel}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-900">{product.name}</h3>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{product.description}</p>

        <div className="mb-3 space-y-1 text-xs text-gray-600">
          {specEntries.length > 0 ? (
            specEntries.map(([key, value]) => (
              <p key={key}>- {key.replace(/([A-Z])/g, ' $1').trim()}: {String(value)}</p>
            ))
          ) : (
            <p>- Category specific details available</p>
          )}
        </div>

        <div className="mt-auto">
          <Link
            to={`/products/${product.id}`}
            className="block rounded bg-blue-600 py-2 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
