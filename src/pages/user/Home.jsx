import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ExternalLink, PlayCircle, Shield, Star, Truck, Wrench } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/common/ProductCard';
import { productsData } from '../../data/mockData';

export default function Home() {
  const featuredProducts = productsData.slice(0, 3);
  const allTractors = productsData.filter((product) => product.category === 'Tractors').slice(0, 6);
  const reviewVideos = [
    { videoId: '8V1k2vr-IYU', title: 'John Deere Tractor Overview' },
    { videoId: 'LoI_PF8JNr4', title: 'Rotavator Working Demo' },
    { videoId: 'kMiYR2GHs_o', title: 'Farm Equipment Customer Review' }
  ];

  const promoStats = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Express Delivery',
      desc: 'Fast dispatch and careful handling across India.'
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Expert Support',
      desc: 'Get practical help from people who know farm equipment.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Assured Quality',
      desc: 'Genuine products with reliable service support.'
    },
  ];

  return (
    <>
      <Navbar />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Featured Products</h3>
            <p className="text-sm text-gray-600 mt-2">Hand-picked equipment and implements you might be interested in.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative text-white py-16 md:py-32 fade-in overflow-hidden w-full m-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-950 opacity-95"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-56 h-56 blob-3 rounded-full opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6 slide-in-down leading-tight tracking-tight text-white drop-shadow-xl">
                Your <span className="text-sky-300 drop-shadow-2xl">Complete</span> Business Partner
              </h2>
              <p className="text-base md:text-lg mb-8 text-white slide-up leading-relaxed font-light drop-shadow-lg">
                Premium John Deere tractors, advanced equipment, genuine spare parts, and expert maintenance services crafted for your success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 slide-up mb-10">
                <Link
                  to="/products"
                  className="group bg-gradient-to-r from-sky-400 to-blue-300 hover:from-sky-300 hover:to-blue-200 text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg text-base md:text-lg"
                >
                  Explore Products <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="group border-2 border-sky-400 hover:bg-sky-400/30 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm text-base md:text-lg"
                >
                  Contact Us
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 slide-up text-sm md:text-base">
                <div className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30">
                  <Star className="w-5 h-5 text-sky-300 fill-sky-300 flex-shrink-0" />
                  <span className="font-semibold text-white">Trusted by 1000+</span>
                </div>
                <div className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30">
                  <CheckCircle className="w-5 h-5 text-sky-300 fill-sky-300 flex-shrink-0" />
                  <span className="font-semibold text-white">5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3 bg-white/15 px-4 py-3 rounded-lg backdrop-blur-sm border border-white/30">
                  <Shield className="w-5 h-5 text-sky-300 fill-sky-300 flex-shrink-0" />
                  <span className="font-semibold text-white">100% Genuine</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {promoStats.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-xl">
                  <div className="text-sky-300 mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 slide-up">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">Why Choose Heteroway.com?</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto font-light">Industry-leading quality, unmatched service, and proven reliability since 2010</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {promoStats.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 slide-up stagger-item border border-slate-600 hover:border-lime-400"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-sky-400 mb-6 group-hover:scale-125 transition-transform duration-300 inline-block p-4 bg-sky-400/10 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 fade-in">
        <div className="text-center mb-16 slide-up">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-full text-sm font-bold mb-6">
            <PlayCircle className="h-4 w-4" />
            REVIEW VIDEOS
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">Watch Product Reviews</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            A few quick video reviews are featured here, and you can see the full collection on the Reviews page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewVideos.map((video) => (
            <article key={video.videoId} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{video.title}</h3>
                <a
                  href={`https://youtu.be/${video.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Watch on YouTube <ExternalLink size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-xl border border-lime-600 px-6 py-3 font-bold text-lime-700 transition-colors hover:bg-lime-50"
          >
            View All Reviews
          </Link>
        </div>
      </section>

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
            <div key={product.id} className="slide-up stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
          >
            View All Products <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 fade-in">
        <div className="text-center mb-16 slide-up">
          <div className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-full text-sm font-bold mb-6">
            ⭐ TOP SELLERS
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">Best Selling Tractors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">Customer favorites with proven performance and reliability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="slide-up stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-800 text-white py-24 md:py-32 fade-in relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-sky-400 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-emerald-500 rounded-full opacity-25 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 slide-in-down leading-tight">Ready to Transform Your Business?</h2>
          <p className="text-base md:text-lg text-sky-100 mb-12 max-w-3xl mx-auto slide-up leading-relaxed font-light">
            Join thousands of successful farmers who trust Heteroway.com for quality equipment, tailored guidance, and exceptional service
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-white text-sky-700 hover:bg-sky-50 px-12 py-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
          >
            Get Expert Consultation <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
