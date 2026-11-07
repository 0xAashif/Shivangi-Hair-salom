import { Phone, MapPin, MessageSquare, Star } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking?: () => void;
  onOpenWhatsApp: () => void;
}

export default function Footer({ onOpenWhatsApp }: FooterProps) {
  return (
    <footer className="bg-[#EDE6D8] dark:bg-[#0A0A0C] border-t border-[#D5C9B3] dark:border-neutral-900 text-[#635E54] dark:text-neutral-400 text-xs py-16 pb-28 md:pb-16 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col with Logo (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D5C9B3] dark:border-neutral-700 bg-black shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Shivangi Hair Salon Logo" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'none' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-[#141414] dark:text-white">
                SHIVANGI <span className="gold-gradient-text">HAIR SALON</span>
              </span>
            </div>
            
            <p className="text-xs text-[#4A4742] dark:text-neutral-300 max-w-sm leading-relaxed">
              Premier men's grooming & barber studio in Bhopal. Precision haircutting, beard sculpting, and hot towel rituals engineered for the modern gentleman.
            </p>

            <div className="flex items-center gap-1.5 text-[#B8973E] dark:text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[#141414] dark:text-white font-bold">4.9★ Rated on Google</span>
              <span className="text-[#635E54] dark:text-neutral-400">· Over 140+ Bhopal clients</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141414] dark:text-white">
              Studio Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#showcase" className="hover:text-[#141414] dark:hover:text-white transition-colors">
                  Cinematic Showcase
                </a>
              </li>
              <li>
                <a href="#barber" className="hover:text-[#141414] dark:hover:text-white transition-colors">
                  Master Craftsman
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#141414] dark:hover:text-white transition-colors">
                  Service Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#141414] dark:hover:text-white transition-colors">
                  Authentic Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#141414] dark:hover:text-white transition-colors">
                  Hygiene & Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#141414] dark:hover:text-white transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Strict Circular CTAs (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141414] dark:text-white">
              Direct Studio Channels
            </p>
            <div className="space-y-2 text-xs text-[#4A4742] dark:text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B8973E] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B8973E] dark:text-[#D4AF37] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:underline font-semibold font-mono">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="text-[11px] text-[#635E54] dark:text-neutral-400">
                Mon, Wed–Sun: 8:30 AM – 9:30 PM <span className="text-amber-600 dark:text-amber-400 font-bold">(Tuesday Closed)</span>
              </div>
            </div>

            {/* Strict Color Coded Action Buttons (PERFECT CIRCLES, Icon-Only inside, zero text) */}
            <div className="pt-2 flex items-center gap-4">
              
              {/* 1. Call Black */}
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="cta-circle w-12 h-12 btn-call text-white shadow-sm flex items-center justify-center focus:outline-none"
                aria-label={`Call studio at ${SALON_INFO.phone}`}
                title="Call Studio"
              >
                <Phone className="w-5 h-5 shrink-0" />
              </a>

              {/* 2. WhatsApp Green */}
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="cta-circle w-12 h-12 bg-[#25D366] hover:bg-[#20BA59] text-white shadow-sm flex items-center justify-center cursor-pointer focus:outline-none"
                aria-label="Direct WhatsApp booking"
                title="Book on WhatsApp"
              >
                <MessageSquare className="w-5 h-5 text-white fill-white/20 shrink-0" />
              </button>

              {/* 3. Facebook Blue */}
              <a
                href={SALON_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-circle w-12 h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-sm flex items-center justify-center focus:outline-none"
                aria-label="Visit Facebook Page"
                title="Follow on Facebook"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#D5C9B3] dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#635E54] dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Shivangi Hair Salon. All rights reserved.</p>
          <p>7897+5X4, Bhensakhedi Road, near The Fitness Planet, Bhopal, MP 462030</p>
        </div>

      </div>
    </footer>
  );
}
