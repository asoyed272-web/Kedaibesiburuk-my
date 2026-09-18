import React from 'react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteContent';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';
import logoImg from '../assets/images/business_logo_1789723876216.jpg';

interface HeroSectionProps {
  lang: Language;
  onOpenWhatsAppModal: (materialName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenWhatsAppModal }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-emerald-950 via-[#0B3A2C] to-slate-900 text-white overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle background industrial grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Content & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6 shadow-sm">
              <img
                src={logoImg}
                alt="Kedai Besi Buruk"
                className="w-4 h-4 rounded-full object-cover border border-emerald-400"
                referrerPolicy="no-referrer"
              />
              <span>{lang === 'bm' ? 'PENGUMPULAN & KITAR SEMULA BESI BURUK BERLESEN' : 'PROFESSIONAL SCRAP COLLECTION & RECYCLING'}</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-6">
              {lang === 'bm' ? (
                <>Rakan Dipercayai Pengumpulan <span className="text-emerald-400">Besi Buruk</span> di Malaysia</>
              ) : (
                <>Your Trusted <span className="text-emerald-400">Scrap Collection</span> Partner in Malaysia</>
              )}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
              {lang === 'bm'
                ? 'Kedai Besi Buruk menyediakan perkhidmatan pengumpulan, pembelian, dan pengangkutan besi serta logam terpakai yang mudah dan cepat untuk rumah, perniagaan, bengkel, kilang dan tapak projek di seluruh Malaysia.'
                : 'Kedai Besi Buruk provides convenient scrap collection, scrap buying and transportation services for homes, businesses, workshops, factories and more.'}
            </p>

            {/* CTAs: Primary (Request Collection), Secondary (WhatsApp Us), Also (Call Now) */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3.5 mb-8">
              {/* Primary CTA */}
              <button
                id="hero-request-collection-btn"
                onClick={() => onOpenWhatsAppModal()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer group"
              >
                <span>{lang === 'bm' ? 'Tempah Pengambilan Besi' : 'Request Scrap Collection'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: WhatsApp Us */}
              <button
                id="hero-whatsapp-btn"
                onClick={() => onOpenWhatsAppModal()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-md shadow-emerald-950/40 hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>{lang === 'bm' ? 'WhatsApp Kami' : 'WhatsApp Us'}</span>
              </button>

              {/* Also Include: Call Now */}
              <a
                id="hero-call-now-btn"
                href={`tel:${BUSINESS_CONFIG.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-100 font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bm' ? 'Hubungi Terus' : 'Call Now'}</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-300 pt-2 border-t border-emerald-800/60 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bm' ? 'Timbangan Digital Di Lokasi' : 'On-Site Digital Scale Weighing'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'bm' ? 'Bayaran Tunai / DuitNow Segera' : 'Instant Cash / DuitNow Payout'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bm' ? 'Kutipan Lembah Klang & Sekitarnya' : 'Klang Valley & Nearby Coverage'}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Premium Image with Subtle Accents */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-950/80 bg-slate-800 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/assets/images/hero_scrap_truck.jpg"
                alt="Kedai Besi Buruk commercial scrap metal collection truck and recycling team Malaysia"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Floating Overlaid Badge 1: Top Right */}
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 rounded-xl px-3 py-2 text-left shadow-lg">
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  {lang === 'bm' ? 'Kapasiti Pengangkutan' : 'Fleet Capacity'}
                </div>
                <div className="text-xs font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Ton to 20ft RORO</span>
                </div>
              </div>

              {/* Floating Overlaid Card: Bottom Left */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 sm:max-w-xs shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {lang === 'bm' ? 'Terima Semua Jenis Besi & Logam' : 'All Scrap Metals Accepted'}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {lang === 'bm' ? 'Tembaga, Besi, Aluminium, Bateri & E-Sisa' : 'Copper, Iron, Aluminium, Batteries & E-Waste'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative accents around frame */}
            <div className="hidden sm:block absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-amber-400/70 rounded-tl-xl pointer-events-none"></div>
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-emerald-400/70 rounded-br-xl pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
