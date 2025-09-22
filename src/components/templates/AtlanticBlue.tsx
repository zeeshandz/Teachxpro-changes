import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from 'lucide-react';
import { BaseTemplateProps } from './BaseTemplate';
import { WorkExperience, Education, Skill, Language, Certificate, Interest, Course, Award, Organization, Publication, Reference } from '../../types/resume';

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
const isExperience = (item: any): item is WorkExperience => 'company' in item && 'position' in item;
const isEducation = (item: any): item is Education => 'school' in item && 'degree' in item;
const isSkill = (item: any): item is Skill => 'name' in item && 'level' in item;
const isLanguage = (item: any): item is Language => 'name' in item && 'proficiency' in item;
const isCertificate = (item: any): item is Certificate => 'name' in item && 'issuer' in item;
const isInterest = (item: any): item is Interest => 'name' in item && !('issuer' in item) && !('level' in item) && !('proficiency' in item);
const isAward = (item: any): item is Award => 'title' in item && 'issuer' in item;
const isOrganization = (item: any): item is Organization => 'name' in item && 'role' in item;
const isPublication = (item: any): item is Publication => 'title' in item && 'publisher' in item;
const isReference = (item: any): item is Reference => 'name' in item && 'company' in item && !('position' in item);

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

const AtlanticBlue: React.FC<BaseTemplateProps> = ({ personalInfo, sections }) => {
  // Filter sections to only include those with content
  const filteredSections = sections
    .filter(section => section.items && section.items.length > 0)
    .map(section => ({
      ...section,
      items: section.items.filter(hasContent)
    }))
    .filter(section => section.items.length > 0);

  // Separate sections for sidebar and main content
  const sidebarSections = filteredSections.filter(section => 
    ['languages', 'awards', 'skills'].includes(section.type)
  );
  const mainSections = filteredSections.filter(section => 
    !['languages', 'awards', 'skills'].includes(section.type)
  );

  // Only show personal info if it has content
  const showPersonalInfo = hasPersonalInfoContent(personalInfo);

  return (
    <div className="min-h-[297mm] w-[210mm] mx-auto bg-white shadow-lg flex">
      {/* Left Sidebar - Dark Blue Background */}
      <div className="w-[35%] bg-[#1a2744] text-white p-8">
        {showPersonalInfo && (
          <>
            {/* Profile Image - Only show if name exists */}
            {(personalInfo.firstName || personalInfo.lastName) && (
              <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-8">
                <span className="text-4xl">
                  {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
                </span>
              </div>
            )}

            {/* Contact Information - Only show if any contact info exists */}
            {(personalInfo.email || personalInfo.phone || personalInfo.location) && (
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Contact</h3>
                <div className="space-y-3">
                  {personalInfo.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      <span className="break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Social Links - Only show if any social links exist */}
            {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold border-b border-white/20 pb-2">Social</h3>
                <div className="space-y-3">
                  {personalInfo.socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {link.platform === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                      {link.platform === 'GitHub' && <Github className="w-5 h-5" />}
                      {link.platform === 'Twitter' && <Twitter className="w-5 h-5" />}
                      {link.platform === 'Portfolio' && <Globe className="w-5 h-5" />}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300 break-all"
                      >
                        {link.platform}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Sidebar Sections */}
        {sidebarSections.map((section) => (
          <div key={section.id} className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  {/* Languages */}
                  {section.type === 'languages' && isLanguage(item) && (
                    <div className="flex justify-between items-center text-sm">
                      <span>{item.name}</span>
                      <span className="text-white/80">{item.proficiency}</span>
                    </div>
                  )}

                  {/* Awards */}
                  {section.type === 'awards' && isAward(item) && (
                    <div className="space-y-1">
                      <div className="font-medium">{item.title}</div>
                      {item.issuer && <div className="text-white/80 text-sm">{item.issuer}</div>}
                      {item.date && <div className="text-white/60 text-sm">{item.date}</div>}
                      {item.description && <p className="text-sm mt-1 text-white/80">{item.description}</p>}
                    </div>
                  )}

                  {/* Skills */}
                  {section.type === 'skills' && isSkill(item) && (
                    <div className="flex justify-between items-center text-sm">
                      <span>{item.name}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= (item.level || 0) ? 'bg-white' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Content Area - White Background */}
      <div className="w-[65%] p-8">
        {/* Header */}
        {showPersonalInfo && (
          <header className="mb-8">
            {(personalInfo.firstName || personalInfo.lastName) && (
              <h1 className="text-3xl font-bold text-[#1a2744]">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
            )}
            {personalInfo.title && (
              <p className="text-lg text-gray-600 mt-1">{personalInfo.title}</p>
            )}
          </header>
        )}

        {/* Main Content Sections */}
        {mainSections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold text-[#1a2744] border-b border-gray-200 pb-2 mb-4">
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id}>
                  {/* Experience */}
                  {section.type === 'experience' && isExperience(item) && (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          {item.position && <div className="font-medium text-[#1a2744]">{item.position}</div>}
                          {item.company && <div className="text-gray-600">{item.company}</div>}
                        </div>
                        {(item.startDate || item.endDate) && (
                          <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                            {item.startDate} - {item.current ? 'Present' : item.endDate}
                          </div>
                        )}
                      </div>
                      {item.description && <p className="text-sm mt-2 text-gray-600">{item.description}</p>}
                    </div>
                  )}

                  {/* Education */}
                  {section.type === 'education' && isEducation(item) && (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          {item.school && <div className="font-medium text-[#1a2744]">{item.school}</div>}
                          {(item.degree || item.field) && (
                            <div className="text-gray-600">
                              {item.degree} {item.field && `in ${item.field}`}
                            </div>
                          )}
                        </div>
                        {(item.startDate || item.endDate) && (
                          <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                            {item.startDate} - {item.current ? 'Present' : item.endDate}
                          </div>
                        )}
                      </div>
                      {item.description && <p className="text-sm mt-2 text-gray-600">{item.description}</p>}
                    </div>
                  )}

                  {/* Publications */}
                  {section.type === 'publications' && isPublication(item) && (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-[#1a2744]">{item.title}</div>
                          {item.publisher && <div className="text-gray-600">{item.publisher}</div>}
                        </div>
                        {item.date && (
                          <div className="text-sm text-gray-500 whitespace-nowrap ml-4">{item.date}</div>
                        )}
                      </div>
                      {item.description && <p className="text-sm mt-2 text-gray-600">{item.description}</p>}
                    </div>
                  )}

                  {/* References */}
                  {section.type === 'references' && isReference(item) && (
                    <div>
                      <div className="font-medium text-[#1a2744]">{item.name}</div>
                      {item.company && <div className="text-gray-600">{item.company}</div>}
                      <div className="flex flex-wrap gap-4 mt-1">
                        {item.email && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {item.email}
                          </div>
                        )}
                        {item.phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {item.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtlanticBlue; 