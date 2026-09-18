import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Recycle, ShieldCheck, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteContent';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';
import logoImg from '../assets/images/business_logo_1789723876216.jpg';

interface FooterProps {
  lang: Language;
  onOpenWhatsAppModal: () => void;
  onOpenDeveloperModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenWhatsAppModal, onOpenDeveloperModal }) => {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Footer Tier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-500/40 bg-white flex items-center justify-center shadow-md shrink-0">
                <img
                  src={logoImg}
                  alt="Kedaibesiburuk-my Scrap Metal Recycling Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight block">
                  Kedaibesiburuk-my
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {lang === 'bm' ? 'Kedai Besi Buruk & Kitar Semula Malaysia' : 'Kedai Besi Buruk & Scrap Collector Malaysia'}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'bm'
                ? 'Kedaibesiburuk-my ialah pakar pengumpulan dan pembelian pelbagai jenis sisa besi buruk, tembaga, aluminium, bateri, mesin kilang dan sisa pembinaan dengan lori berlesen di seluruh Malaysia.'
                : 'Kedaibesiburuk-my is Malaysia’s licensed scrap collection, buying, and recycling provider. Fast door-to-door lorry pickup and transparent on-site scale weighing.'}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                {lang === 'bm' ? 'Perniagaan Berlesen' : 'Licensed Operator'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              {lang === 'bm' ? 'Pautan Pantas' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bm' ? 'Laman Utama' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#what-we-collect" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bm' ? 'Bahan Yang Kami Ambil' : 'What We Collect'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bm' ? 'Perkhidmatan Lori & RORO' : 'Services & Fleet'}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bm' ? 'Cara Urusan Berfungsi' : 'How It Works'}
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bm' ? 'Kawasan Liputan' : 'Coverage Areas'}
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bm' ? 'Soalan Lazim (FAQ)' : 'Frequently Asked Questions'}
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Materials */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              {lang === 'bm' ? 'Bahan Paling Dicari' : 'Top Scrap Metals'}
            </h4>
            <ul className="space-y-2">
              <li className="text-slate-300">
                • {lang === 'bm' ? 'Tembaga Merah / Wayar Kabel (Copper)' : 'Copper Wires & Piping'}
              </li>
              <li className="text-slate-300">
                • {lang === 'bm' ? 'Besi Padu & Rebar (Heavy Steel / HMS)' : 'Structural Steel & Rebar'}
              </li>
              <li className="text-slate-300">
                • {lang === 'bm' ? 'Aluminium & Rangka Tingkap (Alloy)' : 'Aluminium Profiles & Rims'}
              </li>
              <li className="text-slate-300">
                • {lang === 'bm' ? 'Bateri Kereta & Lori (Lead-Acid)' : 'Automotive Lead Batteries'}
              </li>
              <li className="text-slate-300">
                • {lang === 'bm' ? 'Unit Aircond & E-Sisa Komersial' : 'Used Airconds & E-Waste'}
              </li>
              <li className="text-slate-300">
                • {lang === 'bm' ? 'Keluli Tahan Karat (Stainless SUS 304)' : 'Stainless Steel Sheets & Tanks'}
              </li>
            </ul>
          </div>

          {/* Contact Fast Details */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              {lang === 'bm' ? 'Talian & Lokasi' : 'Hotline & Depot'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneTel}`} className="font-bold text-white hover:text-emerald-400">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <button
                  type="button"
                  onClick={onOpenWhatsAppModal}
                  className="font-bold text-white hover:text-[#25D366] text-left cursor-pointer"
                >
                  {BUSINESS_CONFIG.whatsappDisplay} (WhatsApp)
                </button>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300 text-xs">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address}</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenWhatsAppModal}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors cursor-pointer text-center"
                >
                  {lang === 'bm' ? 'Borang Tempah Lori' : 'Book Lorry Collection'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-500 text-xs">
            © {currentYear} Kedaibesiburuk-my. All rights reserved.
            <span className="mx-2 text-slate-700">|</span>
            <span>Developed by </span>
            <button
              type="button"
              id="footer-developer-credit-btn"
              onClick={onOpenDeveloperModal}
              className="text-slate-400 hover:text-emerald-400 font-medium underline underline-offset-2 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded px-1"
              aria-label="View developer profile of Khairul Amin"
            >
              Khairul Amin
            </button>
          </p>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span>{lang === 'bm' ? 'Perkhidmatan Mesra Alam' : 'Eco-Friendly Recycling'}</span>
            <span>•</span>
            <span>{lang === 'bm' ? 'Semenanjung Malaysia' : 'Peninsular Malaysia'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
