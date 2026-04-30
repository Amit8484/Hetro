import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User Pages
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import Products from '../pages/user/Products';
import ProductDetails from '../pages/user/ProductDetails';
import Contact from '../pages/user/Contact';
import PartnerLogin from '../pages/partner/PartnerLogin';
import AdminPortal from '../pages/admin/AdminPortal';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/admin" element={<AdminPortal />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
