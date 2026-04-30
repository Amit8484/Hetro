import React from 'react';

// Reads WhatsApp number and default message from Vite env vars
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919409501851';
const DEFAULT_MESSAGE = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hello! I saw your website and would like to inquire.';

export default function WhatsappButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      <div className="bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
        Chat us
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
        style={{ boxShadow: '0 8px 22px rgba(16, 185, 129, 0.35)' }}
      >
        {/* Official WhatsApp glyph (white) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path fill="#ffffff" d="M20.52 3.48A11.37 11.37 0 0 0 12.05.5 11.23 11.23 0 0 0 1.5 11.05c0 2.12.55 3.95 1.5 5.55L1 23l6.6-1.73A11.23 11.23 0 0 0 12.05 22c6.27 0 11.27-5 11.27-11.27a11.1 11.1 0 0 0-2.8-7.25zM17.66 14.08c-.26-.12-1.56-.76-1.8-.85s-.48-.12-.7.12-.8.85-.98 1.03-.36.18-.62.06c-1.68-.83-2.77-2.38-3.09-3.06-.17-.34.17-.5.5-.86.48-.52.5-.76.74-1.25.09-.19.05-.36-.03-.49-.12-.2-.7-1.68-.96-2.3-.25-.61-.5-.5-.69-.51l-.59-.01c-.2 0-.52.07-.79.38-.27.31-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.08 3.18 5.04 4.52.83.36 1.48.57 1.99.73.84.27 1.6.23 2.2.14.67-.1 2.06-.84 2.35-1.66.29-.82.29-1.52.21-1.66-.07-.14-.27-.22-.53-.34z"/>
        </svg>
      </a>
    </div>
  );
}
