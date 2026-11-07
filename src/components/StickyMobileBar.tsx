import { Phone, MessageSquare } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface StickyMobileBarProps {
  onOpenWhatsApp: () => void;
}

export default function StickyMobileBar({ onOpenWhatsApp }: StickyMobileBarProps) {
  return (
    <div 
      className="md:hidden fixed bottom-5 left-0 right-0 z-40 pointer-events-none flex justify-center px-4"
      role="region"
      aria-label="Mobile quick actions"
    >
      {/* Floating Glass Dock with 3 Perfectly Circular Action Buttons (FABs) */}
      <div className="pointer-events-auto inline-flex items-center gap-4 px-4 py-2.5 rounded-full bg-[#F5F1E8]/90 dark:bg-[#121212]/90 backdrop-blur-xl border border-[#D5C9B3]/80 dark:border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
        
        {/* 1. Call Button: Solid Black #000000 (or White in Dark Mode), Perfect Circle, Icon-Only */}
        <a
          href={`tel:${SALON_INFO.phone}`}
          className="cta-circle w-12 h-12 btn-call text-white shadow-md active:scale-95 transition-all flex items-center justify-center focus:outline-none"
          aria-label={`Call salon now at ${SALON_INFO.phone}`}
          title="Call Studio"
        >
          <Phone className="w-5 h-5 shrink-0" />
        </a>

        {/* 2. WhatsApp Button: WhatsApp Green #25D366, Perfect Circle, Icon-Only */}
        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="cta-circle w-14 h-14 bg-[#25D366] hover:bg-[#20BA59] text-white shadow-lg active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none"
          aria-label="Book on WhatsApp"
          title="Book on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 text-white fill-white/20 shrink-0" />
        </button>

        {/* 3. Facebook Button: Facebook Blue #1877F2, Perfect Circle, Icon-Only */}
        <a
          href={SALON_INFO.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-circle w-12 h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-md active:scale-95 transition-all flex items-center justify-center focus:outline-none"
          aria-label="Visit Facebook Page"
          title="Follow on Facebook"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>

      </div>
    </div>
  );
}
