import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <Navbar userType="user" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lime-800 to-lime-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-300">We're here to help. Reach out to us anytime!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-red-600 mb-4">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">
              Call us during business hours or leave a message for callback.
            </p>
            <p className="text-sm font-semibold text-gray-700">Shivendra Bahadur Singh</p>
            <p className="text-lg font-semibold text-gray-900">+91-9409501851</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-red-600 mb-4">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">
              Send us an email and we'll respond as soon as possible.
            </p>
            <p className="text-lg font-semibold text-gray-900 break-all">sbsonlineuse@gmail.com</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-red-600 mb-4">
              <MapPin size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-600 mb-4">
              Visit our showroom to see the tractors in person.
            </p>
            <p className="text-sm text-gray-900 font-semibold">
              Mohamadpura, Kapadvanj, Gujarat 387620, India
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Open: Mon - Sat, 9 AM - 6 PM<br/>
              Sunday: 10 AM - 4 PM
            </p>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="Subject of inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-lime-600 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>

          {/* Map and Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <iframe
                width="100%"
                height="500"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.4565!2d73.4500!3d22.5186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f72c04c04c04d%3A0x1!2sKapadvanj%2C%20Gujarat%20387620%2C%20India!5e0!3m2!1sen!2sin!4v1640000000000"
              ></iframe>

              {/* Business Hours */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 6:00 PM</p>
                  <p><strong>Sunday:</strong> 10:00 AM - 4:00 PM</p>
                  <p className="text-lime-600 font-semibold mt-4">
                    🚨 Emergency Service: Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Do you offer financing options?</h3>
              <p className="text-gray-600">
                Yes, we offer flexible financing options with competitive interest rates and easy EMI plans.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">What is the warranty period?</h3>
              <p className="text-gray-600">
                All our tractors come with a standard 2-year warranty, extendable up to 5 years.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Do you provide delivery service?</h3>
              <p className="text-gray-600">
                Yes, we provide FREE delivery within 100km of our showroom with proper handling.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Can I trade-in my old tractor?</h3>
              <p className="text-gray-600">
                Absolutely! We offer excellent trade-in values for old tractors. Contact us for evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
