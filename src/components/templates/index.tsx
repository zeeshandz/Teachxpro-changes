import { MinimalEdge } from './MinimalEdge';
import AtlanticBlue from './AtlanticBlue';
import NordicWhite from './NordicWhite';
import { BaseTemplateProps } from './BaseTemplate';
import PurpleModern from './PurpleModern';

const templates: Record<string, React.FC<BaseTemplateProps>> = {
  'template-1': AtlanticBlue,
  'template-2': NordicWhite,
  'template-3': PurpleModern,
  'template-6': MinimalEdge,
  // Add other templates here as they are developed
};

export const getTemplate = (templateId: string = 'template-6'): React.FC<BaseTemplateProps> => {
  return templates[templateId as keyof typeof templates] || MinimalEdge;
}; 