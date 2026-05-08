import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { productService } from '../../services/apiService';

const POTATO_PLANTER_SPEC_LABELS = {
  totalLxWxH_WithRidgingBodyMM: 'Total LxWxH (With Ridging body) - mm',
  noOfRows: 'No. of Rows',
  tractorHPRequired: 'Tractor HP Required',
  tractorLiftCapacityRequiredKGS: 'Tractor Lift Capacity Required',
  '3PointLinkageCategory': '3 Point Linkage Category',
  potatoBunkerCapacityKGS: 'Potato Bunker Capacity',
  fertilizerCapacityKGS: 'Fertilizer Capacity',
  totalWeightApprox_WithEmptyBunkerKGS: 'Total Weight approx. (With empty Bunker)',
  totalWeightApproxKGS: 'Total Weight approx.',
  totalLoadedWeightKGS: 'Total Loaded Weight'
};

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
  const isPotatoPlanter = product.subcategory === 'Potato Planter';
  const specEntries = Object.entries(product.specifications || {})
    .filter(([, value]) => value !== undefined && value !== null && value !== '');

  const buildPotatoModelSpecs = (prefix) => {
    const specs = product.specifications || {};
    return Object.entries(specs)
      .filter(([key, value]) => key.startsWith(`${prefix}_`) && value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        const suffix = key.replace(`${prefix}_`, '');
        return {
          label: POTATO_PLANTER_SPEC_LABELS[suffix] || suffix.replace(/_/g, ' '),
          value: String(value)
        };
      });
  };

  const model1Title = product.specifications?.model1;
  const model2Title = product.specifications?.model2;
  const model1Specs = buildPotatoModelSpecs('model1');
  const model2Specs = buildPotatoModelSpecs('model2');
  

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
            <h1 className="mb-2 mt-4 text-4xl font-bold">{product.name}</h1>

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-bold">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>


            <div className={`mb-6 rounded-lg p-4 ${product.price ? 'border border-lime-200 bg-lime-50' : 'border border-gray-200 bg-gray-50'}`}>
              {product.price ? (
                <>
                  <p className="text-sm font-semibold text-lime-800">Price</p>
                  <p className="mt-1 text-2xl font-bold text-lime-900">₹ {product.price.toLocaleString('en-IN')}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gray-700">Pricing</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">Pricing available on request</p>
                </>
              )}
            </div>

            <div className="mb-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-lg font-bold">Specifications</h3>
              {isPotatoPlanter && (model1Specs.length > 0 || model2Specs.length > 0) ? (
                <div className="space-y-6">
                  {model1Specs.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <h4 className="mb-3 text-base font-bold text-lime-700">{model1Title || 'Model 1'}</h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {model1Specs.map((item) => (
                          <div key={`m1-${item.label}`}>
                            <p className="text-sm text-gray-600">{item.label}</p>
                            <p className="text-base font-semibold text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {model2Specs.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <h4 className="mb-3 text-base font-bold text-lime-700">{model2Title || 'Model 2'}</h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {model2Specs.map((item) => (
                          <div key={`m2-${item.label}`}>
                            <p className="text-sm text-gray-600">{item.label}</p>
                            <p className="text-base font-semibold text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : specEntries.length > 0 ? (
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
