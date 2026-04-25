import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function About() {
  return (
    <>
      <Navbar userType="user" />

      <div className="bg-gradient-to-r from-lime-800 to-lime-900 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-lime-100">Learn more about who we are and how we support your farming journey.</p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-14">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-gradient-to-r from-lime-50 to-lime-100 rounded-xl shadow-md p-8 border-l-4 border-lime-800">
            <h2 className="text-3xl font-bold text-lime-900 mb-2">Heteroway.com</h2>
            <p className="text-lg text-lime-800">Your trusted partner for quality tractors and agricultural equipment since 2021.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              We are passionate about helping customers with smart, reliable, and efficient solutions. With over 5+ years of experience in delivering quality services, our approach combines speed, innovation, and consistency to achieve results that truly matter. We believe in creating value and building trust through every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mission</h3>
              <p className="text-gray-700">Our mission is to deliver high-quality, reliable, and efficient solutions that meet our customers' needs. We aim to build long-term relationships by ensuring trust, transparency, and customer satisfaction in everything we do.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vision</h3>
              <p className="text-gray-700">Our vision is to become a trusted and leading service provider known for quality, reliability, and innovation. We aim to continuously grow and set new standards while creating long-term value for our customers.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Choose Us</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✔ 5+ Years of Proven Experience</li>
                <li>✔ High-Quality & Reliable Services</li>
                <li>✔ Fast Response & Professional Support</li>
                <li>✔ Cost-Effective Solutions</li>
                <li>✔ Customer Satisfaction First</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
