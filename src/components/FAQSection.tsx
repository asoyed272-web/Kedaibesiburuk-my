import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Info, Truck, CreditCard, Recycle, CheckCircle2 } from 'lucide-react';
import { faqsData } from '../data/siteContent';
import { Language, FAQCategory, FAQItem } from '../types';
import { getWhatsAppUrl } from '../utils/contactUtils';

interface FAQSectionProps {
  lang: Language;
}

interface CategoryTab {
  id: FAQCategory;
  labelEn: string;
  labelBm: string;
  icon: React.ElementType;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categoryTabs: CategoryTab[] = [
    { id: 'all', labelEn: 'All Questions', labelBm: 'Semua Soalan', icon: HelpCircle },
    { id: 'general', labelEn: 'General & Hours', labelBm: 'Umum & Operasi', icon: Info },
    { id: 'services', labelEn: 'Services & Lorry', labelBm: 'Perkhidmatan & Lori', icon: Truck },
    { id: 'pricing', labelEn: 'Pricing & Payment', labelBm: 'Harga & Bayaran', icon: CreditCard },
    { id: 'materials', labelEn: 'Accepted Materials', labelBm: 'Jenis Bahan & Sisa', icon: Recycle },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqsData
    : faqsData.filter((item) => item.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCategoryLabel = (category: FAQItem['category']) => {
    switch (category) {
      case 'general':
        return lang === 'bm' ? 'Umum' : 'General';
      case 'services':
        return lang === 'bm' ? 'Servis & Lori' : 'Services';
      case 'pricing':
        return lang === 'bm' ? 'Harga & Bayaran' : 'Pricing';
      case 'materials':
        return lang === 'bm' ? 'Bahan & E-Sisa' : 'Materials';
      default:
        return '';
    }
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 lg:py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bm' ? 'SOALAN LAZIM' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bm' ? 'Semua Yang Anda Perlu Tahu' : 'Got Questions? We Have Answers'}
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 max-w-2xl mx-auto leading-relaxed">
            {lang === 'bm'
              ? 'Pilih kategori di bawah untuk mendapatkan jawapan pantas berkenaan timbangan, bayaran segera, servis lori dan bahan yang diterima.'
              : 'Select a category below to explore answers regarding weighing, instant payments, collection terms, and scrap grades.'}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            const count = tab.id === 'all'
              ? faqsData.length
              : faqsData.filter((f) => f.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setOpenIndex(0); // auto open first item in the selected category
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/20 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                <span>{lang === 'bm' ? tab.labelBm : tab.labelEn}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-emerald-950 text-emerald-300' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`${faq.category}-${index}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen ? 'border-emerald-300 shadow-sm ring-1 ring-emerald-100' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                      {getCategoryLabel(faq.category)}
                    </span>
                    <span className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {lang === 'bm' ? faq.questionBm : faq.questionEn}
                    </span>
                  </div>
                  
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-emerald-50/20">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{lang === 'bm' ? faq.answerBm : faq.answerEn}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200/90 text-center flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {lang === 'bm' ? 'Ada soalan lain yang belum terjawab?' : 'Have a question not listed here?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {lang === 'bm'
                ? 'Pasukan khidmat pelanggan kami beroperasi 24/7 dan sedia menjawab sebarang pertanyaan harga atau tempahan lori di WhatsApp.'
                : 'Our customer support team operates 24/7 and is ready to assist with custom quotes, scrap questions, or lorry bookings on WhatsApp.'}
            </p>
          </div>
          
          <a
            href={getWhatsAppUrl('Salam Kedai Besi Buruk, saya ada soalan mengenai servis dan harga:')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{lang === 'bm' ? 'Tanya di WhatsApp' : 'Ask on WhatsApp'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
