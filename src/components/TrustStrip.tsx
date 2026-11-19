import { Clock, ShieldCheck, Sparkles, Star } from 'lucide-react';

export default function TrustStrip() {
  const pillars = [
    {
      icon: Star,
      metric: '150+',
      label: 'Verified Bhopal Customers',
      sub: 'Trusted local regular clients',
    },
    {
      icon: ShieldCheck,
      metric: 'UV-Clean',
      label: 'Sanitized Scissors & Clippers',
      sub: 'Disinfected after every seat',
    },
    {
      icon: Sparkles,
      metric: '100%',
      label: 'Fresh Sealed Blades',
      sub: 'Unpacked right in front of you',
    },
    {
      icon: Clock,
      metric: '8:30–9:30',
      label: 'Walk-ins & Priority Slots',
      sub: 'Wed–Mon (Closed Tuesdays)',
    },
  ];

  return (
    <section
      aria-label="Salon Trust Signals"
      className="bg-[#EBE6DC]/95 dark:bg-[#0D0D10]/95 border-b border-stone-900/10 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-stone-900/10 dark:lg:divide-white/10">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="lg:px-6 first:lg:pl-0 last:lg:pr-0 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0 stroke-[1.75]" />
                  <p className="font-mono text-base sm:text-lg font-bold text-[#9A7848] dark:text-[#C5A059] tabular-nums">
                    {item.metric}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#141413] dark:text-[#F4F1EA]">
                  {item.label}
                </p>
                <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
