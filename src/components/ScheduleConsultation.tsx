import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^\d{10}$/;

interface TimeSlot {
  id: string;
  time: string;
  is_available: boolean;
}

interface ScheduleConsultationProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    image: string;
  };
  onClose: () => void;
}

function ScheduleConsultation({ mentor, onClose }: ScheduleConsultationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  });
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchTimeSlots = async (date: string) => {
    setIsLoadingSlots(true);
    try {
      const { data, error } = await supabase
        .from('mentor_time_slots')
        .select('id, time, is_available')
        .eq('mentor_id', mentor.id)
        .eq('date', date)
        .order('time');

      if (error) throw error;

      // If no slots found, generate default slots
      if (!data || data.length === 0) {
        // Generate slots from 9:30 AM to 5:30 PM with 1-hour intervals
        const defaultSlots = Array.from({ length: 9 }, (_, i) => {
          const hour = Math.floor(i + 9.5);
          const minute = ((i + 9.5) % 1) * 60;
          const time = `${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`;
          return {
            id: crypto.randomUUID(),
            time,
            is_available: true,
          };
        });

        setTimeSlots(defaultSlots);
      } else {
        setTimeSlots(data);
      }
    } catch (err) {
      console.error('Error fetching time slots:', err);
      setError('Failed to load available time slots');
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setFormData((prev) => ({ ...prev, date: newDate, time: '' }));
    if (newDate) {
      fetchTimeSlots(newDate);
    } else {
      setTimeSlots([]);
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Time validation
    if (!formData.time) {
      errors.time = 'Please select a time slot';
    }

    // Email validation
    if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!PHONE_REGEX.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Date validation
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.date = 'Please select a future date';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendEmail = async (formData: any) => {
    // Only send emails to the verified email address during development
    const VERIFIED_EMAIL = 'sachitwadhawan256@gmail.com';

    const emailTemplate = (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
          .details { margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Consultation is Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.clientName},</p>
            <p>Your consultation with ${data.mentorName} (${
      data.mentorRole
    }) has been successfully scheduled.</p>
            <div class="details">
              <p><strong>Date:</strong> ${new Date(
                data.date
              ).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Duration:</strong> 1 hour</p>
            </div>
            ${
              data.notes
                ? `
              <div class="details">
                <p><strong>Additional Notes:</strong></p>
                <p>${data.notes}</p>
              </div>
            `
                : ''
            }
          </div>
          <div class="footer">
            <p>TeachXPro - Professional Development</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const { error: emailError } = await supabase.functions.invoke(
        'send-consultation-email',
        {
          body: {
            to: VERIFIED_EMAIL, // Always send to verified email
            subject: `Consultation Confirmed with ${mentor.name}`,
            html: emailTemplate({
              clientName: formData.name,
              mentorName: mentor.name,
              mentorRole: mentor.role,
              date: formData.date,
              time: formData.time,
              notes: formData.notes || 'No additional notes',
            }),
          },
        }
      );

      if (emailError) {
        throw new Error(`Failed to send email: ${emailError.message}`);
      }
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      // Don't block the success flow if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('consultations')
        .insert([
          {
            mentor_id: mentor.id,
            mentor_name: mentor.name,
            client_name: formData.name,
            client_email: formData.email,
            client_phone: formData.phone,
            consultation_date: formData.date,
            consultation_time: formData.time,
            notes: formData.notes,
          },
        ]);

      if (supabaseError) throw supabaseError;

      sendEmail(formData);

      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error('Consultation booking error:', err);
      setError('Failed to schedule consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Schedule Consultation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Consultation Scheduled!
              </h3>
              <p className="text-gray-600">
                Your consultation has been scheduled successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Mentor Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.role}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="h-4 w-4 inline-block mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="h-4 w-4 inline-block mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent
                              ${
                                validationErrors.email ? 'border-red-500' : ''
                              }`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 inline-block mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    maxLength={10}
                    pattern="\d{10}"
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent
                              ${
                                validationErrors.phone ? 'border-red-500' : ''
                              }`}
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 inline-block mr-2" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleDateChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent
                                ${
                                  validationErrors.date ? 'border-red-500' : ''
                                }`}
                    />
                    {validationErrors.date && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.date}
                      </p>
                    )}
                    {validationErrors.time && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.time}
                      </p>
                    )}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Available Time Slots</span>
                        </div>
                        {timeSlots.length > 0 && (
                          <span className="text-xs text-gray-500">
                            {
                              timeSlots.filter((slot) => slot.is_available)
                                .length
                            }{' '}
                            slots available
                          </span>
                        )}
                      </div>
                    </label>
                    {isLoadingSlots ? (
                      <div className="flex items-center justify-center h-[120px] bg-gray-50 rounded-lg">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">
                          Loading slots...
                        </span>
                      </div>
                    ) : timeSlots.length > 0 ? (
                      <div className="h-[180px] overflow-y-auto space-y-2">
                        <div className="grid grid-cols-1 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleTimeSelect(slot.time);
                              }}
                              disabled={!slot.is_available}
                              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all duration-200
                              ${
                                formData.time === slot.time
                                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02] ring-2 ring-blue-300/50'
                                  : slot.is_available
                                  ? 'bg-white hover:bg-gray-50 text-gray-900 hover:shadow-sm border border-gray-200 hover:border-gray-300'
                                  : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100'
                              }`}
                            >
                              <div className="flex items-center">
                                <Clock
                                  className={`h-4 w-4 mr-2 ${
                                    formData.time === slot.time
                                      ? 'text-white'
                                      : slot.is_available
                                      ? 'text-gray-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                                <span className="font-medium">
                                  {new Date(
                                    `2000-01-01T${slot.time}`
                                  ).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                  })}
                                </span>
                              </div>
                              <div>
                                {!slot.is_available ? (
                                  <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-medium">
                                    Booked
                                  </span>
                                ) : formData.time === slot.time ? (
                                  <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium">
                                    Selected
                                  </span>
                                ) : (
                                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-medium">
                                    Available
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : formData.date ? (
                      <div className="h-[180px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-500">
                          No time slots available for this date
                        </p>
                      </div>
                    ) : (
                      <div className="h-[180px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-sm pl-2 text-gray-500">
                          Select a date to view available time slots
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MessageSquare className="h-4 w-4 inline-block mr-2" />
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    placeholder="Any specific topics you'd like to discuss?"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.time}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium
                           hover:bg-gray-800 transition-colors disabled:opacity-50
                           disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleConsultation;
