import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  Book,
  Calendar,
  Github,
  Linkedin,
  Users as UsersIcon,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  AlertCircle,
  Brain,
  Laptop,
  Database,
  Code2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { initializeRazorpay } from '../lib/razorpay';

interface HackathonRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  hackathon?: any;
}

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  other_course: string;
  graduation_year: string;
  github_username: string;
  linkedin_url: string;
  team_size: string;
  team_members: string[];
  project_idea: string;
  experience_level: string;
  technologies: string;
  timezone: string;
  project_interests: string[];
}

const HackathonRegistrationForm = ({
  isOpen,
  onClose,
  hackathon,
}: HackathonRegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    other_course: '',
    graduation_year: '',
    github_username: '',
    linkedin_url: '',
    team_size: '1',
    team_members: [],
    project_idea: '',
    experience_level: 'beginner',
    technologies: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    project_interests: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(0);
      setSuccess(false);
      setError(null);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        university: '',
        course: '',
        other_course: '',
        graduation_year: '',
        github_username: '',
        linkedin_url: '',
        team_size: '1',
        team_members: [],
        project_idea: '',
        experience_level: 'beginner',
        technologies: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        project_interests: [],
      });
    }, 300);
  };

  const steps = useMemo(() => [
    {
      name: 'Personal Info',
      fields: ['full_name', 'email', 'phone', 'university', 'course', 'graduation_year']
    },
    {
      name: 'Technical Profile',
      fields: ['github_username', 'linkedin_url', 'experience_level', 'technologies', 'project_interests']
    },
    {
      name: 'Team Details',
      fields: ['team_size', 'team_members']
    },
    {
      name: 'Review & Submit',
      fields: []
    }
  ], []);

  const validateStep = (step: number) => {
    if (step === 0 && formData.course === 'Other' && !formData.other_course.trim()) {
      return false;
    }
    const currentFields = steps[step].fields;
    for (const field of currentFields) {
      const value = formData[field as keyof FormData];
      if (field === 'team_members') {
        if (formData.team_size !== '1') {
          for (let i = 0; i < parseInt(formData.team_size) - 1; i++) {
            if (!formData.team_members[i]) return false;
          }
        }
      } else if (typeof value === 'string' && !value.trim()) {
        if (field !== 'linkedin_url' && field !== 'github_username' && field !== 'technologies' && field !== 'project_idea') {
            return false;
        }
      } else if (Array.isArray(value) && value.length === 0) {
        if (field === 'project_interests') return false;
      }
    }
    return true;
  };
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setError(null);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setError('Please fill out all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'team_size' && value === '1') {
      setFormData((prev) => ({ ...prev, [name]: value, team_members: [] }));
    } else if (name === 'course' && value !== 'Other') {
      setFormData((prev) => ({ ...prev, course: value, other_course: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const newTeamMembers = [...formData.team_members];
    newTeamMembers[index] = value;
    setFormData((prev) => ({ ...prev, team_members: newTeamMembers }));
  };

  const handleProjectInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      project_interests: prev.project_interests.includes(interest)
        ? prev.project_interests.filter((i) => i !== interest)
        : [...prev.project_interests, interest],
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) {
      setError('Please complete all previous steps.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (hackathon?.type === 'paid') {
        handlePayNow();
        return;
      }

      await handleFormSubmitAfterPayment();

    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to submit registration. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    setPaymentProcessing(true);
    setPaymentError('');
    try {
      const { data: orderData, error: orderError } = await supabase
        .functions.invoke('create-razorpay-order', {
          body: {
            amount: hackathon.fees * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
              hackathonName: hackathon.name,
              email: formData.email,
              name: formData.full_name
            }
          }
        });
      if (orderError) throw new Error('Failed to create order');
      const razorpay = await initializeRazorpay();
      if (!razorpay) throw new Error('Razorpay SDK failed to load');
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'teachXpro',
        description: hackathon.name,
        order_id: orderData.id,
        image: 'https://teachxpro.com/logo.png',
        handler: async function (response: any) {
          try {
            const { data: verificationData, error: verificationError } = await supabase
              .functions.invoke('verify-razorpay-payment', {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                }
              });
            if (verificationError) throw new Error('Payment verification failed');
            if (!verificationData?.success) throw new Error(verificationData?.error || 'Payment verification failed');
            await handleFormSubmitAfterPayment(response);
          } catch (err) {
            setPaymentError(err instanceof Error ? err.message : 'Payment processing failed');
          } finally {
             setPaymentProcessing(false);
          }
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#7c3aed' },
        modal: {
          ondismiss: function() {
            setPaymentProcessing(false);
            setIsSubmitting(false);
          }
        }
      };
      const rzp = new razorpay(options);
      // @ts-ignore
      rzp.on('payment.failed', function (response: any) {
        setPaymentError(response.error.description || 'Payment failed. Please try again.');
        setPaymentProcessing(false);
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setPaymentProcessing(false);
      setIsSubmitting(false);
    }
  };

  const handleFormSubmitAfterPayment = async (razorpayResponse?: any) => {
    setIsSubmitting(true);
    try {
      const { other_course, ...submissionData } = formData;
      if (submissionData.course === 'Other') {
        submissionData.course = other_course;
      }
      
      const { error: insertError } = await supabase.from('hackathon_registrations').insert([
        {
          ...submissionData,
          team_members: formData.team_members.filter(Boolean),
          registration_date: new Date().toISOString(),
          hackathon_id: hackathon.id,
          hackathon_name: hackathon.name,
          razorpay_payment_id: razorpayResponse?.razorpay_payment_id,
          razorpay_order_id: razorpayResponse?.razorpay_order_id,
          razorpay_signature: razorpayResponse?.razorpay_signature,
          payment_status: razorpayResponse ? 'completed' : 'pending'
        }
      ]);
      if (insertError) throw insertError;
      
      // Send confirmation email
      try {
        await supabase.functions.invoke('send-hackathon-email', {
          body: {
            user_email: formData.email,
            user_name: formData.full_name,
            hackathon_name: hackathon.name,
            what_to_build: hackathon.whatToBuild,
            deliverables: hackathon.deliverables,
            submission_deadline: hackathon.registrationDeadline
          }
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't block the user flow if email fails, just log it.
      }

      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectCategories = [
    { id: 'web', label: 'Web Development', icon: Globe },
    { id: 'mobile', label: 'Mobile Apps', icon: Phone },
    { id: 'ai', label: 'AI & ML', icon: Brain },
    { id: 'backend', label: 'Backend Systems', icon: Laptop },
    { id: 'database', label: 'Database Design', icon: Database },
    { id: 'fullstack', label: 'Full Stack', icon: Code2 },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField icon={User} label="Full Name *" name="full_name" value={formData.full_name} onChange={handleChange} required />
              <InputField icon={Mail} label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <InputField icon={Phone} label="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              <InputField icon={Building2} label="University/College *" name="university" value={formData.university} onChange={handleChange} required />
              <SelectField icon={Book} label="Course/Degree *" name="course" value={formData.course} onChange={handleChange} required>
                <option value="">Select your course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Data Science">Data Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Other">Other</option>
              </SelectField>
              {formData.course === 'Other' && (
                <InputField icon={Book} label="Please specify your course" name="other_course" value={formData.other_course} onChange={handleChange} required placeholder="Your course/degree" />
              )}
              <SelectField icon={Calendar} label="Year of Study *" name="graduation_year" value={formData.graduation_year} onChange={handleChange} required>
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </SelectField>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Technical Profile</h3>
            <div className="space-y-6">
              <InputField icon={Github} label="GitHub Username" name="github_username" value={formData.github_username} onChange={handleChange} />
              <InputField icon={Linkedin} label="LinkedIn Profile URL" name="linkedin_url" type="url" value={formData.linkedin_url} onChange={handleChange} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Interests</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {projectCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleProjectInterestToggle(category.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          formData.project_interests.includes(category.id)
                            ? 'bg-purple-100 border-purple-500 text-purple-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Team Information</h3>
            <div className="space-y-6">
              <SelectField icon={UsersIcon} label="Team Size *" name="team_size" value={formData.team_size} onChange={handleChange} required>
                <option value="1">Solo</option>
                <option value="2">2 members</option>
                <option value="3">3 members</option>
                <option value="4">4 members</option>
              </SelectField>
              {formData.team_size !== '1' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Enter team member names:</p>
                  {Array.from({ length: parseInt(formData.team_size) - 1 }).map((_, index) => (
                    <InputField
                      key={index}
                      icon={User}
                      label={`Team Member ${index + 2}`}
                      placeholder={`Team Member ${index + 2}`}
                      value={formData.team_members[index] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTeamMemberChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Review & Submit</h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <ReviewItem label="Full Name" value={formData.full_name} />
              <ReviewItem label="Email" value={formData.email} />
              <ReviewItem label="Phone" value={formData.phone} />
              <ReviewItem label="University" value={formData.university} />
              <ReviewItem label="Course" value={formData.course === 'Other' ? formData.other_course : formData.course} />
              <ReviewItem label="Year of Study" value={`${formData.graduation_year} Year`} />
              <ReviewItem label="Team Size" value={formData.team_size === '1' ? 'Solo' : `${formData.team_size} members`} />
              {formData.team_size !== '1' && <ReviewItem label="Team Members" value={formData.team_members.join(', ')} />}
              <ReviewItem label="Project Interests" value={formData.project_interests.join(', ')} />
              {hackathon?.type === 'paid' && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <ReviewItem label="Registration Fee" value={`₹${hackathon.fees}`} />
                </div>
              )}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
              onClick={handleClose}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle"
            >
              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
                  onClick={handleClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                    Hackathon Registration
                  </h2>
                  <p className="text-center text-gray-500 mt-1">for {hackathon?.name}</p>
                </div>

                {/* Stepper */}
                <div className="flex justify-center items-center mb-8">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            ${currentStep > index ? 'bg-green-500 text-white' : ''}
                            ${currentStep === index ? 'bg-purple-600 text-white' : ''}
                            ${currentStep < index ? 'bg-gray-200 text-gray-500' : ''}
                          `}
                        >
                          {currentStep > index ? <CheckCircle size={20} /> : index + 1}
                        </div>
                        <p className={`mt-2 text-xs text-center font-semibold ${currentStep >= index ? 'text-purple-600' : 'text-gray-500'}`}>{step.name}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-auto border-t-2 transition-all duration-300 mx-4 w-16
                          ${currentStep > index ? 'border-green-500' : 'border-gray-200'}
                        `}></div>
                      )}
                    </div>
                  ))}
                </div>

                {success ? (
                   <div className="text-center py-12">
                     <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{type: 'spring', stiffness: 300, damping: 20}}>
                       <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4"/>
                       <h3 className="text-2xl font-bold text-gray-800">Registration Successful!</h3>
                       <p className="text-gray-600 mt-2">Thank you for registering. We'll be in touch soon with more details.</p>
                     </motion.div>
                   </div>
                ) : (
                  <div className="space-y-8">
                    <AnimatePresence mode="wait">
                      {renderStepContent()}
                    </AnimatePresence>

                    {error && (
                      <div className="rounded-md bg-red-50 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500"/>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}
                    
                    {paymentError && (
                      <div className="rounded-md bg-red-50 p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500"/>
                        <p className="text-sm text-red-700">{paymentError}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      
                      {currentStep < steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 flex items-center gap-2"
                        >
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting || paymentProcessing}
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed w-48 text-center flex justify-center items-center"
                        >
                          {isSubmitting || paymentProcessing ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                          ) : hackathon?.type === 'paid' ? (
                            <>
                              <CreditCard className="mr-2 h-5 w-5" />
                              Pay ₹{hackathon.fees} & Submit
                            </>
                          ) : (
                             'Submit Application'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const InputField = ({ icon: Icon, label, ...props }: { icon: React.ElementType, label?: string, [key: string]: any }) => (
  <div>
    {label && <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white transition"
      />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, children, ...props }: { icon: React.ElementType, label: string, children: React.ReactNode, [key: string]: any }) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <select
        {...props}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white appearance-none transition"
      >
        {children}
      </select>
    </div>
  </div>
);

const ReviewItem = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-sm text-gray-800 font-semibold text-right">{value || '-'}</p>
  </div>
);

export default HackathonRegistrationForm;