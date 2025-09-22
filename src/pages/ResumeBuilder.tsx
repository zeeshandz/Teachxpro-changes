import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Plus, RefreshCw } from 'lucide-react';
import {
  generateResume,
  generateSkills,
  generateProfileSummary,
} from '../lib/openai';
import RichTextEditor from '../components/RichTextEditor';
import {
  ModeSelector,
  AIGenerator,
  StepsIndicator,
  NavigationButtons,
  WritingTips,
  EducationSection,
  WorkExperienceSection,
  SkillsSection,
  CertificationSection,
  ProjectSection,
  InterestSection,
  CompletionSection,
} from '../components/resume';

interface ContactFields {
  resumeTitle: string;
  fullName: string;
  email: string;
  website: string;
  phone: string;
  location: string;
}

interface Entry {
  id: string;
  title: string;
  content?: string;
  institution?: string;
  typeOfStudy?: string;
  areaOfStudy?: string;
  score?: string;
  startDate?: string;
  endDate?: string;
  isPresent?: boolean;
  summary?: string;
  fields?: ContactFields;
  company?: string;
  position?: string;
  location?: string;
}

interface ResumeSection {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  entries: any[]; // This allows for different entry types
}

interface Skill {
  id: string;
  name: string;
}

const ContactSection = ({
  entry,
  sectionId,
  onUpdate,
}: {
  entry: Entry;
  sectionId: string;
  onUpdate: (field: string, value: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resume Title
        </label>
        <input
          type="text"
          value={entry.fields?.resumeTitle || ''}
          onChange={(e) => onUpdate('resumeTitle', e.target.value)}
          placeholder="e.g. Senior Frontend Developer Resume"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={entry.fields?.fullName || ''}
          onChange={(e) => onUpdate('fullName', e.target.value)}
          placeholder="e.g. John Doe"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={entry.fields?.email || ''}
            onChange={(e) => onUpdate('email', e.target.value)}
            placeholder="e.g. john@example.com"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website (Optional)
          </label>
          <input
            type="url"
            value={entry.fields?.website || ''}
            onChange={(e) => onUpdate('website', e.target.value)}
            placeholder="e.g. https://portfolio.com"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={entry.fields?.phone || ''}
            onChange={(e) => onUpdate('phone', e.target.value)}
            placeholder="e.g. +1 234 567 8900"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={entry.fields?.location || ''}
            onChange={(e) => onUpdate('location', e.target.value)}
            placeholder="e.g. New York, NY"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

const SummarySection = ({
  entry,
  sectionId,
  onUpdate,
}: {
  entry: Entry;
  sectionId: string;
  onUpdate: (field: string, value: string) => void;
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProfileSummary = async () => {
    const resumeTitle = document.querySelector(
      'input[placeholder*="Resume Title"]'
    ) as HTMLInputElement;
    if (!resumeTitle?.value) {
      alert('Please add a resume title first');
      return;
    }

    setIsGenerating(true);
    try {
      const summary = await generateProfileSummary(resumeTitle.value);
      onUpdate('content', summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Summary
        </label>
        <div className="relative">
          <textarea
            value={entry.content || ''}
            onChange={(e) => onUpdate('content', e.target.value)}
            placeholder="Write a brief summary of your professional background and career objectives..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm min-h-[120px] resize-none"
          />
          <button
            onClick={handleGenerateProfileSummary}
            disabled={isGenerating}
            className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

function ResumeBuilder() {
  const [mode, setMode] = useState<'select' | 'ai' | 'manual' | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [resumeData, setResumeData] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([
    {
      id: 'contact',
      title: 'Contact Information',
      type: 'single',
      entries: [
        {
          id: '1',
          title: '',
          content: '',
          fields: {
            resumeTitle: '',
            fullName: '',
            email: '',
            website: '',
            phone: '',
            location: '',
          },
        },
      ],
    },
    {
      id: 'summary',
      title: 'Summary',
      type: 'single',
      entries: [{ id: '1', title: '', content: '' }],
    },
    {
      id: 'experience',
      title: 'Work Experience',
      type: 'multiple',
      entries: [
        {
          id: '1',
          title: '',
          company: '', // Initialize all fields
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          isPresent: false,
          summary: '',
        },
      ],
    },
    {
      id: 'education',
      title: 'Education',
      type: 'multiple',
      entries: [
        {
          id: '1',
          title: '',
          institution: '',
          typeOfStudy: '',
          areaOfStudy: '',
          score: '',
          startDate: '',
          endDate: '',
          isPresent: false,
          summary: '',
        },
      ],
    },
    {
      id: 'skills',
      title: 'Skills',
      type: 'single',
      entries: [],
    },
    {
      id: 'certifications',
      title: 'Certifications',
      type: 'multiple',
      entries: [
        {
          id: '1',
          name: '',
          issuer: '',
          date: '',
          summary: '',
        },
      ],
    },
    {
      id: 'projects',
      title: 'Projects',
      type: 'multiple',
      entries: [
        {
          id: '1',
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          isPresent: false,
          keywords: [],
          summary: '',
        },
      ],
    },
    {
      id: 'interests',
      title: 'Interests',
      type: 'single',
      entries: [{ id: '1', title: '', content: '' }],
    },
    {
      id: 'completion',
      title: 'Done',
      type: 'single',
      entries: [{ id: '1' }],
    },
  ]);

  const addEntry = (sectionId: string) => {
    setResumeSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            entries: [
              ...section.entries,
              {
                id: Date.now().toString(),
                title: '',
                company: '', // Initialize all fields
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                isPresent: false,
                summary: '',
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const removeEntry = (sectionId: string, entryId: string) => {
    setResumeSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            entries: section.entries.filter((entry) => entry.id !== entryId),
          };
        }
        return section;
      })
    );
  };

  const updateEntry = (
    sectionId: string,
    entryId: string,
    field: string,
    value: any
  ) => {
    setResumeSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            entries: section.entries.map((entry) => {
              if (entry.id === entryId) {
                return { ...entry, [field]: value };
              }
              return entry;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedData = await generateResume(jobTitle);
      console.log('Generated Resume Data:', generatedData);

      setResumeSections((prev) =>
        prev.map((section) => {
          // Contact Information
          if (section.id === 'contact' && generatedData.contact?.[0]) {
            return {
              ...section,
              entries: [
                {
                  id: '1',
                  fields: {
                    ...generatedData.contact[0].fields,
                  },
                },
              ],
            };
          }

          // Summary
          if (section.id === 'summary' && generatedData.summary?.[0]) {
            return {
              ...section,
              entries: [
                {
                  id: '1',
                  content: generatedData.summary[0].content,
                },
              ],
            };
          }

          // Experience
          if (section.id === 'experience' && generatedData.experience) {
            return {
              ...section,
              entries: generatedData.experience.map((exp: any) => ({
                id: crypto.randomUUID(),
                company: exp.company || '',
                position: exp.position || '',
                location: exp.location || '',
                startDate: exp.startDate || '',
                endDate: exp.endDate || '',
                isPresent: exp.isPresent || false,
                summary: exp.summary || '',
              })),
            };
          }

          // Education
          if (section.id === 'education' && generatedData.education) {
            return {
              ...section,
              entries: generatedData.education.map((edu: any) => ({
                id: crypto.randomUUID(),
                institution: edu.institution || '',
                typeOfStudy: edu.typeOfStudy || '',
                areaOfStudy: edu.areaOfStudy || '',
                score: edu.score || '',
                startDate: edu.startDate || '',
                endDate: edu.endDate || '',
                isPresent: edu.isPresent || false,
                summary: edu.summary || '',
              })),
            };
          }

          // Skills
          if (section.id === 'skills' && generatedData.skills) {
            return {
              ...section,
              entries: generatedData.skills.map((skill: any) => ({
                id: crypto.randomUUID(),
                name: skill.name || '',
              })),
            };
          }

          // Projects
          if (section.id === 'projects' && generatedData.projects) {
            return {
              ...section,
              entries: generatedData.projects.map((project: any) => ({
                id: crypto.randomUUID(),
                name: project.name || '',
                description: project.description || '',
                startDate: project.startDate || '',
                endDate: project.endDate || '',
                isPresent: project.isPresent || false,
                keywords: project.keywords || [],
                summary: project.summary || '',
              })),
            };
          }

          // Interests
          if (section.id === 'interests' && generatedData.interests?.[0]) {
            return {
              ...section,
              entries: [
                {
                  id: '1',
                  content: generatedData.interests[0].content,
                },
              ],
            };
          }

          return section;
        })
      );

      console.log('All sections updated successfully');
      // Move to the next section after generation
      setCurrentSectionIndex(1);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const goToNextSection = () => {
    if (currentSectionIndex < resumeSections.length - 1) {
      // If moving to completion section, prepare resume data
      if (currentSectionIndex === resumeSections.length - 2) {
        const data: Record<string, any> = {};
        resumeSections.forEach((section) => {
          if (section.id !== 'completion') {
            data[section.id] = section.entries;
          }
        });
        setResumeData(data);
      }

      // If we're on the contact section and moving to the next section
      if (currentSectionIndex === 0) {
        const resumeTitle = resumeSections[0].entries[0].fields?.resumeTitle;
        if (!resumeTitle) {
          alert('Please provide a resume title before proceeding');
          return;
        }

        // Find the skills section
        const skillsSection = resumeSections.find(
          (section) => section.id === 'skills'
        );
        if (
          skillsSection &&
          (!skillsSection.entries || skillsSection.entries.length === 0)
        ) {
          // Generate skills in the background
          generateSkills(resumeTitle)
            .then((generatedSkills) => {
              const skillsList = generatedSkills.map((skill: string) => ({
                id: crypto.randomUUID(),
                name: skill,
              }));

              setResumeSections((prev) =>
                prev.map((section) =>
                  section.id === 'skills'
                    ? { ...section, entries: skillsList }
                    : section
                )
              );
            })
            .catch((error) => {
              console.error('Error generating skills:', error);
            });
        }
      }

      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf5]">
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section with Background */}
      <div className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
            alt="Team collaboration"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          {/* Grid Overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]"
            style={{ backgroundPosition: 'center' }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Resume Builder
            </h1>
            <p className="text-base text-gray-300">
              Create a professional resume in minutes with our AI-powered
              builder or craft it manually.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {!mode ? (
          <ModeSelector onModeSelect={setMode} />
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4">
                  {mode === 'ai'
                    ? 'AI Resume Generator'
                    : 'Manual Resume Builder'}
                </h2>

                {mode === 'ai' ? (
                  <AIGenerator
                    jobTitle={jobTitle}
                    isGenerating={isGenerating}
                    onJobTitleChange={setJobTitle}
                    onGenerate={handleGenerate}
                  />
                ) : (
                  <p className="text-gray-600">
                    Start building your resume by editing the sections on the
                    right.
                  </p>
                )}
              </div>
              <WritingTips />
            </div>

            {/* Resume Preview & Editor */}
            <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-6">Resume Editor</h2>

              <StepsIndicator
                sections={resumeSections}
                currentIndex={currentSectionIndex}
              />

              {/* Current Section */}
              <div className="min-h-[400px]">
                {resumeSections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`relative ${
                      index === currentSectionIndex ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg border space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                        {section.type === 'multiple' && (
                          <button
                            onClick={() => addEntry(section.id)}
                            className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
                          >
                            <span>
                              Add{' '}
                              {section.id === 'skills'
                                ? 'Skill Category'
                                : `${section.title}`}
                            </span>
                          </button>
                        )}
                      </div>

                      {section.entries.map((entry, entryIndex) => (
                        <div key={entry.id} className="relative">
                          {section.type === 'multiple' &&
                            section.entries.length > 1 && (
                              <button
                                onClick={() =>
                                  removeEntry(section.id, entry.id)
                                }
                                className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}

                          {section.id === 'contact' && (
                            <ContactSection
                              entry={entry}
                              sectionId={section.id}
                              onUpdate={(field, value) => {
                                const updatedFields = {
                                  ...entry.fields,
                                  [field]: value,
                                };
                                updateEntry(
                                  section.id,
                                  entry.id,
                                  'fields',
                                  updatedFields
                                );
                              }}
                            />
                          )}

                          {section.id === 'summary' && (
                            <SummarySection
                              entry={entry}
                              sectionId={section.id}
                              onUpdate={(field, value) =>
                                updateEntry(section.id, entry.id, field, value)
                              }
                            />
                          )}

                          {section.id === 'education' && (
                            <EducationSection
                              entry={entry}
                              sectionId={section.id}
                              entryIndex={entryIndex}
                              onUpdate={(field, value) =>
                                updateEntry(section.id, entry.id, field, value)
                              }
                            />
                          )}

                          {section.id === 'experience' && (
                            <WorkExperienceSection
                              entry={entry}
                              sectionId={section.id}
                              entryIndex={entryIndex}
                              onUpdate={(field, value) =>
                                updateEntry(section.id, entry.id, field, value)
                              }
                            />
                          )}

                          {section.id === 'certifications' && (
                            <CertificationSection
                              entry={entry}
                              sectionId={section.id}
                              entryIndex={entryIndex}
                              onUpdate={(field, value) =>
                                updateEntry(section.id, entry.id, field, value)
                              }
                            />
                          )}

                          {section.id === 'projects' && (
                            <ProjectSection
                              entry={entry}
                              sectionId={section.id}
                              entryIndex={entryIndex}
                              onUpdate={(field, value) =>
                                updateEntry(section.id, entry.id, field, value)
                              }
                            />
                          )}

                          {section.id === 'interests' && (
                            <InterestSection
                              entry={entry}
                              sectionId={section.id}
                              onUpdate={(field, value) =>
                                updateEntry(section.id, entry.id, field, value)
                              }
                            />
                          )}

                          {section.id === 'completion' && (
                            <CompletionSection
                              resumeData={resumeData}
                              onPreview={() => {
                                // Preview implementation
                              }}
                              onDownload={() => {
                                // Download implementation with watermark
                                const watermark = 'Created by Sachit Wadhawan';
                                // Implementation for PDF generation with watermark would go here
                              }}
                            />
                          )}

                          {section.id !== 'contact' &&
                            section.id !== 'education' &&
                            section.id !== 'experience' &&
                            section.id !== 'skills' &&
                            section.id !== 'certifications' &&
                            section.id !== 'projects' &&
                            section.id !== 'interests' &&
                            section.id !== 'completion' && (
                              <div>
                                <RichTextEditor
                                  content={entry.content || ''}
                                  onChange={(content) =>
                                    updateEntry(
                                      section.id,
                                      entry.id,
                                      'content',
                                      content
                                    )
                                  }
                                />
                              </div>
                            )}
                        </div>
                      ))}

                      {section.id === 'skills' && section.type === 'single' && (
                        <SkillsSection
                          resumeTitle={
                            resumeSections[0]?.entries[0]?.fields
                              ?.resumeTitle || ''
                          }
                          skills={section.entries}
                          onUpdate={(skills) => {
                            setResumeSections((prev) =>
                              prev.map((s) =>
                                s.id === section.id
                                  ? { ...s, entries: skills }
                                  : s
                              )
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <NavigationButtons
                currentIndex={currentSectionIndex}
                totalSteps={resumeSections.length}
                onPrevious={goToPreviousSection}
                onNext={goToNextSection}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilder;
