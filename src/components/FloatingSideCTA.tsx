import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';

interface FloatingSideCTAProps {
  onOpenWhatsApp: () => void;
}

export default function FloatingSideCTA({ onOpenWhatsApp }: FloatingSideCTAProps) {
  return (
    <aside
      className="fixed bottom-4 sm:bottom-5 right-4 z-40 flex items-center gap-2.5 pointer-events-none select-none"
      aria-label="Quick salon contact"
    >
      <a
        href={`tel:${SALON_INFO.phone}`}
        className="pointer-events-auto inline-flex items-center justify-center gap-2 h-11 w-11 sm:w-auto sm:px-4 rounded-full bg-[#141413]/95 dark:bg-[#121214]/95 text-[#F4F1EA] border border-[#C5A059]/40 shadow-lg backdrop-blur-md hover:bg-black hover:border-[#C5A059] transition-colors"
        aria-label={`Call salon directly at ${SALON_INFO.phone}`}
        title="Call Us Now"
      >
        <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
        <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap">
          Call Us Now
        </span>
      </a>

      <button
        type="button"
        onClick={onOpenWhatsApp}
        className="pointer-events-auto cta-circle bg-[#25D366] hover:bg-[#20BA59] text-white shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
        aria-label="Book on WhatsApp (+91 9575830421)"
        title="Book on WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
      </button>
    </aside>
  );
}
