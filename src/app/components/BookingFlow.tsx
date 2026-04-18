import { useState } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

interface BookingFlowProps {
  onClose: () => void;
  onComplete: (booking: BookingData) => void;
}

export interface BookingData {
  service: Service;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'card' | 'apple-pay';
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

const services: Service[] = [
  { id: 'classic', name: 'Classic Manicure', description: 'Natural nail care with precision filing and cuticle work', duration: 45, price: 48 },
  { id: 'gel', name: 'Gel Manicure', description: 'Long-lasting color with premium gel polish', duration: 60, price: 68 },
  { id: 'pedicure', name: 'Pedicure', description: 'Complete foot treatment with massage and polish', duration: 60, price: 58 },
  { id: 'express', name: 'Express Manicure', description: 'Quick refresh for nails on the go', duration: 30, price: 38 },
  { id: 'deluxe', name: 'Deluxe Treatment', description: 'Full service with paraffin treatment and extended massage', duration: 90, price: 98 },
];

const timeSlots = [
  '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

export default function BookingFlow({ onClose, onComplete }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay'>('card');
  const [cardNumber, setCardNumber] = useState('');

  const generateDates = () => {
    const dates = [];
    const today = startOfToday();
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  };

  const dates = generateDates();

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handlePersonalInfoSubmit = () => {
    if (name && email && phone) {
      setStep(5);
    }
  };

  const handlePaymentSubmit = () => {
    if (selectedService && selectedDate && selectedTime) {
      onComplete({
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        name,
        email,
        phone,
        paymentMethod
      });
      setStep(6);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl overflow-y-auto">
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-8">
              <button
                onClick={step > 1 && step < 6 ? () => setStep(step - 1) : onClose}
                className="w-10 h-10 rounded-full hover:bg-muted/50 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-px transition-all ${
                      s <= step ? 'w-8 bg-foreground' : 'w-6 bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-muted/50 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-12">
              <div>
                <h2 className="mb-3">Select a Service</h2>
                <p className="text-muted-foreground text-sm">Choose the treatment that suits you</p>
              </div>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="w-full text-left p-6 rounded-2xl border border-border hover:border-foreground/20 hover:bg-muted/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="group-hover:translate-x-1 transition-transform">{service.name}</h3>
                      <span className="text-sm">${service.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <span className="text-xs text-muted-foreground">{service.duration} minutes</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {step === 2 && (
            <div className="space-y-12">
              <div>
                <h2 className="mb-3">Choose a Date</h2>
                <p className="text-muted-foreground text-sm">Select your preferred day</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {dates.map((date) => {
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground/20 hover:bg-muted/30'
                      }`}
                    >
                      <div className="text-xs opacity-60 mb-1">{format(date, 'EEE')}</div>
                      <div className="text-lg">{format(date, 'd')}</div>
                      <div className="text-xs opacity-60 mt-1">{format(date, 'MMM')}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {step === 3 && (
            <div className="space-y-12">
              <div>
                <h2 className="mb-3">Select a Time</h2>
                <p className="text-muted-foreground text-sm">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d')}
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className="p-4 rounded-2xl border border-border hover:border-foreground/20 hover:bg-muted/30 transition-all"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Personal Information */}
          {step === 4 && (
            <div className="space-y-12">
              <div>
                <h2 className="mb-3">Your Information</h2>
                <p className="text-muted-foreground text-sm">We'll send your confirmation here</p>
              </div>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:border-foreground/20 focus:outline-none transition-colors"
                    placeholder="Emma Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:border-foreground/20 focus:outline-none transition-colors"
                    placeholder="emma@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:border-foreground/20 focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <button
                  onClick={handlePersonalInfoSubmit}
                  disabled={!name || !email || !phone}
                  className="w-full py-4 bg-foreground text-background rounded-2xl hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <div className="space-y-12">
              <div>
                <h2 className="mb-3">Payment</h2>
                <p className="text-muted-foreground text-sm">Secure and encrypted</p>
              </div>
              <div className="max-w-md space-y-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => setPaymentMethod('apple-pay')}
                    className={`flex-1 p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'apple-pay'
                        ? 'border-foreground bg-foreground/5'
                        : 'border-border hover:border-foreground/20'
                    }`}
                  >
                    <div className="text-sm">Apple Pay</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'card'
                        ? 'border-foreground bg-foreground/5'
                        : 'border-border hover:border-foreground/20'
                    }`}
                  >
                    <div className="text-sm">Card</div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:border-foreground/20 focus:outline-none transition-colors"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Expiry</label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:border-foreground/20 focus:outline-none transition-colors"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-2xl border border-border bg-background focus:border-foreground/20 focus:outline-none transition-colors"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span>{selectedDate && format(selectedDate, 'MMM d')} at {selectedTime}</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-border flex justify-between">
                    <span>Total</span>
                    <span>${selectedService?.price}</span>
                  </div>
                </div>

                <button
                  onClick={handlePaymentSubmit}
                  className="w-full py-4 bg-foreground text-background rounded-2xl hover:shadow-lg transition-all"
                >
                  Confirm & Pay ${selectedService?.price}
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {step === 6 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mb-4">You're All Set</h2>
              <p className="text-muted-foreground mb-12 max-w-md mx-auto">
                A confirmation has been sent to {email}. We look forward to seeing you.
              </p>
              <div className="max-w-sm mx-auto p-8 rounded-2xl border border-border bg-muted/20 space-y-4 mb-12">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span>{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span>{selectedDate && format(selectedDate, 'EEEE, MMMM d')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <span>{name}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-foreground text-background rounded-full hover:shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
