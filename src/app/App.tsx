import { useState } from 'react';
import Navigation from './components/Navigation';
import BookingFlow, { BookingData } from './components/BookingFlow';
import AccountDashboard from './components/AccountDashboard';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);

  const handleBookingComplete = (booking: BookingData) => {
    setBookings([...bookings, booking]);
  };

  const handleCancelBooking = (index: number) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  const handleRescheduleBooking = (index: number) => {
    setIsAccountOpen(false);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBookingClick={() => setIsBookingOpen(true)} onAccountClick={() => setIsAccountOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3">
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1657703509028-e1e89fcf2e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Natural beauty"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1772983166346-93afb9898264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Minimal nails"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1596887772390-2648c0155278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Hands"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8 text-xs tracking-[0.3em] text-muted-foreground uppercase">Premium Nail Care</div>
          <h1 className="text-6xl md:text-8xl mb-8 tracking-tight">
            Quiet<br />Elegance
          </h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-md mx-auto leading-relaxed">
            Where natural beauty meets mindful precision
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-12 py-4 bg-foreground text-background rounded-full hover:shadow-2xl transition-all text-sm tracking-wide"
          >
            Reserve Your Time
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Services</div>
            <h2 className="text-5xl md:text-6xl tracking-tight max-w-2xl">
              Crafted with care
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
            {[
              {
                title: 'Classic Manicure',
                description: 'Natural nail care with precision filing and cuticle work',
                duration: '45',
                price: '48',
                image: 'https://images.unsplash.com/photo-1583826198013-28269b3bc786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000'
              },
              {
                title: 'Gel Manicure',
                description: 'Long-lasting color with premium gel polish',
                duration: '60',
                price: '68',
                image: 'https://images.unsplash.com/photo-1690749072212-373daf1d58ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000'
              },
              {
                title: 'Pedicure',
                description: 'Complete foot treatment with massage and polish',
                duration: '60',
                price: '58',
                image: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000'
              },
              {
                title: 'Deluxe Treatment',
                description: 'Full service with paraffin treatment and extended massage',
                duration: '90',
                price: '98',
                image: 'https://images.unsplash.com/photo-1596887772390-2648c0155278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000'
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-background group cursor-pointer">
                <div className="p-8 lg:p-12 h-full flex flex-col">
                  <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[4/3]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <div className="flex items-end justify-between pt-6 border-t border-border">
                    <div className="text-sm text-muted-foreground">{service.duration} min</div>
                    <div className="text-lg">${service.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Image Break */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1648844421727-cde6c4246b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
          alt="Natural beauty"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">Philosophy</div>
              <h2 className="text-4xl md:text-5xl mb-8 tracking-tight leading-tight">
                Natural beauty,<br />elevated with care
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We believe in the quiet power of well-cared-for hands. Each treatment is a moment of calm, delivered with precision and attention to the smallest detail.
                </p>
                <p>
                  Using only premium, health-conscious products, we enhance what's naturally yours—creating results that feel effortless and look timelessly beautiful.
                </p>
                <p>
                  This is nail care reimagined: minimal, intentional, and designed for those who value quality over excess.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587729927031-830c32f520da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000"
                  alt="Philosophy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">Testimonials</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The most refined nail care I've experienced. Every detail is considered, every moment is calm.",
                name: 'Emma S.'
              },
              {
                text: 'Finally, a place that understands that less is more. The quality speaks for itself.',
                name: 'Sophia L.'
              },
              {
                text: 'Premium without pretension. I leave feeling refreshed and quietly confident.',
                name: 'Olivia M.'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-10">
                <p className="text-muted-foreground leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                <p className="text-sm tracking-wide">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">Visit</div>
              <h2 className="text-4xl mb-12 tracking-tight">We'd love to see you</h2>
              <div className="space-y-8">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Location</div>
                  <p className="leading-relaxed">
                    123 Minimalist Lane<br />
                    Suite 200<br />
                    New York, NY 10001
                  </p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Hours</div>
                  <p className="text-sm leading-relaxed">
                    Monday – Friday: 9am – 7pm<br />
                    Saturday: 10am – 6pm<br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Contact</div>
                  <p className="text-sm leading-relaxed">
                    (212) 555-0123<br />
                    hello@nature.studio
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-12 py-4 bg-foreground text-background rounded-full hover:shadow-2xl transition-all text-sm tracking-wide"
              >
                Book Your Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">© 2026 Nature Studio</div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Booking Flow */}
      {isBookingOpen && (
        <BookingFlow onClose={() => setIsBookingOpen(false)} onComplete={handleBookingComplete} />
      )}

      {/* Account Dashboard */}
      {isAccountOpen && (
        <AccountDashboard
          onClose={() => setIsAccountOpen(false)}
          bookings={bookings}
          onCancel={handleCancelBooking}
          onReschedule={handleRescheduleBooking}
        />
      )}
    </div>
  );
}