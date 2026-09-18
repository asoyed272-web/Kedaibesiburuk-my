import React from 'react';
import { Truck, Coins, Recycle, PhoneCall } from 'lucide-react';
import { Language } from '../types';

interface TrustStripProps {
  lang: Language;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ lang }) => {
  const highlights = [
    {
      icon: Truck,
      titleEn: 'Convenient Collection',
      titleBm: 'Kutipan Mudah & Cepat',
      descEn: 'On-site pickup with our lorry fleet for homes, shops & factories.',
      descBm: 'Pengambilan terus di lokasi anda dengan lori pelbagai muatan.',
      accent: 'border-emerald-200 bg-emerald-50/70 text-emerald-800',
      iconColor: 'text-emerald-700',
    },
    {
      icon: Coins,
      titleEn: 'Scrap Buying',
      titleBm: 'Pembelian Besi Buruk',
      descEn: 'Competitive market rates with transparent weighing & instant payout.',
      descBm: 'Harga pasaran semasa dengan timbangan telus & bayaran terus.',
      accent: 'border-amber-200 bg-amber-50/70 text-amber-900',
      iconColor: 'text-amber-600',
    },
    {
      icon: Recycle,
      titleEn: 'Responsible Recycling',
      titleBm: 'Kitar Semula Bertanggungjawab',
      descEn: 'Safe sorting and eco-friendly scrap metal recovery processes.',
      descBm: 'Pengasingan selamat & pemulihan logam mesra alam sekitar.',
      accent: 'border-emerald-200 bg-emerald-50/70 text-emerald-800',
      iconColor: 'text-emerald-700',
    },
    {
      icon: PhoneCall,
      titleEn: 'Easy Contact',
      titleBm: 'Hubungan Sangat Mudah',
      descEn: 'Fast WhatsApp photo estimates, direct calls, and fast scheduling.',
      descBm: 'Hantar gambar di WhatsApp untuk anggaran pantas & respon segera.',
      accent: 'border-slate-200 bg-slate-50/80 text-slate-800',
      iconColor: 'text-slate-700',
    },
  ];

  return (
    <section id="trust-strip" className="relative z-10 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-4 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-xl transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-200/60"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.accent}`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {lang === 'bm' ? item.titleBm : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-xs text-slate-600 mt-1 leading-relaxed">
                    {lang === 'bm' ? item.descBm : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
