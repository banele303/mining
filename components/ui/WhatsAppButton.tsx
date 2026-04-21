'use client';

export default function WhatsAppButton() {
  const whatsappNumber = "+27123456789"; // Replace with actual number if provided
  const message = "Hello, I am interested in your mining assets. Can you please provide more information?";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 group-hover:opacity-40 transition-opacity"></span>
      
      {/* Button content */}
      <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" className="md:w-9 md:h-9">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.008-3.568c0-3.639 2.962-6.6 6.6-6.6a6.54 6.54 0 0 1 4.615 1.858 6.54 6.54 0 0 1 1.92 4.62c0 3.639-2.961 6.6-6.6 6.6zm3.622-4.934c-.198-.099-1.172-.577-1.354-.642-.183-.063-.317-.099-.45.099-.133.198-.513.641-.628.773-.114.133-.232.148-.426.05-.194-.1-1.004-.37-1.912-1.18-.707-.63-1.185-1.406-1.323-1.599-.138-.193-.015-.297.085-.393.088-.083.198-.217.297-.325.099-.108.132-.182.198-.303.066-.121.033-.228-.016-.323-.05-.095-.447-1.076-.613-1.472-.162-.387-.33-.335-.452-.341-.116-.006-.25-.008-.385-.008-.135 0-.354.05-.54.254-.185.204-.707.691-.707 1.685 0 .994.722 1.954.823 2.086.102.132 1.41 2.154 3.414 3.022.476.205.848.328 1.139.435.477.172.912.147 1.255.089.382-.063 1.172-.479 1.337-.942.165-.463.165-.86.115-.943-.05-.083-.183-.133-.382-.232z"/>
        </svg>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-xl">
          Direct Support
        </div>
      </div>
    </a>
  );
}
