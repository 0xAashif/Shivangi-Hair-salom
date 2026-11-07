import { useState, useEffect, useRef } from 'react';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOWCASE_SLIDES, SALON_INFO } from '../data/salonData';
import { createWhatsAppUrl, openExternalUrl } from '../utils/booking';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = SHOWCASE_SLIDES.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, isPaused, slideCount]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const handleWhatsAppClick = () => {
    const msg = [
      `*APPOINTMENT INQUIRY - SHIVANGI HAIR SALON*`,
      `Hello Master Barber, I would like to reserve a chair at your Bhopal studio (Bhensakhedi Road).`,
      `Please let me know current availability.`
    ].join('\n');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  return (
    <section 
      id="showcase"
      className="relative w-screen max-w-none left-1/2 -translate-x-1/2 m-0 p-0 overflow-hidden select-none bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Cinematic Showcase"
    >
      {/* 100vw Full-Bleed Container with Strictly 0px margin/padding */}
      <div className="relative w-full h-[78vh] sm:h-[86vh] min-h-[520px] max-h-[920px]">
        
        {/* Slides Track */}
        {SHOWCASE_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
                loading={index < 2 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
              />
              {/* Subtle film grain & cinematic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/50" />
            </div>
          );
        })}

        {/* Stark Editorial Text & Floating Circular Green WhatsApp CTA */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          
          {/* Slide Category Micro-Tag */}
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-3 drop-shadow">
            {SHOWCASE_SLIDES[currentSlide].tag}
          </span>

          {/* Stark Headline: Precision Grooming. */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-md max-w-4xl leading-[1.08]">
            Precision Grooming.
          </h1>

          {/* Minimalist Subtitle */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-300 font-normal tracking-wide max-w-xl leading-relaxed drop-shadow">
            Engineered cuts, hot-towel beard architecture, and razor detailing in Bhopal.
          </p>

          {/* Single Circular Green WhatsApp CTA Floating Below Stark Text (BroCodes Tech Aesthetic) */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="cta-circle w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white shadow-2xl hover:bg-[#20BA59] cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
              aria-label="Direct WhatsApp Booking"
              title="Book via WhatsApp (+91 9575830421)"
            >
              {/* Strictly icon-only inside the circle, zero text */}
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/20" />
            </button>
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mt-1">
              WhatsApp Chair Booking
            </span>
          </div>

        </div>

        {/* Slide Controls (Subtle Desktop Chevron Buttons) */}
        <button
          type="button"
          onClick={handlePrev}
          className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/10 transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/10 transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Navigation Progress Pips */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5">
          {SHOWCASE_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 sm:w-10 bg-[#25D366]'
                  : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
