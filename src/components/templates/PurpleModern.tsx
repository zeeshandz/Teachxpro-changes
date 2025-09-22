import React, { useRef, useState } from 'react';
import { MapPin, Mail, Phone, Globe, Linkedin, Instagram, Upload } from 'lucide-react';
import { BaseTemplateProps } from './BaseTemplate';

interface ExtendedPersonalInfo {
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedinUsername?: string;
  instagramUsername?: string;
  profileSummary?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  proudOf?: string;
  profileImage?: string;
  onUpdateImage?: (image: string) => void;
}

interface ExtendedBaseTemplateProps extends Omit<BaseTemplateProps, 'personalInfo'> {
  personalInfo: ExtendedPersonalInfo;
}

// Helper function to check if an item has content
const hasContent = (item: any): boolean => {
  if (!item) return false;
  const isEmpty = (value: any) => value === '' || value === null || value === undefined;
  
  switch (true) {
    case 'company' in item && 'position' in item: // Experience
      return !isEmpty(item.company) || !isEmpty(item.position) || !isEmpty(item.description);
    case 'school' in item && 'degree' in item: // Education
      return !isEmpty(item.school) || !isEmpty(item.degree);
    case 'name' in item && 'level' in item: // Skills
      return !isEmpty(item.name);
    case 'name' in item && 'proficiency' in item: // Languages
      return !isEmpty(item.name);
    case 'title' in item: // Books or other titled items
      return !isEmpty(item.title);
    default:
      return false;
  }
};

const PurpleModern: React.FC<ExtendedBaseTemplateProps> = ({ personalInfo, sections }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(personalInfo.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        personalInfo.onUpdateImage?.(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Filter sections to only include those with content
  const filteredSections = sections
    .filter(section => section.items && section.items.length > 0)
    .map(section => ({
      ...section,
      items: section.items.filter(hasContent)
    }))
    .filter(section => section.items.length > 0);

  // Get specific sections
  const languagesSection = filteredSections.find(s => s.type === 'languages');
  const experienceSection = filteredSections.find(s => s.type === 'experience');
  const educationSection = filteredSections.find(s => s.type === 'education');
  const toolsSection = filteredSections.find(s => s.type === 'tools');
  const awardsSection = filteredSections.find(s => s.type === 'awards');
  const skillsSection = filteredSections.find(s => s.type === 'skills');
  const booksSection = filteredSections.find(s => s.type === 'books');
  const certificatesSection = filteredSections.find(s => s.type === 'certificates');
  const interestsSection = filteredSections.find(s => s.type === 'interests');
  const coursesSection = filteredSections.find(s => s.type === 'courses');
  const organizationsSection = filteredSections.find(s => s.type === 'organizations');
  const publicationsSection = filteredSections.find(s => s.type === 'publications');
  const referencesSection = filteredSections.find(s => s.type === 'references');

  // Check if personal info has content
  const hasPersonalInfo = Boolean(
    personalInfo.firstName ||
    personalInfo.lastName ||
    personalInfo.title ||
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.location ||
    personalInfo.website ||
    personalInfo.linkedinUsername ||
    personalInfo.instagramUsername
  );

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg flex print:shadow-none">
      {/* Left Sidebar - Purple Background */}
      <div className="w-[70mm] bg-[#4a314d] min-h-[297mm] print:min-h-full">
        {/* Left Sidebar Content */}
        <div className="p-6 text-white">
          {/* Profile Section */}
          <div className="space-y-4">
            {(personalInfo.firstName || personalInfo.lastName) && (
              <h1 className="text-3xl font-light tracking-wide">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
            )}
            {personalInfo.title && (
              <h2 className="text-xl font-light">{personalInfo.title}</h2>
            )}
            
            {/* Profile Image Section */}
            {hasPersonalInfo && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile photo"
                />
                <div 
                  onClick={handleUploadClick}
                  className="w-full aspect-square bg-[#3a2a3d] rounded-sm overflow-hidden relative group cursor-pointer hover:bg-[#4a3a4d] transition-colors"
                >
                  {imagePreview ? (
                    <div className="w-full h-full relative">
                      <img 
                        src={imagePreview} 
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-white flex flex-col items-center">
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="text-sm">Change Photo</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 group-hover:text-white/90">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">Upload Photo</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Contact Information */}
            {hasPersonalInfo && (
              <div className="space-y-2 text-sm">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-80">
                    <Mail className="w-4 h-4" />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.phone && (
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:opacity-80">
                    <Phone className="w-4 h-4" />
                    <span>{personalInfo.phone}</span>
                  </a>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} className="flex items-center gap-2 hover:opacity-80">
                    <Globe className="w-4 h-4" />
                    <span>{personalInfo.website}</span>
                  </a>
                )}
                {personalInfo.linkedinUsername && (
                  <a href={`https://linkedin.com/in/${personalInfo.linkedinUsername}`} className="flex items-center gap-2 hover:opacity-80">
                    <Linkedin className="w-4 h-4" />
                    <span>{personalInfo.linkedinUsername}</span>
                  </a>
                )}
                {personalInfo.instagramUsername && (
                  <a href={`https://instagram.com/${personalInfo.instagramUsername}`} className="flex items-center gap-2 hover:opacity-80">
                    <Instagram className="w-4 h-4" />
                    <span>{personalInfo.instagramUsername}</span>
                  </a>
                )}
              </div>
            )}

            {/* Profile Summary */}
            {personalInfo.profileSummary && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-wider">Profile</h3>
                <p className="text-sm leading-relaxed">{personalInfo.profileSummary}</p>
              </div>
            )}

            {/* Most Proud Of Section */}
            {personalInfo.proudOf && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-wider">Most Proud Of</h3>
                <p className="text-sm leading-relaxed">{personalInfo.proudOf}</p>
              </div>
            )}

            {/* Languages Section */}
            {languagesSection && languagesSection.items.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-wider">Languages</h3>
                <div className="space-y-2">
                  {languagesSection.items.map((lang: any) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="text-sm">{lang.name}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= (lang.proficiency === 'Native' ? 5 : 
                                      lang.proficiency === 'Fluent' ? 4 : 
                                      lang.proficiency === 'Intermediate' ? 3 : 2)
                                ? 'bg-white'
                                : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Area - White Background */}
      <div className="w-[140mm] p-6 bg-white">
        {/* Professional Experience */}
        {experienceSection && experienceSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Professional Experience</h2>
            <div className="space-y-4">
              {experienceSection.items.map((exp: any) => (
                <div key={exp.id} className="print:break-inside-avoid">
                  <div className="mb-1">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h3 className="font-semibold max-w-[70%]">{exp.company} {exp.location && `| ${exp.location}`}</h3>
                      <span className="text-sm text-gray-600 shrink-0">
                        {exp.startDate} {(exp.startDate || exp.endDate) && '-'} {exp.current ? 'present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm italic">{exp.position}</p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 whitespace-pre-wrap break-words">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educationSection && educationSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Education</h2>
            <div className="space-y-4">
              {educationSection.items.map((edu: any) => (
                <div key={edu.id} className="print:break-inside-avoid">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm">{edu.school}</p>
                  <div className="flex flex-wrap gap-2 items-baseline">
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-gray-600">
                        {edu.startDate} {(edu.startDate || edu.endDate) && '-'} {edu.current ? 'present' : edu.endDate}
                      </p>
                    )}
                    {edu.location && (
                      <p className="text-sm text-gray-600">| {edu.location}</p>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificatesSection && certificatesSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Certificates</h2>
            <div className="space-y-4">
              {certificatesSection.items.map((cert: any) => (
                <div key={cert.id}>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  {cert.date && (
                    <p className="text-sm text-gray-600">{cert.date}</p>
                  )}
                  {cert.description && (
                    <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {interestsSection && interestsSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Interests</h2>
            <div className="space-y-3">
              {interestsSection.items.map((interest: any) => (
                <div key={interest.id}>
                  <h3 className="font-semibold">{interest.name}</h3>
                  {interest.description && (
                    <p className="text-sm text-gray-600">{interest.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {coursesSection && coursesSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Courses</h2>
            <div className="space-y-4">
              {coursesSection.items.map((course: any) => (
                <div key={course.id}>
                  <h3 className="font-semibold">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.institution}</p>
                  {course.date && (
                    <p className="text-sm text-gray-600">{course.date}</p>
                  )}
                  {course.description && (
                    <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Organizations */}
        {organizationsSection && organizationsSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Organizations</h2>
            <div className="space-y-4">
              {organizationsSection.items.map((org: any) => (
                <div key={org.id}>
                  <h3 className="font-semibold">{org.name}</h3>
                  <p className="text-sm italic">{org.role}</p>
                  {(org.startDate || org.endDate) && (
                    <p className="text-sm text-gray-600">
                      {org.startDate} {(org.startDate || org.endDate) && '-'} {org.current ? 'present' : org.endDate}
                    </p>
                  )}
                  {org.description && (
                    <p className="text-sm text-gray-600 mt-1">{org.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {publicationsSection && publicationsSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Publications</h2>
            <div className="space-y-4">
              {publicationsSection.items.map((pub: any) => (
                <div key={pub.id}>
                  <h3 className="font-semibold">{pub.title}</h3>
                  <p className="text-sm text-gray-600">{pub.publisher}</p>
                  {pub.date && (
                    <p className="text-sm text-gray-600">{pub.date}</p>
                  )}
                  {pub.description && (
                    <p className="text-sm text-gray-600 mt-1">{pub.description}</p>
                  )}
                  {pub.url && (
                    <a 
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                    >
                      View Publication
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {referencesSection && referencesSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">References</h2>
            <div className="space-y-4">
              {referencesSection.items.map((ref: any) => (
                <div key={ref.id}>
                  <h3 className="font-semibold">{ref.name}</h3>
                  <p className="text-sm text-gray-600">{ref.title}</p>
                  <p className="text-sm text-gray-600">{ref.company}</p>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {ref.email && (
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {ref.email}
                      </div>
                    )}
                    {ref.phone && (
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {ref.phone}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        {toolsSection && toolsSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Tools</h2>
            <div className="space-y-2">
              {toolsSection.items.map((tool: any) => (
                <div key={tool.id}>
                  <h3 className="font-semibold">{tool.name}</h3>
                  {tool.description && <p className="text-sm text-gray-600">{tool.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awardsSection && awardsSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Awards</h2>
            <div className="space-y-2">
              {awardsSection.items.map((award: any) => (
                <div key={award.id}>
                  <h3 className="font-semibold">{award.title}</h3>
                  {award.description && <p className="text-sm text-gray-600">{award.description}</p>}
                  {award.date && <p className="text-sm text-gray-600">{award.date}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillsSection && skillsSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Skills</h2>
            <div className="space-y-3">
              {skillsSection.items.map((skill: any) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-sm">{skill.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= skill.level
                            ? 'bg-black'
                            : 'border border-black'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Favorite Books */}
        {booksSection && booksSection.items.length > 0 && (
          <section className="mb-5 print:break-inside-avoid">
            <h2 className="text-xl font-semibold mb-3 uppercase">Favorite Books</h2>
            <div className="space-y-1">
              {booksSection.items.map((book: any) => (
                <p key={book.id} className="text-sm text-gray-600">"{book.title}" by {book.author}</p>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Print-specific styles */}
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
          .print-exact {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PurpleModern; 