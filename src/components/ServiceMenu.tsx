import { useState } from 'react';
import { Clock, Check, Plus, Minus, CalendarCheck, Scissors, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { MACRO_VIDEOS } from '../config/videos';
import { buildHinglishWhatsAppMessage, createWhatsAppUrl, openExternalUrl } from '../utils/booking';
import MacroVideo from './MacroVideo';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

interface ServiceMenuProps {
  onSelectServiceModal: (serviceIds: string | string[]) => void;
}

export default function ServiceMenu({ onSelectServiceModal }: ServiceMenuProps) {
  const [activeCategory, setActiveCategory] = useState<'hair' | 'beard' | 'spa'>('hair');
  const [selectedIds, setSelectedIds] = useState<string[]>(['sig-cut']);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const categories: { id: 'hair' | 'beard' | 'spa'; label: string }[] = [
    { id: 'hair', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard Trimming' },
    { id: 'spa', label: 'Scalp & Facial Care' },
  ];

  const currentServices = SERVICES.filter((s) => s.category === activeCategory);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedItems = SERVICES.filter((s) => selectedIds.includes(s.id));
  const totalDuration = selectedItems.reduce((acc, s) => acc + s.durationMinutes, 0);

  const handleBookSelectionOnWhatsApp = () => {
    if (selectedItems.length === 0) return;
    const combinedNames = selectedItems.map((s) => s.name).join(' + ');
    const msg = buildHinglishWhatsAppMessage(combinedNames);
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, msg);
    openExternalUrl(url);
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#070709] text-[#F4F1EA] border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      <MacroVideo
        asset={MACRO_VIDEOS.serviceMenu}
        lazy={true}
        className="w-full h-full object-cover object-center brightness-[0.82] opacity-40"
        overlayClassName="bg-gradient-to-b from-[#070709]/84 via-[#070709]/60 to-[#070709]/88"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-[radial-gradient(circle,rgba(197,160,89,0.14)_0%,transparent_70%)] z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header + Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <Scissors className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                Service Menu
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F4F1EA] tracking-tight text-balance">
              Haircut, Beard & Grooming Menu
            </h2>
            <p className="text-xs sm:text-sm text-[#D6D1C7] max-w-xl leading-relaxed">
              <strong className="text-[#C5A059]">Starts from ₹100 · Negotiable based on style &amp; hair length.</strong> Every appointment includes a face-shape style check, UV-cleaned tools, a 100% fresh sealed blade, and warm towel prep.
            </p>
          </div>

          <Tabs
            value={activeCategory}
            onValueChange={(val) => setActiveCategory(val as 'hair' | 'beard' | 'spa')}
            className="shrink-0 w-full sm:w-auto"
          >
            <TabsList className="bg-[#121214]/95 border-white/15 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-center">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="text-[#B8B2A6] hover:text-[#F4F1EA] data-[state=active]:bg-[#F4F1EA] data-[state=active]:text-[#070709]"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Clean Hairline Service List */}
        <div className="rounded-2xl border border-white/15 bg-[#101013]/88 backdrop-blur-md divide-y divide-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="hidden md:grid md:grid-cols-12 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
            <div className="col-span-5">Service</div>
            <div className="col-span-2 text-center">Duration</div>
            <div className="col-span-3 text-right">Tariff</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {currentServices.map((service) => {
            const isSelected = selectedIds.includes(service.id);
            const isExpanded = expandedDetailsId === service.id;

            return (
              <div
                key={service.id}
                className={`p-5 sm:p-6 transition-colors ${
                  isSelected ? 'bg-[#171510]/85' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Col 1: Selection & Title */}
                  <div className="md:col-span-5 space-y-1.5">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleSelect(service.id)}
                        className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                          isSelected
                            ? 'bg-[#C5A059] border-[#C5A059] text-[#070709]'
                            : 'border-white/30 bg-transparent hover:border-white/60'
                        }`}
                        aria-label={`Select ${service.name} for session`}
                        aria-pressed={isSelected}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <h3 className="font-display text-base sm:text-lg font-bold text-[#F4F1EA]">
                            {service.name}
                          </h3>
                          {service.popular && (
                            <span className="text-[11px] font-medium text-[#C5A059]">
                              · Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#B8B2A6] leading-relaxed">
                          {service.shortDesc}
                        </p>

                        <button
                          type="button"
                          onClick={() => setExpandedDetailsId(isExpanded ? null : service.id)}
                          aria-expanded={isExpanded}
                          className="text-xs font-medium text-[#C5A059] hover:underline cursor-pointer inline-flex items-center gap-1 pt-1"
                        >
                          <span>{isExpanded ? 'Hide What’s Included' : 'See What’s Included'}</span>
                          {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 ml-8 pt-3 border-t border-white/10">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#D6D1C7]">
                          {service.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5 stroke-[2]" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Col 2: Duration */}
                  <div className="md:col-span-2 flex md:justify-center items-center gap-1.5 text-xs text-[#C2BCB0] pl-8 md:pl-0">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059] stroke-[1.5]" />
                    <span className="font-mono tabular-nums">{service.durationMinutes} min</span>
                  </div>

                  {/* Col 3: Clean Unboxed Pricing */}
                  <div className="md:col-span-3 flex md:justify-end items-center pl-8 md:pl-0">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#F4F1EA] tabular-nums">
                      Starts from ₹100 · Negotiable
                    </span>
                  </div>

                  {/* Col 4: Clear Single-Line Action */}
                  <div className="md:col-span-2 flex md:justify-end items-center pl-8 md:pl-0">
                    <Button
                      type="button"
                      variant="brass"
                      size="sm"
                      onClick={() => onSelectServiceModal(service.id)}
                      className="uppercase text-[11px] tracking-wider"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Session Planner Summary */}
        <div className="mt-6 rounded-2xl bg-[#121214]/95 border border-white/15 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Your Session Plan</span>
            </span>
            <p className="font-display text-base sm:text-lg font-bold text-[#F4F1EA] tabular-nums">
              {selectedItems.length} Service{selectedItems.length === 1 ? '' : 's'} Selected · ~{totalDuration} min · Starts from ₹100
            </p>
            <p className="text-xs text-[#B8B2A6] max-w-xl">
              {selectedItems.map((s) => s.name).join(' + ') || 'Select one or more services above to build your session.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              disabled={selectedItems.length === 0}
              onClick={() => onSelectServiceModal(selectedIds)}
              className="border-white/20 text-[#F4F1EA] hover:bg-white/10 uppercase text-xs tracking-wider"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              <span>Schedule Slot</span>
            </Button>

            <Button
              type="button"
              variant="whatsapp"
              disabled={selectedItems.length === 0}
              onClick={handleBookSelectionOnWhatsApp}
              className="uppercase text-xs tracking-wider"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>WhatsApp Now</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
