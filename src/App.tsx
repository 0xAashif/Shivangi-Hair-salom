import { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Craftsmanship from './components/Craftsmanship';
import ServiceMenu from './components/ServiceMenu';
import ConsultationQuiz from './components/ConsultationQuiz';
import Lookbook from './components/Lookbook';
import Reviews from './components/Reviews';
import LocationHub from './components/LocationHub';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingSideCTA from './components/FloatingSideCTA';
import { SALON_INFO } from './data/salonData';
import { buildHinglishWhatsAppMessage, createWhatsAppUrl, openExternalUrl } from './utils/booking';

function PageTransition({ children }: { children: ReactNode }) {
  return <div className="bg-transparent">{children}</div>;
}

interface AppContentProps {
  onOpenBooking: (serviceIds?: string | string[], note?: string) => void;
  onOpenWhatsAppDirect: () => void;
  onSelectLookbookStyle: (styleTitle: string) => void;
}

function AppRoutes({
  onOpenBooking,
  onOpenWhatsAppDirect,
  onSelectLookbookStyle,
}: AppContentProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-transparent text-[#141413] dark:text-[#F4F1EA] flex flex-col selection:bg-[#C5A059] selection:text-[#070709]">
      <AnimatedBackground />

      <Navbar onOpenBooking={() => onOpenBooking()} />

      <main className="flex-1 bg-transparent">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Hero onOpenBooking={() => onOpenBooking()} />
                <TrustStrip />
                <Craftsmanship
                  onOpenBooking={() => onOpenBooking('sig-cut', 'Face-Shape Consultation')}
                />
                <ServiceMenu
                  onSelectServiceModal={(serviceIds) => onOpenBooking(serviceIds)}
                />
                <ConsultationQuiz
                  onOpenBooking={(note) => onOpenBooking('sig-cut', note)}
                />
                <Lookbook onSelectStyle={onSelectLookbookStyle} />
                <Reviews />
                <LocationHub onOpenWhatsApp={onOpenWhatsAppDirect} />
              </PageTransition>
            }
          />

          <Route
            path="/craftsman"
            element={
              <PageTransition>
                <Craftsmanship
                  onOpenBooking={() => onOpenBooking('sig-cut', 'Face-Shape Consultation')}
                />
                <TrustStrip />
                <ConsultationQuiz
                  onOpenBooking={(note) => onOpenBooking('sig-cut', note)}
                />
                <Reviews />
              </PageTransition>
            }
          />

          <Route
            path="/menu"
            element={
              <PageTransition>
                <ServiceMenu
                  onSelectServiceModal={(serviceIds) => onOpenBooking(serviceIds)}
                />
                <TrustStrip />
                <ConsultationQuiz
                  onOpenBooking={(note) => onOpenBooking('sig-cut', note)}
                />
              </PageTransition>
            }
          />

          <Route
            path="/salon"
            element={
              <PageTransition>
                <Lookbook onSelectStyle={onSelectLookbookStyle} />
                <Reviews />
                <LocationHub onOpenWhatsApp={onOpenWhatsAppDirect} />
              </PageTransition>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer
        onOpenBooking={() => onOpenBooking()}
        onOpenWhatsApp={onOpenWhatsAppDirect}
      />

      <FloatingSideCTA onOpenWhatsApp={onOpenWhatsAppDirect} />
    </div>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServices, setPreSelectedServices] = useState<string[] | undefined>(undefined);
  const [bookingNote, setBookingNote] = useState<string>('');

  const handleOpenBooking = (serviceIds?: string | string[], note?: string) => {
    if (Array.isArray(serviceIds)) {
      setPreSelectedServices(serviceIds);
    } else if (serviceIds) {
      setPreSelectedServices([serviceIds]);
    } else {
      setPreSelectedServices(undefined);
    }
    setBookingNote(note || '');
    setIsBookingOpen(true);
  };

  const handleOpenWhatsAppDirect = () => {
    const defaultMsg = buildHinglishWhatsAppMessage('Signature Haircut & Skin Fade');
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, defaultMsg);
    openExternalUrl(url);
  };

  const handleSelectLookbookStyle = (styleTitle: string) => {
    handleOpenBooking('sig-cut', `Requested style: ${styleTitle}`);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes
          onOpenBooking={handleOpenBooking}
          onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
          onSelectLookbookStyle={handleSelectLookbookStyle}
        />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preSelectedServiceIds={preSelectedServices}
          initialNote={bookingNote}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
