import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  MessageCircle,
  MapPin,
  Check,
  ChevronDown,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Navigation,
  Search,
} from 'lucide-react';
import { Language } from '../types';
import { materialsData } from '../data/materialsData';
import { BUSINESS_CONFIG } from '../data/siteContent';
import logoImg from '../assets/images/business_logo_1789723876216.jpg';
import { reverseGeocodeCoordinates } from '../utils/geolocationUtils';

interface WhatsAppContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialMaterial?: string;
}

type LocationSource = 'none' | 'gps' | 'manual';

interface LocationFeedback {
  type: 'loading' | 'success' | 'denied' | 'unavailable' | 'geocoding_failed';
  message: string;
  accuracyMeters?: number;
}

const MALAYSIAN_LOCATIONS = [
  'Kuala Lumpur',
  'Shah Alam',
  'Klang',
  'Petaling Jaya',
  'Subang Jaya',
  'Puchong',
  'Seri Kembangan',
  'Rawang',
  'George Town',
  'Penang',
  'Bukit Mertajam',
  'Ipoh',
  'Alor Setar',
  'Sungai Petani',
  'Johor Bahru',
  'Skudai',
  'Pasir Gudang',
  'Melaka',
  'Seremban',
  'Kuantan',
  'Kota Bharu',
  'Kuching',
  'Miri',
  'Kota Kinabalu',
  'Sandakan',
  'Other location',
];

export const WhatsAppContactModal: React.FC<WhatsAppContactModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialMaterial = '',
}) => {
  const [name, setName] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [locationSource, setLocationSource] = useState<LocationSource>('none');
  const [locationFeedback, setLocationFeedback] = useState<LocationFeedback | null>(null);
  const [message, setMessage] = useState('');
  const [isMessageUserEdited, setIsMessageUserEdited] = useState(false);

  // Dropdown UI states
  const [isMaterialDropdownOpen, setIsMaterialDropdownOpen] = useState(false);
  const [materialSearchQuery, setMaterialSearchQuery] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    materials?: string;
    location?: string;
    message?: string;
  }>({});
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const materialDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // List of 20 official materials
  const allMaterials = useMemo(() => {
    return materialsData.map((m) => ({
      id: m.id,
      nameEn: m.nameEn,
      nameBm: m.nameBm,
      primaryName: lang === 'bm' ? m.nameBm : m.nameEn,
      secondaryName: lang === 'bm' ? m.nameEn : m.nameBm,
    }));
  }, [lang]);

  // Handle initialization when modal opens or initialMaterial changes
  useEffect(() => {
    if (isOpen) {
      setShowDiscardConfirm(false);
      setErrors({});
      setIsMessageUserEdited(false);
      setMaterialSearchQuery('');
      setLocationSearchQuery('');
      setLocationFeedback(null);

      if (initialMaterial) {
        const match = allMaterials.find(
          (m) =>
            m.nameEn.toLowerCase() === initialMaterial.toLowerCase() ||
            m.nameBm.toLowerCase() === initialMaterial.toLowerCase() ||
            m.primaryName.toLowerCase() === initialMaterial.toLowerCase()
        );
        const materialToAdd = match ? match.nameEn : initialMaterial;
        setSelectedMaterials([materialToAdd]);
      } else {
        setSelectedMaterials([]);
      }
    } else {
      // Reset all when closed
      setName('');
      setSelectedMaterials([]);
      setSelectedLocation('');
      setCustomLocation('');
      setLocationSource('none');
      setLocationFeedback(null);
      setMessage('');
      setIsMessageUserEdited(false);
      setErrors({});
    }
  }, [isOpen, initialMaterial, allMaterials]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        materialDropdownRef.current &&
        !materialDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMaterialDropdownOpen(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute effective location string
  const effectiveLocation = useMemo(() => {
    if (selectedLocation === 'Other location') {
      return customLocation.trim();
    }
    return selectedLocation.trim();
  }, [selectedLocation, customLocation]);

  // Generate automated message preview based on current form values
  const generatedMessage = useMemo(() => {
    const customerName = name.trim() || (lang === 'bm' ? '[Nama Anda]' : '[Your Name]');
    const locationStr = effectiveLocation || (lang === 'bm' ? '[Lokasi Pengambilan]' : '[Collection Location]');

    let materialsList = '';
    if (selectedMaterials.length > 0) {
      materialsList = selectedMaterials.map((mat) => `• ${mat}`).join('\n');
    } else {
      materialsList = lang === 'bm' ? '• [Pilih Bahan]' : '• [Select Materials]';
    }

    if (lang === 'bm') {
      return `Salam Kedai Besi Buruk,\n\nNama saya ${customerName}.\n\nSaya ingin menjual bahan besi buruk berikut:\n\n${materialsList}\n\nLokasi pengambilan:\n${locationStr}\n\nSila maklumkan kepada saya berkenaan proses dan harga pengambilan.\n\nTerima kasih.`;
    }

    return `Hello Kedai Besi Buruk,\n\nMy name is ${customerName}.\n\nI would like to sell the following scrap materials:\n\n${materialsList}\n\nCollection location:\n${locationStr}\n\nPlease let me know about the collection process.\n\nThank you.`;
  }, [name, selectedMaterials, effectiveLocation, lang]);

  // Update message if user hasn't manually edited it
  useEffect(() => {
    if (!isMessageUserEdited) {
      setMessage(generatedMessage);
    }
  }, [generatedMessage, isMessageUserEdited]);

  if (!isOpen) return null;

  // Material selection handlers
  const handleToggleMaterial = (materialNameEn: string) => {
    setSelectedMaterials((prev) => {
      const exists = prev.includes(materialNameEn);
      if (exists) {
        return prev.filter((m) => m !== materialNameEn);
      } else {
        return [...prev, materialNameEn];
      }
    });
    if (errors.materials) {
      setErrors((prev) => ({ ...prev, materials: undefined }));
    }
  };

  const handleRemoveMaterial = (materialNameEn: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMaterials((prev) => prev.filter((m) => m !== materialNameEn));
  };

  // Location Handlers
  const handleSelectLocation = (loc: string) => {
    setSelectedLocation(loc);
    setLocationSource('manual');
    setLocationFeedback(null);
    setIsLocationDropdownOpen(false);
    setLocationSearchQuery('');
    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: undefined }));
    }
  };

  // Real GPS Geolocation Handler
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationFeedback({
        type: 'unavailable',
        message:
          lang === 'bm'
            ? 'Geolokasi tidak disokong oleh pelayar web anda.'
            : 'Geolocation is not supported by your browser.',
      });
      setLocationSource('manual');
      return;
    }

    setIsLocating(true);
    setLocationFeedback({
      type: 'loading',
      message:
        lang === 'bm'
          ? 'Mendapatkan lokasi semasa anda...'
          : 'Getting your current location...',
    });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude, accuracy } = pos.coords;

          // Perform reverse geocoding on the user's real coordinates
          const result = await reverseGeocodeCoordinates(latitude, longitude, accuracy);

          setSelectedLocation(result.formattedLocation);
          setCustomLocation('');
          setLocationSource('gps');
          setIsLocating(false);
          setLocationFeedback({
            type: 'success',
            message:
              lang === 'bm'
                ? '✓ Lokasi semasa dikesan'
                : '✓ Current location detected',
            accuracyMeters: accuracy ? Math.round(accuracy) : undefined,
          });

          if (errors.location) {
            setErrors((prev) => ({ ...prev, location: undefined }));
          }
        } catch (err) {
          console.error('Error during reverse geocoding:', err);
          setIsLocating(false);
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          const fallbackStr = `GPS (${lat}, ${lng})`;
          setSelectedLocation(fallbackStr);
          setCustomLocation('');
          setLocationSource('gps');
          setLocationFeedback({
            type: 'geocoding_failed',
            message:
              lang === 'bm'
                ? '✓ Koordinat GPS dikesan'
                : '✓ Current GPS location detected',
            accuracyMeters: pos.coords.accuracy ? Math.round(pos.coords.accuracy) : undefined,
          });
          if (errors.location) {
            setErrors((prev) => ({ ...prev, location: undefined }));
          }
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          // Permission Denied
          setLocationFeedback({
            type: 'denied',
            message:
              lang === 'bm'
                ? 'Kebenaran lokasi telah ditolak.'
                : 'Location permission was denied.',
          });
        } else if (err.code === 2) {
          // Position Unavailable
          setLocationFeedback({
            type: 'unavailable',
            message:
              lang === 'bm'
                ? 'Tidak dapat mengesan lokasi semasa peranti anda.'
                : 'Unable to detect your current location.',
          });
        } else if (err.code === 3) {
          // Timeout
          setLocationFeedback({
            type: 'unavailable',
            message:
              lang === 'bm'
                ? 'Masa tamat untuk mendapatkan lokasi GPS.'
                : 'Location request timed out.',
          });
        } else {
          setLocationFeedback({
            type: 'unavailable',
            message:
              lang === 'bm'
                ? 'Tidak dapat mengesan lokasi semasa.'
                : 'Unable to detect your current location.',
          });
        }
        setLocationSource('manual');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // Manual message edit handler
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setIsMessageUserEdited(true);
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  };

  const handleResetMessage = () => {
    setIsMessageUserEdited(false);
    setMessage(generatedMessage);
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  };

  // Close attempt handler
  const handleAttemptClose = () => {
    const hasData =
      name.trim().length > 0 ||
      selectedMaterials.length > 0 ||
      selectedLocation.length > 0 ||
      isMessageUserEdited;

    if (hasData && !showDiscardConfirm) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  // Validation & Submit
  const handleContinueToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      name?: string;
      materials?: string;
      location?: string;
      message?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = lang === 'bm' ? 'Sila masukkan nama anda.' : 'Please enter your name.';
    }

    if (selectedMaterials.length === 0) {
      newErrors.materials =
        lang === 'bm' ? 'Sila pilih sekurang-kurangnya satu bahan.' : 'Please select at least one material.';
    }

    if (!selectedLocation || (selectedLocation === 'Other location' && !customLocation.trim())) {
      newErrors.location =
        lang === 'bm' ? 'Sila pilih atau masukkan lokasi anda.' : 'Please select or enter your location.';
    }

    if (!message.trim()) {
      newErrors.message = lang === 'bm' ? 'Sila masukkan mesej.' : 'Please enter a message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Exact message in the textarea, URL encoded
    const finalEncodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${finalEncodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Filtered materials for dropdown
  const filteredDropdownMaterials = allMaterials.filter((m) => {
    const query = materialSearchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      m.nameEn.toLowerCase().includes(query) ||
      m.nameBm.toLowerCase().includes(query)
    );
  });

  // Filtered locations for dropdown
  const filteredDropdownLocations = MALAYSIAN_LOCATIONS.filter((loc) => {
    const query = locationSearchQuery.toLowerCase().trim();
    if (!query) return true;
    if (loc === 'Other location') {
      return (
        'other location'.includes(query) ||
        'lokasi lain'.includes(query) ||
        'lain-lain'.includes(query)
      );
    }
    return loc.toLowerCase().includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-[#0B3A2C] to-slate-900 text-white p-4 sm:p-6 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400/50 bg-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/40 shrink-0">
              <img
                src={logoImg}
                alt="Kedai Besi Buruk"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#25D366] border border-white flex items-center justify-center">
                <MessageCircle className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-snug">
                  {lang === 'bm' ? 'Kedai Besi Buruk WhatsApp' : 'Kedai Besi Buruk WhatsApp'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5 leading-tight">
                {lang === 'bm'
                  ? 'Kongsikan jenis bahan dan lokasi anda untuk sebut harga pantas.'
                  : 'Tell us what you would like to sell and where the scrap is located.'}
              </p>
            </div>
          </div>
          <button
            id="close-whatsapp-modal-btn"
            onClick={handleAttemptClose}
            className="p-1.5 sm:p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Discard Confirmation Overlay */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                {lang === 'bm' ? 'Padam mesej anda?' : 'Discard your message?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                {lang === 'bm'
                  ? 'Maklumat yang telah anda masukkan tidak akan dihantar ke WhatsApp.'
                  : 'The information you have entered will not be sent to WhatsApp.'}
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowDiscardConfirm(false)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {lang === 'bm' ? 'Teruskan Mengedit' : 'Continue Editing'}
                </button>
                <button
                  onClick={handleConfirmDiscard}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
                >
                  {lang === 'bm' ? 'Padam & Tutup' : 'Discard'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleContinueToWhatsApp} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          
          {/* FIELD 1: YOUR NAME */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              {lang === 'bm' ? 'Nama Anda' : 'Your Name'} <span className="text-rose-500">*</span>
            </label>
            <input
              id="whatsapp-customer-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder={lang === 'bm' ? 'Masukkan nama anda' : 'Enter your name'}
              className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-rose-400 focus:ring-rose-300 bg-rose-50/40'
                  : 'border-slate-200 focus:ring-emerald-600 focus:border-transparent bg-white'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* FIELD 2: WHAT WOULD YOU LIKE TO SELL? (Multi-Select Dropdown) */}
          <div className="relative" ref={materialDropdownRef}>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              {lang === 'bm' ? 'Apa yang ingin anda jual?' : 'What would you like to sell?'}{' '}
              <span className="text-rose-500">*</span>
            </label>

            {/* Selector Trigger Box with Chips */}
            <div
              onClick={() => setIsMaterialDropdownOpen((prev) => !prev)}
              className={`w-full min-h-[46px] p-2 sm:p-2.5 rounded-xl border flex flex-wrap items-center gap-1.5 cursor-pointer transition-all bg-white ${
                errors.materials
                  ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/30'
                  : isMaterialDropdownOpen
                  ? 'border-emerald-600 ring-2 ring-emerald-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {selectedMaterials.length === 0 ? (
                <span className="text-xs sm:text-sm text-slate-400 pl-1">
                  {lang === 'bm' ? 'Pilih bahan besi buruk (boleh pilih lebih daripada satu)...' : 'Select scrap materials (multi-select)...'}
                </span>
              ) : (
                selectedMaterials.map((mat) => {
                  const item = allMaterials.find((m) => m.nameEn === mat || m.nameBm === mat);
                  const displayLabel = item ? item.primaryName : mat;
                  return (
                    <span
                      key={mat}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300/80 text-xs font-bold shadow-xs animate-fadeIn"
                    >
                      <span>{displayLabel}</span>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveMaterial(mat, e)}
                        className="p-0.5 hover:bg-emerald-200 rounded text-emerald-800 transition-colors"
                        title={lang === 'bm' ? 'Buang' : 'Remove'}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })
              )}
              <div className="ml-auto pr-1 text-slate-400 pointer-events-none">
                <ChevronDown className={`w-4 h-4 transition-transform ${isMaterialDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isMaterialDropdownOpen && (
              <div className="absolute z-30 left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 animate-fadeIn max-h-60 flex flex-col">
                {/* Search Bar inside dropdown */}
                <div className="relative mb-2 shrink-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={materialSearchQuery}
                    onChange={(e) => setMaterialSearchQuery(e.target.value)}
                    placeholder={lang === 'bm' ? 'Cari bahan (cth: Copper, Battery)...' : 'Search materials (e.g. Copper, Battery)...'}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Items List */}
                <div className="overflow-y-auto space-y-1 flex-1 pr-1">
                  {filteredDropdownMaterials.length === 0 ? (
                    <div className="text-center py-4 text-xs text-slate-400">
                      {lang === 'bm' ? 'Tiada bahan sepadan' : 'No matching materials'}
                    </div>
                  ) : (
                    filteredDropdownMaterials.map((item) => {
                      const isSelected = selectedMaterials.includes(item.nameEn);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleMaterial(item.nameEn)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-emerald-800 text-white font-bold'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span>{item.primaryName}</span>
                            {item.primaryName !== item.secondaryName && (
                              <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                                {item.secondaryName}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {errors.materials && (
              <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.materials}</span>
              </p>
            )}
          </div>

          {/* FIELD 3: WHERE IS THE SCRAP LOCATED? */}
          <div className="relative space-y-2" ref={locationDropdownRef}>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {lang === 'bm' ? 'Di manakah lokasi besi buruk?' : 'Where is the scrap located?'}{' '}
                <span className="text-rose-500">*</span>
              </label>

              {/* Real GPS Geolocation Trigger Button */}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 px-2.5 py-1 rounded-lg border border-emerald-200/90 transition-all cursor-pointer shadow-2xs disabled:opacity-60"
                title={lang === 'bm' ? 'Kesan Lokasi Semasa Melalui GPS Peranti' : 'Detect Current Location via Device GPS'}
              >
                {isLocating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                ) : (
                  <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                )}
                <span>
                  {isLocating
                    ? lang === 'bm'
                      ? 'Mendapatkan Lokasi...'
                      : 'Getting Location...'
                    : lang === 'bm'
                    ? 'Lokasi Semasa'
                    : 'Use My Location'}
                </span>
              </button>
            </div>

            {/* GPS / Geolocation Status Feedback Banner */}
            {locationFeedback && (
              <div
                className={`p-3 rounded-xl text-xs transition-all ${
                  locationFeedback.type === 'loading'
                    ? 'bg-blue-50/90 border border-blue-200 text-blue-900'
                    : locationFeedback.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200/90 text-emerald-900'
                    : locationFeedback.type === 'denied' || locationFeedback.type === 'unavailable'
                    ? 'bg-amber-50 border border-amber-200 text-amber-900'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    {locationFeedback.type === 'loading' && (
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                    )}
                    {locationFeedback.type === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {(locationFeedback.type === 'denied' || locationFeedback.type === 'unavailable') && (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    {locationFeedback.type === 'geocoding_failed' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{locationFeedback.message}</span>
                  </div>

                  {locationSource === 'gps' && locationFeedback.type === 'success' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-950 shrink-0">
                      📍 GPS
                    </span>
                  )}
                </div>

                {locationFeedback.type === 'success' && (
                  <div className="mt-1 pl-5">
                    <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {selectedLocation}
                    </p>
                    {locationFeedback.accuracyMeters !== undefined && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {lang === 'bm'
                          ? `Ketepatan lokasi: lebih kurang ±${locationFeedback.accuracyMeters} meter`
                          : `Location accuracy: approximately ±${locationFeedback.accuracyMeters} meters`}
                      </p>
                    )}
                  </div>
                )}

                {(locationFeedback.type === 'denied' || locationFeedback.type === 'unavailable') && (
                  <div className="mt-1 pl-5 text-[11px] text-amber-800">
                    {lang === 'bm'
                      ? 'Sila pilih lokasi anda daripada senarai manual di bawah atau nyatakan secara bertulis.'
                      : 'Please select your location manually from the list below or enter it custom.'}
                  </div>
                )}
              </div>
            )}

            {/* Location Selector Trigger */}
            <div
              onClick={() => setIsLocationDropdownOpen((prev) => !prev)}
              className={`w-full min-h-[46px] px-3.5 py-2.5 sm:py-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all bg-white ${
                errors.location
                  ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/30'
                  : isLocationDropdownOpen
                  ? 'border-emerald-600 ring-2 ring-emerald-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className={`w-4 h-4 shrink-0 ${locationSource === 'gps' ? 'text-emerald-600' : 'text-slate-500'}`} />
                <span className={`text-xs sm:text-sm truncate ${selectedLocation ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                  {selectedLocation === 'Other location'
                    ? lang === 'bm'
                      ? 'Lokasi Lain (Taip sendiri)'
                      : 'Other Location (Custom)'
                    : selectedLocation || (lang === 'bm' ? 'Pilih atau cari bandar/kawasan...' : 'Select or search location...')}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Source Status Pill (GPS vs Manual) */}
            {selectedLocation && (
              <div className="flex items-center justify-between text-[11px] px-1 text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  {locationSource === 'gps' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-emerald-800 font-bold">
                        {lang === 'bm' ? '📍 Lokasi peranti semasa (GPS)' : '📍 Current device location (GPS)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      <span>
                        {lang === 'bm' ? '📍 Lokasi dipilih secara manual' : '📍 Manually selected location'}
                      </span>
                    </>
                  )}
                </span>

                {locationSource === 'gps' && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationDropdownOpen(true);
                      setLocationSource('manual');
                    }}
                    className="text-emerald-700 hover:underline font-bold cursor-pointer"
                  >
                    {lang === 'bm' ? 'Tukar manual' : 'Change manual'}
                  </button>
                )}
              </div>
            )}

            {/* Location Dropdown Menu */}
            {isLocationDropdownOpen && (
              <div className="absolute z-30 left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 animate-fadeIn max-h-60 flex flex-col">
                <div className="relative mb-2 shrink-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={locationSearchQuery}
                    onChange={(e) => setLocationSearchQuery(e.target.value)}
                    placeholder={lang === 'bm' ? 'Cari kawasan (cth: Shah Alam, Klang, Melaka)...' : 'Search location (e.g. Shah Alam, Klang, Melaka)...'}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="overflow-y-auto space-y-0.5 flex-1 pr-1">
                  {filteredDropdownLocations.length === 0 ? (
                    <div className="text-center py-4 text-xs text-slate-400">
                      {lang === 'bm' ? 'Tiada lokasi dijumpai' : 'No location found'}
                    </div>
                  ) : (
                    filteredDropdownLocations.map((loc) => {
                      const isSelected = selectedLocation === loc;
                      const isOther = loc === 'Other location';
                      return (
                        <div
                          key={loc}
                          onClick={() => handleSelectLocation(loc)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-emerald-800 text-white font-bold'
                              : isOther
                              ? 'bg-amber-50 text-amber-900 font-bold hover:bg-amber-100'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : isOther ? 'text-amber-600' : 'text-slate-400'}`} />
                            <span>
                              {isOther
                                ? lang === 'bm'
                                  ? 'Lokasi Lain (Nyatakan sendiri)'
                                  : 'Other location'
                                : loc}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Custom Location Text Input when "Other location" is chosen */}
            {selectedLocation === 'Other location' && (
              <div className="mt-2 animate-fadeIn">
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => {
                    setCustomLocation(e.target.value);
                    setLocationSource('manual');
                    if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                  }}
                  placeholder={
                    lang === 'bm'
                      ? 'Masukkan lokasi anda (cth: Taman Melawati, Kajang, Kulim, dsb.)'
                      : 'Enter your location (e.g. Bangi, Cheras, Kulim, etc.)'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            )}

            {errors.location && (
              <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.location}</span>
              </p>
            )}
          </div>

          {/* FIELD 4: MESSAGE PREVIEW & EDITABLE TEXTAREA */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {lang === 'bm' ? 'Pratonton Mesej' : 'Message Preview'}{' '}
                <span className="text-rose-500">*</span>
              </label>

              {isMessageUserEdited && (
                <button
                  type="button"
                  onClick={handleResetMessage}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                  title={lang === 'bm' ? 'Jana semula dari maklumat borang' : 'Regenerate from form fields'}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === 'bm' ? 'Set Semula Mesej' : 'Reset Message'}</span>
                </button>
              )}
            </div>

            <textarea
              ref={textareaRef}
              rows={6}
              value={message}
              onChange={handleMessageChange}
              placeholder={lang === 'bm' ? 'Mesej WhatsApp anda...' : 'Your WhatsApp message...'}
              className={`w-full p-3 sm:p-3.5 rounded-2xl border text-xs sm:text-sm text-slate-800 leading-relaxed font-mono focus:outline-none focus:ring-2 transition-all resize-y ${
                errors.message
                  ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-emerald-600 focus:border-transparent bg-slate-50'
              }`}
            ></textarea>
            
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>
                {isMessageUserEdited
                  ? lang === 'bm'
                    ? '✏️ Mesej telah diedit secara manual.'
                    : '✏️ Custom edited message preserved.'
                  : lang === 'bm'
                  ? 'Anda boleh mengedit teks mesej ini secara bebas sebelum menghantar.'
                  : 'You can freely edit this message text before sending.'}
              </span>
            </div>

            {errors.message && (
              <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* ACTIONS: CANCEL & CONTINUE TO WHATSAPP */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleAttemptClose}
              className="w-full sm:w-auto order-2 sm:order-1 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer text-center"
            >
              {lang === 'bm' ? 'Batal' : 'Cancel'}
            </button>

            <button
              type="submit"
              id="continue-to-whatsapp-btn"
              className="w-full sm:flex-1 order-1 sm:order-2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>{lang === 'bm' ? '💬 Teruskan ke WhatsApp' : '💬 Continue to WhatsApp'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
