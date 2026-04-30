import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProductForm from '../../components/common/ProductForm';

const TABS = {
  DASHBOARD: 'dashboard',
  PRODUCTS: 'products'
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const parseErrorMessage = async (response) => {
  try {
    const body = await response.json();
    return body.message || JSON.stringify(body);
  } catch {
    return response.statusText || `HTTP ${response.status}`;
  }
};

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export default function AdminPortal() {
  const SHOW_ADD_PRODUCT = import.meta.env.VITE_ENABLE_ADD_PRODUCT === 'true';
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const allProducts = await apiRequest('/api/products');
      setProducts(allProducts);
    } catch (err) {
      setError(err?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Calling async loader here triggers state updates; allow this
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const stats = useMemo(() => ({
    totalProducts: products.length
  }), [products]);

  const handleAddClick = () => {
    setEditProduct(null);
    setShowForm(true);
    setActiveTab(TABS.PRODUCTS);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowForm(true);
    setActiveTab(TABS.PRODUCTS);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this product?');
    if (!confirmed) return;

    try {
      await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete product: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleSaveSuccess = async (savedProduct) => {
    if (editProduct?.id) {
      setProducts((prev) => prev.map((p) => (p.id === savedProduct.id ? savedProduct : p)));
    } else {
      setProducts((prev) => [savedProduct, ...prev]);
    }

    setShowForm(false);
    setEditProduct(null);
  };

  // Service requests removed from admin portal; related handlers removed.

  return (
    <>
      <Navbar />

      <div className="bg-slate-900 text-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p className="text-slate-300 mt-2">Manage products from one place.</p>
          </div>
          {SHOW_ADD_PRODUCT && (
            <button
              type="button"
              onClick={handleAddClick}
              className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-semibold px-4 py-2 rounded"
            >
              + Add Product
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab(TABS.DASHBOARD)}
            className={`px-4 py-2 rounded ${activeTab === TABS.DASHBOARD ? 'bg-lime-700 text-white' : 'bg-gray-100'}`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(TABS.PRODUCTS)}
            className={`px-4 py-2 rounded ${activeTab === TABS.PRODUCTS ? 'bg-lime-700 text-white' : 'bg-gray-100'}`}
          >
            Products
          </button>
          
        </div>

        {loading && <p className="text-gray-600">Loading admin data...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && activeTab === TABS.DASHBOARD && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Products" value={stats.totalProducts} />
          </div>
        )}

        {!loading && !error && activeTab === TABS.PRODUCTS && (
          <div className="space-y-4">
            {showForm && (
              <div className="rounded-lg border border-lime-200 bg-lime-50 p-4">
                <h2 className="text-xl font-semibold mb-3">
                  {editProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <ProductForm
                  initial={editProduct || {}}
                  useBackend
                  onSuccess={handleSaveSuccess}
                  onCancel={() => {
                    setShowForm(false);
                    setEditProduct(null);
                  }}
                />
              </div>
            )}

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">ID</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Subcategory</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="p-3">{product.id}</td>
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">{product.subcategory || '-'}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditClick(product)}
                            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Service requests feature removed from admin portal */}
      </div>

      <Footer />
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
