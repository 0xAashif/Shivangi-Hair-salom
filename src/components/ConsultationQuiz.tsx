import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, RotateCcw, CalendarCheck, Compass, Scissors, Sparkles, UserCheck, Award } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { QUIZ_QUESTIONS, computeQuizRecommendation, SALON_INFO } from '../data/salonData';
import { buildHinglishWhatsAppMessage, createWhatsAppUrl, openExternalUrl } from '../utils/booking';
import { Button } from './ui/button';

interface ConsultationQuizProps {
  onOpenBooking?: (note: string) => void;
}

export default function ConsultationQuiz({ onOpenBooking }: ConsultationQuizProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFace, setSelectedFace] = useState<string>('square');
  const [selectedHair, setSelectedHair] = useState<string>('straight');
  const [selectedVibe, setSelectedVibe] = useState<string>('streetwear');

  const recommendation = computeQuizRecommendation(selectedFace, selectedHair, selectedVibe);

  const faceLabel = QUIZ_QUESTIONS.faceShapes.find(f => f.id === selectedFace)?.label || selectedFace;
  const hairLabel = QUIZ_QUESTIONS.hairTypes.find(h => h.id === selectedHair)?.label || selectedHair;
  const vibeLabel = QUIZ_QUESTIONS.vibes.find(v => v.id === selectedVibe)?.label || selectedVibe;

  const handleBookLookOnWhatsApp = () => {
    const msg = buildHinglishWhatsAppMessage(recommendation.title);
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  const handleReset = () => {
    setStep(1);
  };

  const steps = [
    { num: 1 as const, label: 'Face Shape' },
    { num: 2 as const, label: 'Hair Type' },
    { num: 3 as const, label: 'Your Style' },
    { num: 4 as const, label: 'Best Match' },
  ];

  return (
    <section
      id="consultation"
      className="py-20 sm:py-28 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <p className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.26em] text-[#9A7848] dark:text-[#C5A059]">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>3-Step Personal Haircut Guide</span>
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight text-balance">
            Find Your Look Style Finder
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
            Samajh nahi aa raha kaunsa haircut aap par sabse best lagega? Bas apna face shape, baalon ka texture aur daily look chunein — hum batayenge aapke liye perfect style.
          </p>
        </div>

        {/* Interactive Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          {steps.map((item) => {
            const isCurrent = step === item.num;
            const isCompleted = step > item.num;
            return (
              <div key={item.num} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(item.num)}
                  className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-full"
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                      isCurrent
                        ? 'bg-[#141413] dark:bg-[#C5A059] text-[#F4F1EA] dark:text-[#070709]'
                        : isCompleted
                        ? 'bg-[#9A7848] dark:bg-[#C5A059]/25 text-white dark:text-[#C5A059] border border-[#9A7848] dark:border-[#C5A059]/40'
                        : 'bg-[#EBE6DC] dark:bg-[#121214] text-[#57534E] dark:text-[#A1A1AA] border border-stone-900/10 dark:border-white/10'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : item.num}
                  </span>
                  <span className="hidden sm:inline text-xs font-semibold text-[#141413] dark:text-[#F4F1EA] whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
                {item.num < 4 && (
                  <div className="w-4 sm:w-8 h-[1px] bg-stone-900/15 dark:bg-white/10" />
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Surface */}
        <div className="rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/15 p-6 sm:p-10 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                  <UserCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Step 01 / 03 · Chehre Ki Banawat</span>
                </p>
                <h3 className="font-display text-2xl font-bold text-[#141413] dark:text-[#F4F1EA] mt-1">
                  Aapka face shape kaisa hai?
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] mt-1">
                  Aaine mein dekh kar chunein aapka chehra inmein se kis shape ke sabse kareeb hai, taaki side fade aur top baalon ka balance ekdum sahi baithe.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {QUIZ_QUESTIONS.faceShapes.map((opt) => {
                  const selected = selectedFace === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedFace(opt.id)}
                      aria-pressed={selected}
                      className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#9A7848] dark:border-[#C5A059] bg-[#F4F1EA] dark:bg-[#18181B]'
                          : 'border-stone-900/10 dark:border-white/10 bg-[#F4F1EA]/55 dark:bg-[#0B0B0C]/60 hover:border-stone-900/25 dark:hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#141413] dark:text-[#F4F1EA]">
                          {opt.label}
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            selected
                              ? 'border-[#9A7848] dark:border-[#C5A059] bg-[#9A7848] dark:bg-[#C5A059]'
                              : 'border-stone-400 dark:border-zinc-600'
                          }`}
                        >
                          {selected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="button" onClick={() => setStep(2)} className="uppercase text-xs tracking-wider">
                  <span>Aage Badhein: Hair Texture</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                  <Scissors className="w-3.5 h-3.5 shrink-0" />
                  <span>Step 02 / 03 · Baalon Ka Texture</span>
                </p>
                <h3 className="font-display text-2xl font-bold text-[#141413] dark:text-[#F4F1EA] mt-1">
                  Apne baalon ka texture chunein
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] mt-1">
                  Aapke kudrati baal kaise hain? Isse sahi scissor layering ya clipper fade chunne mein madad milti hai.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {QUIZ_QUESTIONS.hairTypes.map((opt) => {
                  const selected = selectedHair === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedHair(opt.id)}
                      aria-pressed={selected}
                      className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#9A7848] dark:border-[#C5A059] bg-[#F4F1EA] dark:bg-[#18181B]'
                          : 'border-stone-900/10 dark:border-white/10 bg-[#F4F1EA]/55 dark:bg-[#0B0B0C]/60 hover:border-stone-900/25 dark:hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#141413] dark:text-[#F4F1EA]">
                          {opt.label}
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            selected
                              ? 'border-[#9A7848] dark:border-[#C5A059] bg-[#9A7848] dark:bg-[#C5A059]'
                              : 'border-stone-400 dark:border-zinc-600'
                          }`}
                        >
                          {selected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Peeche Jaayein</span>
                </Button>
                <Button type="button" onClick={() => setStep(3)} className="uppercase text-xs tracking-wider">
                  <span>Aage Badhein: Daily Look</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Step 03 / 03 · Aapka Pasandida Style</span>
                </p>
                <h3 className="font-display text-2xl font-bold text-[#141413] dark:text-[#F4F1EA] mt-1">
                  Rozana kaisa look chahiye?
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] mt-1">
                  Apne school, college, office ya weekend routine ke hisaab se apna pasandida look chunein.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {QUIZ_QUESTIONS.vibes.map((opt) => {
                  const selected = selectedVibe === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedVibe(opt.id)}
                      aria-pressed={selected}
                      className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#9A7848] dark:border-[#C5A059] bg-[#F4F1EA] dark:bg-[#18181B]'
                          : 'border-stone-900/10 dark:border-white/10 bg-[#F4F1EA]/55 dark:bg-[#0B0B0C]/60 hover:border-stone-900/25 dark:hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#141413] dark:text-[#F4F1EA]">
                          {opt.label}
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            selected
                              ? 'border-[#9A7848] dark:border-[#C5A059] bg-[#9A7848] dark:bg-[#C5A059]'
                              : 'border-stone-400 dark:border-zinc-600'
                          }`}
                        >
                          {selected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Peeche Jaayein</span>
                </Button>
                <Button type="button" onClick={() => setStep(4)} className="uppercase text-xs tracking-wider">
                  <span>Apna Best Look Dekhein</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-900/10 dark:border-white/10">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A7848] dark:text-[#C5A059]">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Aapke Liye Recommended Style</span>
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#141413] dark:text-[#F4F1EA] mt-1">
                    {recommendation.title}
                  </h3>
                </div>

                <Button type="button" variant="ghost" size="sm" onClick={handleReset} className="self-start sm:self-auto">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Dobara Chunein</span>
                </Button>
              </div>

              {/* Unboxed Profile Summary */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] dark:text-[#A1A1AA]">
                <span>Chehra: <strong className="text-[#141413] dark:text-[#F4F1EA]">{faceLabel}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Baal: <strong className="text-[#141413] dark:text-[#F4F1EA]">{hairLabel}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Pasand: <strong className="text-[#141413] dark:text-[#F4F1EA]">{vibeLabel}</strong></span>
              </div>

              {/* Clean Hairline Details */}
              <div className="divide-y divide-stone-900/10 dark:divide-white/10 border-y border-stone-900/10 dark:border-white/10">
                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <span className="sm:col-span-4 text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                    Side Fade Aur Cut
                  </span>
                  <p className="sm:col-span-8 text-sm font-medium text-[#141413] dark:text-[#F4F1EA]">
                    {recommendation.fadeType}
                  </p>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <span className="sm:col-span-4 text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                    Beard Aur Jawline Salah
                  </span>
                  <p className="sm:col-span-8 text-sm font-medium text-[#141413] dark:text-[#F4F1EA]">
                    {recommendation.beardAdvice}
                  </p>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <span className="sm:col-span-4 text-xs font-bold uppercase tracking-wider text-[#9A7848] dark:text-[#C5A059]">
                    Daily Styling Tip
                  </span>
                  <p className="sm:col-span-8 text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                    {recommendation.stylingTip}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <p className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                  Starts from ₹100 · Negotiable at Shivangi Hair Salon
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {onOpenBooking && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenBooking(`Quiz style: ${recommendation.title}`)}
                      className="uppercase text-xs tracking-wider"
                    >
                      <CalendarCheck className="w-4 h-4 shrink-0" />
                      <span>Pick Date &amp; Time</span>
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="whatsapp"
                    onClick={handleBookLookOnWhatsApp}
                    className="uppercase text-xs tracking-wider"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                    <span>Book Look on WhatsApp</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
