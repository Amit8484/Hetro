import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Star, Truck, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/common/ProductCard';
import { productsData } from '../../data/mockData';

export default function Home() {
  const rotavatorProduct = productsData.find((product) => product.id === 37);
  const featuredProducts = productsData.slice(0, 3);
  const allTractors = productsData.filter((product) => product.category === 'Tractors').slice(0, 6);

  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [offerImageIndex, setOfferImageIndex] = useState(0);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = Math.max(targetDate.getTime() - now, 0);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const timer = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(timer);
  }, []);

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

      {rotavatorProduct && (
        <section className="py-10 md:py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-3xl border border-amber-200 bg-transparent shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-amber-50 lg:rounded-l-3xl rounded-t-3xl">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
                    Limited Time Offer
                  </div>

                  <div className="mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold text-amber-800 leading-tight">
                    Subsidy Available
                  </div>
                  <h1 className="mt-5 text-3xl md:text-5xl font-black text-gray-900">
                    Rotary Tiller - Rotavator
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl">
                    Special paddling rotary tiller for paddy preparation, now available at a launch price for a limited time.
                  </p>

                  <div className="mt-6 flex items-end gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Offer Price</p>
                      <p className="text-3xl md:text-4xl font-black text-lime-700">₹ 135,000.00</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-3 max-w-xl">
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Mins', value: timeLeft.minutes },
                      { label: 'Secs', value: timeLeft.seconds }
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-slate-900 px-3 py-4 text-center text-white shadow-lg">
                        <div className="text-2xl md:text-3xl font-black tabular-nums">{String(item.value).padStart(2, '0')}</div>
                        <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.25em] text-slate-300">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm font-semibold text-amber-700">Available for the next 7 days</p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      to={`/products/${rotavatorProduct.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-600 px-6 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-lime-700"
                    >
                      View Offer <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[320px] bg-gradient-to-br from-slate-900 via-emerald-900 to-lime-900 p-6 md:p-8 flex items-center justify-center lg:rounded-r-3xl rounded-b-3xl">
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.55),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.18),_transparent_28%)] pointer-events-none"></div>
                  <div className="w-full max-w-md flex flex-col items-center">
                    <img
                      src={rotavatorProduct.images?.[offerImageIndex] || rotavatorProduct.image || '/images/products/rotavator/rotavator_page-0001.jpg'}
                      alt={rotavatorProduct.name}
                      className="h-[320px] w-full rounded-2xl object-contain object-center"
                    />

                    {rotavatorProduct.images && rotavatorProduct.images.length > 1 && (
                      <div className="flex gap-3 mt-4 items-center justify-center w-full">
                        <button
                          onClick={() => setOfferImageIndex((prev) => (prev === 0 ? rotavatorProduct.images.length - 1 : prev - 1))}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <div className="flex gap-2">
                          {rotavatorProduct.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setOfferImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${index === offerImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setOfferImageIndex((prev) => (prev === rotavatorProduct.images.length - 1 ? 0 : prev + 1))}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative text-white py-16 md:py-32 fade-in overflow-hidden w-full m-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 opacity-95"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-lime-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6 slide-in-down leading-tight tracking-tight text-white drop-shadow-xl">
                Your <span className="text-lime-300 drop-shadow-2xl">Complete</span> Business Partner
              </h2>
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

            <div className="grid gap-4">
              {promoStats.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-xl">
                  <div className="text-lime-300 mb-3">{item.icon}</div>
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
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-lime-600 to-lime-500 hover:from-lime-700 hover:to-lime-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
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
