import { useState } from 'react';
import { format, isPast } from 'date-fns';
import { BookingData } from './BookingFlow';

interface AccountDashboardProps {
  onClose: () => void;
  bookings: BookingData[];
  onCancel: (index: number) => void;
  onReschedule: (index: number) => void;
}

export default function AccountDashboard({ onClose, bookings, onCancel, onReschedule }: AccountDashboardProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = bookings.filter(b => !isPast(b.date));
  const pastBookings = bookings.filter(b => isPast(b.date));

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl overflow-y-auto">
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <h2>My Appointments</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-muted/50 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-12 border-b border-border">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 text-sm transition-colors relative ${
                activeTab === 'upcoming' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Upcoming
              {activeTab === 'upcoming' && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-4 text-sm transition-colors relative ${
                activeTab === 'past' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Past
              {activeTab === 'past' && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
              )}
            </button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {displayBookings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No {activeTab} appointments</p>
              </div>
            ) : (
              displayBookings.map((booking, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl border border-border hover:border-foreground/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <h3>{booking.service.name}</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {format(booking.date, 'EEEE, MMMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {booking.service.duration} min
                        </div>
                      </div>
                      <p className="text-sm">
                        ${booking.service.price}
                      </p>
                    </div>
                    {activeTab === 'upcoming' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => onReschedule(index)}
                          className="px-5 py-2.5 rounded-full border border-border hover:border-foreground/20 hover:bg-muted/30 transition-all text-sm"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => onCancel(index)}
                          className="px-5 py-2.5 rounded-full border border-border hover:border-destructive hover:text-destructive transition-all text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
