import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteContent';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';

interface MobileContactBarProps {
  lang: Language;
  onOpenWhatsAppModal: () => void;
}

export const MobileContactBar: React.FC<MobileContactBarProps> = ({ lang, onOpenWhatsAppModal }) => {
  return (
    <>
      {/* Fixed Mobile Bottom Bar (visible on screens smaller than md) */}
      <div
        id="mobile-fixed-contact-bar"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.12)]"
      >
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          {/* LEFT: ☎ Call Now */}
          <a
            id="mobile-bottom-call-btn"
            href={`tel:${BUSINESS_CONFIG.phoneTel}`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 border-emerald-800 bg-emerald-50 text-emerald-950 font-extrabold text-sm active:scale-95 transition-all shadow-sm"
            aria-label="Call Kedai Besi Buruk"
          >
            <Phone className="w-4 h-4 text-emerald-800" />
            <span>{lang === 'bm' ? '☎ Hubungi' : '☎ Call Now'}</span>
          </a>

          {/* RIGHT: 💬 WhatsApp */}
          <button
            id="mobile-bottom-whatsapp-btn"
            type="button"
            onClick={onOpenWhatsAppModal}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm active:scale-95 transition-all shadow-md shadow-emerald-900/20 cursor-pointer"
            aria-label="WhatsApp Kedai Besi Buruk"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{lang === 'bm' ? '💬 WhatsApp' : '💬 WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button for Desktop / Tablet */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        {/* Floating Call */}
        <a
          id="desktop-floating-call"
          href={`tel:${BUSINESS_CONFIG.phoneTel}`}
          className="w-13 h-13 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 group relative"
          title={`Call ${BUSINESS_CONFIG.phoneDisplay}`}
        >
          <Phone className="w-5 h-5 text-emerald-200" />
          <span className="absolute right-15 bg-slate-900 text-white text-xs font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {BUSINESS_CONFIG.phoneDisplay}
          </span>
        </a>

        {/* Floating WhatsApp */}
        <button
          id="desktop-floating-whatsapp"
          type="button"
          onClick={onOpenWhatsAppModal}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-950/20 flex items-center justify-center transition-all hover:scale-110 group relative animate-bounce cursor-pointer"
          style={{ animationDuration: '3s' }}
          title="WhatsApp Us"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {lang === 'bm' ? 'Chat di WhatsApp' : 'Chat on WhatsApp'}
          </span>
        </button>
      </div>
    </>
  );
};
