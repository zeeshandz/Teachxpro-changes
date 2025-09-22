import React, { useState } from 'react';
import { X, Loader2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { initializeRazorpay } from '../lib/razorpay';

interface EnrollmentFormProps {
  courseName: string;
  courseId: string;
  coursePrice: number;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function EnrollmentForm({ courseName, courseId, coursePrice, onClose }: EnrollmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create order on the backend
      const { data: orderData, error: orderError } = await supabase
        .functions.invoke('create-razorpay-order', {
          body: {
            amount: coursePrice * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
              courseName,
              courseId,
              email: formData.email,
              name: `${formData.firstName} ${formData.lastName}`
            }
          }
        });

      if (orderError) {
        throw new Error('Failed to create order');
      }

      setIsProcessingPayment(true);

      // Initialize Razorpay with order details
      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        order_id: orderData.id,
        currency: 'INR',
        name: 'teachXpro',
        description: `Enrollment for ${courseName}`,
        image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIj4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIiAvPgogIDxwYXRoIGQ9Ik0xMiAxMkwyMCAyME0yMCAxMkwxMiAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMzIiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMzQ4N0ZFIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzgwNDdGRSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkU0N0FDIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+Cjwvc3ZnPg==',
        handler: async function (response: any) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          
          // Verify payment
          const { data: verificationData, error: verificationError } = await supabase
            .functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
              }
            });

          if (verificationError) {
            throw new Error('Payment verification failed');
          }
          
          if (!verificationData?.success) {
            throw new Error(verificationData?.error || 'Payment verification failed');
          }
          
          // Create enrollment record
          const { error: enrollmentError } = await supabase
            .from('enrollments')
            .insert([
              {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email.toLowerCase(),
                phone: formData.phone,
                course_id: courseId,
                course_name: courseName,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id, 
                payment_signature: razorpay_signature, 
                amount: coursePrice,
                payment_status: 'completed'
              }
            ]);

          if (enrollmentError) throw enrollmentError;

          // Send confirmation email
          const { error: emailError } = await supabase
            .functions.invoke('send-enrollment-email', {
              body: {
                email: formData.email.toLowerCase(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                courseName,
                amount: coursePrice,
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id
              }
            });

          if (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't throw error here as the enrollment was successful
          }

          setSuccess(true);
          // Show success message for 2 seconds before closing
          setTimeout(() => {
            onClose();
          }, 2000);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: function() {
            setIsProcessingPayment(false);
          }
        },
      };

      const razorpay = await initializeRazorpay();
      if (!razorpay) {
        throw new Error('Razorpay SDK failed to load');
      }

      const rzp = new razorpay(razorpayOptions);
      rzp.on('payment.failed', function (response: any) {
        setError(response.error.description || 'Payment failed. Please try again.');
        setIsProcessingPayment(false);
      });
      rzp.open();

    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment verification failed. Please try again.';
      setError(errorMessage);
      setIsProcessingPayment(false); // Ensure processing state is reset on error
      setIsSubmitting(false); // Reset submit state on error
    } finally {
      // Only reset isSubmitting if we're not processing payment
      if (!isProcessingPayment) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-md bg-[#fffcf5] rounded-2xl shadow-xl relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Form Content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">Enroll in Course</h2>
            <div className="mb-6">
              <p className="text-gray-600">{courseName}</p>
              <div className="mt-2">
                <span className="text-sm line-through text-gray-500 mr-2">₹{coursePrice * 2}</span>
                <span className="text-lg font-bold text-green-600">₹{coursePrice}</span>
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                  50% OFF
                </span>
              </div>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enrollment Successful!</h3>
                <p className="text-gray-600">We'll contact you shortly with next steps.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isProcessingPayment}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold
                           hover:bg-gray-800 transition-colors disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay ₹{coursePrice}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EnrollmentForm;