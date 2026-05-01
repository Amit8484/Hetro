import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/common/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ProductForm from '../../components/common/ProductForm';
import { productsData } from '../../data/mockData';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products] = useState(() => [...productsData]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const showProductForm = false;

  const categories = ['Tractors', 'Parts', 'Insurance'];
  const tractorSubcategories = ['John Deere', 'Implement', 'Old Tractor', 'Other'];
  const insuranceSubcategories = ['Tractor', 'Car/Bike', 'Health', 'Gift Item'];

  const mapCategoryToGroup = (category) => {
    if (['Compact', 'Mid-Range', 'Professional', 'Budget', 'Tractors'].includes(category)) {
      return 'Tractors';
    }
    if (category === 'Parts') {
      return 'Parts';
    }
    if (category === 'Insurance') {
      return 'Insurance';
    }
    return category;
  };

  // Get available subcategories for selected category
  const getAvailableSubcategories = () => {
    if (selectedCategory === 'Tractors') {
      return tractorSubcategories;
    }
    if (selectedCategory === 'Insurance') {
      return insuranceSubcategories;
    }
    return [];
  };

  const filterProducts = (productsToFilter) => {
    let filtered = productsToFilter;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => mapCategoryToGroup(p.category) === selectedCategory);
    }

    // Filter by subcategory for categories that support it
    if ((selectedCategory === 'Tractors' || selectedCategory === 'Insurance') && selectedSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const displayedProducts = filterProducts(products);

  return (
    <>
      <Navbar userType="user" />

      <div className="bg-gradient-to-r from-lime-800 to-lime-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Our Products</h1>
          <p className="text-gray-300 mt-2">Choose a category to view products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <>
          {showProductForm && (
            <div className="mb-6 rounded-lg border border-lime-200 bg-lime-50 p-4 shadow-sm">
              <ProductForm onSuccess={() => {}} onCancel={() => {}} />
            </div>
          )}

            {/* Search Bar */}
            <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                placeholder="Search by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-700 focus:ring-2 focus:ring-lime-200"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory(''); // Reset subcategory when category changes
                }}
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-700"
              >
                <option value="">All Products</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            {(selectedCategory === 'Tractors' || selectedCategory === 'Insurance') && getAvailableSubcategories().length > 0 && (
              <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {selectedCategory === 'Insurance' ? 'Insurance Type' : 'Tractor Type'}
                </label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-700"
                >
                  <option value="">{selectedCategory === 'Insurance' ? 'All Insurance' : 'All Tractors'}</option>
                  {getAvailableSubcategories().map((subcategory) => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{displayedProducts.length}</span>{' '}
                {selectedCategory ? selectedCategory : 'Products'}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-xl text-gray-600">
                  {searchQuery
                    ? `No products found matching "${searchQuery}"`
                    : `No ${selectedCategory} products available`}
                </p>
              </div>
            )}
        </>
      </div>

      <Footer />
    </>
  );
}
