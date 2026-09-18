import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageCircle, Info, Sparkles, Check, ArrowRight } from 'lucide-react';
import { materialsData } from '../data/materialsData';
import { Language, MaterialCategory, ScrapMaterial } from '../types';
import { getMaterialInquiryWhatsAppUrl, getWhatsAppUrl } from '../utils/contactUtils';

interface WhatWeCollectProps {
  lang: Language;
  onOpenWhatsAppModal: (materialName?: string) => void;
}

export const WhatWeCollect: React.FC<WhatWeCollectProps> = ({ lang, onOpenWhatsAppModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('all');

  const categories = [
    { id: 'all' as MaterialCategory, labelEn: 'All Materials', labelBm: 'Semua Bahan' },
    { id: 'metals' as MaterialCategory, labelEn: 'Metals & Alloys', labelBm: 'Besi & Logam' },
    { id: 'electronics' as MaterialCategory, labelEn: 'Electronics & IT', labelBm: 'Elektronik & IT' },
    { id: 'cables' as MaterialCategory, labelEn: 'Cables & Wires', labelBm: 'Wayar & Kabel' },
    { id: 'batteries' as MaterialCategory, labelEn: 'Batteries & Materials', labelBm: 'Bateri & Bahan Khas' },
  ];

  const handleImageError = (id: string, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackTried === 'true') {
      return;
    }
    target.dataset.fallbackTried = 'true';
    const item = materialsData.find((m) => m.id === id);
    if (item?.category === 'cables') {
      target.src = '/assets/materials/mix-wire.jpg';
    } else if (item?.category === 'electronics') {
      target.src = '/assets/materials/cpu.jpg';
    } else if (item?.category === 'batteries') {
      target.src = '/assets/materials/battery.jpg';
    } else {
      target.src = '/assets/materials/metal-besi.jpg';
    }
  };

  const filteredMaterials = useMemo(() => {
    return materialsData.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const nameMatch = item.nameEn.toLowerCase().includes(query) || item.nameBm.toLowerCase().includes(query);
      const descMatch = item.descriptionEn.toLowerCase().includes(query) || item.descriptionBm.toLowerCase().includes(query);
      const examplesMatch =
        item.examplesEn.some((e) => e.toLowerCase().includes(query)) ||
        item.examplesBm.some((e) => e.toLowerCase().includes(query));

      return matchesCategory && (nameMatch || descMatch || examplesMatch);
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="what-we-collect" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bm' ? 'SENARAI 20 BAHAN KITAR SEMULA' : '20 SCRAP MATERIALS CATALOGUE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bm' ? 'Bahan Yang Kami Ambil' : 'What We Collect'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {lang === 'bm'
              ? 'Daripada besi padu, tembaga dan aluminium hingga ke barangan elektrik serta bateri terpakai, lihat semua bahan yang kami terima dengan harga pasaran terbaik.'
              : 'From metals and industrial scrap to selected electrical and electronic items, see the materials we collect.'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="material-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'bm'
                    ? 'Cari nama bahan (cth: Copper, Washing Machine, Sport Rim, Aluminium, Fan, Battery)...'
                    : 'Search materials (e.g. Copper, Washing Machine, Sport Rim, Aluminium, Fan, Battery)...'
                }
                className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded cursor-pointer"
                >
                  {lang === 'bm' ? 'Padam' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Result Counter */}
            <div className="text-xs text-slate-500 font-medium whitespace-nowrap self-end md:self-center">
              {lang === 'bm'
                ? `Menunjukkan ${filteredMaterials.length} daripada ${materialsData.length} bahan yang diterima`
                : `Showing ${filteredMaterials.length} of ${materialsData.length} accepted materials`}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-4 pb-1 border-t border-slate-100 mt-4 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" />
              {lang === 'bm' ? 'Kategori:' : 'Category:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {lang === 'bm' ? cat.labelBm : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Material Cards Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 max-w-lg mx-auto">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">
              {lang === 'bm' ? 'Tiada bahan ditemui' : 'No materials found'}
            </h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              {lang === 'bm'
                ? 'Ada barang besi atau logam lain? Hantar gambar di WhatsApp untuk semakan terus dengan kami.'
                : "Have an unlisted metal or scrap? Send a photo on WhatsApp for instant confirmation."}
            </p>
            <a
              href={getMaterialInquiryWhatsAppUrl(searchQuery || 'Unlisted Scrap Metal', lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow hover:bg-[#20bd5a] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{lang === 'bm' ? 'Tanya di WhatsApp' : 'Ask on WhatsApp'}</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredMaterials.map((material) => {
              return (
                <div
                  key={material.id}
                  id={`material-card-${material.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col group"
                >
                  {/* Large Material Photograph (Occupying 40-50% visual area) */}
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={material.image}
                      alt={`${material.nameEn} - Kedai Besi Buruk Scrap Collection`}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(material.id, e)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Category Pill Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-slate-700/50">
                      {lang === 'bm' ? material.categoryLabelBm : material.categoryLabelEn}
                    </div>

                    {/* Popular Badge */}
                    {material.popular && (
                      <div className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                        {lang === 'bm' ? 'PERMINTAAN TINGGI' : 'HIGH DEMAND'}
                      </div>
                    )}

                    {/* Grade Info Overlay */}
                    {material.commonGrade && (
                      <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium text-white truncate border border-slate-800">
                        <span className="text-slate-400 mr-1">{lang === 'bm' ? 'Gred:' : 'Grade:'}</span>
                        <span className="text-emerald-300 font-bold">{material.commonGrade}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Material Primary Name */}
                      <div className="mb-1.5">
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {lang === 'bm' ? material.nameBm : material.nameEn}
                        </h3>
                        {material.nameBm !== material.nameEn && (
                          <div className="text-[11px] font-semibold text-slate-500">
                            {lang === 'bm' ? material.nameEn : material.nameBm}
                          </div>
                        )}
                      </div>

                      {/* Accurate Short Description */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3.5">
                        {lang === 'bm' ? material.descriptionBm : material.descriptionEn}
                      </p>

                      {/* Accepted / Related Items */}
                      <div className="space-y-1 mb-4 pt-2.5 border-t border-slate-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {lang === 'bm' ? 'Contoh Diterima:' : 'Accepted Items:'}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {(lang === 'bm' ? material.examplesBm : material.examplesEn).slice(0, 3).map((ex, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                            >
                              <Check className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                              <span className="truncate max-w-[150px]">{ex}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Direct WhatsApp Information Flow & Pre-selection */}
                    <div className="pt-2 flex items-center gap-1.5">
                      <button
                        id={`inquire-${material.id}`}
                        onClick={() => onOpenWhatsAppModal(material.nameEn)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                        <span className="truncate">{lang === 'bm' ? 'Tanya WhatsApp' : 'Quote WhatsApp'}</span>
                      </button>

                      <button
                        onClick={() => onOpenWhatsAppModal(material.nameEn)}
                        title={lang === 'bm' ? 'Kutipan lori untuk bahan ini' : 'Lorry collection for this material'}
                        className="px-2.5 py-2 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700 hover:text-amber-900 text-[11px] sm:text-xs font-bold transition-colors cursor-pointer shrink-0"
                      >
                        {lang === 'bm' ? 'Tempah' : 'Book'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Helper Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                {lang === 'bm' ? 'Ada bahan yang tiada dalam senarai di atas?' : 'Have scrap metal not listed above?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {lang === 'bm'
                  ? 'Ambil gambar barang anda dan hantar terus ke WhatsApp kami. Pasukan kami akan menilai dan memberi anggaran serta-merta.'
                  : 'Snap a quick photo and send it directly to our WhatsApp. Our team will verify and give you an instant quote.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenWhatsAppModal()}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{lang === 'bm' ? 'Hantar Gambar WhatsApp' : 'Send Photo on WhatsApp'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
