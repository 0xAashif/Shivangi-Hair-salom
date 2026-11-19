import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Navigation, AlertCircle, Car, Compass, CalendarCheck } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';
import { getSalonStatusIST } from '../utils/booking';

interface LocationHubProps {
  onOpenWhatsApp: () => void;
}

export default function LocationHub({ onOpenWhatsApp }: LocationHubProps) {
  const [salonStatus, setSalonStatus] = useState(() => getSalonStatusIST());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSalonStatus(getSalonStatusIST());
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="location"
      className="py-20 sm:py-28 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <p className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.26em] text-[#9A7848] dark:text-[#C5A059]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>Bhopal Salon Location</span>
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight">
            Location &amp; Salon Timings
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA]">
            Easy to find on Bhensakhedi Road, right next to The Fitness Planet gym.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Salon Info, Live IST Status & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="space-y-6">
              {/* Live IST Status (Accessible label + icon, zero pulsing dot noise) */}
              <div className="pb-5 border-b border-stone-900/10 dark:border-white/10 space-y-2">
                <p
                  className={`font-mono text-xs font-bold uppercase tracking-wider ${
                    salonStatus.isTuesday
                      ? 'text-rose-600 dark:text-amber-400'
                      : salonStatus.isOpen
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {salonStatus.label}
                </p>
                <div className="flex items-start gap-2 text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  <AlertCircle className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141413] dark:text-[#F4F1EA]">Tuesday Closed:</strong> Weekly off every Tuesday for deep cleaning. Open Wed–Mon, 8:30 AM – 9:30 PM IST.
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9A7848] dark:text-[#C5A059] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Salon Address</span>
                </div>
                <p className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F1EA] leading-snug">
                  {SALON_INFO.address}
                </p>
                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  Landmark: Right beside The Fitness Planet gym, Bhensakhedi Road, Bhopal.
                </p>
              </div>

              {/* Weekly Schedule */}
              <div className="space-y-2 pt-4 border-t border-stone-900/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9A7848] dark:text-[#C5A059] uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Salon Hours</span>
                </div>

                <div className="divide-y divide-stone-900/10 dark:divide-white/10 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-[#57534E] dark:text-[#A1A1AA]">Monday</span>
                    <span className="font-mono font-bold text-[#141413] dark:text-[#F4F1EA] tabular-nums">8:30 AM – 9:30 PM</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-[#9A7848] dark:text-[#C5A059]">
                    <span>Tuesday</span>
                    <span className="uppercase tracking-wider text-[11px]">Closed (Weekly Off)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#57534E] dark:text-[#A1A1AA]">Wednesday – Sunday</span>
                    <span className="font-mono font-bold text-[#141413] dark:text-[#F4F1EA] tabular-nums">8:30 AM – 9:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions + Direct Contact Channels */}
            <div className="pt-4 border-t border-stone-900/10 dark:border-white/10 space-y-4">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#141413] dark:bg-[#F4F1EA] text-[#F4F1EA] dark:text-[#070709] hover:opacity-90 transition-opacity"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <div className="flex items-center justify-center gap-4 pt-1 flex-wrap">
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="cta-circle btn-call shadow-sm"
                  aria-label={`Call salon now at ${SALON_INFO.phone}`}
                  title="Call Salon"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="cta-circle btn-whatsapp shadow-sm cursor-pointer"
                  aria-label="Direct WhatsApp booking"
                  title="Book on WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                </button>

                <a
                  href={SALON_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-circle bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-sm"
                  aria-label="Visit Facebook Page"
                  title="Facebook"
                >
                  <FacebookIcon className="w-5 h-5 text-white shrink-0" />
                </a>

                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-circle bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white shadow-sm"
                  aria-label="Follow on Instagram"
                  title="Instagram"
                >
                  <InstagramIcon className="w-5 h-5 text-white shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Unobstructed Google Map + Arrival Notes (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span>Satellite Map · Bhensakhedi Road</span>
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141413] dark:text-[#F4F1EA]">
                    Visit Shivangi Hair Salon
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] dark:text-[#A1A1AA]">
                  <Car className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Free Front Parking Available</span>
                </span>
              </div>

              {/* Clean, Unobstructed Interactive Map Frame (Zero Tilt / Zero Overlapping Badges) */}
              <div className="relative rounded-xl overflow-hidden border border-stone-900/15 dark:border-white/15 bg-[#0B0B0C] aspect-[16/10] sm:aspect-[16/9]">
                <iframe
                  title="Shivangi Hair Salon Google Maps Location"
                  src={SALON_INFO.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Clean Arrival Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-900/10 dark:border-white/10 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#141413] dark:text-[#F4F1EA]">
                  <Car className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Bike &amp; Car Parking</span>
                </div>
                <p className="text-[#57534E] dark:text-[#A1A1AA] text-[11px]">
                  Easy street parking right outside the salon door.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#141413] dark:text-[#F4F1EA]">
                  <Compass className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Easy Landmark</span>
                </div>
                <p className="text-[#57534E] dark:text-[#A1A1AA] text-[11px]">
                  Right next to The Fitness Planet gym on Bhensakhedi Road.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#141413] dark:text-[#F4F1EA]">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Walk-In or Book</span>
                </div>
                <p className="text-[#57534E] dark:text-[#A1A1AA] text-[11px]">
                  Walk-ins welcome, or message on WhatsApp to skip waiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
