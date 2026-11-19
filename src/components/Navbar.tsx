import { useState } from 'react';
import { ClipboardList, MapPin, Menu, Moon, Scissors, Sparkles, Sun } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Showcase', end: true, icon: Sparkles },
  { to: '/craftsman', label: 'Craftsman', end: false, icon: Scissors },
  { to: '/menu', label: 'Menu', end: false, icon: ClipboardList },
  { to: '/salon', label: 'Salon', end: false, icon: MapPin },
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F1EA]/92 dark:bg-[#070709]/92 backdrop-blur-md border-b border-stone-900/10 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-lg shrink-0"
          aria-label="Shivangi Hair Salon Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black shrink-0 border border-stone-900/10 dark:border-white/15">
            <img
              src="/logo.jpg"
              alt="Shivangi Hair Salon Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display text-sm sm:text-base font-bold tracking-wider text-[#141413] dark:text-[#F4F1EA] whitespace-nowrap">
            Shivangi Hair Salon
          </span>
        </Link>

        {/* Zone 2: Clean single-line navigation links (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-semibold uppercase tracking-[0.18em]"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative py-2 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#141413] dark:text-[#F4F1EA] after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0.5 after:h-[1.5px] after:bg-[#9A7848] dark:after:bg-[#C5A059]'
                      : 'text-[#57534E] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F1EA]'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059] shrink-0 stroke-[1.75]" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + compact theme switch (Desktop) / Sheet Menu (Mobile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-stone-900/5 dark:bg-white/10 hover:bg-stone-900/10 dark:hover:bg-white/15 text-[#141413] dark:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 stroke-[1.75]" />
            ) : (
              <Sun className="w-4 h-4 stroke-[1.75]" />
            )}
          </button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex uppercase text-[11px] tracking-[0.16em]"
          >
            Book Chair
          </Button>

          {/* Mobile Drawer Menu (keeps mobile sticky header <= 64px) */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-stone-900/5 dark:bg-white/10 text-[#141413] dark:text-[#F4F1EA] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent aria-label="Mobile Navigation Drawer">
              <div className="space-y-8 pt-6">
                <div className="space-y-1 border-b border-stone-900/10 dark:border-white/10 pb-4">
                  <p className="font-display text-lg font-bold">Shivangi Hair Salon</p>
                  <p className="text-xs text-[#57534E] dark:text-[#A1A1AA]">
                    Near Fitness Planet, Bhensakhedi Road, Bhopal
                  </p>
                </div>

                <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `min-h-[44px] px-3 rounded-xl flex items-center gap-3 text-sm font-semibold tracking-wide transition-colors ${
                            isActive
                              ? 'bg-[#EBE6DC] dark:bg-[#18181B] text-[#9A7848] dark:text-[#C5A059]'
                              : 'text-[#141413] dark:text-[#F4F1EA] hover:bg-stone-900/5 dark:hover:bg-white/5'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 text-[#9A7848] dark:text-[#C5A059] shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 border-t border-stone-900/10 dark:border-white/10 pt-5">
                <Button
                  type="button"
                  variant="whatsapp"
                  className="w-full uppercase text-xs tracking-wider"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenBooking();
                  }}
                >
                  Book Chair Now
                </Button>
                <p className="text-[11px] text-center text-[#57534E] dark:text-[#A1A1AA]">
                  Starts from ₹100 · Negotiable
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
