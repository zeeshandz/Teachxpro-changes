import React, { useState } from 'react';
import { Code2, Smartphone, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: 'mobile' | 'web';
  stack: string[];
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "HealthTrack Pro",
    type: "mobile",
    stack: ["React Native", "TypeScript", "Firebase", "Redux"],
    description: "A comprehensive health tracking application developed for a healthcare startup. Features include real-time health monitoring, appointment scheduling, and medication reminders.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "EduLearn Platform",
    type: "web",
    stack: ["React", "Node.js", "MongoDB", "WebRTC"],
    description: "An interactive e-learning platform built for a leading education institute. Includes live classroom features, course management, and student progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "SmartRetail POS",
    type: "web",
    stack: ["React", "Express", "PostgreSQL", "Socket.io"],
    description: "Modern point-of-sale system developed for a retail chain. Features inventory management, sales analytics, and real-time order processing.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    name: "FitConnect",
    type: "mobile",
    stack: ["React Native", "GraphQL", "AWS", "TypeScript"],
    description: "A fitness social networking app that connects trainers with clients. Includes workout tracking, meal planning, and progress sharing features.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80"
  }
];

function Projects() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleCard = (projectId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-gray-50" id="projects">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Our Success Stories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative h-96 cursor-pointer"
              onClick={() => toggleCard(project.id)}
            >
              <div
                className={`w-full h-full transition-transform duration-700 transform-gpu preserve-3d ${
                  flippedCards.has(project.id) ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="bg-white h-full rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {project.type === 'mobile' ? (
                          <Smartphone className="h-6 w-6 text-black-600 mr-2" />
                        ) : (
                          <Globe className="h-6 w-6 text-black-600 mr-2" />
                        )}
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-black-600 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-gray-600 text-sm">Click to see details</p>
                    </div>
                  </div>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="bg-white h-full rounded-xl shadow-lg p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <Code2 className="h-6 w-6 text-blue-600 mr-2" />
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Click to flip back</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;