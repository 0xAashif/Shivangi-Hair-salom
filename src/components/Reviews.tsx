import { Award, Star, CheckCircle, ShieldCheck, Sparkles, Droplets } from 'lucide-react';
import { REVIEWS } from '../data/salonData';

export default function Reviews() {
  const hygieneSteps = [
    {
      index: '01',
      icon: ShieldCheck,
      title: 'UV-Cleaned Scissors & Clippers',
      detail:
        'Every scissor, clipper blade, and comb is deep-cleaned in a professional UV sanitizer cabinet after every single customer.',
    },
    {
      index: '02',
      icon: Sparkles,
      title: '100% Fresh Sealed Blade',
      detail:
        'We never reuse blades. A brand-new single-use blade is opened right in front of your eyes before any shave or beard line-up.',
    },
    {
      index: '03',
      icon: Droplets,
      title: 'Fresh Towels & Neck Strips',
      detail:
        'Fresh steamed towels and clean disposable neck strips are used for every chair for a comfortable, hygienic finish.',
    },
  ];

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-transparent border-b border-stone-900/10 dark:border-white/10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        {/* 1. Hygiene Promise (Architectural 3-Column Divider Grid, Zero Nested Cards) */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.26em] text-[#9A7848] dark:text-[#C5A059]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>100% Safe &amp; Hygienic Grooming</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight text-balance">
              Clean Tools &amp; Fresh Blades for Every Customer
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA]">
              Your skin safety comes first. Every tool is sanitized before it touches your hair or beard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-stone-900/10 dark:border-white/10 divide-y md:divide-y-0 md:divide-x divide-stone-900/10 dark:divide-white/10">
            {hygieneSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.index} className="py-6 md:px-6 first:md:pl-0 last:md:pr-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#9A7848] dark:text-[#C5A059] tabular-nums">
                      {step.index}.
                    </span>
                    <Icon className="w-4 h-4 stroke-[1.75] text-[#9A7848] dark:text-[#C5A059]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#141413] dark:text-[#F4F1EA]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Customer Reviews */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.26em] text-[#9A7848] dark:text-[#C5A059]">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>Real Customer Feedback</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141413] dark:text-[#F4F1EA] tracking-tight">
                What Bhopal Customers Say
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A1A1AA] max-w-xl">
                Trusted by 150+ Verified Bhopal Customers who visit Shivangi Hair Salon for their regular haircuts and beard styling.
              </p>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="inline-flex items-center gap-1.5 font-mono text-lg font-bold text-[#9A7848] dark:text-[#C5A059] tabular-nums">
                <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059] shrink-0" />
                <span>5.0 / 5.0 · 150+</span>
              </p>
              <p className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                Verified Bhopal Regulars
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev) => (
              <article
                key={rev.id}
                className="rounded-2xl bg-[#EBE6DC] dark:bg-[#121214] border border-stone-900/10 dark:border-white/15 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F4F1EA] dark:bg-[#18181B] text-[#141413] dark:text-[#C5A059] font-bold font-display flex items-center justify-center border border-stone-900/10 dark:border-white/10 shrink-0">
                        {rev.clientName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-[#141413] dark:text-[#F4F1EA]">
                          {rev.clientName}
                        </h3>
                        <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA] flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                          <span>{rev.badge}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0" aria-label={`${rev.rating} out of 5 stars`}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-[#141413]/90 dark:text-[#F4F1EA]/90 leading-relaxed">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-900/10 dark:border-white/10 flex items-center justify-between gap-2 text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                  <span className="font-medium text-[#9A7848] dark:text-[#C5A059]">
                    {rev.serviceDone}
                  </span>
                  <span className="shrink-0">{rev.reviewDate}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
