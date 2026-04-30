import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  const renderMenu = () => {
    return (
      <>
        <Link
          to="/"
          className={`px-4 py-2 rounded ${isActive('/') ? 'bg-lime-600 text-white' : 'hover:bg-gray-700'}`}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={`px-4 py-2 rounded ${isActive('/products') ? 'bg-lime-600 text-white' : 'hover:bg-gray-700'}`}
        >
          Products
        </Link>
        <Link
          to="/about"
          className={`px-4 py-2 rounded ${isActive('/about') ? 'bg-lime-600 text-white' : 'hover:bg-gray-700'}`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`px-4 py-2 rounded ${isActive('/contact') ? 'bg-lime-600 text-white' : 'hover:bg-gray-700'}`}
        >
          Contact
        </Link>
        <div className="hidden md:flex gap-2 ml-4 border-l border-gray-700 pl-4">
          <Link
            to="/partner/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold flex items-center gap-2"
          >
            <LogIn size={18} /> Partner
          </Link>
        </div>
      </>
    );
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-lime-400">
            🌍 Heteroway.com
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
                {renderMenu()}
                {/* Admin: add product link visible when Navbar is used with userType="admin" */}
                {/** Keep link hidden for regular users; pages can pass userType="admin" to show it */}
                {/** For quick access you can navigate to /admin/add-product manually. */}
                {/** Render admin link when prop indicates admin. */}
                {/* Admin-only links can be added here when needed */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-800 rounded"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-gray-700 pt-4">
            {renderMenu()}
          </div>
        )}
      </div>
    </nav>
  );
}
