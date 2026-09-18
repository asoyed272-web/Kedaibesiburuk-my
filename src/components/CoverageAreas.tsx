import React, { useState, useMemo } from 'react';
import { MapPin, Search, CheckCircle, Navigation, MessageCircle, AlertCircle } from 'lucide-react';
import { coverageAreasData } from '../data/siteContent';
import { Language } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';

interface CoverageAreasProps {
  lang: Language;
}

export const CoverageAreas: React.FC<CoverageAreasProps> = ({ lang }) => {
  const [districtSearch, setDistrictSearch] = useState('');

  const filteredAreas = useMemo(() => {
    if (!districtSearch.trim()) return coverageAreasData;
    const query = districtSearch.toLowerCase().trim();

    return coverageAreasData
      .map((state) => {
        const matchingDistricts = state.districts.filter((d) => d.toLowerCase().includes(query));
        const matchesStateName =
          state.stateEn.toLowerCase().includes(query) || state.stateBm.toLowerCase().includes(query);

        if (matchesStateName) {
          return state;
        }
        if (matchingDistricts.length > 0) {
          return {
            ...state,
            districts: matchingDistricts,
          };
        }
        return null;
      })
      .filter((item): item is typeof coverageAreasData[0] => item !== null);
  }, [districtSearch]);

  return (
    <section id="areas" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-3">
            <Navigation className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bm' ? 'KAWASAN LIPUTAN KUTIPAN' : 'COLLECTION COVERAGE AREAS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bm' ? 'Kawasan Pengambilan Besi Buruk' : 'Where We Provide Scrap Collection'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {lang === 'bm'
              ? 'Pengambilan harian di seluruh Lembah Klang, Selangor dan Kuala Lumpur, serta perkhidmatan pukal industri ke seluruh Semenanjung Malaysia.'
              : 'Daily direct pickup across Klang Valley, Selangor, and Kuala Lumpur, with bulk industrial transport available across Peninsular Malaysia.'}
          </p>
        </div>

        {/* Search District Box */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="area-search-input"
              type="text"
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              placeholder={
                lang === 'bm'
                  ? 'Cari kawasan anda (cth: Shah Alam, Klang, Kepong, Puchong, Nilai)...'
                  : 'Search your area (e.g. Shah Alam, Klang, Kepong, Subang, Nilai)...'
              }
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm text-sm"
            />
          </div>
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 border shadow-sm transition-all duration-200 ${
                area.isPrimary
                  ? 'border-emerald-300 ring-1 ring-emerald-500/20'
                  : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    area.isPrimary ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {lang === 'bm' ? area.stateBm : area.stateEn}
                  </h3>
                </div>
                {area.isPrimary && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {lang === 'bm' ? 'Kutipan Harian' : 'Daily Dispatch'}
                  </span>
                )}
              </div>

              {/* Districts tags */}
              <div className="flex flex-wrap gap-1.5">
                {area.districts.map((district, dIdx) => (
                  <span
                    key={dIdx}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                    {district}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Unsure coverage banner */}
        <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">
                {lang === 'bm' ? 'Kawasan anda tidak tertera dalam senarai?' : 'Your location not listed here?'}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {lang === 'bm'
                  ? 'Hubungi kami di WhatsApp untuk semakan ketersediaan lori di lokasi anda.'
                  : 'Contact us via WhatsApp to check lorry schedule availability in your location.'}
              </div>
            </div>
          </div>
          <a
            href={getWhatsAppUrl('Salam Kedai Besi Buruk, saya ingin tanya sama ada kawasan saya boleh dibuat kutipan lori: ')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{lang === 'bm' ? 'Semak Kawasan di WhatsApp' : 'Check Area on WhatsApp'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
