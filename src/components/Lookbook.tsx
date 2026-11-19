import { useState } from 'react';
import { Expand, ArrowRight, Camera } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './BrandIcons';
import { LOOKBOOK_ITEMS, SALON_INFO } from '../data/salonData';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface LookbookProps {
  onSelectStyle: (styleName: string) => void;
}

export default function Lookbook({ onSelectStyle }: LookbookProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Skin Fade');
  const [previewItem, setPreviewItem] = useState<{ image: string; title: string; desc: string } | null>(null);

  const categories = ['Skin Fade', 'Beard Detailing', 'Hot Towel Shave', 'Salon', 'All'];

  const filteredItems =
    activeCategory === 'All'
      ? LOOKBOOK_ITEMS
      : LOOKBOOK_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-28 bg-[#070709] text-[#F4F1EA] border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      {/* Warm Illuminated Salon Interior Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <img
          src="/interior_luxury.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.34] contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/82 via-[#070709]/58 to-[#070709]/88" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[340px] bg-[radial-gradient(circle,rgba(197,160,89,0.14)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <Camera className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#C5A059]">
                Real Salon Work &amp; Gallery
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F4F1EA] tracking-tight text-balance">
              Precision Cuts &amp; Razor Detailing
            </h2>
            <p className="text-xs sm:text-sm text-[#D6D1C7] max-w-xl leading-relaxed">
              Explore our Kids School Fades, College Teen Textured Crops, Young Man Skin Fades &amp; Beard Line-Ups, and Senior Classic Scissor Cuts in Bhopal.
            </p>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="shrink-0 w-full sm:w-auto">
            <TabsList className="bg-[#121214]/95 border-white/15 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-center">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-[#B8B2A6] hover:text-[#F4F1EA] data-[state=active]:bg-[#F4F1EA] data-[state=active]:text-[#070709]"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Clean Gallery Grid (Zero pill badges on photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between transition-colors hover:border-[#C5A059]/45"
            >
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0B0B0C]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full ${item.imageClassName || 'object-cover object-center'} group-hover:scale-[1.03] transition-transform duration-300`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/70 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={() => setPreviewItem({ image: item.image, title: item.title, desc: item.desc })}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/75 border border-white/20 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  aria-label={`Inspect photo of ${item.title}`}
                  title="Full View"
                >
                  <Expand className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-[#C5A059]">
                    {item.category} · {item.locationTag}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#F4F1EA]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B8B2A6] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectStyle(item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:text-[#E2C27D] cursor-pointer transition-colors"
                  >
                    <span>Request This Cut</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Social Spotlight */}
        <div className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl font-bold text-[#F4F1EA]">
              Daily Haircut Reels &amp; Customer Makeovers
            </h3>
            <p className="text-xs sm:text-sm text-[#B8B2A6]">
              Follow @shivangihairsalon.in for fresh Bhopal fades and grooming transformations.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={SALON_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-circle bg-[#1877F2] hover:bg-[#166fe5] text-white"
              aria-label="Follow Shivangi Hair Salon on Facebook"
              title="Facebook"
            >
              <FacebookIcon className="w-5 h-5 text-white" />
            </a>
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-circle bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white"
              aria-label="Follow Shivangi Hair Salon on Instagram"
              title="Instagram"
            >
              <InstagramIcon className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Radix Dialog Lightbox */}
      <Dialog open={Boolean(previewItem)} onOpenChange={(open) => !open && setPreviewItem(null)}>
        <DialogContent className="max-w-3xl bg-[#0B0B0C] text-[#F4F1EA] border-white/15 p-4 sm:p-6">
          {previewItem && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl text-[#F4F1EA]">{previewItem.title}</DialogTitle>
                <DialogDescription className="text-[#B8B2A6]">{previewItem.desc}</DialogDescription>
              </DialogHeader>
              <div className="rounded-xl overflow-hidden bg-black border border-white/10">
                <img
                  src={previewItem.image}
                  alt={previewItem.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
