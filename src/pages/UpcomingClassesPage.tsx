import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MasterclassDetails from '../components/MasterclassDetails';
import { initializeRazorpay } from '../lib/razorpay';
import {
  ArrowLeft,
  Calendar,
  Clock,
  GraduationCap,
  Loader2,
  Users,
  PlayCircle,
  AlertCircle,
  RefreshCcw,
  X,
  CreditCard,
  QrCode,
  Smartphone,
} from 'lucide-react';
import Loader from '../components/Loader';

interface UpcomingClass {
  id: string;
  title: string;
  start_date: string;
  class_time: string;
  mode: 'online' | 'offline';
  duration_minutes: number;
  instructor?: string;
  capacity?: number;
  description?: string;
}

interface EnrollmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function UpcomingClassesPage() {
  const [classes, setClasses] = useState<UpcomingClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<UpcomingClass | null>(
    null
  );
  const [formData, setFormData] = useState<EnrollmentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    'card' | 'qr' | 'upi' | null
  >(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchClasses() {
    try {
      setLoading(true);
      setError(null);

      if (
        !import.meta.env.VITE_SUPABASE_URL ||
        !import.meta.env.VITE_SUPABASE_ANON_KEY
      ) {
        throw new Error('Supabase configuration is missing');
      }

      // Check if Supabase is properly configured
      if (
        !import.meta.env.VITE_SUPABASE_URL ||
        !import.meta.env.VITE_SUPABASE_ANON_KEY
      ) {
        throw new Error('Supabase configuration is missing');
      }

      const { data, error: supabaseError } = await supabase
        .from('upcoming_classes')
        .select('*')
        .order('start_date', { ascending: true });

      if (supabaseError) throw supabaseError;

      if (!data || data.length === 0) {
        throw new Error('No upcoming classes found');
      }

      if (!data || data.length === 0) {
        throw new Error('No upcoming classes found');
      }

      setClasses(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError(
        err instanceof Error ? err : new Error('Failed to fetch classes')
      );
      setError(
        err instanceof Error ? err : new Error('Failed to fetch classes')
      );

      if (retryCount < MAX_RETRIES) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          void fetchClasses();
        }, delay);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchClasses();

    // Check for pending enrollment after login
    const pendingEnrollment = sessionStorage.getItem('pendingEnrollment');
    if (pendingEnrollment && user) {
      const classItem = JSON.parse(pendingEnrollment);
      sessionStorage.removeItem('pendingEnrollment');
      handleEnroll(classItem);
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(0);
    void fetchClasses();
  };

  const handleEnroll = (classItem: UpcomingClass) => {
    setSelectedClass(classItem);
    setShowDetails(true);
  };

  const handleEnrollmentStart = () => {
    if (!user) {
      // Store class info in session storage
      sessionStorage.setItem(
        'pendingEnrollment',
        JSON.stringify(selectedClass)
      );
      // Redirect to auth page
      navigate('/auth', { state: { returnTo: '/upcoming-classes' } });
      return;
    }

    setShowDetails(false);
    setShowEnrollmentForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Create enrollment record
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('masterclass_enrollments')
        .insert([
          {
            class_id: selectedClass.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email.toLowerCase(),
            phone: formData.phone,
            amount: 49, // Default price for masterclasses
          },
        ])
        .select()
        .single();

      if (enrollmentError) throw enrollmentError;
      if (!enrollmentData) throw new Error('Failed to create enrollment');

      const enrollmentId = enrollmentData.id;
      if (!enrollmentId) throw new Error('No enrollment ID received');

      // Create Razorpay order
      const { data: orderData, error: orderError } =
        await supabase.functions.invoke('create-razorpay-order', {
          body: {
            amount: 49 * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
              classTitle: selectedClass.title,
              email: formData.email,
              name: `${formData.firstName} ${formData.lastName}`,
            },
          },
        });

      if (orderError) throw orderError;

      // Initialize Razorpay
      const razorpay = await initializeRazorpay();
      if (!razorpay) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'teachXpro',
        description: `Enrollment for ${selectedClass.title}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const { data: verificationData, error: verificationError } =
              await supabase.functions.invoke('verify-razorpay-payment', {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              });

            if (verificationError) throw verificationError;
            if (!verificationData?.success) {
              throw new Error(
                verificationData?.error || 'Payment verification failed'
              );
            }

            // Update enrollment record
            const { error: updateError } = await supabase
              .from('masterclass_enrollments')
              .update({
                payment_id: response.razorpay_payment_id,
                payment_status: 'completed',
              })
              .eq('id', enrollmentId)
              .select()
              .single();

            if (updateError) throw updateError;

            // Send confirmation email
            const { error: emailError } = await supabase.functions.invoke(
              'send-enrollment-email',
              {
                body: {
                  email: formData.email.toLowerCase(),
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  courseName: selectedClass.title,
                  amount: 49,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                },
              }
            );

            if (emailError) {
              console.error('Failed to send confirmation email:', emailError);
            }

            // Close modals and reset form
            setShowPaymentModal(false);
            setShowEnrollmentForm(false);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
            });
            setEnrollmentId(null);

            // Show success message
            setToastMessage(
              'Payment successful! You are now enrolled in the masterclass.'
            );
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 5000);
          } catch (err) {
            console.error('Payment processing error:', err);
            const errorMsg =
              err instanceof Error ? err.message : 'Payment processing failed';
            setError(new Error(errorMsg));
            // Clean up enrollment ID on error
            setEnrollmentId(null);

            // Show error message
            setToastMessage(errorMsg);
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 5000);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new razorpay(options);
      rzp.open();

      // Show payment modal
      setShowPaymentModal(true);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to submit enrollment')
      );
      setEnrollmentId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="sticky top-0 z-50 bg-black">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <Link
              to="/"
              className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        <div className="sticky top-0 z-50 bg-black">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <Link
              to="/"
              className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader text="" />
        </div>
      </div>
    );
  }

  if (error || classes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="sticky top-0 z-50 bg-black">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <Link
              to="/"
              className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        <div className="sticky top-0 z-50 bg-black">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <Link
              to="/"
              className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="flex items-center gap-3 mb-4 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Unable to Load Classes</h2>
          </div>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            {error?.message ||
              'There was an error loading the upcoming classes. Please try again later.'}
          </p>
          {retryCount >= MAX_RETRIES && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-black text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-[1.2] md:leading-[1.2]">
              Upcoming Masterclasses
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm mb-6">
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                All Masterclasses at Just
              </span>
              <span className="text-lg line-through text-gray-500">₹499!</span>
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                ₹49!
              </span>
              <div className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-[10px] font-bold text-white">
                SPECIAL OFFER
              </div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join our expert-led masterclasses and accelerate your learning
              journey with hands-on workshops and in-depth technical sessions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleEnroll(classItem)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <PlayCircle className="h-6 w-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {classItem.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {classItem.description ||
                    'Join this exciting masterclass to enhance your skills and knowledge.'}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>{formatDate(classItem.start_date)}</span>
                  </div>

                  {classItem.instructor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 text-purple-500" />
                      <span>{classItem.instructor}</span>
                    </div>
                  )}

                  {classItem.duration && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{classItem.duration_minutes} minutes</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span>
                      {new Date(
                        `2000-01-01T${classItem.class_time}`
                      ).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        classItem.mode === 'online'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {classItem.mode.charAt(0).toUpperCase() +
                        classItem.mode.slice(1)}
                    </span>
                  </div>

                  {classItem.capacity && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>Capacity: {classItem.capacity} students</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 relative z-10">
                  <div className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-center">
                    Enroll Now
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Masterclass Details Modal */}
      {showDetails && selectedClass && (
        <MasterclassDetails
          classItem={selectedClass}
          onClose={() => setShowDetails(false)}
          onEnroll={handleEnrollmentStart}
        />
      )}

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && selectedClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Enroll in Masterclass</h2>
                <button
                  onClick={() => setShowEnrollmentForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedClass.title}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium
                hover:bg-gray-800 transition-colors disabled:opacity-50
                disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-6 h-6"
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
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Error Toast */}
      {showErrorToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

export default UpcomingClassesPage;
