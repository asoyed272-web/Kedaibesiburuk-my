import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { WhatWeCollect } from './components/WhatWeCollect';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { CoverageAreas } from './components/CoverageAreas';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileContactBar } from './components/MobileContactBar';
import { WhatsAppContactModal } from './components/WhatsAppContactModal';
import { DeveloperModal } from './components/DeveloperModal';
import { Language } from './types';
import { BUSINESS_CONFIG } from './data/siteContent';
import { Phone, Clock } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('bm'); // default to BM / Malaysian context with instant EN toggle
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [selectedMaterialForWhatsApp, setSelectedMaterialForWhatsApp] = useState<string>('');

  const handleOpenWhatsAppModal = (materialName?: string) => {
    setSelectedMaterialForWhatsApp(materialName || '');
    setIsWhatsAppModalOpen(true);
  };

  const handleCloseWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
    setSelectedMaterialForWhatsApp('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col pb-20 md:pb-0">
      
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">
              {lang === 'bm'
                ? 'Kutipan Besi Buruk Beroperasi Setiap Hari di Lembah Klang & Selangor'
                : 'Scrap Metal Collection Operating Daily in Klang Valley & Selangor'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'bm' ? 'Beroperasi 24/7' : 'Open 24/7'}
            </span>
            <span className="hidden md:inline">•</span>
            <a
              href={`tel:${BUSINESS_CONFIG.phoneTel}`}
              className="flex items-center gap-1 font-bold text-amber-400 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              {BUSINESS_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          lang={lang}
          onOpenWhatsAppModal={(material) => handleOpenWhatsAppModal(material)}
        />

        {/* 4 Trust Highlights Strip */}
        <TrustStrip lang={lang} />

        {/* What We Collect (Searchable & Filterable Catalog) */}
        <WhatWeCollect
          lang={lang}
          onOpenWhatsAppModal={(name) => handleOpenWhatsAppModal(name)}
        />

        {/* Services Breakdown */}
        <ServicesSection
          lang={lang}
          onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
        />

        {/* How It Works (4 Steps) */}
        <HowItWorks lang={lang} />

        {/* Coverage Areas (Selangor, KL, etc.) */}
        <CoverageAreas lang={lang} />

        {/* Frequently Asked Questions */}
        <FAQSection lang={lang} />

        {/* Contact & Hotline Section */}
        <ContactSection
          lang={lang}
          onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
      />

      {/* Mobile Fixed Contact Bar & Desktop Floating Actions */}
      <MobileContactBar
        lang={lang}
        onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
      />

      {/* Reusable WhatsApp Customer Information Modal */}
      <WhatsAppContactModal
        isOpen={isWhatsAppModalOpen}
        onClose={handleCloseWhatsAppModal}
        lang={lang}
        initialMaterial={selectedMaterialForWhatsApp}
      />

      {/* Developer Profile Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />
    </div>
  );
}
