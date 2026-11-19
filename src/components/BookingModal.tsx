import { useState, useEffect } from 'react';
import { Calendar, Clock, Scissors, Copy, Check, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { BookingFormData } from '../types';
import {
  generateTimeSlots,
  calculateBookingTotal,
  validateBookingForm,
  formatWhatsAppBookingMessage,
  createWhatsAppUrl,
  openExternalUrl,
  isTuesday,
  getDefaultBookingDateIST,
} from '../utils/booking';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceIds?: string[];
  initialNote?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preSelectedServiceIds,
  initialNote = '',
}: BookingModalProps) {
  const defaultDateStr = getDefaultBookingDateIST();

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    selectedServices: preSelectedServiceIds && preSelectedServiceIds.length > 0 ? preSelectedServiceIds : ['sig-cut'],
    date: defaultDateStr,
    timeSlot: '11:00 AM',
    notes: initialNote,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      selectedServices:
        preSelectedServiceIds && preSelectedServiceIds.length > 0
          ? preSelectedServiceIds
          : prev.selectedServices.length > 0
          ? prev.selectedServices
          : ['sig-cut'],
      notes: initialNote || '',
    }));
  }, [isOpen, preSelectedServiceIds, initialNote]);

  const timeSlots = generateTimeSlots();
  const { totalDurationMinutes } = calculateBookingTotal(formData.selectedServices, SERVICES);

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(id);
      const updated = exists
        ? prev.selectedServices.filter((sId) => sId !== id)
        : [...prev.selectedServices, id];
      return { ...prev, selectedServices: updated };
    });
    if (errors.selectedServices) {
      setErrors((prev) => ({ ...prev, selectedServices: '' }));
    }
  };

  const handleDateChange = (val: string) => {
    setFormData((prev) => ({ ...prev, date: val }));
    if (isTuesday(val)) {
      setErrors((prev) => ({
        ...prev,
        date: 'Shivangi Salon is closed on Tuesdays. Please choose another date.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
  };

  const handleBookViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const message = formatWhatsAppBookingMessage(formData, SERVICES);
    const url = createWhatsAppUrl(SALON_INFO.rawPhone, message);

    setSubmitted(true);
    openExternalUrl(url);
  };

  const handleCopyMessage = () => {
    const message = formatWhatsAppBookingMessage(formData, SERVICES);
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generatedPreview = formatWhatsAppBookingMessage(formData, SERVICES);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-labelledby="booking-modal-title">
        <DialogHeader className="pb-5 border-b border-stone-900/10 dark:border-white/10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A7848] dark:text-[#C5A059]">
            Direct WhatsApp Chair Booking
          </p>
          <DialogTitle id="booking-modal-title">
            Book Your Chair at Shivangi Salon
          </DialogTitle>
          <DialogDescription>
            Select your services, date &amp; time. Your booking message goes straight to our salon WhatsApp at{' '}
            <span className="font-mono font-bold text-[#141413] dark:text-[#F4F1EA]">+91 9575830421</span>.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#9A7848] dark:text-[#C5A059]">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-display text-2xl font-bold">
              WhatsApp Request Ready
            </h3>
            <p className="text-sm text-[#57534E] dark:text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
              Your appointment details have opened in WhatsApp. Send the message to confirm your chair slot.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
                Edit Booking
              </Button>
              <Button type="button" variant="default" onClick={onClose}>
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookViaWhatsApp} className="mt-5 space-y-5" noValidate>
            {/* 1. Service Selection */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059]" />
                  <span>1. Select Grooming Services</span>
                </span>
                <span className="text-xs text-[#57534E] dark:text-[#A1A1AA] font-mono tabular-nums">
                  ~{totalDurationMinutes} min · Starts from ₹100
                </span>
              </div>

              {errors.selectedServices && (
                <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.selectedServices}</span>
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isChecked = formData.selectedServices.includes(s.id);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      aria-pressed={isChecked}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#EBE6DC] dark:bg-[#18181B] border-[#9A7848] dark:border-[#C5A059] text-[#141413] dark:text-[#F4F1EA]'
                          : 'bg-[#EBE6DC]/45 dark:bg-[#0B0B0C] border-stone-900/10 dark:border-white/10 text-[#57534E] dark:text-[#A1A1AA] hover:border-[#9A7848]/50 dark:hover:border-[#C5A059]/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${isChecked ? 'text-[#141413] dark:text-[#F4F1EA]' : ''}`}>
                          {s.name}
                        </p>
                        <p className="text-[11px] font-mono tabular-nums text-[#57534E] dark:text-[#A1A1AA]">
                          {s.durationMinutes} min · Starts from ₹100
                        </p>
                      </div>
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked
                            ? 'bg-[#9A7848] dark:bg-[#C5A059] border-[#9A7848] dark:border-[#C5A059] text-white dark:text-black'
                            : 'border-stone-400 dark:border-zinc-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="booking-date" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059]" />
                  <span>2. Preferred Date</span>
                </label>
                <Input
                  id="booking-date"
                  type="date"
                  min={defaultDateStr}
                  value={formData.date}
                  hasError={Boolean(errors.date)}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                />
                {errors.date ? (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.date}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                    Closed every Tuesday for weekly rest.
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="booking-time" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9A7848] dark:text-[#C5A059]" />
                  <span>3. Preferred Time Slot</span>
                </label>
                <select
                  id="booking-time"
                  value={formData.timeSlot}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, timeSlot: e.target.value }));
                    if (errors.timeSlot) setErrors((prev) => ({ ...prev, timeSlot: '' }));
                  }}
                  className={`flex min-h-[44px] w-full rounded-xl border bg-white dark:bg-[#0B0B0C] px-3.5 py-2.5 text-sm text-[#141413] dark:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] cursor-pointer ${
                    errors.timeSlot ? 'border-rose-500' : 'border-stone-900/15 dark:border-white/15'
                  }`}
                  required
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-white dark:bg-[#121214]">
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#57534E] dark:text-[#A1A1AA]">
                  Salon Hours: 8:30 AM – 9:30 PM
                </p>
              </div>
            </div>

            {/* 3. Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="client-name" className="text-xs font-bold uppercase tracking-wider block">
                  Your Full Name
                </label>
                <Input
                  id="client-name"
                  type="text"
                  placeholder="e.g. Rohit Sharma"
                  value={formData.fullName}
                  hasError={Boolean(errors.fullName)}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  required
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="client-phone" className="text-xs font-bold uppercase tracking-wider block">
                  WhatsApp Mobile Number
                </label>
                <Input
                  id="client-phone"
                  type="tel"
                  placeholder="e.g. 9575830421"
                  value={formData.phone}
                  hasError={Boolean(errors.phone)}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  required
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* 4. Notes */}
            <div className="space-y-1.5">
              <label htmlFor="client-notes" className="text-xs font-bold uppercase tracking-wider block">
                Style Request / Notes (Optional)
              </label>
              <Input
                id="client-notes"
                type="text"
                placeholder="e.g. Low drop fade, sharp beard line-up, hot towel shave"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            {/* 5. Pre-filled WhatsApp Preview */}
            <div className="p-3.5 rounded-xl bg-[#EBE6DC] dark:bg-[#0B0B0C] border border-stone-900/10 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Message Preview (+91 9575830421)</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9A7848] dark:text-[#C5A059] hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#57534E] dark:text-[#A1A1AA] whitespace-pre-wrap bg-[#F4F1EA] dark:bg-[#121214] p-2.5 rounded-lg border border-stone-900/10 dark:border-white/10 max-h-24 overflow-y-auto">
                {generatedPreview}
              </pre>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
              <Button type="submit" variant="whatsapp" size="lg" className="w-full flex-1 uppercase text-xs tracking-wider">
                <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                <span>Confirm &amp; Send on WhatsApp</span>
              </Button>

              <Button type="button" variant="outline" size="lg" onClick={onClose} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
