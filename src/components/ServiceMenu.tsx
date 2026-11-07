import { useState } from 'react';
import { Clock, MessageSquare, Check, Plus, Minus } from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { ServiceItem } from '../types';
import { createWhatsAppUrl, openExternalUrl } from '../utils/booking';

interface ServiceMenuProps {
  onSelectServiceModal?: (serviceId: string) => void;
}

export default function ServiceMenu({}: ServiceMenuProps) {
  const [activeCategory, setActiveCategory] = useState<'hair' | 'beard' | 'spa'>('hair');
  const [selectedIds, setSelectedIds] = useState<string[]>(['sig-cut']);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const categories: { id: 'hair' | 'beard' | 'spa'; label: string }[] = [
    { id: 'hair', label: 'Hair Architecture' },
    { id: 'beard', label: 'Beard Craft' },
    { id: 'spa', label: 'Spa Rituals' },
  ];

  const currentServices = SERVICES.filter((s) => s.category === activeCategory);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBookSingleOnWhatsApp = (service: ServiceItem) => {
    const msg = [
      `*APPOINTMENT INQUIRY - SHIVANGI HAIR SALON*`,
      `Hello Master Barber, I would like to book the following service at your Bhopal studio:`,
      `💈 *Service:* ${service.name} (${service.durationMinutes} Mins)`,
      `💰 *Starting Investment:* ₹${service.priceMin}`,
      `📍 *Studio:* Bhensakhedi Road, near The Fitness Planet`,
      `Please let me know current chair availability.`
    ].join('\n');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  const selectedItems = SERVICES.filter((s) => selectedIds.includes(s.id));
  const totalDuration = selectedItems.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalInvestment = selectedItems.reduce((acc, s) => acc + s.priceMin, 0);

  const handleBookSelectionOnWhatsApp = () => {
    if (selectedItems.length === 0) return;
    const itemsList = selectedItems
      .map((s) => `• ${s.name} (${s.durationMinutes} mins · ₹${s.priceMin})`)
      .join('\n');
    const msg = [
      `*CUSTOM GROOMING PACKAGE - SHIVANGI HAIR SALON*`,
      `Hello Master Barber, I configured my tailored grooming package:`,
      itemsList,
      ``,
      `⏱️ *Total Estimated Duration:* ~${totalDuration} Mins`,
      `💰 *Estimated Starting Investment:* ₹${totalInvestment}`,
      `📍 *Studio:* Bhensakhedi Road, Bhopal`,
      `Kindly confirm availability for this package.`
    ].join('\n');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  return (
    <section 
      id="services" 
      className="py-20 sm:py-28 bg-[#F5F1E8] dark:bg-[#121212] border-b border-[#E2DACB] dark:border-neutral-900 scroll-mt-20 transition-colors duration-250"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B8973E] dark:bg-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B8973E] dark:text-[#D4AF37]">
                Transparent Architecture
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#141414] dark:text-white tracking-tight">
              Service Menu
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4742] dark:text-neutral-300 max-w-xl">
              Unhurried precision sessions. Every appointment includes sterile single-use instrumentation, cranial analysis, and hot-towel preparation.
            </p>
          </div>

          {/* Category Tabs: Hair Architecture, Beard Craft, Spa Rituals */}
          <div className="flex p-1.5 rounded-2xl bg-white/70 dark:bg-[#1C1C20] border border-[#D5C9B3] dark:border-neutral-800 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#141414] dark:bg-white text-white dark:text-black shadow-sm'
                    : 'text-[#635E54] dark:text-neutral-400 hover:text-[#141414] dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stark, Clean Table / Minimalist List Layout */}
        <div className="rounded-2xl border border-[#D5C9B3] dark:border-neutral-800 bg-white/60 dark:bg-[#161619] overflow-hidden shadow-sm">
          
          {/* Table Header Row (Desktop) */}
          <div className="hidden md:grid md:grid-cols-12 px-6 py-4 border-b border-[#E2DACB] dark:border-neutral-800 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6D23] dark:text-[#D4AF37] bg-[#EDE6D8]/50 dark:bg-[#101012]">
            <div className="col-span-6">Service & Craft Details</div>
            <div className="col-span-2 text-center">Duration</div>
            <div className="col-span-2 text-right">Starting Investment</div>
            <div className="col-span-2 text-right">Reserve (WhatsApp)</div>
          </div>

          {/* Service Rows */}
          <div className="divide-y divide-[#E2DACB] dark:divide-neutral-800">
            {currentServices.map((service) => {
              const isSelected = selectedIds.includes(service.id);
              const isExpanded = expandedDetailsId === service.id;

              return (
                <div
                  key={service.id}
                  className={`p-5 sm:p-6 transition-colors duration-200 ${
                    isSelected
                      ? 'bg-[#25D366]/5 dark:bg-[#25D366]/10'
                      : 'hover:bg-white/90 dark:hover:bg-[#1A1A1E]'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Col 1: Service Name, Tag, Short Description (6 cols) */}
                    <div className="md:col-span-6 space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => toggleSelect(service.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                            isSelected
                              ? 'bg-[#25D366] border-[#25D366] text-white'
                              : 'border-[#A39B8C] dark:border-neutral-600 bg-transparent'
                          }`}
                          aria-label={`Select ${service.name} for calculation`}
                          title="Include in Session Calculator"
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <h3 className="font-display text-base sm:text-lg font-bold text-[#141414] dark:text-white">
                          {service.name}
                        </h3>

                        {service.popular && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF4E6] dark:bg-amber-500/10 text-[#8C6D23] dark:text-amber-300 border border-[#E0D2B4] dark:border-amber-500/30">
                            Studio Signature
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#4A4742] dark:text-neutral-300 leading-relaxed pl-7">
                        {service.shortDesc}
                      </p>

                      {/* Expand Inclusions toggle */}
                      <button
                        type="button"
                        onClick={() => setExpandedDetailsId(isExpanded ? null : service.id)}
                        className="text-[11px] font-semibold text-[#8C6D23] dark:text-[#D4AF37] hover:underline pl-7 cursor-pointer inline-flex items-center gap-1 pt-1"
                      >
                        <span>{isExpanded ? 'Hide Inclusions' : 'View Inclusions'}</span>
                        {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 pl-7 pt-2 border-t border-[#E2DACB]/60 dark:border-neutral-800">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#4A4742] dark:text-neutral-300">
                            {service.inclusions.map((inc, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#25D366] font-bold">✓</span>
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Col 2: Duration (2 cols) */}
                    <div className="md:col-span-2 flex md:justify-center items-center gap-1.5 text-xs text-[#635E54] dark:text-neutral-400 pl-7 md:pl-0">
                      <Clock className="w-3.5 h-3.5 text-[#B8973E] dark:text-[#D4AF37]" />
                      <span className="font-mono font-medium">{service.durationMinutes} Mins</span>
                    </div>

                    {/* Col 3: Price (2 cols) */}
                    <div className="md:col-span-2 flex md:justify-end items-baseline gap-1 pl-7 md:pl-0">
                      <span className="md:hidden text-[11px] uppercase tracking-wider text-[#635E54] dark:text-neutral-400 mr-2">
                        Investment:
                      </span>
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#141414] dark:text-white">
                        ₹{service.priceMin}
                      </span>
                      {service.priceMax > service.priceMin && (
                        <span className="text-xs text-[#635E54] dark:text-neutral-400 font-mono">
                          – ₹{service.priceMax}
                        </span>
                      )}
                    </div>

                    {/* Col 4: Perfectly Circular Green WhatsApp Action (2 cols) */}
                    <div className="md:col-span-2 flex justify-end items-center pl-7 md:pl-0">
                      <button
                        type="button"
                        onClick={() => handleBookSingleOnWhatsApp(service)}
                        className="cta-circle w-12 h-12 bg-[#25D366] text-white hover:bg-[#20BA59] shadow-md cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
                        aria-label={`Book ${service.name} on WhatsApp`}
                        title={`Book ${service.name} via WhatsApp`}
                      >
                        {/* Strictly icon-only inside the circle, zero text */}
                        <MessageSquare className="w-5 h-5 text-white fill-white/20" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Minimalist Session Calculator Strip */}
        <div className="mt-8 rounded-2xl bg-white/80 dark:bg-[#161619] border border-[#D5C9B3] dark:border-neutral-800 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8973E] dark:text-[#D4AF37]">
              Interactive Session Calculator
            </span>
            <p className="font-display text-sm sm:text-base font-bold text-[#141414] dark:text-white">
              {selectedItems.length} Ritual{selectedItems.length === 1 ? '' : 's'} Selected
            </p>
            <p className="text-[11px] text-[#635E54] dark:text-neutral-400 max-w-md">
              {selectedItems.map((s) => s.name).join(' + ') || 'Check ritual boxes above to combine custom session.'}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-[#635E54] dark:text-neutral-400 uppercase tracking-wider block font-semibold">
                Est. Duration
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#141414] dark:text-white">
                ~{totalDuration} Mins
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#635E54] dark:text-neutral-400 uppercase tracking-wider block font-semibold">
                Starting Total
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-[#25D366]">
                ₹{totalInvestment}
              </span>
            </div>

            {/* Circular Green WhatsApp CTA for selection */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBookSelectionOnWhatsApp}
                disabled={selectedItems.length === 0}
                className="cta-circle w-12 h-12 bg-[#25D366] text-white shadow-lg hover:bg-[#20BA59] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
                aria-label="Send custom selection to WhatsApp"
                title="Book Custom Selection on WhatsApp"
              >
                <MessageSquare className="w-5 h-5 text-white fill-white/20" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
