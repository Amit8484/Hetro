import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Star, CheckCircle, Truck, Shield, Wrench, Search } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/common/ProductCard';
import { productsData } from '../../data/mockData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const hiddenHomeProductIds = [16, 17, 18];
  const featuredProducts = productsData
    .filter(p => p.category !== 'Parts' && !hiddenHomeProductIds.includes(p.id))
    .slice(0, 3);
  const allTractors = productsData.filter(
    p => p.category !== 'Parts' && !hiddenHomeProductIds.includes(p.id)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <Navbar userType="user" />

      {/* Premium Hero Section */}
      <section 
        className="relative text-white py-16 md:py-32 fade-in overflow-hidden w-full m-0"
        style={{
          backgroundSize: '150% auto',
          backgroundPosition: 'center 35%',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundClip: 'border-box'
        }}
      >
        {/* Dark Overlay - Much Darker */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 opacity-95"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black mb-6 slide-in-down leading-tight tracking-tight text-white drop-shadow-xl">
                Your <span className="text-lime-300 drop-shadow-2xl">Complete</span> Business Partner
              </h1>
              
              <p className="text-base md:text-lg mb-8 text-white slide-up leading-relaxed font-light drop-shadow-lg">
                Premium John Deere tractors, advanced equipment, genuine spare parts, and expert maintenance services crafted for your success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 slide-up mb-10">
                <Link
                  to="/products"
                  className="group bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-200 text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg text-base md:text-lg"
                >
                  Explore Products <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="group border-2 border-lime-400 hover:bg-lime-400/30 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm text-base md:text-lg"
                >
                  Contact Us
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 slide-up text-sm md:text-base">
                <div className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30">
                  <Star className="w-5 h-5 text-lime-300 fill-lime-300 flex-shrink-0" />
                  <span className="font-semibold text-white">Trusted by 1000+</span>
                </div>
                <div className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30">
                  <CheckCircle className="w-5 h-5 text-lime-300 fill-lime-300 flex-shrink-0" />
                  <span className="font-semibold text-white">5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30">
                  <Shield className="w-5 h-5 text-lime-300 fill-lime-300 flex-shrink-0" />
                  <span className="font-semibold text-white">100% Genuine</span>
                </div>
              </div>
            </div>

            {/* Right Side - Search Box */}
            <div className="flex justify-center lg:justify-end">
              <form onSubmit={handleSearch} className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Find Your Product</h3>
                <p className="text-lime-200 text-sm mb-6">Search for tractors, parts, or insurance options</p>
                
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all"
                  />
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-200 text-slate-900 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl shadow-lg"
                  >
                    <Search size={20} /> Search
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-xs text-gray-300 mb-3 font-semibold uppercase">Quick Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/products?search=tractor"
                      className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-all text-center"
                    >
                      Tractors
                    </Link>
                    <Link
                      to="/products?search=parts"
                      className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-all text-center"
                    >
                      Parts
                    </Link>
                    <Link
                      to="/products?search=insurance"
                      className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-all text-center"
                    >
                      Insurance
                    </Link>
                    <Link
                      to="/products"
                      className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-all text-center"
                    >
                      All Products
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Offer Banners */}
      <section className="py-10 md:py-16 relative m-0 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offer 1 */}
            <Link
              to="/products"
              className="group relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white rounded-3xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 slide-in-left overflow-hidden"
            >
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-red-400 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-100 mb-2 tracking-wider">🔥 HOTTEST DEAL</p>
                  <h3 className="text-3xl md:text-4xl font-black mb-2">UP TO 10% OFF</h3>
                  <p className="text-base text-red-100 font-bold">Premium Tractors</p>
                </div>
                <div className="text-7xl md:text-8xl opacity-30 group-hover:scale-110 transition-transform">🚜</div>
              </div>
            </Link>

            {/* Offer 2 */}
            <Link
              to="/products?category=Parts"
              className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-3xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 slide-in-right overflow-hidden"
            >
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-400 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-blue-100 mb-2 tracking-wider">⚙️ PARTS BONANZA</p>
                  <h3 className="text-3xl md:text-4xl font-black mb-2">12% OFF</h3>
                  <p className="text-base text-blue-100 font-bold">Genuine Parts</p>
                </div>
                <div className="text-7xl md:text-8xl opacity-30 group-hover:scale-110 transition-transform">🔧</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 slide-up">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">Why Choose Heteroway.com?</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto font-light">Industry-leading quality, unmatched service, and proven reliability since 2010</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-10 h-10" />,
                title: "Express Delivery",
                desc: "Fast shipping across India with professional handling"
              },
              {
                icon: <Wrench className="w-10 h-10" />,
                title: "Expert Support",
                desc: "24/7 technical support from certified experts"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Assured Quality",
                desc: "100% genuine products with warranty protection"
              },
              {
                icon: <Star className="w-10 h-10" />,
                title: "Tailored Quotes",
                desc: "Direct quote support with the right plan for your equipment needs"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 slide-up stagger-item border border-slate-600 hover:border-lime-400"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-lime-400 mb-6 group-hover:scale-125 transition-transform duration-300 inline-block p-4 bg-lime-400/10 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-24 container mx-auto px-4 fade-in">
        <div className="text-center mb-16 slide-up">
          <div className="inline-block bg-lime-100 text-lime-700 px-5 py-2 rounded-full text-sm font-bold mb-6">
            🚀 OUR CATALOG
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">Complete Product Range</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Hand-picked John Deere tractors and premium farm equipment for every business need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allTractors.map((product, index) => (
            <div key={product.id} className="slide-up stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-lime-600 to-lime-500 hover:from-lime-700 hover:to-lime-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
          >
            View All Products <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Products Highlight */}
      <section className="py-24 container mx-auto px-4 fade-in">
        <div className="text-center mb-16 slide-up">
          <div className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-full text-sm font-bold mb-6">
            ⭐ TOP SELLERS
          </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">Best Selling Tractors</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Customer favorites with proven performance and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="slide-up stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-lime-600 to-lime-500 hover:from-lime-700 hover:to-lime-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
          >
            Browse Complete Collection <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-lime-600 via-lime-600 to-emerald-700 text-white py-24 md:py-32 fade-in relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-lime-500 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-emerald-500 rounded-full opacity-25 blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 slide-in-down leading-tight">Ready to Transform Your Business?</h2>
          <p className="text-base md:text-lg text-lime-100 mb-12 max-w-3xl mx-auto slide-up leading-relaxed font-light">
            Join thousands of successful farmers who trust Heteroway.com for quality equipment, tailored guidance, and exceptional service
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-white text-lime-600 hover:bg-lime-50 px-12 py-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
          >
            Get Expert Consultation <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
