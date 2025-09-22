import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  GraduationCap,
  Filter,
  Search,
  Mail,
  User,
  Phone,
  BookOpen,
  Layers,
  FileText,
  Sparkles,
  Loader2,
  Upload,
  CheckCircle2,
  XCircle,
  Award,
  Download,
  QrCode,
  Shield,
  Eye,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { initializeRazorpay } from '../lib/razorpay';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: 'Full-time' | 'Part-time' | 'Remote';
  startDate: string;
  requirements: string[];
  description: string;
  skills: string[];
  stipend: string;
  positions: number;
}

// College list
const collegeList = [
  'Geeta University',
  'Shivalik college of Engineering',
  'JB Institute of Technology',
  'Shobhit Institute of Engineering & Technology',
  'Other',

];

function Internships() {

  // Form state
  const [form, setForm] = useState({
    fullName: '',
    collegeEmail: '',
    mobile: '',
    collegeName: '',
    branch: '',
    year: '',
    program: '',
    city: '',
    mode: '',
    collegeId: null as File | null,
    motivation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [collegeIdUploadStatus, setCollegeIdUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>(
    'idle'
  );
  const [collegeIdUrl, setCollegeIdUrl] = useState('');

  // Add drag state
  const [dragActive, setDragActive] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponFee, setCouponFee] = useState<number | null>(null);
  const [couponCourse, setCouponCourse] = useState('');
  const [couponCollege, setCouponCollege] = useState('');
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Certificate verification state
  const [certificateEmail, setCertificateEmail] = useState('');
  const [certificateStatus, setCertificateStatus] = useState<'idle' | 'verifying' | 'found' | 'not_found' | 'error'>('idle');
  const [certificateData, setCertificateData] = useState<any>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update available courses when college changes
  useEffect(() => {
    async function fetchCourses() {
      if (!form.collegeName) {
        setAvailableCourses([]);
        return;
      }
      if (form.collegeName === 'Other') {
        setAvailableCourses(['AL/ML', 'Web Development', 'Cyber Security', 'Mobile Development']);
        return;
      }
      const { data, error } = await supabase
        .from('internship_coupons')
        .select('course_name')
        .eq('college_name', form.collegeName);
      if (error) {
        setAvailableCourses([]);
        return;
      }
      setAvailableCourses(Array.from(new Set(data.map((d: any) => d.course_name))));
    }
    fetchCourses();
  }, [form.collegeName]);

  const handleFormChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Reset coupon state if college name or program changes
    if (name === 'collegeName' || name === 'program') {
      setCouponCode('');
      setCouponStatus('idle');
      setCouponMessage('');
      setCouponFee(null);
      setCouponCourse('');
      setCouponCollege('');
    }

    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      if (file) await handleFileUpload(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, mode: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Use already uploaded College ID URL
      let collegeIdFinalUrl = collegeIdUrl;
      if (!collegeIdFinalUrl) throw new Error('Please upload your College ID card.');
      // 2. Insert form data into Supabase DB with payment_status as 'pending'
      const { error: insertError } = await supabase.from('internship').insert([
        {
          full_name: form.fullName,
          college_email: form.collegeEmail,
          mobile: form.mobile,
          college_name: form.collegeName,
          branch: form.branch,
          year: form.year,
          program: form.program,
          city: form.city,
          mode: form.mode,
          college_id_url: collegeIdFinalUrl,
          motivation: form.motivation,
          payment_status: 'pending'
        },
      ]);
      if (insertError) throw insertError;
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      alert('There was an error submitting your application. Please try again.');
      console.error(err);
    }
  };

  // Custom handler for drag-and-drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setForm((prev) => ({ ...prev, collegeId: file }));
    setCollegeIdUploadStatus('uploading');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${form.collegeEmail.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('internship-ids')
        .upload(fileName, file, { upsert: false });
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage
        .from('internship-ids')
        .getPublicUrl(fileName);
      setCollegeIdUrl(publicUrlData.publicUrl);
      setCollegeIdUploadStatus('success');
    } catch (err) {
      setCollegeIdUploadStatus('error');
      setCollegeIdUrl('');
    }
  };

  // Coupon validation handler
  const handleValidateCoupon = async () => {
    setCouponStatus('validating');
    setCouponMessage('');
    setCouponFee(null);
    setCouponCourse('');
    setCouponCollege('');
    if (!form.collegeName || !form.program || !couponCode) {
      setCouponStatus('invalid');
      setCouponMessage('Please select college, course, and enter coupon code.');
      return;
    }
    const { data, error } = await supabase
      .from('internship_coupons')
      .select('*')
      .eq('college_name', form.collegeName)
      .eq('course_name', form.program)
      .eq('coupon_code', couponCode.trim());
    if (error || !data || data.length === 0) {
      setCouponStatus('invalid');
      setCouponMessage('Invalid coupon code');
      return;
    }
    setCouponStatus('valid');
    setCouponMessage('Coupon code applied successfully');
    setCouponFee(data[0].fees);
    setCouponCourse(data[0].course_name);
    setCouponCollege(data[0].college_name);
  };

  // Razorpay payment handler
  const handlePayNow = async () => {
    setPaymentProcessing(true);
    setPaymentError('');
    try {
      // Save form data into DB with payment_status as 'pending'
      let collegeIdFinalUrl = collegeIdUrl;
      if (!collegeIdFinalUrl) throw new Error('Please upload your College ID card.');
      const { error: insertError } = await supabase.from('internship').insert([
        {
          full_name: form.fullName,
          college_email: form.collegeEmail,
          mobile: form.mobile,
          college_name: form.collegeName,
          branch: form.branch,
          year: form.year,
          program: form.program,
          city: form.city,
          mode: form.mode,
          college_id_url: collegeIdFinalUrl,
          motivation: form.motivation,
          payment_status: 'pending'
        },
      ]);
      if (insertError) throw insertError;

      // Create order on the backend
      const { data: orderData, error: orderError } = await supabase
        .functions.invoke('create-razorpay-order', {
          body: {
            amount: couponFee ? couponFee * 100 : 0, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
              collegeName: form.collegeName,
              program: form.program,
              email: form.collegeEmail,
              name: form.fullName
            }
          }
        });

      if (orderError) {
        throw new Error('Failed to create order');
      }

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
        description: `${form.collegeName} - ${form.program}`,
        order_id: orderData.id,
        image: 'https://teachxpro.com/logo.png',
        handler: async function (response: any) {
          try {
            // Verify payment
            const { data: verificationData, error: verificationError } = await supabase
              .functions.invoke('verify-razorpay-payment', {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                }
              });

            if (verificationError) {
              throw new Error('Payment verification failed');
            }

            if (!verificationData?.success) {
              throw new Error(verificationData?.error || 'Payment verification failed');
            }

            // On payment success, update the payment status to 'completed'
            await handleFormSubmitAfterPayment(response);
            setPaymentProcessing(false);
            setShowPaymentModal(false);
          } catch (err) {
            console.error('Payment processing error:', err);
            const errorMsg = err instanceof Error ? err.message : 'Payment processing failed';
            setPaymentError(errorMsg);
            setPaymentProcessing(false);
          }
        },
        prefill: {
          name: form.fullName,
          email: form.collegeEmail,
          contact: form.mobile
        },
        theme: {
          color: '#7c3aed'
        },
        modal: {
          ondismiss: function() {
            setPaymentProcessing(false);
          }
        }
      };

      const rzp = new razorpay(options);
      // @ts-ignore - Razorpay types are not complete
      rzp.on('payment.failed', function (response: any) {
        setPaymentError(response.error.description || 'Payment failed. Please try again.');
        setPaymentProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setPaymentError(errorMessage);
      setPaymentProcessing(false);
    }
  };

  // Insert into DB after payment
  const handleFormSubmitAfterPayment = async (razorpayResponse: any) => {
    setSubmitting(true);
    try {
      let collegeIdFinalUrl = collegeIdUrl;
      if (!collegeIdFinalUrl) throw new Error('Please upload your College ID card.');

      // Update the payment status to 'completed' after successful payment
      const { error: updateError } = await supabase
        .from('internship')
        .update({
          payment_status: 'completed',
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_signature: razorpayResponse.razorpay_signature,
          coupon_code: couponCode,
          coupon_fee: couponFee
        })
        .eq('college_email', form.collegeEmail)
        .eq('payment_status', 'pending');

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error(updateError.message || 'Failed to update payment status');
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-internship-email', {
        body: {
          email: form.collegeEmail.toLowerCase(),
          firstName: form.fullName.split(' ')[0],
          lastName: form.fullName.split(' ').slice(1).join(' '),
          collegeName: form.collegeName,
          program: form.program,
          amount: couponFee,
          paymentId: razorpayResponse.razorpay_payment_id,
          orderId: razorpayResponse.razorpay_order_id
        }
      });

      if (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't throw error here as the application was saved successfully
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Application submission error:', err);
      setSubmitting(false);
      setPaymentError(err instanceof Error ? err.message : 'There was an error submitting your application. Please try again.');
    }
  };

  // Certificate verification functions
  const handleCertificateVerification = async () => {
    if (!certificateEmail.trim()) {
      setCertificateStatus('error');
      return;
    }

    setCertificateStatus('verifying');
    try {
      // Check if student has completed internship
      const { data, error } = await supabase
        .from('internship')
        .select('*')
        .eq('college_email', certificateEmail.toLowerCase())
        .eq('payment_status', 'completed')
        .single();

      if (error || !data) {
        setCertificateStatus('not_found');
        return;
      }

      setCertificateData(data);
      setCertificateStatus('found');
    } catch (err) {
      console.error('Certificate verification error:', err);
      setCertificateStatus('error');
    }
  };

  const generateQRCode = async () => {
    if (!certificateData) return;

    try {
      // Generate a unique verification URL that links to certificate verification page
      // Use local IP for development testing on mobile devices
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://192.168.29.152:5173' 
        : 'https://teachxpro.com'; // Replace with your actual domain
      const verificationUrl = `${baseUrl}/certificate-verify/${certificateData.id}`;
      
      // Create QR code using a QR code service
      const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verificationUrl)}`;
      setQrCodeUrl(qrCodeApiUrl);
      setShowQRModal(true);
    } catch (err) {
      console.error('QR code generation error:', err);
    }
  };

  const generateCertificateQRCode = async () => {
    if (!certificateData) return;

    try {
      // Generate a unique verification URL that links to certificate verification page
      // Use local IP for development testing on mobile devices
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://192.168.29.152:5173' 
        : 'https://teachxpro.com'; // Replace with your actual domain
      const verificationUrl = `${baseUrl}/certificate-verify/${certificateData.id}`;
      
      // Create QR code using a QR code service
      const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verificationUrl)}`;
      setQrCodeUrl(qrCodeApiUrl);
    } catch (err) {
      console.error('QR code generation error:', err);
    }
  };

  const downloadCertificate = async () => {
    if (!certificateData) return;

    try {
      // Get the PDF certificate from Supabase Storage
      // Format: student_id_firstnamelastname.pdf (lowercase names)
      const firstName = certificateData.full_name.split(' ')[0].toLowerCase();
      const lastName = certificateData.full_name.split(' ').slice(1).join('').toLowerCase();
      const certificateFileName = `certificates/${certificateData.id}_${firstName}${lastName}.pdf`;
      
      // Use signed URL for private bucket access
      const { data: signedUrl, error } = await supabase.storage
        .from('internship-certificates')
        .createSignedUrl(certificateFileName, 60); // 60 seconds expiry

      if (error) {
        console.error('Error getting signed URL:', error);
        // Fallback to text certificate if PDF not found
        await downloadTextCertificate();
        return;
      }

      // Download the PDF certificate
      const response = await fetch(signedUrl.signedUrl);
      if (!response.ok) {
        console.error('Certificate not found, falling back to text certificate');
        await downloadTextCertificate();
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `internship-certificate-${certificateData.full_name.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Certificate download error:', err);
      // Fallback to text certificate
      await downloadTextCertificate();
    }
  };

  const downloadTextCertificate = async () => {
    if (!certificateData) return;

    try {
      // Generate certificate content as fallback
      const certificateContent = `
        CERTIFICATE OF INTERNSHIP COMPLETION
        
        This is to certify that
        
        ${certificateData.full_name}
        
        has successfully completed the internship program in
        
        ${certificateData.program}
        
        at ${certificateData.college_name}
        
        Duration: ${certificateData.mode} Training
        Completion Date: ${new Date().toLocaleDateString()}
        
        Certificate ID: ${certificateData.id}
        
        This certificate is digitally verified and can be authenticated
        by scanning the QR code or visiting our verification portal.
        
        TeachXPro
        Empowering Students, Building Careers
      `;

      // Create and download the certificate
      const blob = new Blob([certificateContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `internship-certificate-${certificateData.full_name.replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Text certificate download error:', err);
    }
  };

  const viewCertificate = async () => {
    if (!certificateData) return;

    try {
      // Get the PDF certificate from Supabase Storage
      // Format: student_id_firstnamelastname.pdf (lowercase names)
      const firstName = certificateData.full_name.split(' ')[0].toLowerCase();
      const lastName = certificateData.full_name.split(' ').slice(1).join('').toLowerCase();
      const certificateFileName = `certificates/${certificateData.id}_${firstName}${lastName}.pdf`;
      
      // Use signed URL for private bucket access
      const { data: signedUrl, error } = await supabase.storage
        .from('internship-certificates')
        .createSignedUrl(certificateFileName, 60); // 60 seconds expiry

      if (error) {
        console.error('Error getting signed URL:', error);
        alert('Error viewing certificate. Please try again.');
        return;
      }

      // Open the PDF in a new tab
      window.open(signedUrl.signedUrl, '_blank');
    } catch (err) {
      console.error('Certificate view error:', err);
      alert('Error viewing certificate. Please try again.');
    }
  };

  const resetCertificateVerification = () => {
    setCertificateEmail('');
    setCertificateStatus('idle');
    setCertificateData(null);
    setShowCertificateModal(false);
    setShowQRModal(false);
    setQrCodeUrl('');
  };

  // Generate QR code when certificate is found
  useEffect(() => {
    if (certificateStatus === 'found' && certificateData && !qrCodeUrl) {
      generateCertificateQRCode();
    }
  }, [certificateStatus, certificateData, qrCodeUrl]);

  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:opacity-80"
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Internship Opportunities
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
            Launch your career with hands-on experience in leading companies. Apply for our curated internships and get a head start in your professional journey.
            </p>
          </motion.div>
        </div>
      </div>


      {/* Application Form Section */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="mb-6 flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
            <span className="text-purple-600">
              <GraduationCap className="w-6 h-6" />
            </span>
            <span className="text-sm font-medium text-purple-700">
              Important: Please provide a valid college email address and attach your college ID card.
            </span>
          </div>
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-3xl mb-4">🎉</div>
              <div className="text-xl font-semibold text-purple-700 mb-2">Application Submitted!</div>
              <div className="text-gray-600">Thank you for applying. We will review your application and get back to you soon.</div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" name="fullName" required value={form.fullName} onChange={handleFormChange} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Email *</label>
                  <input type="email" name="collegeEmail" required value={form.collegeEmail} onChange={handleFormChange} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="your.email@college.edu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <input type="tel" name="mobile" required value={form.mobile} onChange={handleFormChange} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Your contact number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <select
                      name="collegeName"
                      required
                      value={form.collegeName}
                      onChange={handleFormChange}
                      className="peer w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm text-left focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white appearance-none"
                    >
                      <option value="">Select your college</option>
                      {collegeList.map((college) => (
                        <option key={college} value={college}>{college}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course/Branch *</label>
                  <input type="text" name="branch" required value={form.branch} onChange={handleFormChange} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="e.g. Computer Science, Electrical Engineering" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study *</label>
                  <select name="year" required value={form.year} onChange={handleFormChange} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200">
                    <option value="">Select your year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5 pointer-events-none" />
                    <select
                      name="program"
                      required
                      value={form.program}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm text-left focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white appearance-none"
                      disabled={!availableCourses.length}
                    >
                      <option value="" disabled hidden>Select a program</option>
                      {availableCourses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  {!availableCourses.length && form.collegeName && (
                    <span className="text-xs text-red-500 mt-1">No programs found for this college. Please check your selection or contact support.</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" name="city" required value={form.city} onChange={handleFormChange} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Your city" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="block text-sm font-medium text-gray-700">Training Mode *</span>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="mode" value="Online" checked={form.mode === 'Online'} onChange={handleRadioChange} required className="accent-purple-600" /> Online
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="mode" value="Offline" checked={form.mode === 'Offline'} onChange={handleRadioChange} required className="accent-purple-600" /> Offline
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block text-sm font-medium text-gray-700 mb-1">College ID *</span>
                <div
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl px-4 py-6 transition-colors cursor-pointer ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-purple-200 bg-purple-50 hover:border-purple-400'}`}
                  onDragOver={e => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('collegeIdInput')?.click()}
                >
                  <input
                    id="collegeIdInput"
                    type="file"
                    name="collegeId"
                    accept="image/*,application/pdf"
                    required
                    onChange={handleFormChange}
                    className="hidden"
                  />
                  {collegeIdUploadStatus === 'idle' && (
                    <>
                      <Upload className="w-8 h-8 text-purple-400 mb-2" />
                      <span className="text-sm text-gray-500">Drag & drop or <span className="underline text-purple-600">browse</span> to upload</span>
                      <span className="text-xs text-gray-400 mt-1">Accepted: image or PDF</span>
                    </>
                  )}
                  {form.collegeId && (
                    <span className="text-xs text-gray-700 mt-2">{form.collegeId.name}</span>
                  )}
                  {collegeIdUploadStatus === 'uploading' && (
                    <span className="flex items-center gap-2 text-xs text-blue-500 mt-2"><Loader2 className="animate-spin w-4 h-4" /> Uploading ID card...</span>
                  )}
                  {collegeIdUploadStatus === 'success' && (
                    <span className="flex items-center gap-2 text-xs text-green-600 mt-2"><CheckCircle2 className="w-4 h-4" /> ID card uploaded successfully.</span>
                  )}
                  {collegeIdUploadStatus === 'error' && (
                    <span className="flex items-center gap-2 text-xs text-red-600 mt-2"><XCircle className="w-4 h-4" /> Failed to upload ID card. <span className="underline cursor-pointer" onClick={e => { e.stopPropagation(); setCollegeIdUploadStatus('idle'); setForm(f => ({ ...f, collegeId: null })); }}>Try again</span></span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivation *</label>
                <textarea name="motivation" required value={form.motivation} onChange={handleFormChange} rows={3} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200" placeholder="Tell us why you're interested in this internship program..." />
              </div>
              {/* Coupon Code */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                  <span className="ml-2 text-xs text-white px-3 py-1 rounded-full bg-purple-600 inline-block">Need a coupon? Call us at 91-8860146146</span>
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => { setCouponCode(e.target.value); setCouponStatus('idle'); setCouponMessage(''); setCouponFee(null); }}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white"
                    placeholder="Enter coupon code"
                    disabled={submitting || paymentProcessing}
                  />
                  <button
                    type="button"
                    onClick={handleValidateCoupon}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-60"
                    disabled={couponStatus === 'validating' || !couponCode || submitting || paymentProcessing}
                  >
                    {couponStatus === 'validating' ? 'Validating...' : 'Validate'}
                  </button>
                </div>
                
                {couponStatus === 'valid' && (
                  <span className="text-xs text-green-600 mt-1">Coupon code applied successfully. Fee: ₹{couponFee}</span>
                )}
                {couponStatus === 'invalid' && (
                  <span className="text-xs text-red-600 mt-1">{couponMessage}</span>
                )}
              </div>

              <div className="col-span-1 md:col-span-2 pt-2">
                {couponStatus === 'valid' ? (
                  <button
                    type="button"
                    disabled={submitting || paymentProcessing}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all text-lg disabled:opacity-60 flex items-center justify-center gap-2"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    {submitting && <Loader2 className="animate-spin w-5 h-5" />} Complete Payment
                  </button>
                ) : (
                  <button type="button" disabled className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 opacity-60 cursor-not-allowed shadow-lg text-lg flex items-center justify-center gap-2">
                    Complete Payment
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Certificate Verification Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verification</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Already completed your internship? Verify your certificate and download it instantly. 
              Enter your registered email address to access your certificate.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="email"
                    value={certificateEmail}
                    onChange={(e) => setCertificateEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    disabled={certificateStatus === 'verifying'}
                  />
                </div>
              </div>

              <button
                onClick={handleCertificateVerification}
                disabled={!certificateEmail.trim() || certificateStatus === 'verifying'}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {certificateStatus === 'verifying' ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify Certificate
                  </>
                )}
              </button>

              {/* Status Messages */}
              {certificateStatus === 'not_found' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">No certificate found</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    We couldn't find a completed internship certificate for this email address. 
                    Please ensure you have completed the internship program and payment.
                  </p>
                </div>
              )}

              {certificateStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Verification failed</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    An error occurred during verification. Please try again or contact support.
                  </p>
                </div>
              )}

              {certificateStatus === 'found' && certificateData && (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg font-semibold">Certificate Found!</span>
                  </div>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div><span className="font-medium text-gray-900">Name:</span> <span className="text-black">{certificateData.full_name}</span></div>
                    <div><span className="font-medium text-gray-900">Program:</span> <span className="text-black">{certificateData.program}</span></div>
                    <div><span className="font-medium text-gray-900">College:</span> <span className="text-black">{certificateData.college_name}</span></div>
                    <div><span className="font-medium text-gray-900">Certificate SSN:</span> <span className="text-black">{certificateData.certificate_ssn}</span></div>
                  </div>

                  {/* QR Code Display */}
                  <div className="text-center mb-6">
                    <div className="inline-block bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
                      {qrCodeUrl ? (
                        <img 
                          src={qrCodeUrl} 
                          alt="Certificate QR Code" 
                          className="w-48 h-48"
                        />
                      ) : (
                        <div className="w-48 h-48 flex items-center justify-center">
                          <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan this QR code to verify certificate authenticity
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <button
                      onClick={viewCertificate}
                      className="flex-1 py-2 px-4 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Certificate
                    </button>
                    <button
                      onClick={downloadCertificate}
                      className="flex-1 py-2 px-4 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </button>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Note:</strong> Your certificate is stored as a PDF. If the PDF is not available, 
                      a text version will be downloaded or you can reach out to us for the support.
                    </p>
                  </div>

                  <button
                    onClick={resetCertificateVerification}
                    className="mt-4 text-sm text-purple-600 hover:text-purple-700 underline"
                  >
                    Verify another certificate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" 
              onClick={() => setShowPaymentModal(false)}
              disabled={paymentProcessing || submitting}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Confirm Your Details</h2>
            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <div><span className="font-medium">Full Name:</span> {form.fullName}</div>
              <div><span className="font-medium">College:</span> {form.collegeName}</div>
              <div><span className="font-medium">Program:</span> {form.program}</div>
              <div><span className="font-medium">Mobile:</span> {form.mobile}</div>
              <div><span className="font-medium">Email:</span> {form.collegeEmail}</div>
              <div><span className="font-medium">Coupon Code:</span> {couponCode}</div>
              <div><span className="font-medium">Fee:</span> ₹{couponFee}</div>
            </div>
            {paymentError && <div className="text-red-600 text-sm mb-2">{paymentError}</div>}
            <button
              type="button"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handlePayNow}
              disabled={paymentProcessing || submitting}
            >
              {paymentProcessing ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Processing Payment...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Internships; 