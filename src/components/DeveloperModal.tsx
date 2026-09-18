import React, { useEffect, useRef } from 'react';
import { X, MessageCircle, Mail, Code2, ExternalLink, Sparkles } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Auto-focus the close button or first interactive element for accessibility
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappNumber = '8801633276359';
  const whatsappDisplay = '+8801633276359';
  const emailAddress = 'mr.khairulamin786@gmail.com';
  const whatsappMessage = encodeURIComponent(
    'Hello Khairul Amin, I found your developer profile through the Kedai Besi Buruk Malaysia website. I would like to discuss a website or app project.'
  );
  const emailSubject = encodeURIComponent('Website / App Development Inquiry');
  const emailBody = encodeURIComponent(
    'Hello Khairul Amin,\n\nI came across your developer profile on the Kedai Besi Buruk Malaysia website. I would like to discuss a web / mobile app project with you.\n\nBest regards,'
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const mailtoUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div
      id="developer-profile-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="developer-modal-title"
      aria-describedby="developer-modal-desc"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header pattern banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 text-white p-6 sm:p-7">
          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            id="close-developer-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            aria-label="Close developer profile modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Developer</span>
          </div>

          <h2
            id="developer-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            Khairul Amin
          </h2>

          <p
            id="developer-modal-desc"
            className="text-emerald-300 text-xs sm:text-sm font-medium mt-1 flex items-center gap-1.5"
          >
            <span>Web Developer</span>
            <span>•</span>
            <span>Website &amp; App Developer</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Contact Details Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl sm:rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Contact Information
            </div>

            {/* WhatsApp entry */}
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5 text-slate-700">
                <span className="text-base" role="img" aria-label="mobile phone">📱</span>
                <span className="font-medium text-slate-600">WhatsApp:</span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 hover:text-emerald-700 transition-colors"
              >
                {whatsappDisplay}
              </a>
            </div>

            {/* Gmail entry */}
            <div className="flex items-center justify-between gap-3 text-sm pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-2.5 text-slate-700 shrink-0">
                <span className="text-base" role="img" aria-label="email">✉️</span>
                <span className="font-medium text-slate-600">Gmail:</span>
              </div>
              <a
                href={mailtoUrl}
                className="font-bold text-slate-900 hover:text-emerald-700 transition-colors text-xs sm:text-sm truncate"
                title={emailAddress}
              >
                {emailAddress}
              </a>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* WhatsApp button */}
            <a
              id="dev-whatsapp-link"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5 fill-current shrink-0" />
              <span>Contact on WhatsApp</span>
              <ExternalLink className="w-4 h-4 opacity-70 ml-auto" />
            </a>

            {/* Gmail button */}
            <a
              id="dev-gmail-link"
              href={mailtoUrl}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <Mail className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>Contact via Gmail</span>
              <ExternalLink className="w-4 h-4 opacity-70 ml-auto" />
            </a>
          </div>

          {/* Polite Footer note inside modal */}
          <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs text-center pt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Open for custom websites, apps, and digital solutions.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
