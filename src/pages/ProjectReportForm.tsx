import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Plus,
  Minus,
  X,
  CreditCard,
  QrCode,
  Smartphone,
} from 'lucide-react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

interface FriendDetails {
  name: string;
  rollNumber: string;
}

interface FormStep {
  label: string;
  completed: boolean;
}

function ProjectReportForm() {
  const [friends, setFriends] = useState<FriendDetails[]>([
    { name: '', rollNumber: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [reportType, setReportType] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    'card' | 'qr' | 'upi' | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBackendTech, setSelectedBackendTech] = useState<string[]>([]);
  const [selectedFrontendTech, setSelectedFrontendTech] = useState<string[]>(
    []
  );
  const [formData, setFormData] = useState({
    directorName: '',
    professorName: '',
    hodName: '',
    affiliatedCollegeName: '',
    affiliatedCollegeAddress: '',
    collegeLogo: null as File | null,
    affiliatedCollegeLogo: null as File | null,
  });

  const steps: FormStep[] = [
    { label: 'Basic Details', completed: false },
    { label: 'College Information', completed: false },
    { label: 'Technologies', completed: false },
    { label: 'Group Details', completed: false },
  ];

  const backendTechnologies = [
    'Node.js',
    'Python',
    'Java',
    'PHP',
    'Ruby',
    'Go',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Express.js',
    'Django',
    'Spring Boot',
    'Laravel',
  ];

  const frontendTechnologies = [
    'React',
    'Angular',
    'Vue.js',
    'Next.js',
    'Svelte',
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'Material UI',
    'Bootstrap',
    'Redux',
    'GraphQL',
    'REST API',
  ];

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const addFriend = () => {
    setFriends([...friends, { name: '', rollNumber: '' }]);
  };

  const removeFriend = (index: number) => {
    const newFriends = friends.filter((_, i) => i !== index);
    setFriends(newFriends);
  };

  const handleFriendChange = (
    index: number,
    field: keyof FriendDetails,
    value: string
  ) => {
    const newFriends = friends.map((friend, i) => {
      if (i === index) {
        return { ...friend, [field]: value };
      }
      return friend;
    });
    setFriends(newFriends);
  };

  const handleTechSelect = (tech: string, type: 'frontend' | 'backend') => {
    if (type === 'frontend') {
      setSelectedFrontendTech((prev) =>
        prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
      );
    } else {
      setSelectedBackendTech((prev) =>
        prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle success - redirect or show success message
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/student-hub"
            className="inline-flex items-center text-white hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Student Hub
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <Box p={4} borderBottom={1} borderColor="divider">
            <Typography variant="h4" gutterBottom>
              Project Report Details
            </Typography>
            <Typography variant="body1" color="textSecondary">
              This section outlines the essential information that students must
              include in their project report. It covers all necessary
              components such as objectives, methodology, results, and
              conclusions. By filling in these details, students will ensure
              their report is complete, well-structured, and meets the
              requirements for a successful project submission.
            </Typography>
          </Box>

          <Box p={4}>
            <Stepper activeStep={activeStep} className="mb-8">
              {steps.map((step, index) => (
                <Step key={index} completed={step.completed}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit} className="space-y-8">
              {activeStep === 0 && (
                <Paper
                  elevation={0}
                  className="p-6 border rounded-xl space-y-6"
                >
                  <Typography variant="h6" gutterBottom>
                    Basic Details
                  </Typography>

                  <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Project Report Type</InputLabel>
                      <Select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        label="Project Report Type"
                        required
                      >
                        <MenuItem value="major">Major Project</MenuItem>
                        <MenuItem value="minor">Minor Project</MenuItem>
                        <MenuItem value="synopsis">Synopsis</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Email"
                      type="email"
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </Box>

                  <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                    <TextField
                      label="Director Name"
                      required
                      fullWidth
                      variant="outlined"
                      value={formData.directorName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          directorName: e.target.value,
                        }))
                      }
                    />
                    <TextField
                      label="Professor Name"
                      required
                      fullWidth
                      variant="outlined"
                      value={formData.professorName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          professorName: e.target.value,
                        }))
                      }
                    />
                  </Box>

                  <Box display="grid" gridTemplateColumns="1fr" gap={4}>
                    <TextField
                      label="HOD Name"
                      required
                      fullWidth
                      variant="outlined"
                      value={formData.hodName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hodName: e.target.value,
                        }))
                      }
                    />
                  </Box>

                  <Box display="grid" gridTemplateColumns="1fr" gap={4}>
                    <TextField
                      label="Affiliated College Name"
                      required
                      fullWidth
                      variant="outlined"
                      value={formData.affiliatedCollegeName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          affiliatedCollegeName: e.target.value,
                        }))
                      }
                    />
                  </Box>

                  <TextField
                    label="Affiliated College Address"
                    required
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={formData.affiliatedCollegeAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        affiliatedCollegeAddress: e.target.value,
                      }))
                    }
                  />

                  <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        College Logo
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Upload />}
                        fullWidth
                      >
                        Upload Logo
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData((prev) => ({
                                ...prev,
                                collegeLogo: file,
                              }));
                            }
                          }}
                        />
                      </Button>
                      {formData.collegeLogo && (
                        <Typography variant="caption" color="textSecondary">
                          {formData.collegeLogo.name}
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Affiliated College Logo
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Upload />}
                        fullWidth
                      >
                        Upload Logo
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData((prev) => ({
                                ...prev,
                                affiliatedCollegeLogo: file,
                              }));
                            }
                          }}
                        />
                      </Button>
                      {formData.affiliatedCollegeLogo && (
                        <Typography variant="caption" color="textSecondary">
                          {formData.affiliatedCollegeLogo.name}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              )}

              {activeStep === 1 && (
                <Paper
                  elevation={0}
                  className="p-6 border rounded-xl space-y-6"
                >
                  <Typography variant="h6" gutterBottom>
                    College Information
                  </Typography>

                  <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                    <TextField
                      label="College Name"
                      required
                      fullWidth
                      variant="outlined"
                    />

                    <TextField
                      label="Department"
                      required
                      fullWidth
                      variant="outlined"
                    />

                    <TextField
                      label="Roll Number"
                      required
                      fullWidth
                      variant="outlined"
                    />

                    <TextField
                      label="Semester"
                      required
                      fullWidth
                      variant="outlined"
                    />
                  </Box>

                  <TextField
                    label="College Address"
                    required
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Paper>
              )}

              {activeStep === 2 && (
                <Paper
                  elevation={0}
                  className="p-6 border rounded-xl space-y-6"
                >
                  <Typography variant="h6" gutterBottom>
                    Technologies
                  </Typography>

                  <Box className="space-y-6">
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        Backend Technologies
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {backendTechnologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            onClick={() => handleTechSelect(tech, 'backend')}
                            color={
                              selectedBackendTech.includes(tech)
                                ? 'primary'
                                : 'default'
                            }
                            variant={
                              selectedBackendTech.includes(tech)
                                ? 'filled'
                                : 'outlined'
                            }
                            className="cursor-pointer"
                          />
                        ))}
                      </Box>
                    </div>

                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        Frontend Technologies
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {frontendTechnologies.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            onClick={() => handleTechSelect(tech, 'frontend')}
                            color={
                              selectedFrontendTech.includes(tech)
                                ? 'primary'
                                : 'default'
                            }
                            variant={
                              selectedFrontendTech.includes(tech)
                                ? 'filled'
                                : 'outlined'
                            }
                            className="cursor-pointer"
                          />
                        ))}
                      </Box>
                    </div>
                  </Box>
                </Paper>
              )}

              {activeStep === 3 && (
                <Paper
                  elevation={0}
                  className="p-6 border rounded-xl space-y-6"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Typography variant="h6">
                      Group Details (Optional)
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={addFriend}
                      startIcon={<Plus className="h-4 w-4" />}
                    >
                      Add Member
                    </Button>
                  </Box>

                  {friends.map((friend, index) => (
                    <Box key={index} className="space-y-4">
                      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                        <TextField
                          label="Name"
                          value={friend.name}
                          onChange={(e) =>
                            handleFriendChange(index, 'name', e.target.value)
                          }
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Roll Number"
                          value={friend.rollNumber}
                          onChange={(e) =>
                            handleFriendChange(
                              index,
                              'rollNumber',
                              e.target.value
                            )
                          }
                          fullWidth
                          variant="outlined"
                        />
                      </Box>
                      {friends.length > 1 && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => removeFriend(index)}
                          startIcon={<Minus className="h-4 w-4" />}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>
                  ))}
                </Paper>
              )}

              <Box display="flex" justifyContent="space-between" pt={3}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="outlined"
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => setShowPaymentModal(true)}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={20} className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Payment'
                    )}
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNext}>
                    Continue
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </motion.div>

        {/* Payment Modal */}
        {showPaymentModal && (
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
                  <h2 className="text-xl font-semibold">Complete Purchase</h2>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Generate your project report for ₹20
                </p>
              </div>

              {/* Payment Methods */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedMethod('card')}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      selectedMethod === 'card'
                        ? 'border-black bg-black/5'
                        : 'border-gray-200 hover:border-black/20'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">
                        Pay securely with your card
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('qr')}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      selectedMethod === 'qr'
                        ? 'border-black bg-black/5'
                        : 'border-gray-200 hover:border-black/20'
                    }`}
                  >
                    <QrCode className="h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Scan QR Code</div>
                      <div className="text-sm text-gray-500">
                        Pay using any UPI app
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('upi')}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      selectedMethod === 'upi'
                        ? 'border-black bg-black/5'
                        : 'border-gray-200 hover:border-black/20'
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">UPI ID / Number</div>
                      <div className="text-sm text-gray-500">
                        Pay using UPI ID or number
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsProcessing(true);
                    // Simulate payment processing
                    setTimeout(() => {
                      setIsProcessing(false);
                      setShowPaymentModal(false);
                      handleSubmit();
                    }, 2000);
                  }}
                  disabled={!selectedMethod || isProcessing}
                  className="w-full py-3 bg-black text-white rounded-xl font-medium
                           hover:bg-gray-800 transition-colors disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: 'white', marginRight: '8px' }}
                      />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹20`
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By completing this purchase you agree to our terms of service
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectReportForm;
