import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  Code2,
  ShoppingCart,
  Library,
  Vote,
  Hotel,
  Briefcase,
  Car,
  Home,
  GraduationCap,
  Dumbbell,
  PiggyBank,
  CalendarDays,
  Cloud,
  Building,
  ShoppingBag,
  Package,
  Utensils,
  ListTodo,
  Bot,
  Wallet,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  likes: number;
  category: string;
  features: string[];
  stream: string[];
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

const categories = [
  'All',
  'AI/ML',
  'Data Visualization',
  'Healthcare',
  'Mobile',
  'Web',
];

// Random data for notifications
const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'India',
  'Spain',
];

const timeFrames = [
  '2 minutes',
  '5 minutes',
  '10 minutes',
  '30 minutes',
  '1 hour',
  '2 hours',
  '3 hours',
  '1 day',
  '2 days',
  '3 days',
];

const getProjectIcon = (id: string) => {
  const icons: Record<string, React.ReactNode> = {
    '1': <Library className="h-5 w-5" />,
    '2': <Vote className="h-5 w-5" />,
    '3': <Hotel className="h-5 w-5" />,
    '4': <Briefcase className="h-5 w-5" />,
    '5': <Car className="h-5 w-5" />,
    '6': <Home className="h-5 w-5" />,
    '7': <GraduationCap className="h-5 w-5" />,
    '8': <Dumbbell className="h-5 w-5" />,
    '9': <PiggyBank className="h-5 w-5" />,
    '10': <CalendarDays className="h-5 w-5" />,
    '11': <Cloud className="h-5 w-5" />,
    '12': <Building className="h-5 w-5" />,
    '13': <ShoppingBag className="h-5 w-5" />,
    '14': <Package className="h-5 w-5" />,
    '15': <Utensils className="h-5 w-5" />,
    '16': <ListTodo className="h-5 w-5" />,
    '17': <Bot className="h-5 w-5" />,
    '18': <Wallet className="h-5 w-5" />,
    '19': <Stethoscope className="h-5 w-5" />,
    '20': <Users className="h-5 w-5" />,
  };
  return icons[id] || <Code2 className="h-5 w-5" />;
};

function ProjectList() {
  const [notification, setNotification] = useState({
    country: countries[0],
    timeFrame: timeFrames[0],
    isVisible: true,
  });
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const interval = setInterval(() => {
      // Hide notification
      setNotification((prev) => ({ ...prev, isVisible: false }));

      // Show new notification after animation
      setTimeout(() => {
        setNotification({
          country: countries[Math.floor(Math.random() * countries.length)],
          timeFrame: timeFrames[Math.floor(Math.random() * timeFrames.length)],
          isVisible: true,
        });
      }, 1000); // Wait for exit animation
    }, 4000); // Change notification every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

      {/* Hero Section with Background */}
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-[1.2] md:leading-[1.2]">
              Explore Our Top Project Topics
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join thousands of final-year students from B.Tech, M.Tech, BCA,
              MCA, and engineering programs who are thriving with TrainingPro.
              We provide a vast collection of innovative project reports,
              specially curated for the 2024-2026 batches. Our trending topics
              are academically strong and designed to inspire creativity and
              engagement.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 bg-white border-b z-20">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm flex flex-col cursor-pointer"
              onClick={() => navigate(`/student-hub/project/${project.id}`)}
            >
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600" />
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getProjectIcon(project.id)}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-6 text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{project.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className={`
          fixed bottom-4 right-4 
          bg-white rounded-lg shadow-lg p-4 
          transform transition-all duration-500 ease-in-out
          ${
            notification.isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }
        `}
      ></div>
      {/* Notification Toast */}
      <div
        className={`
        fixed bottom-4 right-4 
        bg-white/95 backdrop-blur-sm rounded-xl 
        border-2 border-blue-200/50
        shadow-lg shadow-blue-500/5
        p-4 max-w-sm w-full md:w-auto
        transform transition-all duration-500 ease-in-out
        hover:scale-102 hover:shadow-xl hover:shadow-blue-500/10
        hover:border-blue-300/50
        ${
          notification.isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }
      `}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              New Purchase
            </p>
            <p className="text-sm text-gray-500">
              Someone from{' '}
              <span className="font-medium text-blue-600">
                {notification.country}
              </span>{' '}
              made a purchase
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {notification.timeFrame} ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
