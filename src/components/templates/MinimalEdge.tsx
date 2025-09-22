import React from 'react';
import { BaseTemplateProps } from './BaseTemplate';
import { Section, WorkExperience, Education, Skill } from '../../types/resume';

export const MinimalEdge: React.FC<BaseTemplateProps> = ({ personalInfo, sections }) => {
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  // Helper function to get social icon
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        );
      case 'portfolio':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Helper function to check if an item has content
  const hasContent = (item: any): boolean => {
    if (!item) return false;
    
    // For experience sections
    if ('company' in item) {
      return !!(item.company || item.position || item.description);
    }
    
    // For education sections
    if ('school' in item) {
      return !!(item.school || item.degree || item.field || item.description);
    }
    
    // For skills
    if ('level' in item) {
      return !!item.name;
    }
    
    // For other sections with name/title
    if ('name' in item || 'title' in item) {
      return !!(item.name || item.title);
    }

    return false;
  };

  // Filter sections that have items with content
  const filteredSections = sections.filter(section => 
    section.items.some(hasContent)
  );

  return (
    <div className="min-h-[297mm] w-[210mm] mx-auto bg-white shadow-lg">
      {/* Header */}
      <header className="px-12 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
        <p className="text-lg text-gray-600 mt-1">{personalInfo.title}</p>
        
        <div className="flex flex-col gap-4 mt-4">
          {/* Contact Information */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {personalInfo.location}
              </span>
            )}
          </div>

          {/* Social Links */}
          {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {personalInfo.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  {getSocialIcon(link.platform)}
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-12 py-6">
        {filteredSections.map((section) => (
          <section key={section.id} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              {section.title}
            </h2>

            {/* Experience & Education Sections */}
            {(section.type === 'experience' || section.type === 'education') && (
              <div className="space-y-6">
                {section.items.filter(hasContent).map((item: any) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {section.type === 'experience' ? item.position : item.degree}
                        </h3>
                        <p className="text-gray-600">
                          {section.type === 'experience' ? item.company : item.school}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {item.startDate} - {item.current ? 'Present' : item.endDate}
                      </p>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section */}
            {section.type === 'skills' && (
              <div className="grid grid-cols-2 gap-4">
                {section.items.filter(hasContent).map((skill: any) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <span className="text-gray-700">{skill.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-gray-700 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Other Sections */}
            {!['experience', 'education', 'skills'].includes(section.type) && (
              <div className="grid grid-cols-2 gap-4">
                {section.items.filter(hasContent).map((item: any) => (
                  <div key={item.id} className="text-sm">
                    <h3 className="font-semibold text-gray-900">{item.name || item.title}</h3>
                    {item.description && (
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}; 