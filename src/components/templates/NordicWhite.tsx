import React, { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin, Github, Twitter, Globe, RefreshCw } from 'lucide-react';
import { BaseTemplateProps } from './BaseTemplate';
import { Section } from '../../types/resume';
import { generateProfileSummary } from '../../lib/openai';

// Extended PersonalInfo type
interface ExtendedPersonalInfo {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  profileSummary?: string;
  onUpdate?: (info: ExtendedPersonalInfo) => void;
}

interface ExtendedBaseTemplateProps extends Omit<BaseTemplateProps, 'personalInfo'> {
  personalInfo: ExtendedPersonalInfo;
}

// Helper function to check if an item has content
const hasContent = (item: any): boolean => {
  if (!item) return false;
  
  // Check for empty strings, null, or undefined values
  const isEmpty = (value: any) => value === '' || value === null || value === undefined;
  
  switch (true) {
    case 'company' in item && 'position' in item: // Experience
      return !isEmpty(item.company) || !isEmpty(item.position) || !isEmpty(item.description);
    case 'school' in item && 'degree' in item: // Education
      return !isEmpty(item.school) || !isEmpty(item.degree) || !isEmpty(item.field);
    case 'name' in item && 'level' in item: // Skills
      return !isEmpty(item.name);
    case 'name' in item && 'proficiency' in item: // Languages
      return !isEmpty(item.name);
    case 'name' in item && 'issuer' in item: // Certificates
      return !isEmpty(item.name) || !isEmpty(item.issuer);
    case 'name' in item && !('issuer' in item) && !('level' in item) && !('proficiency' in item): // Interests
      return !isEmpty(item.name);
    case 'title' in item && 'issuer' in item: // Awards
      return !isEmpty(item.title) || !isEmpty(item.issuer);
    case 'name' in item && 'role' in item: // Organizations
      return !isEmpty(item.name) || !isEmpty(item.role);
    case 'title' in item && 'publisher' in item: // Publications
      return !isEmpty(item.title) || !isEmpty(item.publisher);
    case 'name' in item && 'company' in item && !('position' in item): // References
      return !isEmpty(item.name) || !isEmpty(item.company);
    default:
      return false;
  }
};

// Type guards for different section types
const isExperience = (item: any): boolean => 'company' in item && 'position' in item;
const isEducation = (item: any): boolean => 'school' in item && 'degree' in item;
const isSkill = (item: any): boolean => 'name' in item && 'level' in item;
const isLanguage = (item: any): boolean => 'name' in item && 'proficiency' in item;
const isCertificate = (item: any): boolean => 'name' in item && 'issuer' in item;
const isInterest = (item: any): boolean => 'name' in item && !('issuer' in item) && !('level' in item) && !('proficiency' in item);
const isAward = (item: any): boolean => 'title' in item && 'issuer' in item;
const isOrganization = (item: any): boolean => 'name' in item && 'role' in item;
const isPublication = (item: any): boolean => 'title' in item && 'publisher' in item;
const isReference = (item: any): boolean => 'name' in item && 'company' in item && !('position' in item);
const isCourse = (item: any): boolean => 'name' in item && 'institution' in item;

// Helper function to check if personal info has content
const hasPersonalInfoContent = (info: any): boolean => {
  return Boolean(
    info.firstName ||
    info.lastName ||
    info.title ||
    info.email ||
    info.phone ||
    info.location ||
    (info.socialLinks && info.socialLinks.some((link: any) => link.url))
  );
};

const NordicWhite: React.FC<ExtendedBaseTemplateProps> = ({ personalInfo, sections }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProfileSummary = async () => {
    if (!personalInfo.title) {
      alert('Please add a job title first');
      return;
    }
    
    setIsGenerating(true);
    try {
      const summary = await generateProfileSummary(personalInfo.title);
      
      if (typeof personalInfo.onUpdate === 'function') {
        personalInfo.onUpdate({
          ...personalInfo,
          profileSummary: summary
        });
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter sections to only include those with content
  const filteredSections = sections
    .filter(section => section.items && section.items.length > 0)
    .map(section => ({
      ...section,
      items: section.items.filter(hasContent)
    }))
    .filter(section => section.items.length > 0);

  // Only show personal info if it has content
  const showPersonalInfo = hasPersonalInfoContent(personalInfo);

  return (
    <div className="min-h-[297mm] w-[210mm] mx-auto bg-white p-12 font-serif relative">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div 
          className="text-[7rem] font-bold text-gray-50/20 transform -rotate-45 select-none w-full text-center"
          style={{ letterSpacing: '0.5rem' }}
        >
          TeachXPro
        </div>
      </div>

      {/* Content Container */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        {showPersonalInfo && (
          <header className="mb-8">
            <div className="mb-4">
              <div className="flex items-baseline gap-4 pb-2 w-full">
                {(personalInfo.firstName || personalInfo.lastName) && (
                  <h1 className="text-3xl font-bold tracking-wide">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </h1>
                )}
                {personalInfo.title && (
                  <p className="text-xl italic text-gray-700">{personalInfo.title}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-sm mt-4">
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.socialLinks?.map((link: { platform: string; url: string }) => (
                link.platform === 'LinkedIn' && (
                  <div key={link.platform} className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>{link.url.replace('https://linkedin.com/', '')}</span>
                  </div>
                )
              ))}
            </div>
          </header>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <section className="mb-6">
            <h2 className="text-base font-bold border-b border-black pb-0.5 mb-3 uppercase tracking-wider">Profile Summary</h2>
            <div className="text-sm text-justify text-gray-600">
              {personalInfo.profileSummary || "No profile summary available."}
            </div>
          </section>
          {filteredSections.map((section) => (
            <section key={section.id} className="mb-6">
              <div className="flex justify-between items-center gap-4"></div>
              <h2 className="text-base font-bold border-b border-black pb-0.5 mb-3 uppercase tracking-wider">{section.title}</h2>
              <div className="space-y-3">
              
                {/* Experience Section */}
                {section.type === 'experience' && (
                  <div className="space-y-4">
                    {section.items.filter(isExperience).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div>{item.startDate} – {item.current ? 'Present' : item.endDate}</div>
                          <div>{item.location}</div>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold">{item.position}</span>
                            {item.company && <span className="italic">at {item.company}</span>}
                          </div>
                          {item.description && (
                            <ul className="list-disc ml-4 text-sm space-y-1 text-justify">
                              {item.description.split('\n').map((line: string, idx: number) => (
                                <li key={idx}>{line}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Section */}
                {section.type === 'education' && (
                  <div className="space-y-4">
                    {section.items.filter(isEducation).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div>{item.startDate} – {item.current ? 'Present' : item.endDate}</div>
                          <div>{item.location}</div>
                        </div>
                        <div>
                          <div className="font-bold">{item.degree}</div>
                          <div className="italic">{item.school}</div>
                          {item.field && (
                            <div className="text-sm">Field of Study: {item.field}</div>
                          )}
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Section */}
                {section.type === 'skills' && (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {section.items.filter(isSkill).map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-sm">{item.name}</span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-1.5 h-1.5 rounded-full ${
                                level <= (item.level || 0) ? 'bg-black' : 'border border-black'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages Section */}
                {section.type === 'languages' && (
                  <div className="flex flex-wrap gap-8">
                    {section.items.filter(isLanguage).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm">{item.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certificates */}
                {section.type === 'certificates' && (
                  <div className="space-y-4">
                    {section.items.filter(isCertificate).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.name}</div>
                          {item.issuer && <div className="italic">{item.issuer}</div>}
                        </div>
                        <div>
                          {item.date && (
                            <div className="text-right whitespace-nowrap">{item.date}</div>
                          )}
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interests */}
                {section.type === 'interests' && (
                  <div className="space-y-4">
                    {section.items.filter(isInterest).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.name}</div>
                        </div>
                        <div>
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Courses */}
                {section.type === 'courses' && (
                  <div className="space-y-4">
                    {section.items.filter(isCourse).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.name}</div>
                          {item.institution && <div className="italic">{item.institution}</div>}
                        </div>
                        <div>
                          {item.date && (
                            <div className="text-right whitespace-nowrap">{item.date}</div>
                          )}
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Awards */}
                {section.type === 'awards' && (
                  <div className="space-y-4">
                    {section.items.filter(isAward).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.title}</div>
                          {item.issuer && <div className="italic">{item.issuer}</div>}
                        </div>
                        <div>
                          {item.date && (
                            <div className="text-right whitespace-nowrap">{item.date}</div>
                          )}
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Organizations */}
                {section.type === 'organizations' && (
                  <div className="space-y-4">
                    {section.items.filter(isOrganization).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.name}</div>
                          {item.role && <div className="italic">{item.role}</div>}
                        </div>
                        <div>
                          {(item.startDate || item.endDate) && (
                            <div className="text-right whitespace-nowrap">
                              <div>{item.startDate} – {item.current ? 'Present' : item.endDate}</div>
                            </div>
                          )}
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Publications */}
                {section.type === 'publications' && (
                  <div className="space-y-4">
                    {section.items.filter(isPublication).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.title}</div>
                          {item.publisher && <div className="italic">{item.publisher}</div>}
                        </div>
                        <div>
                          {item.date && (
                            <div className="text-right whitespace-nowrap">{item.date}</div>
                          )}
                          {item.description && (
                            <p className="mt-1 text-sm text-justify">{item.description}</p>
                          )}
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline mt-1 block"
                            >
                              View Publication
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* References */}
                {section.type === 'references' && (
                  <div className="space-y-4">
                    {section.items.filter(isReference).map((item: any) => (
                      <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="text-sm">
                          <div className="font-semibold">{item.name}</div>
                          {item.company && <div className="italic">{item.company}</div>}
                          {item.title && <div className="text-gray-600 text-sm">{item.title}</div>}
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            {item.email && (
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {item.email}
                              </div>
                            )}
                            {item.phone && (
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {item.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NordicWhite; 