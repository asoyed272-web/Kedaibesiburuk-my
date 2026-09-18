import React from 'react';
import { Truck, Coins, Building2, Container, Cpu, Wrench, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/siteContent';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';

interface ServicesSectionProps {
  lang: Language;
  onOpenWhatsAppModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onOpenWhatsAppModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-6 h-6 text-emerald-700" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-amber-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-emerald-700" />;
      case 'Container':
        return <Container className="w-6 h-6 text-emerald-700" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-emerald-700" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-amber-600" />;
      default:
        return <Truck className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-3">
            <span>{lang === 'bm' ? 'PERKHIDMATAN PROFESIONAL KAMI' : 'OUR PROFESSIONAL SERVICES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bm' ? 'Perkhidmatan Pengumpulan & Kitar Semula' : 'Comprehensive Scrap & Recycling Services'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {lang === 'bm'
              ? 'Daripada kutipan kecil kediaman hingga pelupusan kilang berskala industri dan penempatan tong RORO, kami menyediakan penyelesaian lengkap.'
              : 'From residential doorstep pickups to full-scale industrial decommissioning and RORO bin transport across Malaysia.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  {service.badgeEn && (
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {lang === 'bm' ? service.badgeBm : service.badgeEn}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2.5">
                  {lang === 'bm' ? service.titleBm : service.titleEn}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {lang === 'bm' ? service.fullDescBm : service.fullDescEn}
                </p>

                {/* Suitable For Tags */}
                <div className="pt-3 border-t border-slate-100 mb-6">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {lang === 'bm' ? 'Sesuai Untuk:' : 'Ideal For:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'bm' ? service.suitableForBm : service.suitableForEn).map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenWhatsAppModal()}
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-100 group-hover:bg-emerald-800 text-slate-800 group-hover:text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>{lang === 'bm' ? 'Dapatkan Sebut Harga' : 'Inquire This Service'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
