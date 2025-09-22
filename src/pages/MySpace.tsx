import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, GraduationCap, Calendar, Video, Clock, 
  FileText, Loader2, AlertCircle, BookOpen, Star
} from 'lucide-react';
import { supabase } from '../lib/auth';

interface Course {
  id: string;
  title: string;
  enrollment_date: string;
  progress: number;
  next_class: string;
}

interface Consultation {
  id: string;
  mentor_name: string;
  consultation_date: string;
  consultation_time: string;
  consultation_status: string;
  payment_status: string;
}

interface Activity {
  id: string;
  type: 'course_enrollment' | 'consultation_booking' | 'resume_update';
  title: string;
  date: string;
}

function MySpace() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [masterclassEnrollments, setMasterclassEnrollments] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<{
    upcoming: Consultation[];
    today: Consultation[];
    past: Consultation[];
  }>({
    upcoming: [],
    today: [],
    past: []
  });
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const sorted = consultations.reduce((acc, consultation) => {
      const consultDate = new Date(consultation.consultation_date);
      consultDate.setHours(0, 0, 0, 0);
      if (consultDate.getTime() === now.getTime()) {
        acc.today.push(consultation);
      } else if (consultDate > now) {
        acc.upcoming.push(consultation);
      } else {
        if (consultation.consultation_status !== 'cancelled') {
          acc.past.push(consultation);
        }
      }
      return acc;
    }, {
      upcoming: [] as Consultation[],
      today: [] as Consultation[],
      past: [] as Consultation[]
    });

    setFilteredConsultations(sorted);
  }, [consultations]);

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error('Not authenticated');
        
        // Load masterclass enrollments
        const { data: masterclassData, error: masterclassError } = await supabase
          .from('masterclass_enrollments')
          .select('*, upcoming_classes(*)')
          .eq('email', user.email.toLowerCase())
          .eq('payment_status', 'completed')
          .order('created_at', { ascending: false });

        if (masterclassError) throw masterclassError;
        console.log('Masterclass enrollments:', masterclassData);
        if (masterclassData) {
          setMasterclassEnrollments(masterclassData);
        }

        // Load enrollments
        const { data: coursesData, error: coursesError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('email', user.email.toLowerCase())
          .eq('payment_status', 'completed')
          .order('created_at', { ascending: false });

        if (coursesError) throw coursesError;
        console.log('Enrollments query result:', { data: coursesData, error: coursesError });
        if (coursesData) {
          console.log('Fetched enrollments:', coursesData);
          setEnrollments(coursesData);
          // Transform enrollments into course format
          const transformedCourses = coursesData.map(enrollment => ({
            id: enrollment.course_id,
            title: enrollment.course_name,
            enrollment_date: enrollment.created_at,
            progress: 0, // You can add progress tracking later
            next_class: 'Coming soon' // You can add scheduling later
          }));
          console.log('Transformed courses:', transformedCourses);
          setCourses(transformedCourses);
        }

        // Load consultations
        const { data: consultationsData, error: consultationsError } = await supabase
          .from('consultations')
          .select('id, mentor_name, mentor_id, consultation_date, consultation_time, consultation_status, payment_status')
          .eq('client_email', user.email.toLowerCase())
          .eq('payment_status', 'completed')
          .in('consultation_status', ['scheduled', 'completed'])
          .order('consultation_date', { ascending: true });

        if (consultationsError) throw consultationsError;
        console.log('Consultations query result:', { data: consultationsData, error: consultationsError });
        if (consultationsData) {
          console.log('Fetched consultations:', consultationsData);
          setConsultations(consultationsData);
        }

        // Combine activities
        const combinedActivities: Activity[] = [
          ...(coursesData || []).map(course => ({
            id: course.id,
            type: 'course_enrollment' as const,
            title: `Enrolled in ${course.course_name}`,
            date: course.created_at,
            status: course.payment_status
          })),
          ...(consultationsData || []).map(consultation => ({
            id: consultation.id,
            type: 'consultation_booking' as const,
            title: `Booked consultation with ${consultation.mentor_name}`,
            date: consultation.consultation_date,
            status: consultation.payment_status
          }))
        ].filter(activity => activity.status === 'completed');

        // Sort by date descending
        combinedActivities.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        console.log('Combined activities:', combinedActivities);
        setActivities(combinedActivities);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#fffcf5] flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffcf5] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const ConsultationCard = ({ consultation }: { consultation: Consultation }) => (
    <div
      className="p-4 border rounded-xl hover:border-black/20 transition-colors relative overflow-hidden"
    >
      {consultation.payment_status === 'pending' && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Payment Pending
          </span>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">
          Session with {consultation.mentor_name}
        </h3>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(consultation.consultation_date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{new Date(`2000-01-01T${consultation.consultation_time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })}</span>
        </div>
      </div>
      
      {consultation.payment_status === 'pending' && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => window.location.href = '/payment/' + consultation.id}
            className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Complete Payment
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-white hover:opacity-80">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                My Courses
                {masterclassEnrollments.length + courses.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({masterclassEnrollments.length + courses.length} total)
                  </span>
                )}
              </h2>
              
              {/* Masterclass Enrollments Section */}
              {masterclassEnrollments?.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Enrolled Masterclasses</h3>
                  </div>
                  <div className="space-y-4">
                    {masterclassEnrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="p-4 border rounded-xl hover:border-black/20 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">
                            {enrollment.upcoming_classes?.title || 'Masterclass'}
                          </h4>
                          <span className="text-sm text-gray-500">
                            Enrolled on {new Date(enrollment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {enrollment.upcoming_classes?.start_date
                                ? new Date(enrollment.upcoming_classes.start_date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })
                                : 'Date TBA'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Duration: 2 hours</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {courses.length === 0 && masterclassEnrollments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>You haven't enrolled in any courses yet.</p>
                  <div className="mt-4">
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse Courses
                    </Link>
                  </div>
                </div>
              ) : (
                courses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <h3 className="text-lg font-semibold">Enrolled Courses</h3>
                  </div>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border rounded-xl hover:border-black/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">{course.title}</h3>
                        <span className="text-sm text-gray-500">
                          Enrolled on {new Date(course.enrollment_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${course.progress || 0}%` }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {course.progress || 0}% Complete
                          </span>
                          {course.next_class ? (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Next class: {course.next_class}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Classes starting soon</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
                )
              )}
            </motion.div>

            {/* Upcoming Consultations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Video className="h-5 w-5" />
                Upcoming Consultations
                {consultations.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({consultations.length} total)
                  </span>
                )}
              </h2>

              {consultations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No upcoming consultations scheduled.</p>
                  <Link
                    to="/consultants"
                    className="text-black font-medium hover:underline inline-flex items-center gap-1 mt-2"
                  >
                    Book a Consultation
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Today's Consultations */}
                  {filteredConsultations.today.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Today
                        </span>
                      </div>
                      <div className="space-y-4">
                        {filteredConsultations.today.map((consultation) => (
                          <ConsultationCard key={consultation.id} consultation={consultation} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upcoming Consultations */}
                  {filteredConsultations.upcoming.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Upcoming
                        </span>
                      </div>
                      <div className="space-y-4">
                        {filteredConsultations.upcoming.map((consultation) => (
                          <ConsultationCard key={consultation.id} consultation={consultation} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Consultations */}
                  {filteredConsultations.past.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          Past
                        </span>
                      </div>
                      <div className="space-y-4">
                        {filteredConsultations.past.map((consultation) => (
                          <ConsultationCard key={consultation.id} consultation={consultation} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Quick Links</h2>
              <div className="space-y-3">
                <Link
                  to="/#courses"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Browse Courses</span>
                  </div>
                </Link>
                <Link
                  to="/consultants"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Book Consultation</span>
                  </div>
                </Link>
                <Link
                  to="/resume-builder"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Resume Builder</span>
                  </div>
                </Link>
              </div>
            </motion.div>
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No recent activity to show.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'course_enrollment'
                          ? 'bg-green-100'
                          : activity.type === 'consultation_booking'
                          ? 'bg-blue-100'
                          : 'bg-purple-100'
                      }`}>
                        {activity.type === 'course_enrollment' ? (
                          <GraduationCap className="h-4 w-4 text-green-600" />
                        ) : activity.type === 'consultation_booking' ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-600">{activity.title}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySpace;