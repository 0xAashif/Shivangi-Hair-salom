import { useEffect, useState } from 'react';
import { ArrowRight, CalendarCheck, Flame, MapPin, Scissors, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_CAROUSEL_SLIDES } from '../config/videos';
import MacroVideo from './MacroVideo';
import { Button } from './ui/button';

interface HeroProps {
  onOpenBooking: () => void;
}

const SLIDE_INTERVAL_MS = 7000;

const SLIDE_ICONS = [Scissors, ShieldCheck, Flame] as const;

export default function Hero({ onOpenBooking }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  const activeSlide = HERO_CAROUSEL_SLIDES[activeIndex];

  return (
    <section
      id="showcase"
      className="relative w-full overflow-hidden bg-[#070709] text-[#F4F1EA] border-b border-white/10"
      aria-label="Cinematic Showcase"
    >
      <div className="relative w-full min-h-[560px] h-[84vh] max-h-[860px] flex flex-col justify-between pt-12 sm:pt-16 pb-8 sm:pb-12">
        {/* Background Video with Studio Key-Light Spotlight & Balanced Edge Vignette */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#070709]">
          <MacroVideo
            key={activeSlide.id}
            asset={activeSlide.asset}
            lazy={false}
            className="w-full h-full object-cover object-center brightness-[0.82] sm:brightness-[0.88] contrast-[1.08] saturate-[1.08]"
            overlayClassName="bg-[radial-gradient(ellipse_at_center,rgba(7,7,9,0.20)_0%,rgba(7,7,9,0.58)_68%,rgba(7,7,9,0.92)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_38%,rgba(197,160,89,0.16),transparent_62%)]"
          />
        </div>

        {/* Center Editorial Copy & Primary Action */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-4xl mx-auto">
          <p className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#C5A059] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <Sparkles className="w-3.5 h-3.5 shrink-0 stroke-[1.75]" />
            <span>{activeSlide.eyebrow}</span>
          </p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-[#F4F1EA] leading-[1.08] text-balance max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            {activeSlide.headline}
          </h1>

          <p className="mt-5 text-sm sm:text-base text-[#EAE5DA] font-normal max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {activeSlide.subtext}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="whatsapp"
              size="lg"
              onClick={onOpenBooking}
              className="w-full sm:w-auto uppercase text-xs tracking-[0.16em] shadow-lg"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              <span>Book Chair on WhatsApp</span>
            </Button>

            <a
              href="#services"
              className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/30 bg-black/45 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F4F1EA] hover:bg-white/15 transition-colors"
            >
              <span>View Grooming Menu</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* Quiet Bottom Slide Switcher & Landmark */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/15 pt-4 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-[#D6D1C7] tracking-wide text-center sm:text-left">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 hidden sm:inline" />
            <span>Near Fitness Planet, Bhensakhedi Road, Bhopal · Starts from ₹100</span>
          </span>

          <div
            className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 w-full sm:w-auto"
            role="tablist"
            aria-label="Showcase slides"
          >
            {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
              const Icon = SLIDE_ICONS[idx % SLIDE_ICONS.length];
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-[11px] tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    idx === activeIndex
                      ? 'bg-[#C5A059] text-[#070709] font-bold shadow-sm'
                      : 'text-[#D6D1C7] hover:text-[#F4F1EA] bg-black/30 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span>{slide.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
