import React from 'react';

// Reads WhatsApp number and default message from Vite env vars
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919409501851';
const DEFAULT_MESSAGE = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hello! I saw your website and would like to inquire.';

// Add custom animation styles
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    50% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
  @keyframes bounce-smooth {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes rotate-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-float {
    animation: float 2.5s ease-in-out infinite;
  }
  .animate-pulse-ring {
    animation: pulse-ring 2s ease-in-out infinite;
  }
  .animate-bounce-smooth {
    animation: bounce-smooth 1.5s ease-in-out infinite;
  }
  .animate-rotate-slow {
    animation: rotate-slow 20s linear infinite;
  }
`;

export default function WhatsappButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <>
      <style>{styles}</style>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Floating animated text label */}
        <div className="relative hover:animate-rotate-slow transition-transform">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap transition-all duration-300 transform hover:scale-110 animate-float hover:animate-none">
            💬 WhatsApp Us
          </div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
        </div>

        {/* WhatsApp button with animations */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 group animate-pulse-ring"
          style={{ boxShadow: '0 8px 22px rgba(16, 185, 129, 0.35)' }}
        >
          {/* Official WhatsApp logo */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden className="group-hover:animate-rotate-slow transition-transform duration-300">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.052 0-2.082.405-2.847 1.136-.757.73-1.171 1.704-1.171 2.736 0 1.062.415 2.047 1.208 2.771l.191.199c.713.692 1.762 1.123 2.86 1.123h.006c1.099 0 2.147-.431 2.86-1.123l.191-.199c.793-.724 1.208-1.71 1.208-2.771 0-1.032-.414-2.006-1.171-2.736-.765-.731-1.795-1.136-2.847-1.136M12.04 2C6.458 2 2 6.458 2 12s4.458 10 10.04 10c2.04 0 3.99-.6 5.64-1.73l5.03 1.66c.34.11.68-.22.56-.56l-1.66-5.03c1.13-1.65 1.73-3.6 1.73-5.64C22.08 6.458 17.622 2 12.04 2z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
