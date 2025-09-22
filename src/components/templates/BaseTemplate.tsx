import { PersonalInfo, Section } from '../../types/resume';

export interface BaseTemplateProps {
  personalInfo: PersonalInfo;
  sections: Section[];
}

export const BaseTemplate: React.FC<BaseTemplateProps> = ({ personalInfo, sections }) => {
  return null; // This is just a base template interface
}; 