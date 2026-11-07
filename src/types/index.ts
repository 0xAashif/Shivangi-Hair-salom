export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'beard' | 'spa' | 'specialty' | 'package';
  durationMinutes: number;
  priceMin: number;
  priceMax: number;
  shortDesc: string;
  inclusions: string[];
  popular?: boolean;
}

export interface FaceShapeGuide {
  id: string;
  name: string;
  tagline: string;
  hairRecommendation: string;
  beardContour: string;
  barberTip: string;
  fadeType: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  rating: number;
  reviewDate: string;
  serviceDone: string;
  comment: string;
  badge: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  selectedServices: string[];
  date: string;
  timeSlot: string;
  notes: string;
}

export interface BookingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
