import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Globe, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteContent';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';
import logoImg from '../assets/images/business_logo_1789723876216.jpg';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenWhatsAppModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageChange, onOpenWhatsAppModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', labelEn: 'Home', labelBm: 'Utama' },
    { href: '#what-we-collect', labelEn: 'What We Collect', labelBm: 'Bahan Kami Ambil' },
    { href: '#services', labelEn: 'Services', labelBm: 'Perkhidmatan' },
    { href: '#how-it-works', labelEn: 'How It Works', labelBm: 'Cara Urus' },
    { href: '#areas', labelEn: 'Areas', labelBm: 'Kawasan' },
    { href: '#about', labelEn: 'About', labelBm: 'Tentang Kami' },
    { href: '#contact', labelEn: 'Contact', labelBm: 'Hubungi' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-white border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Brand Logo */}
          <a href="#home" id="brand-logo-link" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-sm group-hover:scale-105 transition-transform duration-200 bg-white flex items-center justify-center shrink-0">
              <img
                src={logoImg}
                alt="Kedai Besi Buruk"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                  Kedai Besi Buruk
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  MY
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-emerald-700 tracking-normal mt-0.5 font-semibold">
                Belanja Mudah, Hidup Lebih Baik
              </span>
            </div>
          </a>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70 transition-colors"
              >
                {lang === 'bm' ? link.labelBm : link.labelEn}
              </a>
            ))}
          </nav>

          {/* RIGHT: CONTACT ACTIONS (LEFT = CALL BUTTON, RIGHT = WHATSAPP BUTTON) + LANG */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              id="language-toggle-btn"
              onClick={() => onLanguageChange(lang === 'en' ? 'bm' : 'en')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              title="Tukar Bahasa / Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span className="uppercase">{lang === 'en' ? 'BM' : 'EN'}</span>
            </button>

            {/* CALL BUTTON (On the LEFT side of contact actions) */}
            <a
              id="header-call-btn"
              href={`tel:${BUSINESS_CONFIG.phoneTel}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border-2 border-emerald-800 text-emerald-900 hover:bg-emerald-800 hover:text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
              aria-label="Call Kedai Besi Buruk"
            >
              <Phone className="w-4 h-4 text-emerald-700 hover:text-white" />
              <span className="hidden md:inline">{BUSINESS_CONFIG.phoneDisplay}</span>
              <span className="md:hidden">{lang === 'bm' ? 'Hubungi' : 'Call'}</span>
            </a>

            {/* WHATSAPP BUTTON (On the RIGHT side of contact actions) */}
            <button
              id="header-whatsapp-btn"
              onClick={onOpenWhatsAppModal}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              aria-label="WhatsApp Kedai Besi Buruk"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-3 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  {lang === 'bm' ? link.labelBm : link.labelEn}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 mb-1">
                <span>{lang === 'bm' ? 'Waktu Operasi:' : 'Operating Hours:'}</span>
                <span className="font-semibold text-emerald-800">{lang === 'bm' ? 'Beroperasi 24/7' : 'Open 24/7'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* Mobile Menu Call Button (Left) */}
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneTel}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-emerald-800 text-emerald-900 font-bold text-sm bg-emerald-50/50 text-center"
                >
                  <Phone className="w-4 h-4 text-emerald-800" />
                  <span>{lang === 'bm' ? 'Telefon' : 'Call'}</span>
                </a>
                {/* Mobile Menu WhatsApp Button (Right) */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsAppModal();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-sm text-center shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppModal();
                }}
                className="w-full mt-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm transition-colors text-center cursor-pointer"
              >
                {lang === 'bm' ? 'Tempah Pengambilan Besi' : 'Request Scrap Collection'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
