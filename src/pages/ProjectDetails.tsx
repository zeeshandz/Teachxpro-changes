import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  ChevronDown,
  ChevronUp,
  FileText,
  Database,
  Code2,
  X,
  Loader2,
  CreditCard,
  QrCode,
  Smartphone,
  Eye,
  Info,
  Book,
  Layout,
  TestTube,
  FileSearch,
  Lightbulb,
  Workflow,
  ArrowRight,
  GitBranch,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  stream: string[];
  likes: number;
  category: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Library Management System Project Report',
    description:
      'A system to manage library books and users. It provides book lending, returns, and catalog management functionalities.',
    likes: 70,
    category: 'Education',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '2',
    title: 'Online Voting System Project Report',
    description:
      'A secure online platform for voting in elections. It ensures transparency and prevents multiple votes from the same user.',
    likes: 68,
    category: 'Government',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '3',
    title: 'Hotel Management System Project Report',
    description:
      'A software for managing hotel bookings, guest records, and room allocations efficiently.',
    likes: 66,
    category: 'Hospitality',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '4',
    title: 'Job Portal Project Report',
    description:
      'An online job portal for recruiters and job seekers. Users can apply for jobs and manage resumes easily.',
    likes: 72,
    category: 'Employment',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '5',
    title: 'Car Rental System Project Report',
    description:
      'A platform for renting cars online. Users can select vehicles, book rentals, and manage bookings.',
    likes: 67,
    category: 'Transportation',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '6',
    title: 'Real Estate Management System Project Report',
    description:
      'A real estate platform for listing, buying, and selling properties. Users can view listings and schedule visits.',
    likes: 69,
    category: 'Real Estate',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '7',
    title: 'E-Learning Platform Project Report',
    description:
      'An educational platform offering courses and quizzes. Users can enroll, complete lessons, and receive certifications.',
    likes: 71,
    category: 'Education',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '8',
    title: 'Gym Management System Project Report',
    description:
      'A system for managing gym memberships, trainer schedules, and workout plans efficiently.',
    likes: 64,
    category: 'Health & Fitness',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '9',
    title: 'Crowdfunding Platform Project Report',
    description:
      'A crowdfunding platform to raise funds for projects. Users can create campaigns and receive donations securely.',
    likes: 73,
    category: 'Finance',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '10',
    title: 'Event Management System Project Report',
    description:
      'A system for organizing and managing events. Users can create, book, and promote events easily.',
    likes: 75,
    category: 'Event Planning',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '11',
    title: 'Weather Forecasting App Project Report',
    description:
      'An application providing real-time weather updates and forecasts. Users can view location-based climate data.',
    likes: 62,
    category: 'Weather',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '12',
    title: 'Hotel Booking System Project Report',
    description:
      'A platform for booking hotel rooms with real-time availability. Users can browse hotels, check prices, and confirm bookings instantly.',
    likes: 56,
    category: 'Hospitality',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '13',
    title: 'E-Commerce Website Project Report',
    description:
      'An online store with cart and payment gateway integration. It provides users with a seamless shopping experience, allowing secure transactions.',
    likes: 65,
    category: 'E-Commerce',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '14',
    title: 'Inventory Management System Project Report',
    description:
      'A system to manage stock levels and purchases. Businesses can track product availability and automate order processing.',
    likes: 54,
    category: 'Business',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '15',
    title: 'Food Delivery App Project Report',
    description:
      'A food ordering app with real-time tracking. Customers can browse menus, order food, and track delivery in real-time.',
    likes: 59,
    category: 'Food',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '16',
    title: 'Task Management App Project Report',
    description:
      'A Kanban-style task management system. Users can create, assign, and track tasks efficiently, improving productivity.',
    likes: 61,
    category: 'Productivity',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '17',
    title: 'AI Chatbot Project Report',
    description:
      'A chatbot powered by AI for customer service. It uses NLP to provide automated responses and assist customers efficiently.',
    likes: 64,
    category: 'AI',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '18',
    title: 'Personal Finance Manager Project Report',
    description:
      'An app to track expenses and manage budgets. Users can set financial goals, categorize expenses, and analyze spending habits.',
    likes: 52,
    category: 'Finance',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '19',
    title: 'Healthcare Appointment Booking Project Report',
    description:
      'A system for scheduling doctor appointments. Patients can book consultations, receive reminders, and manage medical visits easily.',
    likes: 58,
    category: 'Healthcare',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
  {
    id: '20',
    title: 'Social Media App Project Report',
    description:
      'A social networking platform for connecting people. Users can create profiles, share posts, and interact with their network.',
    likes: 60,
    category: 'Social',
    features: [
      'Book Management',
      'Member Management',
      'Lending System',
      'Fine Calculation',
    ],
    stream: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME'],
  },
];

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const project = projects.find((p) => p.id === id);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    'card' | 'qr' | 'upi' | null
  >(null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Link to="/student-hub" className="text-blue-600 hover:underline">
            Return to Student Hub
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      // Here you would trigger the actual download
    }, 2000);
  };

  const handlePreviewClick = () => {
    window.open(
      'https://online.visual-paradigm.com/share/book/report-21xpatnuht',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const sections = [
    {
      id: 'introduction',
      icon: <Lightbulb className="h-5 w-5 text-blue-600" />,
      title: 'Introduction',
      content: [
        'Introduction',
        'AIM',
        'Existing System',
        'Proposed System',
        'Feasibility Study',
        'Project Work Schedule',
        'Organization of Report',
      ],
    },
    {
      id: 'requirements',
      icon: <Layout className="h-5 w-5 text-purple-600" />,
      title: 'Software Requirements Specification',
      content: ['Hardware Requirements', 'Software Requirements'],
    },
    {
      id: 'design',
      icon: <Workflow className="h-5 w-5 text-green-600" />,
      title: 'Design & Planning',
      content: [
        'Software Development Life Cycle Model',
        'General Overview',
        'Use Flow Diagram',
        'ER Diagram',
        'DFD Diagram',
      ],
    },
    {
      id: 'implementation',
      icon: <GitBranch className="h-5 w-5 text-orange-600" />,
      title: 'Implementation Details',
      content: ['FronEnd Technology', 'Backend Technology'],
    },
    {
      id: 'testing',
      icon: <TestTube className="h-5 w-5 text-red-600" />,
      title: 'Testing',
      content: [
        'Unit Testing',
        'Integration Testing',
        'Software Verification & Validation',
        'Black-Box Testing',
        'White-Box Testing',
        'System Testing',
      ],
    },
    {
      id: 'other',
      icon: <Layout className="h-5 w-5 text-red-600" />,
      title: 'Other Important Section',
      content: ['Result', 'Advantages', 'Conclusion', 'Bibliography'],
    },
  ];

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

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h1 className="text-3xl font-bold mb-4">
                {project.title} | PDF Report for B.Tech Final Year
              </h1>
              <p className="text-gray-600 mb-6">{project.description}</p>

              {/* Project Overview Section */}
              <div className="space-y-6 mb-8">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-semibold">Overview</h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Our {project.title} project report is designed to help
                    students and developers understand and implement a robust
                    system. This final year project report includes
                    comprehensive documentation, detailed explanations, and
                    source code in various programming languages.
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Book className="h-6 w-6 text-purple-600" />
                    <h2 className="text-lg font-semibold">
                      What's Included in the Library Management System Project
                      Report?
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    In this project report, you'll find a detailed analysis of
                    the Library Management System, including essential
                    components like ER Diagram, DFD Diagram, Waterfall Model,
                    Flow Chart, Technology Stack, Testing Cases, References,
                    Indexing, IEEE Standards, and Gantt Chart. This report is
                    designed to guide you through the development process of a
                    Library Management System, making it an ideal resource for
                    final year students.
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <FileSearch className="h-6 w-6 text-green-600" />
                    <h2 className="text-lg font-semibold">
                      Detailed Project Report for Final Year Students
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    This final year project report on {project.title} is an
                    invaluable resource. The report includes detailed project
                    documentation, source code, and step-by-step instructions.
                    Click the link below to download the {project.title} project
                    report in PDF.
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>ER Diagram:</strong> Include a detailed ER
                          Diagram to visualize the database structure of your
                          Payroll Management System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>DFD Diagram:</strong> Create a DFD Diagram to
                          illustrate the flow of data within your Payroll
                          Management System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>Waterfall Model:</strong> Utilize the
                          Waterfall Model to ensure a systematic and structured
                          approach to software development.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>Flow Chart:</strong> Develop a Flow Chart to
                          represent the workflow of your Payroll Management
                          System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>Technology Stack:</strong> Choose the
                          appropriate technology stack based on your project
                          requirements and constraints.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>Testing Cases:</strong> Create comprehensive
                          testing cases to ensure the functionality and
                          reliability of your Payroll Management System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>References:</strong> Provide references to the
                          sources and materials used in the development of your
                          Payroll Management System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>Indexing:</strong> Implement indexing to
                          optimize the performance of your Payroll Management
                          System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>IEEE Standards:</strong> Adhere to IEEE
                          standards to ensure the quality and reliability of
                          your Payroll Management System.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-black" />
                        <p className="text-gray-600">
                          <strong>Gantt Chart:</strong> Use a Gantt Chart to
                          visualize the project timeline and track progress
                          throughout the development process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Report Suitable for</h3>
                  <ul className="text-sm space-y-1">
                    {project.stream.map((stream, index) => (
                      <li key={index}>• {stream}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="text-sm space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Project Report Content */}
              <div className="space-y-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {section.icon}
                        <span className="font-medium">{section.title}</span>
                      </div>
                      {expandedSections[section.id] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>

                    {expandedSections[section.id] && (
                      <div className="p-4 space-y-2">
                        {section.content.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold mb-4">Project Report</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Documentation</div>
                    <div className="text-sm text-gray-500">
                      Complete project report
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Database className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Database Design</div>
                    <div className="text-sm text-gray-500">
                      ER diagrams & schema
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Code2 className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Source Code</div>
                    <div className="text-sm text-gray-500">
                      Implementation files
                    </div>
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                  onClick={() => navigate('/student-hub/project/report')}
                >
                  <Download className="h-5 w-5" />
                  Download Full Report (₹20)
                </button>

                <button
                  onClick={handlePreviewClick}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-black text-black rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Eye className="h-5 w-5" />
                  Preview Sample Report
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2 text-sm">
                <li>• ER & DFD Diagrams</li>
                <li>• Waterfall Model</li>
                <li>• Flow Chart</li>
                <li>• Technology</li>
                <li>• Testing Case</li>
                <li>• Refferences</li>
                <li>• Gantt Charts</li>
                <li>• IEEE Standards</li>
                <li>• Indexing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Download complete project report for ₹20
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
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className="w-full py-3 bg-black text-white rounded-xl font-medium
                         hover:bg-gray-800 transition-colors disabled:opacity-50
                         disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
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
  );
}

export default ProjectDetails;
