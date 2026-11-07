import { Calendar, Phone, MessageSquare } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface StickyBottomBarProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export default function StickyBottomBar({
  onOpenBooking,
  onOpenWhatsApp,
}: StickyBottomBarProps) {
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F11]/95 backdrop-blur-md border-t border-amber-500/20 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.8)]"
      role="region"
      aria-label="Mobile quick actions"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${SALON_INFO.phone}`}
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white shrink-0 w-12 h-11"
          aria-label={`Call salon directly at ${SALON_INFO.phone}`}
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[9px] mt-0.5">Call</span>
        </a>

        {/* WhatsApp Direct */}
        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white shrink-0 w-12 h-11 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="text-[9px] mt-0.5">Chat</span>
        </button>

        {/* Primary High-Contrast Gold Book Chair Button */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#F4E8B8] via-[#D4AF37] to-[#A6841E] shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Calendar className="w-4 h-4 text-black" />
          <span>Book Chair</span>
        </button>
      </div>
    </div>
  );
}
