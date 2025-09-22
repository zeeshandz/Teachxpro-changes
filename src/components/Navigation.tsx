import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useMatch } from 'react-router-dom';
import {
  Code2,
  ArrowRight,
  Menu,
  X,
  GraduationCap,
  FileText,
  Briefcase,
  Users,
  Globe,
  Shield,
  ChevronDown,
  LogIn,
  Sparkles,
  Linkedin,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { supabase } from '../lib/auth';
import ComingSoonToast from './ComingSoonToast';

interface User {
  id: string;
  email: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  href?: string;
  onClick?: () => void;
  showOnHome?: boolean;
  external?: boolean;
}

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isHomePage = useMatch('/');
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user as User | null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user as User | null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleConsultantClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/consultants');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const mainMenuItems: MenuItem[] = [
    {
      label: 'Training',
      icon: <GraduationCap className="h-4 w-4" />,
      onClick: () => scrollToSection('courses'),
      showOnHome: true,
    },
    {
      label: 'Student Hub',
      icon: <Users className="h-4 w-4" />,
      path: '/student-hub',
    },
    {
      label: 'Projects',
      icon: <Briefcase className="h-4 w-4" />,
      path: '/our-projects',
    }
    
  ];

  const dropdownItems: MenuItem[] = [
    {
      label: 'Resume Builder',
      icon: <FileText className="h-4 w-4" />,
      path: '/resume-maker',
    },
    {
      label: 'Resume Tuner',
      icon: <Sparkles className="h-4 w-4" />,
      path: '/resume-tuner',
    },
    {
      label: 'Create LinkedIn Post',
      icon: <Linkedin className="h-4 w-4" />,
      path: '/linkedin-post-generator',
    },
    {
      label: 'Community',
      icon: <Globe className="h-4 w-4" />,
      href: 'https://chat.whatsapp.com/your-invite-link',
      external: true,
    },
    {
      label: 'About Us',
      icon: <Shield className="h-4 w-4" />,
      path: '/about',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[rgb(0,116,116)] border-b border-white/10 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group relative"
            onClick={() => navigate('/')}
          >
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-white text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-xl transform group-hover:scale-110 transition-all duration-500 shadow-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 ">
                  X
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-white tracking-tight">
                teach
              </span>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                X
              </span>
              <span className="text-xl font-bold text-white tracking-tight">
                pro
              </span>
            </div>
            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <button
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-6"
          >
            {mainMenuItems.map((item, index) => {
              if (item.showOnHome && !isHomePage) return null;

              const MenuItem = () => (
                <div className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              );

              if (item.external) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80"
                  >
                    <MenuItem />
                  </a>
                );
              }

              if (item.path) {
                return (
                  <Link key={index} to={item.path} className="hover:opacity-80">
                    <MenuItem />
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="hover:opacity-80"
                >
                  <MenuItem />
                </button>
              );
            })}

            {/* More Services Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                onBlur={() =>
                  setTimeout(() => setIsServicesDropdownOpen(false), 200)
                }
                className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>More Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isServicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-black border border-white/10 rounded-xl shadow-xl py-2">
                  {dropdownItems.map((item, index) => {
                    const DropdownItem = () => (
                      <div className="flex items-center space-x-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    );

                    if (item.external) {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <DropdownItem />
                        </a>
                      );
                    }

                    return (
                      <Link key={index} to={item.path || '#'} className="block">
                        <DropdownItem />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <ThemeToggle />

            <button
              onClick={handleConsultantClick}
              className="inline-flex items-center px-5 py-2 bg-white text-[rgb(0,116,116)] text-sm
                       border border-white/60 rounded-3xl font-semibold whitespace-nowrap
                       hover:scale-[1.02] transition-transform"
            >
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  onBlur={() =>
                    setTimeout(() => setIsProfileDropdownOpen(false), 200)
                  }
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    {user.user_metadata.first_name?.[0] ||
                      user.email[0].toUpperCase()}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-white/10 rounded-xl shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm text-white font-medium">
                        {user.user_metadata.first_name}{' '}
                        {user.user_metadata.last_name}
                      </p>
                      <p className="text-xs text-white/60 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/my-space"
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      My Space
                    </Link>
                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center px-5 py-2 bg-white text-[rgb(0,116,116)] text-sm
                         border border-white/60 rounded-3xl font-semibold whitespace-nowrap
                         hover:scale-[1.02] transition-transform"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            )}
          </motion.div>
          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              x: isMenuOpen ? 0 : '100%',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 z-50 w-full bg-black/95 backdrop-blur-sm border-t border-white/10 overflow-y-auto md:hidden"
            style={{
              display: isMenuOpen ? 'block' : 'none',
            }}
          >
            <div className="py-6 px-6 space-y-4">
              <div className="flex flex-col gap-2">
                {[...mainMenuItems, ...dropdownItems].map((item, index) => {
                  if (item.showOnHome && !isHomePage) return null;

                  const MenuItem = () => (
                    <div className="flex items-center gap-3 px-4 py-3.5 text-base text-white hover:bg-white/10 rounded-xl transition-colors">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  );

                  if (item.external) {
                    return (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MenuItem />
                      </a>
                    );
                  }

                  if (item.path) {
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className="block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MenuItem />
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowComingSoon(true);
                        setTimeout(() => setIsMenuOpen(false), 3000);
                      }}
                    >
                      <MenuItem />
                    </button>
                  );
                })}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleConsultantClick}
                  className="w-full flex items-center justify-center px-5 py-2.5 bg-white text-black text-sm
                           border border-white/60 rounded-full font-semibold
                           hover:bg-gray-100 transition-colors"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                {!user && (
                  <Link
                    to="/auth"
                    className="w-full flex items-center justify-center px-5 py-2.5 bg-black text-white text-sm
                             border border-white/10 rounded-full font-semibold
                             hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ComingSoonToast
        isVisible={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </nav>
  );
}

export default Navigation;
