import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { productService } from '../../services/apiService';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        if (isMounted) {
          setProduct(data);
          setActiveImage(data?.images?.[0] || data?.image || '/images/hero-bg.avif');
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar userType="user" />
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="animate-spin" size={32} />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar userType="user" />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-lime-600">Product not found</h1>
          <Link to="/products" className="mt-4 text-blue-600 hover:text-blue-700">
            Back to Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const productImages = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : [product.image || '/images/hero-bg.avif'];
  const productImage = activeImage || productImages[0];
  const specEntries = Object.entries(product.specifications || {})
    .filter(([, value]) => value !== undefined && value !== null && value !== '');
  const categoryLabel = ['Compact', 'Mid-Range', 'Professional', 'Budget', 'Tractors'].includes(product.category)
    ? 'Tractors'
    : product.category;

  return (
    <>
      <Navbar userType="user" />

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/products"
          className="mb-6 flex items-center gap-2 font-semibold text-lime-600 hover:text-lime-700"
        >
          <ArrowLeft size={20} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="flex h-96 items-center justify-center overflow-hidden rounded-lg bg-gray-200 p-3 md:h-[500px]">
              <img
                src={productImage}
                alt={product.name}
                className="h-full w-full object-contain object-center"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {productImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded border bg-gray-100 transition-opacity hover:opacity-90 ${
                    image === productImage ? 'border-lime-600 ring-2 ring-lime-200' : 'border-gray-300'
                  }`}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                >
                  <img src={image} alt="" className="h-full w-full object-contain object-center p-1" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
              {categoryLabel}
            </span>

            <h1 className="mb-2 mt-4 text-4xl font-bold">{product.name}</h1>

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-bold">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>


            <div className="mb-6 rounded-lg border border-lime-200 bg-lime-50 p-4">
              <p className="text-sm font-semibold text-lime-800">Price</p>
              <p className="mt-1 text-2xl font-bold text-lime-900">₹ 135,000.00</p>
            </div>

            <div className="mb-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-lg font-bold">Specifications</h3>
              {specEntries.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {specEntries.map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xl font-semibold">{String(value)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Detailed specifications are available on request.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
