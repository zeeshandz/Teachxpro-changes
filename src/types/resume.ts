export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  firstName: string;
  lastName: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Interest {
  id: string;
  name: string;
  description?: string;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  date: string;
  description?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
}

export interface Tool {
  id: string;
  name: string;
  description?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
}

export type SectionType =
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certificates'
  | 'interests'
  | 'courses'
  | 'awards'
  | 'organizations'
  | 'publications'
  | 'references'
  | 'tools'
  | 'books';

export interface BaseSection<T> {
  id: string;
  title: string;
  type: SectionType;
  items: T[];
}

export interface ExperienceSection extends BaseSection<WorkExperience> {
  type: 'experience';
}

export interface EducationSection extends BaseSection<Education> {
  type: 'education';
}

export interface SkillsSection extends BaseSection<Skill> {
  type: 'skills';
}

export interface LanguagesSection extends BaseSection<Language> {
  type: 'languages';
}

export interface CertificatesSection extends BaseSection<Certificate> {
  type: 'certificates';
}

export interface InterestsSection extends BaseSection<Interest> {
  type: 'interests';
}

export interface CoursesSection extends BaseSection<Course> {
  type: 'courses';
}

export interface AwardsSection extends BaseSection<Award> {
  type: 'awards';
}

export interface OrganizationsSection extends BaseSection<Organization> {
  type: 'organizations';
}

export interface PublicationsSection extends BaseSection<Publication> {
  type: 'publications';
}

export interface ReferencesSection extends BaseSection<Reference> {
  type: 'references';
}

export interface ToolsSection extends BaseSection<Tool> {
  type: 'tools';
}

export interface BooksSection extends BaseSection<Book> {
  type: 'books';
}

export type Section =
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | LanguagesSection
  | CertificatesSection
  | InterestsSection
  | CoursesSection
  | AwardsSection
  | OrganizationsSection
  | PublicationsSection
  | ReferencesSection
  | ToolsSection
  | BooksSection;
