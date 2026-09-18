import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Truck, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteContent';
import { Language } from '../types';

interface ContactSectionProps {
  lang: Language;
  onOpenWhatsAppModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenWhatsAppModal }) => {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bm' ? 'HUBUNGI KAMI SEGERA' : 'GET IN TOUCH WITH US'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bm' ? 'Hubungi Kedai Besi Buruk Hari Ini' : 'Contact Kedai Besi Buruk Today'}
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 max-w-2xl mx-auto leading-relaxed">
            {lang === 'bm'
              ? 'Sedia berkhidmat untuk sebarang pertanyaan harga scrap, tempahan lori kutipan, atau sewaan tong RORO di seluruh Malaysia.'
              : 'Contact us for scrap collection, buying, and recycling enquiries across Malaysia.'}
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* TWO PRIMARY CONTACT CARDS (Direct Call & WhatsApp) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* CARD 1: ☎ DIRECT CALL */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6 text-emerald-700" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                    {lang === 'bm' ? '☎ Panggilan Terus' : '☎ Direct Call'}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {lang === 'bm' ? 'Talian Utama / Hotline:' : 'Main Hotline:'}
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {BUSINESS_CONFIG.phoneDisplay}
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  {lang === 'bm'
                    ? 'Bercakap terus dengan pegawai operasi kami untuk pertanyaan segera.'
                    : 'Speak directly with our operations team for immediate assistance.'}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <a
                  id="contact-section-call-btn"
                  href={`tel:${BUSINESS_CONFIG.phoneTel}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bm' ? 'Hubungi Sekarang' : 'Call Hotline Now'}</span>
                </a>
              </div>
            </div>

            {/* CARD 2: 💬 WHATSAPP */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/20">
                    <MessageCircle className="w-6 h-6 fill-white" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {lang === 'bm' ? '💬 WhatsApp Rasmi' : '💬 Official WhatsApp'}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {lang === 'bm' ? 'Nombor WhatsApp:' : 'Official WhatsApp:'}
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {BUSINESS_CONFIG.whatsappDisplay}
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  {lang === 'bm'
                    ? 'Pilih bahan & lokasi anda untuk sebut harga pantas dan tempahan lori.'
                    : 'Select your scrap materials & location for instant price quotation.'}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  id="contact-section-whatsapp-btn"
                  onClick={onOpenWhatsAppModal}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{lang === 'bm' ? 'Chat di WhatsApp' : 'Chat on WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* INFORMATION PANEL (Operating Hours, Depot, Fleet) */}
          <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* ITEM 1: OPERATING HOURS */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Clock className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {lang === 'bm' ? 'Waktu Operasi Pengambilan' : 'Collection Operating Hours'}
                  </h4>
                  <div className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{lang === 'bm' ? 'Beroperasi 24/7' : 'Open 24/7'}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {lang === 'bm' ? '24 Jam / 7 Hari (Setiap Hari)' : '24 Hours / 7 Days (Everyday)'}
                  </p>
                </div>
              </div>

              {/* ITEM 2: MAIN DEPOT LOCATION */}
              <div className="flex items-start gap-4 md:border-l md:border-slate-200/80 md:pl-6">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {lang === 'bm' ? 'Depot Utama / Hab Logistik' : 'Main Yard & Logistics Depot'}
                  </h4>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {BUSINESS_CONFIG.address}
                  </p>
                </div>
              </div>

              {/* ITEM 3: TRANSPORTATION FLEET */}
              <div className="flex items-start gap-4 md:border-l md:border-slate-200/80 md:pl-6">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Truck className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {lang === 'bm' ? 'Armada Pengangkutan' : 'Transportation Fleet'}
                  </h4>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {lang === 'bm' ? BUSINESS_CONFIG.lorryFleetBm : BUSINESS_CONFIG.lorryFleetEn}
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Reassurance Strip */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-semibold text-slate-700">
                  {lang === 'bm'
                    ? 'Perniagaan Beli & Kitar Semula Besi Buruk Berlesen di Malaysia'
                    : 'Licensed Scrap Metal Collection & Recycling Operator in Malaysia'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span>{lang === 'bm' ? 'Timbangan Digital Tepat Di Lokasi' : 'Accurate On-Site Digital Weighing'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
