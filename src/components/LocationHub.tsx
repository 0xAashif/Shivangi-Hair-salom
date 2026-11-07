import { MapPin, Clock, Phone, Navigation, AlertCircle, MessageSquare } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface LocationHubProps {
  onOpenWhatsApp: () => void;
}

export default function LocationHub({ onOpenWhatsApp }: LocationHubProps) {
  const today = new Date();
  const isTuesdayToday = today.getDay() === 2;

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#F5F1E8] dark:bg-[#121212] border-b border-[#E2DACB] dark:border-neutral-900 scroll-mt-20 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#B8973E] dark:bg-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8973E] dark:text-[#D4AF37]">
              Bhopal Studio Location
            </span>
            <span className="w-8 h-[1px] bg-[#B8973E] dark:bg-[#D4AF37]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#141414] dark:text-white tracking-tight">
            Location & Hours
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4742] dark:text-neutral-300">
            Situated on Bhensakhedi Road right beside The Fitness Planet gym.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Studio Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white/80 dark:bg-[#1A1A1E] border border-[#D5C9B3] dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-lg space-y-6">
            
            <div className="space-y-6">
              
              {/* Tuesday Closed Prominent Warning & Live Status */}
              <div className="p-4 rounded-2xl bg-[#FFF9EE] dark:bg-amber-950/30 border border-[#E8D4B0] dark:border-amber-700/50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isTuesdayToday ? 'bg-amber-600' : 'bg-[#25D366] animate-pulse'}`} />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#8C6D23] dark:text-amber-300">
                    {isTuesdayToday ? 'Closed Today (Tuesday Weekly Rest)' : 'Open Today (8:30 AM – 9:30 PM)'}
                  </span>
                </div>
                
                <div className="flex items-start gap-2 text-xs text-[#524E46] dark:text-neutral-300">
                  <AlertCircle className="w-4 h-4 text-[#B8973E] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    <strong>Tuesday Closed Notice:</strong> Tuesdays are strictly reserved for deep studio sterilization and barber rest. Chair bookings run Wednesday through Monday.
                  </span>
                </div>
              </div>

              {/* Address block */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B8973E] dark:text-[#D4AF37] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Studio Address</span>
                </div>
                <p className="font-display text-lg font-bold text-[#141414] dark:text-white leading-snug">
                  {SALON_INFO.address}
                </p>
                <p className="text-xs text-[#635E54] dark:text-neutral-400">
                  Landmark: Right next to The Fitness Planet gym, Bhensakhedi corridor.
                </p>
                <div className="text-xs text-[#635E54] dark:text-neutral-400 font-mono pt-1">
                  Plus Code: <span className="font-bold text-[#141414] dark:text-white">{SALON_INFO.plusCode}</span>
                </div>
              </div>

              {/* Weekly Schedule Table */}
              <div className="space-y-2 pt-3 border-t border-[#EAE3D4] dark:border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B8973E] dark:text-[#D4AF37] uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Operating Timings</span>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#EAE3D4] dark:border-neutral-800/80">
                    <span className="text-[#3D3A35] dark:text-neutral-300">Monday</span>
                    <span className="font-mono font-bold text-[#141414] dark:text-white">8:30 AM – 9:30 PM</span>
                  </div>
                  
                  {/* Highlighted Tuesday */}
                  <div className="flex justify-between py-1.5 px-2 rounded-lg bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold border border-amber-500/30">
                    <span>Tuesday</span>
                    <span className="uppercase tracking-widest text-[11px]">Closed (Sanitization Day)</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[#EAE3D4] dark:border-neutral-800/80">
                    <span className="text-[#3D3A35] dark:text-neutral-300">Wednesday – Sunday</span>
                    <span className="font-mono font-bold text-[#141414] dark:text-white">8:30 AM – 9:30 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Triggers: Direction Trigger + Circular CTAs (Call Black, WhatsApp Green) */}
            <div className="pt-4 border-t border-[#EAE3D4] dark:border-neutral-800 space-y-4">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#141414] dark:bg-white text-white dark:text-black hover:opacity-90 shadow-md transition-all text-center cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              {/* Circular Action Buttons: Icon-Only inside the circle, zero text */}
              <div className="flex items-center justify-center gap-6 pt-1">
                {/* Call Black */}
                <div className="flex flex-col items-center gap-1.5">
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="cta-circle w-13 h-13 btn-call text-white shadow-md flex items-center justify-center focus:outline-none"
                    aria-label={`Call salon now at ${SALON_INFO.phone}`}
                    title="Call Studio"
                  >
                    <Phone className="w-5 h-5 shrink-0" />
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#635E54] dark:text-neutral-400">
                    Call
                  </span>
                </div>

                {/* WhatsApp Green */}
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onOpenWhatsApp}
                    className="cta-circle w-13 h-13 bg-[#25D366] hover:bg-[#20BA59] text-white shadow-md flex items-center justify-center cursor-pointer focus:outline-none"
                    aria-label="Direct WhatsApp booking"
                    title="Book on WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5 text-white fill-white/20 shrink-0" />
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366]">
                    WhatsApp
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Map Embed Frame (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white/80 dark:bg-[#1A1A1E] border border-[#D5C9B3] dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between shadow-lg space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8973E] dark:text-[#D4AF37]">
                    Navigation & Landmark Guidance
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141414] dark:text-white mt-0.5">
                    Find Shivangi Hair Salon
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EDE6D8] dark:bg-neutral-800 text-[#141414] dark:text-neutral-200 border border-[#D5C9B3] dark:border-neutral-700">
                  Easy Front Parking
                </span>
              </div>

              {/* Styled Interactive Map Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D5C9B3] dark:border-neutral-800 bg-[#E8E1D3] dark:bg-[#101014] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-6 text-center shadow-inner group">
                <div className="absolute inset-0 opacity-15 dark:opacity-20 bg-[radial-gradient(#B8973E_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 space-y-3 max-w-md">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white dark:bg-neutral-900 border-2 border-[#25D366] flex items-center justify-center shadow-xl">
                    <MapPin className="w-8 h-8 text-[#25D366]" />
                  </div>

                  <h4 className="font-display text-xl font-bold text-[#141414] dark:text-white">
                    Shivangi Hair Salon
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A4742] dark:text-neutral-300">
                    7897+5X4, Bhensakhedi Road, near The Fitness Planet, Bhopal, MP 462030
                  </p>

                  <div className="pt-2">
                    <a
                      href={SALON_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-[#D5C9B3] dark:border-neutral-700 text-xs font-bold text-[#141414] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-md"
                    >
                      <Navigation className="w-4 h-4 text-[#25D366]" />
                      <span>Start Navigation</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Arrival Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F5F1E8] dark:bg-black/40 border border-[#E2DACB] dark:border-neutral-800 space-y-1">
                <span className="font-bold text-[#141414] dark:text-white block">By Bike or Car</span>
                <p className="text-[#635E54] dark:text-neutral-400 text-[11px]">Free, convenient street parking directly outside the studio.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F1E8] dark:bg-black/40 border border-[#E2DACB] dark:border-neutral-800 space-y-1">
                <span className="font-bold text-[#141414] dark:text-white block">Immediate Landmark</span>
                <p className="text-[#635E54] dark:text-neutral-400 text-[11px]">Located right beside The Fitness Planet on Bhensakhedi Road.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F1E8] dark:bg-black/40 border border-[#E2DACB] dark:border-neutral-800 space-y-1">
                <span className="font-bold text-[#141414] dark:text-white block">Walk-in Welcome</span>
                <p className="text-[#635E54] dark:text-neutral-400 text-[11px]">Appointments prioritized; walk-ins accommodated quickly.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
