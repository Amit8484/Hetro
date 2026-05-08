import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// User Pages
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import Products from '../pages/user/Products';
import ProductDetails from '../pages/user/ProductDetails';
import Reviews from '../pages/user/Reviews';
import Contact from '../pages/user/Contact';
import PartnerLogin from '../pages/partner/PartnerLogin';
import AdminPortal from '../pages/admin/AdminPortal';

export default function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/admin" element={<AdminPortal />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change (including hash changes)
  // Uses instant behavior to avoid janky transitions.
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
