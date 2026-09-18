import React from 'react';
import { Camera, Calculator, Truck, Banknote, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const steps = [
    {
      step: '01',
      icon: Camera,
      titleEn: 'Snap & Send Photos',
      titleBm: 'Ambil & Hantar Gambar',
      descEn: 'Send photos or video of your scrap materials and location via WhatsApp or simple form.',
      descBm: 'Hantar gambar sisa besi atau logam dan lokasi anda melalui WhatsApp atau borang ringkas.',
    },
    {
      step: '02',
      icon: Calculator,
      titleEn: 'Instant Price Estimate',
      titleBm: 'Anggaran Harga Pantas',
      descEn: 'We provide quick transparent pricing based on current daily metal market grades and quantity.',
      descBm: 'Kami semak dan beri anggaran harga mengikut pasaran semasa dan kuantiti anda.',
    },
    {
      step: '03',
      icon: Truck,
      titleEn: 'On-Site Weigh & Load',
      titleBm: 'Timbang & Angkut Di Lokasi',
      descEn: 'Our lorry arrives with calibrated digital scales. Our team assists with heavy loading.',
      descBm: 'Lori kami hadir bersama penimbang digital berkalibrasi dan pasukan kami bantu angkut.',
    },
    {
      step: '04',
      icon: Banknote,
      titleEn: 'Immediate Instant Payout',
      titleBm: 'Bayaran Terus On-The-Spot',
      descEn: 'Receive instant payment on the spot via Cash or direct DuitNow bank transfer without delay.',
      descBm: 'Terima bayaran serta-merta melalui Tunai atau pindahan bank DuitNow selepas timbang.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-3">
            <span>{lang === 'bm' ? 'PROSES MUDAH 4 LANGKAH' : 'SIMPLE 4-STEP PROCESS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bm' ? 'Bagaimana Urusan Pengambilan Berfungsi' : 'How Our Collection Service Works'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {lang === 'bm'
              ? 'Proses pantas, telus dan mudah tanpa perlu bersusah-payah membawa besi berat ke kedai.'
              : 'Fast, transparent, and hassle-free from your first WhatsApp message to final instant payout.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-emerald-700/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                    {lang === 'bm' ? item.titleBm : item.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'bm' ? item.descBm : item.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-emerald-800">
                  <span>{lang === 'bm' ? 'Langkah ' + (index + 1) : 'Step ' + (index + 1)}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <a
            href={getWhatsAppUrl('Salam Kedai Besi Buruk, saya ingin mulakan semakan harga besi dan tempahan lori:')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-md transition-all"
          >
            <span>{lang === 'bm' ? 'Mulakan Di WhatsApp Sekarang' : 'Start on WhatsApp Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
