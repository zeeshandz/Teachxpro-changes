import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import AllCourses from './pages/AllCourses';
import SourceCode from './pages/SourceCode';
import StudentHub from './pages/StudentHub';
import CourseDetails from './pages/CourseDetails';
import OurProjects from './pages/OurProjects';
import AboutUs from './pages/AboutUs';
import ProjectReportForm from './pages/ProjectReportForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Consultants from './pages/Consultants';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeTuner from './pages/ResumeTuner';
import ResumeMaker from './pages/ResumeMaker';
import ResumeEditor from './pages/ResumeEditor';
import MockTestChat from './pages/MockTestChat';
import MockTest from './pages/MockTest';
import MySpace from './pages/MySpace';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import CancellationRefund from './pages/CancellationRefund';
import ShippingDelivery from './pages/ShippingDelivery';
import AllMockTests from './pages/AllMockTests';
import Footer from './components/Footer';
import UpcomingClassesPage from './pages/UpcomingClassesPage';
import HackathonFest from './pages/HackathonFest';
import Notes from './pages/Notes';
import StudyTools from './pages/StudyTools';
import Internships from './pages/Internships';
import CertificateVerify from './pages/CertificateVerify';
import LinkedInPostGenerator from './pages/LinkedInPostGenerator';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once the initial render is complete
    setIsLoading(false);

    return () => {};
  }, []);

  if (isLoading) {
    return <Loader text="" />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#fffcf5] transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/student-hub/projects" element={<ProjectList />} />
            <Route
              path="/student-hub/project/:id"
              element={<ProjectDetails />}
            />
            <Route path="/student-hub/source-code" element={<SourceCode />} />
            <Route path="/student-hub" element={<StudentHub />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/our-projects" element={<OurProjects />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/student-hub/project/report"
              element={<ProjectReportForm />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/consultants" element={<Consultants />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/resume-tuner" element={<ResumeTuner />} />
            <Route path="/resume-maker" element={<ResumeMaker />} />
            <Route
              path="/resume-editor/:templateId"
              element={<ResumeEditor />}
            />
            <Route path="/mock-test/:testId" element={<MockTestChat />} />
            <Route path="/mock-test-questions" element={<MockTest />} />
            <Route path="/my-space" element={<MySpace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cancellation-refund"
              element={<CancellationRefund />}
            />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/mock-tests" element={<AllMockTests />} />
            <Route path="/upcoming-classes" element={<UpcomingClassesPage />} />
            <Route path="/hackathon-fest" element={<HackathonFest />} />
            <Route path="/student-board/notes" element={<Notes />} />
            <Route path="/student-board/study-tools" element={<StudyTools />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/certificate-verify/:certificateId" element={<CertificateVerify />} />
            <Route path="/linkedin-post-generator" element={<LinkedInPostGenerator />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
