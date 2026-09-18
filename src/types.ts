export type Language = 'en' | 'bm';

export type MaterialCategory = 'all' | 'metals' | 'electronics' | 'cables' | 'batteries';

export interface ScrapMaterial {
  id: string;
  nameEn: string;
  nameBm: string;
  category: MaterialCategory;
  categoryLabelEn: string;
  categoryLabelBm: string;
  descriptionEn: string;
  descriptionBm: string;
  examplesEn: string[];
  examplesBm: string[];
  image: string;
  popular?: boolean;
  commonGrade?: string;
  unit: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleBm: string;
  shortDescEn: string;
  shortDescBm: string;
  fullDescEn: string;
  fullDescBm: string;
  iconName: string;
  badgeEn?: string;
  badgeBm?: string;
  suitableForEn: string[];
  suitableForBm: string[];
}

export interface AreaItem {
  stateEn: string;
  stateBm: string;
  isPrimary: boolean;
  districts: string[];
}

export type FAQCategory = 'all' | 'general' | 'services' | 'pricing' | 'materials';

export interface FAQItem {
  questionEn: string;
  questionBm: string;
  answerEn: string;
  answerBm: string;
  category: 'general' | 'services' | 'pricing' | 'materials';
}

export interface PickupRequestForm {
  name: string;
  phone: string;
  location: string;
  materialType: string;
  estimatedWeight: string;
  notes: string;
  preferredDate?: string;
  urgency: 'normal' | 'urgent' | 'scheduled';
}
