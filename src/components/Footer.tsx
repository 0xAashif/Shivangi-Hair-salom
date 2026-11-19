import { Phone, MapPin, Github, Linkedin, Sparkles, Scissors, ClipboardList, Star, Clock, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from './BrandIcons';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking?: () => void;
  onOpenWhatsApp: () => void;
}

export default function Footer({ onOpenWhatsApp }: FooterProps) {
  return (
    <footer className="bg-transparent border-t border-stone-900/10 dark:border-white/10 text-[#57534E] dark:text-[#A1A1AA] text-xs pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-stone-900/10 dark:border-white/15 bg-black shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Shivangi Hair Salon Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-[#141413] dark:text-[#F4F1EA]">
                SHIVANGI <span className="gold-gradient-text">HAIR SALON</span>
              </span>
            </div>

            <p className="text-xs text-[#57534E] dark:text-[#A1A1AA] max-w-sm leading-relaxed">
              Bhopal's trusted men's hair &amp; beard salon. Sharp skin fades, clean beard line-ups, and relaxing hot towel shaves with 100% fresh blades.
            </p>

            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] dark:text-[#F4F1EA]">
              <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059] shrink-0" />
              <span>150+ Verified Bhopal Customers · Starts from ₹100</span>
            </p>
          </div>

          {/* Navigation Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="inline-flex items-center gap-2 hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Showcase</span>
                </Link>
              </li>
              <li>
                <Link to="/craftsman" className="inline-flex items-center gap-2 hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  <Scissors className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Craftsman</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="inline-flex items-center gap-2 hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  <ClipboardList className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Service Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/salon" className="inline-flex items-center gap-2 hover:text-[#141413] dark:hover:text-[#F4F1EA] transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                  <span>Salon &amp; Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#141413] dark:text-[#F4F1EA]">
              Direct Channels
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:underline font-semibold font-mono text-[#141413] dark:text-[#F4F1EA]">
                  {SALON_INFO.phone}
                </a>
              </div>
              <p className="inline-flex items-center gap-2 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                <span>
                  Mon, Wed–Sun: 8:30 AM – 9:30 PM{' '}
                  <span className="text-[#9A7848] dark:text-[#C5A059] font-semibold">(Tuesday Closed)</span>
                </span>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="cta-circle btn-call shadow-sm"
                aria-label={`Call salon at ${SALON_INFO.phone}`}
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
                aria-label="Visit Instagram @shivangihairsalon.in"
                title="Instagram"
              >
                <InstagramIcon className="w-5 h-5 text-white shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Attribution */}
        <div className="pt-8 border-t border-stone-900/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-[11px]">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Shivangi Hair Salon. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Code2 className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
            <span>
              Developed by{' '}
              <a
                href={SALON_INFO.developer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#141413] dark:text-[#F4F1EA] hover:text-[#9A7848] dark:hover:text-[#C5A059] underline underline-offset-4 transition-colors"
              >
                {SALON_INFO.developer.name}
              </a>
            </span>
            <span className="inline-flex items-center gap-1 pl-2 border-l border-stone-900/15 dark:border-white/15">
              <a
                href={SALON_INFO.developer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aashif Khan GitHub Profile"
                className="p-1.5 rounded-md hover:bg-stone-900/5 dark:hover:bg-white/10 text-[#141413] dark:text-[#F4F1EA] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={SALON_INFO.developer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aashif Khan LinkedIn Profile"
                className="p-1.5 rounded-md hover:bg-stone-900/5 dark:hover:bg-white/10 text-[#141413] dark:text-[#F4F1EA] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </span>
          </div>

          <p className="text-center md:text-right">
            Near Fitness Planet, Bhensakhedi Road, Bhopal
          </p>
        </div>
      </div>
    </footer>
  );
}
