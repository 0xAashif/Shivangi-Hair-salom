import { Award, CalendarCheck, Compass, Phone, Scissors, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';
import { MACRO_VIDEOS } from '../config/videos';
import { buildHinglishWhatsAppMessage, createWhatsAppUrl, openExternalUrl } from '../utils/booking';
import MacroVideo from './MacroVideo';
import { Button } from './ui/button';

interface CraftsmanshipProps {
  onOpenBooking: () => void;
}

export default function Craftsmanship({ onOpenBooking }: CraftsmanshipProps) {
  const handleWhatsAppClick = () => {
    const msg = buildHinglishWhatsAppMessage('Signature Haircut & Skin Fade');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  const pillars = [
    {
      index: '01',
      icon: Scissors,
      title: 'Sharp Scissor & Fade Work',
      desc: 'Clean, balanced haircuts that hold their shape for weeks—not just on day one.',
    },
    {
      index: '02',
      icon: Compass,
      title: 'Cut According to Your Face Shape',
      desc: 'We check your face structure and natural hair growth before touching the clipper.',
    },
    {
      index: '03',
      icon: ShieldCheck,
      title: '100% Clean Tools & Fresh Blades',
      desc: 'Every scissor and clipper is UV-cleaned, and a brand-new blade is opened in front of you.',
    },
  ];

  return (
    <section
      id="barber"
      className="py-20 sm:py-28 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[1px] bg-[#9A7848] dark:bg-[#C5A059]" />
          <Scissors className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#9A7848] dark:text-[#C5A059]">
            Meet Your Barber · Shivangi Hair Salon
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Clean Unobstructed Portrait + Unified Editorial Footer */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/10 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src="/barber.jpg"
                alt="Master Barber at Shivangi Hair Salon Bhopal"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-stone-900/10 dark:border-white/10">
              <div>
                <p className="font-display text-lg font-bold text-[#141413] dark:text-[#F4F1EA]">
                  Master Barber
                </p>
                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  Bhensakhedi Road · Bhopal
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center justify-end gap-1.5 font-mono text-base font-bold text-[#9A7848] dark:text-[#C5A059] tabular-nums">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>8+ Years</span>
                </span>
                <span className="text-[11px] text-[#57534E] dark:text-[#A1A1AA] block">
                  Salon Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Story, Hairline Numbered Craft List, & Blade Video */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight leading-[1.12] text-balance">
                The hands behind the fade. 8+ years of real salon craft.
              </h2>
              <p className="text-sm sm:text-base text-[#4A4742] dark:text-[#A6A095] leading-relaxed max-w-2xl">
                At Shivangi Hair Salon, we never rush your haircut. Before picking up a clipper, our Master Barber checks your face shape and natural hair growth—giving you a sharp, comfortable look that stays neat and easy to style for weeks.
              </p>
            </div>

            {/* Clean Hairline List with Lucide Stroke Icons */}
            <div className="divide-y divide-stone-900/10 dark:divide-white/10 border-y border-stone-900/10 dark:border-white/10">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.index}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-2 flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#9A7848] dark:text-[#C5A059] tabular-nums">
                      <Icon className="w-4 h-4 shrink-0 stroke-[1.75]" />
                      <span>{pillar.index}.</span>
                    </div>
                    <h3 className="sm:col-span-4 font-bold text-sm text-[#141413] dark:text-[#F4F1EA]">
                      {pillar.title}
                    </h3>
                    <p className="sm:col-span-6 text-xs sm:text-sm text-[#57534E] dark:text-[#A6A095] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Fresh Blade Macro Video Strip with Luminous Contrast */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-900/15 dark:border-white/15 bg-[#070709] p-6 shadow-md">
              <MacroVideo
                asset={MACRO_VIDEOS.trustStrip}
                className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.08] opacity-65"
                overlayClassName="bg-gradient-to-r from-[#070709]/88 via-[#070709]/55 to-[#070709]/80"
              />
              <div className="relative z-10 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>100% Fresh Sealed Blade · Zero Reuse</span>
                </p>
                <h3 className="font-display text-lg font-bold text-[#F4F1EA]">
                  Sharp Beard Line-Up &amp; UV-Cleaned Tools
                </h3>
                <p className="text-xs sm:text-sm text-[#E2DDD2] max-w-xl">
                  Every shave and beard line-up uses a brand-new sealed blade unpacked right in front of your chair.
                </p>
              </div>
            </div>

            {/* Primary Slot Booking + Direct WhatsApp + Call */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                type="button"
                variant="default"
                onClick={onOpenBooking}
                className="uppercase text-xs tracking-wider"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Book Face-Shape Consultation</span>
              </Button>

              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="cta-circle btn-whatsapp shadow-sm cursor-pointer"
                aria-label="Message on WhatsApp (+91 9575830421)"
                title="Direct WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              </button>

              <a
                href={`tel:${SALON_INFO.phone}`}
                className="cta-circle btn-call shadow-sm"
                aria-label={`Call salon at ${SALON_INFO.phone}`}
                title="Call Salon"
              >
                <Phone className="w-5 h-5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
