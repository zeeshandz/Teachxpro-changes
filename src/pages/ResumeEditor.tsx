import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Heart,
  Book,
  Trophy,
  Users,
  FileText,
  Plus,
  Trash2,
  Download,
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Link as LinkIcon,
  Wrench,
  BookOpen,
  UserCheck,
  Star,
  RefreshCw,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { debounce } from 'lodash';
import { generateSectionDescription } from '../lib/openai';
import { getTemplate } from '../components/templates';

interface PersonalInfo {
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
  profileSummary?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

interface Language {
  id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

interface Interest {
  id: string;
  name: string;
  description?: string;
}

interface Course {
  id: string;
  name: string;
  institution: string;
  date: string;
  description?: string;
}

interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface Organization {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
}

interface BaseSection<T> {
  id: string;
  type: SectionType;
  title: string;
  icon: React.ReactNode;
  items: T[];
}

type SectionType =
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
  | 'references';

interface ExperienceSection extends BaseSection<WorkExperience> {
  type: 'experience';
}

interface EducationSection extends BaseSection<Education> {
  type: 'education';
}

interface SkillsSection extends BaseSection<Skill> {
  type: 'skills';
}

interface LanguagesSection extends BaseSection<Language> {
  type: 'languages';
}

interface CertificatesSection extends BaseSection<Certificate> {
  type: 'certificates';
}

interface InterestsSection extends BaseSection<Interest> {
  type: 'interests';
}

interface CoursesSection extends BaseSection<Course> {
  type: 'courses';
}

interface AwardsSection extends BaseSection<Award> {
  type: 'awards';
}

interface OrganizationsSection extends BaseSection<Organization> {
  type: 'organizations';
}

interface PublicationsSection extends BaseSection<Publication> {
  type: 'publications';
}

interface ReferencesSection extends BaseSection<Reference> {
  type: 'references';
}

type Section =
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
  | ReferencesSection;

const SectionItemForm = ({
  section,
  item,
  onUpdate,
  onDelete,
}: {
  section: Section;
  item:
    | WorkExperience
    | Education
    | Skill
    | Language
    | Certificate
    | Interest
    | Course
    | Award
    | Organization
    | Publication
    | Reference;
  onUpdate: (updates: Partial<typeof item>) => void;
  onDelete: () => void;
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async (prompt: string) => {
    try {
      setIsGenerating(true);
      const description = await generateSectionDescription(prompt);
      onUpdate({ description });
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isGenerateDisabled = (item: any): boolean => {
    switch (section.type) {
      case 'experience':
        return !item.company || !item.position || !item.startDate;
      case 'education':
        return !item.school || !item.degree || !item.field || !item.startDate;
      case 'certificates':
        return !item.name || !item.issuer || !item.date;
      case 'courses':
        return !item.name || !item.institution || !item.date;
      case 'awards':
        return !item.title || !item.issuer || !item.date;
      case 'organizations':
        return !item.name || !item.role || !item.startDate;
      case 'publications':
        return !item.title || !item.publisher || !item.date;
      case 'interests':
        return !item.name;
      default:
        return false;
    }
  };

  switch (section.type) {
    case 'experience':
      const exp = item as WorkExperience;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => onUpdate({ company: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) => onUpdate({ position: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => onUpdate({ startDate: e.target.value })}
                className="w-full text-sm pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm appearance-none"
                placeholder="mm/dd/yyyy"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) => onUpdate({ endDate: e.target.value })}
                disabled={exp.current}
                className="w-full text-sm pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => onUpdate({ current: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label className="text-sm text-gray-600">Current Position</label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Description</label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the position of ${
                    exp.position
                  } at ${exp.company} from ${exp.startDate} to ${
                    exp.current ? 'Present' : exp.endDate
                  }. Focus on responsibilities, achievements, and impact.`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(exp)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={4}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'education':
      const edu = item as Education;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="School"
            value={edu.school}
            onChange={(e) => onUpdate({ school: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => onUpdate({ degree: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={edu.field}
            onChange={(e) => onUpdate({ field: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => onUpdate({ startDate: e.target.value })}
                className="w-full text-sm pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm appearance-none"
                placeholder="mm/dd/yyyy"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => onUpdate({ endDate: e.target.value })}
                disabled={edu.current}
                className="w-full pl-4 text-sm pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="mm/dd/yyyy"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={edu.current}
              onChange={(e) => onUpdate({ current: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label className="text-sm text-gray-600">Currently Studying</label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Description</label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for ${
                    edu.degree
                  } in ${edu.field} at ${edu.school} from ${edu.startDate} to ${
                    edu.current ? 'Present' : edu.endDate
                  }. Include relevant coursework, achievements, and academic projects if applicable.`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(edu)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description"
              value={edu.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={4}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'skills':
      const skill = item as Skill;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-4 text-sm py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Proficiency Level</label>
            <input
              type="range"
              min="1"
              max="5"
              value={skill.level}
              onChange={(e) => onUpdate({ level: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'languages':
      const lang = item as Language;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Language"
            value={lang.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <select
            value={lang.proficiency}
            onChange={(e) =>
              onUpdate({
                proficiency: e.target.value as Language['proficiency'],
              })
            }
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Native">Native</option>
          </select>
          <button
            onClick={onDelete}
            className="px-4 text-sm py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'certificates':
      const cert = item as Certificate;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Certificate Name"
            value={cert.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            value={cert.issuer}
            onChange={(e) => onUpdate({ issuer: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="date"
            value={cert.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Description (optional)
              </label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the ${cert.name} certificate from ${cert.issuer} obtained on ${cert.date}. Include the significance of the certification and any relevant skills or knowledge gained.`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(cert)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={cert.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'interests':
      const interest = item as Interest;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Interest"
            value={interest.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Description (optional)
              </label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the interest "${interest.name}"`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(interest)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={interest.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'courses':
      const course = item as Course;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-4 text-sm py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Institution"
            value={course.institution}
            onChange={(e) => onUpdate({ institution: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="date"
            value={course.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Description (optional)
              </label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the ${course.name} course at ${course.institution} completed on ${course.date}`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(course)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={course.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'awards':
      const award = item as Award;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Award Title"
            value={award.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Issuer"
            value={award.issuer}
            onChange={(e) => onUpdate({ issuer: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="date"
            value={award.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Description (optional)
              </label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the ${award.title} award from ${award.issuer} received on ${award.date}`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(award)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={award.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-red-600 text-sm hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'organizations':
      const org = item as Organization;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Organization Name"
            value={org.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-4 text-sm py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Your Role"
            value={org.role}
            onChange={(e) => onUpdate({ role: e.target.value })}
            className="w-full px-4 text-sm py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="date"
                value={org.startDate}
                onChange={(e) => onUpdate({ startDate: e.target.value })}
                className="w-full pl-4 text-sm pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm appearance-none"
                placeholder="mm/dd/yyyy"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                value={org.endDate}
                onChange={(e) => onUpdate({ endDate: e.target.value })}
                disabled={org.current}
                className="w-full pl-4 text-sm pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="mm/dd/yyyy"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={org.current}
              onChange={(e) => onUpdate({ current: e.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label className="text-sm text-gray-600">Currently Active</label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Description (optional)
              </label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the role of ${
                    org.role
                  } at ${org.name} from ${org.startDate} to ${
                    org.current ? 'Present' : org.endDate
                  }`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(org)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={org.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'publications':
      const pub = item as Publication;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Publication Title"
            value={pub.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-4 text-sm py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Publisher"
            value={pub.publisher}
            onChange={(e) => onUpdate({ publisher: e.target.value })}
            className="w-full px-4 text-sm py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="date"
            value={pub.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="url"
            placeholder="URL (optional)"
            value={pub.url || ''}
            onChange={(e) => onUpdate({ url: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                Description (optional)
              </label>
              <button
                onClick={() => {
                  const prompt = `Generate a professional description for the publication "${pub.title}" published by ${pub.publisher} on ${pub.date}`;
                  handleGenerateDescription(prompt);
                }}
                disabled={isGenerating || isGenerateDisabled(pub)}
                className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <textarea
              placeholder="Description (optional)"
              value={pub.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );

    case 'references':
      const ref = item as Reference;
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Reference Name"
            value={ref.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Title"
            value={ref.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="text"
            placeholder="Company"
            value={ref.company}
            onChange={(e) => onUpdate({ company: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={ref.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="w-full px-4 py-2 border text-sm border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={ref.phone || ''}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="w-full px-4 py-2 border text-sm border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
          <button
            onClick={onDelete}
            className="px-4 py-2 text-red-600 text-sm hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      );
  }
};

const ResumePreview = ({
  personalInfo,
  sections,
}: {
  personalInfo: PersonalInfo;
  sections: Section[];
}) => {
  const { templateId } = useParams();
  const Template = getTemplate(templateId || 'template-6');

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="resume-preview">
        <Template personalInfo={personalInfo} sections={sections} />
      </div>
    </div>
  );
};

function ResumeEditor() {
  const { templateId } = useParams();

  // Redirect if not using the allowed templates
  useEffect(() => {
    const templates = {
      'template-1': 'Atlantic Blue · Professional',
      'template-2': 'Nordic White · Creative',
      'template-3': 'Executive Black · Corporate',
      'template-4': 'Tech Stack · Developer',
      'template-5': 'Creative Portfolio · Designer',
      'template-6': 'Minimal Edge · Universal',
    };

    const allowedTemplates = [
      'template-1',
      'template-2',
      'template-6',
      'template-3',
    ];

    if (!allowedTemplates.includes(templateId || '')) {
      window.location.href = '/resume-maker';
      alert(
        `This template (${
          templates[templateId as keyof typeof templates]
        }) is currently under development. Please use one of the available templates.`
      );
      return;
    }
  }, [templateId]);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(`resume_${templateId}_personal`);
    return saved
      ? JSON.parse(saved)
      : {
          firstName: '',
          lastName: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          socialLinks: [],
        };
  });

  const [sections, setSections] = useState<Section[]>(() => {
    const saved = localStorage.getItem(`resume_${templateId}_sections`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'experience',
            type: 'experience',
            title: 'Work Experience',
            icon: <Briefcase className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'education',
            type: 'education',
            title: 'Education',
            icon: <GraduationCap className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'skills',
            type: 'skills',
            title: 'Skills',
            icon: <Wrench className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'languages',
            type: 'languages',
            title: 'Languages',
            icon: <Languages className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'certificates',
            type: 'certificates',
            title: 'Certificates',
            icon: <Award className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'interests',
            type: 'interests',
            title: 'Interests',
            icon: <Heart className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'courses',
            type: 'courses',
            title: 'Courses',
            icon: <BookOpen className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'awards',
            type: 'awards',
            title: 'Awards',
            icon: <Trophy className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'organizations',
            type: 'organizations',
            title: 'Organizations',
            icon: <Users className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'publications',
            type: 'publications',
            title: 'Publications',
            icon: <FileText className="w-5 h-5" />,
            items: [],
          },
          {
            id: 'references',
            type: 'references',
            title: 'References',
            icon: <UserCheck className="w-5 h-5" />,
            items: [],
          },
        ];
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Autosave personal info
  useEffect(() => {
    const savePersonalInfo = debounce(() => {
      localStorage.setItem(
        `resume_${templateId}_personal`,
        JSON.stringify(personalInfo)
      );
    }, 1000);

    savePersonalInfo();
    return () => savePersonalInfo.cancel();
  }, [personalInfo, templateId]);

  // Autosave sections
  useEffect(() => {
    const saveSections = debounce(() => {
      localStorage.setItem(
        `resume_${templateId}_sections`,
        JSON.stringify(sections)
      );
    }, 1000);

    saveSections();
    return () => saveSections.cancel();
  }, [sections, templateId]);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (
    platform: keyof PersonalInfo['links'],
    value: string
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      links: { ...prev.links, [platform]: value },
    }));
  };

  const addSectionItem = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const newItem = (() => {
          switch (section.type as SectionType) {
            case 'experience':
              return {
                id: crypto.randomUUID(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                achievements: [],
              } satisfies WorkExperience;
            case 'education':
              return {
                id: crypto.randomUUID(),
                school: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              } as Education;
            case 'skills':
              return {
                id: crypto.randomUUID(),
                name: '',
                level: 0,
              } as Skill;
            case 'languages':
              return {
                id: crypto.randomUUID(),
                name: '',
                proficiency: 'Beginner',
              } satisfies Language;
            case 'certificates':
              return {
                id: crypto.randomUUID(),
                name: '',
                issuer: '',
                date: '',
                description: '',
              } as Certificate;
            case 'interests':
              return {
                id: crypto.randomUUID(),
                name: '',
                description: '',
              } as Interest;
            case 'courses':
              return {
                id: crypto.randomUUID(),
                name: '',
                institution: '',
                date: '',
                description: '',
              } as Course;
            case 'awards':
              return {
                id: crypto.randomUUID(),
                title: '',
                issuer: '',
                date: '',
                description: '',
              } as Award;
            case 'organizations':
              return {
                id: crypto.randomUUID(),
                name: '',
                role: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              } as Organization;
            case 'publications':
              return {
                id: crypto.randomUUID(),
                title: '',
                publisher: '',
                date: '',
                url: '',
                description: '',
              } as Publication;
            case 'references':
              return {
                id: crypto.randomUUID(),
                name: '',
                title: '',
                company: '',
                email: '',
                phone: '',
              } as Reference;
            default:
              throw new Error(`Unknown section type: ${section.type}`);
          }
        })();

        return {
          ...section,
          items: [...section.items, newItem],
        } as Section;
      })
    );
  };

  const removeSectionItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        } as Section;
      })
    );
  };

  const updateSectionItem = (
    sectionId: string,
    itemId: string,
    updates: Partial<any>
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        } as Section;
      })
    );
  };

  const handleDownloadPDF = async () => {
    const resumeElement = document.querySelector('.resume-preview');
    if (!resumeElement) {
      console.error('Resume preview element not found');
      return;
    }

    try {
      const canvas = await html2canvas(resumeElement as HTMLElement, {
        logging: false,
        background: '#ffffff',
        allowTaint: true,
        useCORS: true,
      });

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      let heightLeft = imgHeight;
      let position = 0;
      let page = 1;

      while (heightLeft >= 0) {
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft >= 0) {
          pdf.addPage();
          page++;
        }
      }

      const fileName =
        personalInfo.firstName && personalInfo.lastName
          ? `${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`
          : 'Resume.pdf';

      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-800 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/resume-maker"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Templates
            </Link>

            <div className="text-sm text-gray-400">
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4 animate-pulse text-white" />
                  Saving...
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4 text-white" />
                  Last saved {new Date(lastSaved).toLocaleTimeString()}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center px-8 py-3 bg-white text-black text-sm
                     border border-white/60 rounded-full font-semibold whitespace-nowrap
                     hover:scale-[1.02] transition-transform gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 flex">
        {/* Left Sidebar - Editor */}
        <div className="w-[470px] h-[calc(100vh-4rem)] overflow-auto border-r border-gray-200 bg-white">
          <div className="p-6 space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Personal Information
                </h2>
                <div className="h-8 w-8 bg-black/5 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Professional Title"
                  value={personalInfo.title}
                  onChange={(e) =>
                    setPersonalInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="text-sm w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                />
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="text-sm flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="text-sm flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={personalInfo.location}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="text-sm flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                    />
                  </div>
                  {/* Profile Summary Field */}

                  <div className="relative">
                    <textarea
                      placeholder="Profile Summary"
                      value={personalInfo.profileSummary || ''}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          profileSummary: e.target.value,
                        }))
                      }
                      className="text-sm w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm min-h-[100px] resize-none"
                    />
                    <button
                      onClick={async () => {
                        if (!personalInfo.title) {
                          alert('Please enter a professional title first');
                          return;
                        }
                        try {
                          const summary = await generateSectionDescription(
                            `Write a professional profile summary for a ${personalInfo.title}`
                          );
                          setPersonalInfo((prev) => ({
                            ...prev,
                            profileSummary: summary,
                          }));
                        } catch (error) {
                          console.error('Failed to generate summary:', error);
                          alert(
                            'Failed to generate summary. Please try again.'
                          );
                        }
                      }}
                      type="button"
                      className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Social Links
                </h2>
                <div className="h-8 w-8 bg-black/5 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-black" />
                </div>
              </div>
              <div className="space-y-3">
                {personalInfo.socialLinks?.map((link, index) => (
                  <div key={index} className="flex gap-3 group">
                    <select
                      value={link.platform}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          socialLinks: prev.socialLinks?.map((l, i) =>
                            i === index ? { ...l, platform: e.target.value } : l
                          ),
                        }))
                      }
                      className="text-sm w-1/3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Portfolio">Portfolio</option>
                    </select>
                    <div className="flex-1 relative">
                      <input
                        type="url"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) =>
                          setPersonalInfo((prev) => ({
                            ...prev,
                            socialLinks: prev.socialLinks?.map((l, i) =>
                              i === index ? { ...l, url: e.target.value } : l
                            ),
                          }))
                        }
                        className="text-sm w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder:text-sm"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        {link.platform === 'LinkedIn' && (
                          <Linkedin className="w-4 h-4 text-gray-400" />
                        )}
                        {link.platform === 'GitHub' && (
                          <Github className="w-4 h-4 text-gray-400" />
                        )}
                        {link.platform === 'Twitter' && (
                          <Twitter className="w-4 h-4 text-gray-400" />
                        )}
                        {link.platform === 'Portfolio' && (
                          <Globe className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          socialLinks: prev.socialLinks?.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setPersonalInfo((prev) => ({
                      ...prev,
                      socialLinks: [
                        ...(prev.socialLinks || []),
                        { platform: 'LinkedIn', url: '' },
                      ],
                    }))
                  }
                  className="w-full text-sm px-4 py-2 text-black bg-black/5 hover:bg-black/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Social Link
                </button>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-black/5 rounded-lg flex items-center justify-center">
                        {section.icon}
                      </div>
                      <h2 className="text-base font-semibold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => addSectionItem(section.id)}
                      className="p-2 text-black hover:bg-black/5 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <SectionItemForm
                        key={item.id}
                        section={section}
                        item={item}
                        onUpdate={(updates) =>
                          updateSectionItem(section.id, item.id, updates)
                        }
                        onDelete={() => removeSectionItem(section.id, item.id)}
                      />
                    ))}
                    {section.items.length === 0 && (
                      <button
                        onClick={() => addSectionItem(section.id)}
                        className="w-full px-4 py-8 border-2 border-dashed border-gray-200 rounded-lg hover:border-black hover:bg-black/5 transition-all group"
                      >
                        <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-black">
                          <Plus className="w-5 h-5" />
                          <span className="text-sm">Add {section.title}</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 h-[calc(100vh-4rem)] p-8 bg-gray-100 overflow-auto">
          <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg">
            <ResumePreview personalInfo={personalInfo} sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeEditor;
