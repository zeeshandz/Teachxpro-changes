import {
  Sparkles,
  Trophy,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  History,
  ChevronRight,
  Info,
  X,
  Rocket,
  Gavel,
  PackageCheck,
  Wrench,
  Award,
  ClipboardList,
} from 'lucide-react';
import { useState } from 'react';
import HackathonRegistrationForm from '../components/HackathonRegistrationForm';
import ComingSoonToast from '../components/ComingSoonToast';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for upcoming hackathons
const upcomingHackathons = [
  {
    id: 1,
    name: "InnovateX Hackathon Challenge 2025",
    date: "Coming Soon",
    theme: "AI & Machine Learning",
    prize: "₹11k Cash Prize",
    participants: "Not started yet",
    duration: "5 days",
    location: "Virtual",
    registrationDeadline: "Sep 05th, 2025",
    description: "Build innovative AI solutions that can transform industries. From healthcare to finance, show us how AI can make a difference.",
    type: 'paid',
    fees: 1,
    getStarted: [
      "Sign up on our platform to get started.",
      "Join our Discord server to connect with mentors and other participants.",
      "Check out our starter kits and resources on GitHub."
    ],
    whatToBuild: [
      { title: "Overall Best", description: "The most innovative and impactful AI-driven solution." },
      { title: "Best in FinTech", description: "Transforming financial services with AI." },
      { title: "Best in HealthTech", description: "Revolutionizing healthcare with intelligent systems." },
      { title: "Most Creative Hardware Hack", description: "A unique and creative hardware application of AI." }
    ],
    rules: [
      "Teams must register prior to the start of the hackathon.",
      "All code/design must be created during the hackathon window.",
      "Use of third-party APIs/tools is allowed with proper citation.",
      "Plagiarism or code re-use from previous projects will lead to disqualification.",
      "Each team must submit a GitHub repo, demo video, and a short pitch deck."
    ],
    judgingCriteria: [
      { title: "Innovation and Creativity", weightage: "25%" },
      { title: "Technical Implementation", weightage: "25%" },
      { title: "Problem-Solution Fit", weightage: "20%" },
      { title: "UI/UX and Usability", weightage: "15%" },
      { title: "Pitch & Communication", weightage: "15%" }
    ],
    deliverables: [
      "Working prototype/demo.",
      "GitHub repository with clear documentation.",
      "2-5 minute video explaining the project.",
      "Pitch deck for jury presentation."
    ],
    toolsAndSupport: [
      "Access to GitHub, Canva, Firebase, Supabase, OpenAI APIs, etc.",
      "Mentor network available throughout the hackathon.",
      "Dedicated Discord/Slack/WhatsApp for team communication.",
      "Cloud credits (based on sponsor availability)."
    ],
    detailedPrizes: [
      { title: "Overall Winner", prize: "₹5,000 in cash", sponsor: "TeachXpro" },
      { title: "FinTech Track Winner", prize: "₹2,000 in cash", sponsor: "FintechCorp" },
      { title: "HealthTech Track Winner", prize: "₹2,000 in cash", sponsor: "HealthWell" },
      { title: "Hardware Winner", prize: "₹2,000 in cash", sponsor: "Gadgetron" }
    ],
    awardsAndRecognition: [
      "Best Hack Overall",
      "Most Innovative Solution",
      "Best UI/UX Design",
      "Best Solo Developer",
      "Best Use of AI/ML",
      "All participants receive certificates and LinkedIn badges.",
      "Top teams get mentorship/internship opportunities and access to incubators."
    ]
  },
  {
    id: 2,
    name: "Web3 Buildathon 2025",
    date: "Aug 20-22, 2025",
    theme: "Mobile and Web Development",
    prize: "Reveal Soon",
    participants: "Not started yet",
    duration: "48 hours",
    location: "Hybrid",
    registrationDeadline: "Aug 18th, 2025",
    description: "Create the next generation of decentralized applications. Build innovative solutions using mobile and web development.",
    type: 'free',
    fees: 0,
    whatToBuild: [
      { title: "Best dApp", description: "The most useful and innovative decentralized application." },
      { title: "Best Mobile Integration", description: "Seamlessly integrating web3 features into a mobile app." },
      { title: "Most Creative Use of Smart Contracts", description: "A unique application of smart contract technology." }
    ],
    detailedPrizes: [
      { title: "dApp Winner", prize: "Swag and Goodies", sponsor: "Web3 Foundation" },
      { title: "Mobile Winner", prize: "Premium Dev Tools Subscription", sponsor: "MobileFirst" }
    ],
    judgingCriteria: [
      { title: "Decentralization", description: "How well does the project adhere to web3 principles?" },
      { title: "User Experience", description: "Is the application intuitive and easy to use?" },
      { title: "Technical Soundness", description: "Is the code well-written and secure?" }
    ],
    getStarted: [
      "Familiarize yourself with Solidity and smart contracts.",
      "Explore web3 libraries like Ethers.js or Web3.js.",
      "Brainstorm ideas that leverage the power of decentralization."
    ],
    rules: [
      "Teams must register prior to the start of the hackathon.",
      "All code/design must be created during the hackathon window.",
      "Use of third-party APIs/tools is allowed with proper citation.",
      "Plagiarism or code re-use from previous projects will lead to disqualification.",
      "Each team must submit a GitHub repo, demo video, and a short pitch deck."
    ],
    deliverables: [
      "Working prototype/demo.",
      "GitHub repository with clear documentation.",
      "2-5 minute video explaining the project.",
      "Pitch deck for jury presentation."
    ],
    toolsAndSupport: [
      "Access to GitHub, Canva, Firebase, Supabase, OpenAI APIs, etc.",
      "Mentor network available throughout the hackathon.",
      "Dedicated Discord/Slack/WhatsApp for team communication.",
      "Cloud credits (based on sponsor availability)."
    ],
     awardsAndRecognition: [
      "Best Hack Overall",
      "Most Innovative Solution",
      "Best UI/UX Design",
      "Best Solo Developer",
      "Best Use of AI/ML",
      "All participants receive certificates and LinkedIn badges.",
      "Top teams get mentorship/internship opportunities and access to incubators."
    ]
  }
];

// Mock data for past hackathons
const pastHackathons = [
  {
    id: 1,
    name: "Sustainability Hackathon 2025",
    date: "April 10th-11th, 2025",
    theme: "AI Advancements in Education",
    winners: [
      {
        team: "Team Techie teddies",
        project: "GrowBuddy",
        description: "GrowBuddy is your personalized AI-powered career companion, offering a comprehensive suite of tools designed to support students and job seekers at every step of their career journey — completely free of cost. From personalized career guidance and resume building to interview preparation, skill assessments, and job matching, GrowBuddy uses advanced AI to understand your strengths, preferences, and goals. It provides tailored insights and actionable recommendations to help you make informed career decisions. Whether you're exploring career paths, preparing for your dream job, or looking to upskill, GrowBuddy is your trusted partner in navigating the evolving job market with confidence and clarity.",
        prize: "1st Place",
        members: ["Vaishali Sahni", "Vishu Rathi"]
      }
      
    ],
    stats: {
      participants: "180+",
      projects: "45",
      mentors: "10",
      workshops: "5"
    },
    gallery: [
      "https://mpkzvmeaezzezslchdls.supabase.co/storage/v1/object/sign/hackathon-11-april/Selfie-Vaishali%20Sahni.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoYWNrYXRob24tMTEtYXByaWwvU2VsZmllLVZhaXNoYWxpIFNhaG5pLmpwZyIsImlhdCI6MTc0NzY3NDQ5NywiZXhwIjoyMDYzMDM0NDk3fQ.bCvUm-IyA9BvvIqoxuaGm3Z9JjUTyGnYUICD2jeNEMc",
      "https://mpkzvmeaezzezslchdls.supabase.co/storage/v1/object/sign/hackathon-11-april/Selfie-Vishu%20Rathi.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoYWNrYXRob24tMTEtYXByaWwvU2VsZmllLVZpc2h1IFJhdGhpLmpwZyIsImlhdCI6MTc0NzY3NDQ2MSwiZXhwIjoyMDYzMDM0NDYxfQ.SduZsiO9f_j0PCKKZE1QrHCNOiAWoNUQoMOurdT6TrI"
    ],
    story: "The hackathon centered around driving innovation in the education sector through cutting-edge AI technologies. Participants from diverse backgrounds collaborated to build impactful solutions that addressed real-world challenges in learning and development. Key focus areas included enhancing remote learning experiences, delivering highly personalized and adaptive education pathways, and creating intelligent AI-powered tutoring systems capable of providing real-time support and feedback. The event served as a platform for showcasing how artificial intelligence can revolutionize traditional education models, improve accessibility, and foster a more engaging, efficient, and student-centric learning environment.",
    highlights: [
      "45 innovative projects",
      "5 expert-led workshops",
      "10 industry mentors",
      "2-day intensive coding"
    ]
  },
  {
    id: 2,
    name: "Hackathon Fest 2025",
    date: "April 18th-19th, 2025",
    theme: "AI-Powered Student Platform",
    winners: [
      {
        team: "Team Quadra",
        project: "TechVerse",
        description: "We've built a smart AI-powered platform that solves real-life problems of students—from career guidance to job matching and much more.",
        prize: "1st Place",
        members: ["Mohd Sahib Raza", "Mohd Shaqib Raza", "Rohan", "Shrijan Chhetri"]
      }
    ],
    stats: {
      participants: "200+",
      projects: "50",
      mentors: "10",
      workshops: "2"
    },
    gallery: [
      "https://mpkzvmeaezzezslchdls.supabase.co/storage/v1/object/sign/hackathon-18-april/Hackthon%20selfie.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoYWNrYXRob24tMTgtYXByaWwvSGFja3Rob24gc2VsZmllLmpwZyIsImlhdCI6MTc0NzY3NTkzNCwiZXhwIjoyMDYzMDM1OTM0fQ.P3Tvm9iXGurASCXB0F1DFYiaxf3PyVmNx2FDPG4z1eE",
    ],
    story: "The hackathon centered on building innovative AI-powered platforms tailored specifically for students. Participants collaborated to create transformative solutions aimed at enhancing the educational experience through technology. Key areas of development included advanced remote learning tools that bridge the gap between physical and virtual classrooms, personalized learning systems that adapt to individual student needs and learning styles, and intelligent AI-driven tutoring assistants capable of offering real-time guidance, doubt-solving, and progress tracking. The event encouraged creativity and problem-solving to reimagine the future of education, making it more accessible, engaging, and effective for learners everywhere.",
    highlights: [
      "50 healthcare solutions",
      "10 specialized workshops",
      "20 healthcare experts",
      "2-day innovation sprint"
    ]
  },
  {
    id: 2,
    name: "HACKFORGE 2025",
    date: "May 1st-2nd, 2025",
    theme: "Gen AI & Web Development",
    winners: [
      {
        team: "Team MediTech",
        project: "Career Guidance Solution",
        description: "Our AI-driven platform is designed to be your ultimate learning companion. It intelligently analyzes your skills, interests, and learning habits to understand your unique profile. Based on this, it offers personalized course and college recommendations tailored to your goals and aspirations.",
        prize: "1st Place",
        members: ["Yuvraj Singh Saini","Humanshu Jaglan"]
      }
    ],
    stats: {
      participants: "200+",
      projects: "50",
      mentors: "20",
      workshops: "10"
    },
    gallery: [
      "https://mpkzvmeaezzezslchdls.supabase.co/storage/v1/object/sign/hackathon-1st-may/1746331048759.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoYWNrYXRob24tMXN0LW1heS8xNzQ2MzMxMDQ4NzU5LmpwZWciLCJpYXQiOjE3NDc2NzY2NjIsImV4cCI6MjA2MzAzNjY2Mn0.X_oPyg6Rt9lLD7R3iM6nHABeDtbS3-4Rfto38fmqImY",
    ],
    story: "Explore the powerful intersection of Generative AI and modern web development. Learn how cutting-edge AI technologies like large language models (LLMs) and image generation tools can be seamlessly integrated into web applications to create intelligent, dynamic, and personalized user experiences. From building AI chatbots and content generators to enhancing UI/UX with real-time AI assistance, this track empowers developers to harness the full potential of Gen AI in transforming the web as we know it.",
    highlights: [
      "50 healthcare solutions",
      "10 specialized workshops",
      "20 healthcare experts",
      "2-day innovation sprint"
    ]
  }
];

const HackathonDetailsModal = ({ hackathon, isOpen, onClose, onRegister }: { hackathon: any, isOpen: boolean, onClose: () => void, onRegister: (hackathon: any) => void }) => {
  if (!hackathon) return null;

  const DetailSection = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <section>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3 flex items-center gap-3">
        <Icon className="w-7 h-7 text-purple-600" />
        <span>{title}</span>
      </h3>
      {children}
    </section>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md"
              onClick={onClose}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative transform overflow-hidden rounded-2xl bg-gray-50 w-full max-w-6xl shadow-xl"
            >
              <div className="absolute right-4 top-4 z-20">
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-500 bg-white/50 hover:bg-white transition-all focus:outline-none"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-12">
                    <section>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{hackathon.name}</h2>
                      <p className="text-lg text-gray-600">{hackathon.description}</p>
                    </section>
                    
                    <DetailSection icon={Rocket} title="Get Started">
                      <ul className="space-y-4 text-gray-700 list-disc pl-5">
                        {hackathon.getStarted.map((item: string, index: number) => <li key={index}>{item}</li>)}
                      </ul>
                    </DetailSection>

                    <DetailSection icon={Gavel} title="Rules and Guidelines">
                      <ul className="space-y-4 text-gray-700 list-disc pl-5">
                        {hackathon.rules.map((rule: string, index: number) => <li key={index}>{rule}</li>)}
                      </ul>
                    </DetailSection>

                    <DetailSection icon={PackageCheck} title="Deliverables">
                      <ul className="space-y-4 text-gray-700 list-disc pl-5">
                        {hackathon.deliverables.map((item: string, index: number) => <li key={index}>{item}</li>)}
                      </ul>
                    </DetailSection>

                    <DetailSection icon={Wrench} title="Tools & Support Provided">
                      <ul className="space-y-4 text-gray-700 list-disc pl-5">
                        {hackathon.toolsAndSupport.map((item: string, index: number) => <li key={index}>{item}</li>)}
                      </ul>
                    </DetailSection>
                    
                    <DetailSection icon={Award} title="Awards & Recognition">
                      <ul className="space-y-4 text-gray-700 list-disc pl-5">
                        {hackathon.awardsAndRecognition.map((item: string, index: number) => <li key={index}>{item}</li>)}
                      </ul>
                    </DetailSection>

                    <DetailSection icon={Trophy} title="Prizes">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hackathon.detailedPrizes.map((prize: any, index: number) => (
                          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                            <p className="font-bold text-lg text-purple-600 flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> {prize.title}</p>
                            <p className="text-xl font-semibold text-gray-800 mt-2">{prize.prize}</p>
                            <p className="text-sm text-gray-500">Sponsored by {prize.sponsor}</p>
                          </div>
                        ))}
                      </div>
                    </DetailSection>
                    
                    <DetailSection icon={ClipboardList} title="Judging Criteria">
                      <div className="bg-white rounded-lg border border-gray-200">
                        <table className="w-full text-left">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-4 font-semibold">Criteria</th>
                              <th className="p-4 font-semibold">Weightage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hackathon.judgingCriteria.map((item: any, index: number) => (
                              <tr key={index} className="border-t border-gray-200">
                                <td className="p-4">{item.title}</td>
                                <td className="p-4 font-semibold text-purple-600">{item.weightage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </DetailSection>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-0 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                      <button
                        onClick={() => onRegister(hackathon)}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                      >
                        Join Hackathon
                      </button>

                      <div className="space-y-4 text-gray-700">
                        <div className="flex items-center gap-4">
                          <Calendar className="w-6 h-6 text-purple-500" />
                          <div>
                            <p className="font-semibold">Deadline</p>
                            <p>{hackathon.registrationDeadline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <MapPin className="w-6 h-6 text-purple-500" />
                          <div>
                            <p className="font-semibold">Location</p>
                            <p>{hackathon.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Trophy className="w-6 h-6 text-yellow-500" />
                          <div>
                            <p className="font-semibold">Prizes</p>
                            <p>{hackathon.prize}</p>
                          </div>
                        </div>
                         <div className="flex items-center gap-4">
                          <Users className="w-6 h-6 text-purple-500" />
                          <div>
                            <p className="font-semibold">Participants</p>
                            <p>{hackathon.participants}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HackathonFest = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<typeof upcomingHackathons[0] | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [detailsHackathon, setDetailsHackathon] = useState<typeof upcomingHackathons[0] | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleRegister = (hackathon: typeof upcomingHackathons[0]) => {
    if (isDetailsModalOpen) {
      setIsDetailsModalOpen(false);
    }
    // setShowComingSoon(true);
    setSelectedHackathon(hackathon);
    setIsRegistrationOpen(true);
  };

  const handleViewDetails = (hackathon: typeof upcomingHackathons[0]) => {
    setDetailsHackathon(hackathon);
    setIsDetailsModalOpen(true);
  };

  const scrollToPastHackathons = () => {
    const element = document.getElementById('past-hackathons');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/50" />
        </div>

        {/* Animated Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
            className="text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
              className="inline-block mb-8"
          >
            <div className="relative">
                <Sparkles className="w-20 h-20 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 animate-pulse" />
            </div>
          </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Hackathon Fest 2025
            </span>
          </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where Innovation Meets Opportunity
          </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4"
            >
              <button
                onClick={() => handleRegister(upcomingHackathons[0])}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToPastHackathons}
                className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-700 font-semibold text-lg hover:bg-white transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Past Hackathons
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Upcoming Hackathons Section */}
      <div id="upcoming" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Hackathons
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our upcoming events and showcase your skills in the most exciting tech challenges
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {upcomingHackathons.map((hackathon) => (
            <motion.div
              key={hackathon.id}
              variants={fadeInUp}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-purple-100/50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out" />
              <div className="relative z-10 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                    {hackathon.name}
                  </h3>
                  {hackathon.type === 'paid' ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Paid</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Free</span>
                  )}
            </div>
                <p className="text-purple-700 font-semibold mb-6">{hackathon.theme}</p>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-purple-600 font-medium">PRIZE POOL</p>
                  <p className="text-xl font-bold text-gray-800 mt-1">{hackathon.prize}</p>
            </div>

                                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span>{hackathon.location}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-6">
                  <span className="font-semibold">Registration Deadline:</span> {hackathon.registrationDeadline}
                  </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleViewDetails(hackathon)}
                      className="font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
                    >
                      View Details <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRegister(hackathon)}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
            </div>

      {/* Past Hackathons Section */}
      <div id="past-hackathons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <History className="w-8 h-8 text-purple-500" />
            Past Hackathons
              </h2>
          <p className="text-xl text-gray-600">
            Relive the moments of innovation and creativity
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {pastHackathons.map((hackathon) => (
          <motion.div
              key={hackathon.id}
            variants={fadeInUp}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-purple-100 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{hackathon.name}</h3>
                    <p className="text-purple-600 font-semibold text-lg">{hackathon.theme}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span>{hackathon.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span>{hackathon.stats.participants}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Winners</h4>
                    <div className="space-y-4">
                      {hackathon.winners.map((winner, index) => (
                        <div
                          key={index}
                          className="bg-purple-50 rounded-xl p-4 border border-purple-100"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-purple-700">{winner.team}</span>
                            <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {winner.prize}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{winner.project}</p>
                          <div className="flex flex-wrap gap-2">
                            {winner.members.map((member, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white px-2 py-1 rounded-full border border-purple-100"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Event Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          {hackathon.stats.participants}
                        </div>
                        <div className="text-sm text-gray-600">Participants</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          {hackathon.stats.projects}
                        </div>
                        <div className="text-sm text-gray-600">Projects</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          {hackathon.stats.mentors}
                        </div>
                        <div className="text-sm text-gray-600">Mentors</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                          {hackathon.stats.workshops}
                        </div>
                        <div className="text-sm text-gray-600">Workshops</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Event Story</h4>
                  <p className="text-gray-700 leading-relaxed">{hackathon.story}</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Winning Team Gallery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hackathon.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white"
                      >
                        {/* Image with subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
                        <img
                          src={image}
                          alt={`${hackathon.name} - Team Member ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        
                        {/* Winner badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-purple-500" />
                            <span className="font-medium text-sm text-gray-700">Winner</span>
                          </div>
                        </div>

                        {/* Location pin */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="w-6 h-6 text-purple-500" />
                          </div>
                        </div>

                        {/* Border effect */}
                        <div className="absolute inset-0 border-4 border-white/50 rounded-2xl pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Details Modal */}
      <HackathonDetailsModal
        hackathon={detailsHackathon}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onRegister={handleRegister}
      />

      {/* Registration Form Modal */}
      <HackathonRegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        hackathon={selectedHackathon}
      />

      {/* Coming Soon Toast */}
      <ComingSoonToast
        isVisible={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        message="Entries will be open soon."
      />
    </div>
  );
};

export default HackathonFest;
