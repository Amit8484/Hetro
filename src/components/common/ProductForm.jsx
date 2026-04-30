import { useState } from 'react';
import { productService } from '../../services/apiService';

// Reusable product form component.
// Props:
// - onSuccess(product): called after successful add
// - onCancel(): optional cancel handler
// - initial?: initial product object for editing (optional)
// - useBackend?: boolean - if true, uses backend product API
// - existingProducts?: optional list used to prefill form
export default function ProductForm({ onSuccess, onCancel, initial = {}, useBackend = false, existingProducts = [] }) {
  const isEditMode = Boolean(initial && initial.id);

  const [form, setForm] = useState({
    name: initial.name || '',
    image: initial.image || '',
    category: initial.category || '',
    subcategory: initial.subcategory || '',
    description: initial.description || '',
    specificationsText: initial.specifications ? JSON.stringify(initial.specifications) : ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleExistingProductChange = (e) => {
    const selectedId = Number(e.target.value);
    if (!selectedId) return;

    const selectedProduct = existingProducts.find((p) => p.id === selectedId);
    if (!selectedProduct) return;

    setForm({
      name: selectedProduct.name || '',
      image: selectedProduct.image || '',
      category: selectedProduct.category || '',
      subcategory: selectedProduct.subcategory || '',
      description: selectedProduct.description || '',
      specificationsText: selectedProduct.specifications
        ? JSON.stringify(selectedProduct.specifications, null, 2)
        : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let specifications = {};
    try {
      const text = (form.specificationsText || '').trim();
      specifications = text ? JSON.parse(text) : {};
    } catch {
      alert('Specifications must be valid JSON');
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      image: form.image,
      category: form.category,
      subcategory: form.subcategory,
      description: form.description,
      specifications
    };

    try {
      if (useBackend) {
        // POST to backend API. Adjust host/port if your backend runs elsewhere.
        const apiUrl = isEditMode
          ? `http://localhost:8080/api/products/${initial.id}`
          : 'http://localhost:8080/api/products';
        const res = await fetch(apiUrl, {
          method: isEditMode ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let errMsg = res.statusText;
          try {
            const body = await res.json();
            errMsg = body.message || JSON.stringify(body);
          } catch (parseError) {
            console.error('Failed to parse error response', parseError);
          }
          throw new Error(errMsg || `HTTP ${res.status}`);
        }

        const created = await res.json();
        if (onSuccess) onSuccess(created);
      } else {
        // Default behaviour: use frontend demo store via productService
        const saved = isEditMode
          ? await productService.updateProduct(initial.id, payload)
          : await productService.addProduct(payload);
        if (onSuccess) onSuccess(saved);
      }
    } catch (err) {
      console.error('Failed to save product', err);
      alert('Failed to save product: ' + (err && err.message ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow-sm">
      {existingProducts.length > 0 && (
        <div>
          <label className="block text-sm font-medium">Load Existing Product</label>
          <select defaultValue="" onChange={handleExistingProductChange} className="w-full px-2 py-2 border rounded">
            <option value="">Select a product to auto-fill</option>
            {[...existingProducts]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" value={form.name} onChange={handleChange} required
          className="w-full px-2 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Image</label>
        <input name="image" value={form.image} onChange={handleChange}
          className="w-full px-2 py-2 border rounded" placeholder="/images/products/product-37.jpg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input name="category" value={form.category} onChange={handleChange}
            className="w-full px-2 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Subcategory</label>
          <input name="subcategory" value={form.subcategory} onChange={handleChange}
            className="w-full px-2 py-2 border rounded" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3}
          className="w-full px-2 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Specifications (JSON)</label>
        <textarea name="specificationsText" value={form.specificationsText} onChange={handleChange} rows={3}
          className="w-full px-2 py-2 border rounded font-mono" placeholder='{"hp":50}' />
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" disabled={loading}
          className="px-3 py-2 bg-lime-700 text-white rounded disabled:opacity-60">
          {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Save Product'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-3 py-2 border rounded">Cancel</button>
        )}
      </div>
    </form>
  );
}
