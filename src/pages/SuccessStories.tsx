import React from 'react';
import { Code2, Smartphone, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: 'mobile' | 'web';
  stack: string[];
  description: string;
  image: string;
  clientTestimonial: string;
  clientName: string;
  clientRole: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "HealthTrack Pro",
    type: "mobile",
    stack: ["React Native", "TypeScript", "Firebase", "Redux"],
    description: "A comprehensive health tracking application developed for a healthcare startup. Features include real-time health monitoring, appointment scheduling, and medication reminders.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    clientTestimonial: "The HealthTrack Pro app has revolutionized how we manage patient care. The team's expertise in mobile development was evident throughout the project.",
    clientName: "Dr. Sarah Chen",
    clientRole: "CTO, HealthCare Solutions"
  },
  {
    id: "2",
    name: "EduLearn Platform",
    type: "web",
    stack: ["React", "Node.js", "MongoDB", "WebRTC"],
    description: "An interactive e-learning platform built for a leading education institute. Includes live classroom features, course management, and student progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    clientTestimonial: "The e-learning platform exceeded our expectations. It has made remote learning seamless for our students and teachers.",
    clientName: "Michael Thompson",
    clientRole: "Director of Education, EduTech Institute"
  },
  {
    id: "3",
    name: "SmartRetail POS",
    type: "web",
    stack: ["React", "Express", "PostgreSQL", "Socket.io"],
    description: "Modern point-of-sale system developed for a retail chain. Features inventory management, sales analytics, and real-time order processing.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    clientTestimonial: "The new POS system has significantly improved our operational efficiency. The real-time analytics have been invaluable for decision-making.",
    clientName: "Lisa Rodriguez",
    clientRole: "Operations Manager, RetailCo"
  },
  {
    id: "4",
    name: "FitConnect",
    type: "mobile",
    stack: ["React Native", "GraphQL", "AWS", "TypeScript"],
    description: "A fitness social networking app that connects trainers with clients. Includes workout tracking, meal planning, and progress sharing features.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    clientTestimonial: "FitConnect has transformed how we engage with our clients. The app's features and user experience are exactly what we needed.",
    clientName: "James Wilson",
    clientRole: "Founder, FitLife Gyms"
  }
];

function SuccessStories() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Our Success Stories</h1>
          <p className="text-xl opacity-90">Transforming ideas into successful digital solutions</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center mb-4">
                    {project.type === 'mobile' ? (
                      <Smartphone className="h-6 w-6 text-blue-600 mr-2" />
                    ) : (
                      <Globe className="h-6 w-6 text-blue-600 mr-2" />
                    )}
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 mb-4">
                    "{project.clientTestimonial}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <Code2 className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-semibold">{project.clientName}</p>
                      <p className="text-sm text-gray-600">{project.clientRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuccessStories;