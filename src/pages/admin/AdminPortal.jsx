import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProductForm from '../../components/common/ProductForm';

const TABS = {
  DASHBOARD: 'dashboard',
  PRODUCTS: 'products',
  REQUESTS: 'requests'
};

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];
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
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [allProducts, allRequests] = await Promise.all([
        apiRequest('/api/products'),
        apiRequest('/api/service-requests')
      ]);

      setProducts(allProducts);
      setRequests(allRequests);
    } catch (err) {
      setError(err?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = useMemo(() => {
    const pendingRequests = requests.filter((req) => req.status === 'Pending').length;
    const inProgressRequests = requests.filter((req) => req.status === 'In Progress').length;
    const completedRequests = requests.filter((req) => req.status === 'Completed').length;

    return {
      totalProducts: products.length,
      totalRequests: requests.length,
      pendingRequests,
      inProgressRequests,
      completedRequests
    };
  }, [products, requests]);

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

  const handleRequestStatusChange = async (requestId, nextStatus) => {
    try {
      const updated = await apiRequest(`/api/service-requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRequests((prev) => prev.map((req) => (req.id === updated.id ? updated : req)));
    } catch (err) {
      alert('Failed to update status: ' + (err?.message || 'Unknown error'));
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-900 text-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p className="text-slate-300 mt-2">Manage products and service requests from one place.</p>
          </div>
          <button
            type="button"
            onClick={handleAddClick}
            className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-semibold px-4 py-2 rounded"
          >
            + Add Product
          </button>
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
          <button
            type="button"
            onClick={() => setActiveTab(TABS.REQUESTS)}
            className={`px-4 py-2 rounded ${activeTab === TABS.REQUESTS ? 'bg-lime-700 text-white' : 'bg-gray-100'}`}
          >
            Service Requests
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading admin data...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && activeTab === TABS.DASHBOARD && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Products" value={stats.totalProducts} />
            <StatCard title="Total Requests" value={stats.totalRequests} />
            <StatCard title="Pending Requests" value={stats.pendingRequests} />
            <StatCard title="In Progress" value={stats.inProgressRequests} />
            <StatCard title="Completed" value={stats.completedRequests} />
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

        {!loading && !error && activeTab === TABS.REQUESTS && (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Model</th>
                  <th className="text-left p-3">Service</th>
                  <th className="text-left p-3">Priority</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-t">
                    <td className="p-3">{req.id}</td>
                    <td className="p-3 font-medium">{req.customerName}</td>
                    <td className="p-3">{req.tractorModel}</td>
                    <td className="p-3">{req.service}</td>
                    <td className="p-3">{req.priority}</td>
                    <td className="p-3">
                      <select
                        value={req.status}
                        onChange={(e) => handleRequestStatusChange(req.id, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
