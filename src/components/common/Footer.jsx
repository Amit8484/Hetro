import { Mail, Phone, MapPin, Globe, Send, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">🌍 Heteroway.com</h3>
            <p className="text-gray-400">
              Your trusted partner for quality tractors and agricultural equipment since 2021.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-red-600">Home</a></li>
              <li><a href="/about" className="hover:text-red-600">About</a></li>
              <li><a href="/products" className="hover:text-red-600">Products</a></li>
              <li><a href="/contact" className="hover:text-red-600">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-red-600" />
                <span>+91-9409501851</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-red-600" />
                <span>sbsonlineuse@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-red-600" />
                <span>Mohamadpura, Kapadvanj, Gujarat 387620, India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-red-600">
                <span className="sr-only">Facebook</span>
                <Globe size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-red-600">
                <span className="sr-only">Twitter</span>
                <Send size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-red-600">
                <span className="sr-only">Instagram</span>
                <Camera size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Heteroway.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
