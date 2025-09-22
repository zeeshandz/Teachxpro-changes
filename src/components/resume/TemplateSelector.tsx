import React from 'react';
import AtlanticBlue from '../templates/AtlanticBlue';
import NordicWhite from '../templates/NordicWhite';
import PurpleModern from '../templates/PurpleModern';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const templates = [
  {
    id: 'atlanticBlue',
    name: 'Atlantic Blue',
    component: AtlanticBlue,
    thumbnail: '/templates/atlantic-blue.png',
  },
  {
    id: 'nordicWhite',
    name: 'Nordic White',
    component: NordicWhite,
    thumbnail: '/templates/nordic-white.png',
  },
  {
    id: 'purpleModern',
    name: 'Purple Modern',
    component: PurpleModern,
    thumbnail: '/templates/purple-modern.png',
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedTemplate === template.id
              ? 'border-black scale-105'
              : 'border-transparent hover:border-gray-200'
          }`}
          onClick={() => onTemplateSelect(template.id)}
        >
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full aspect-[210/297] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <h3 className="text-white font-medium">{template.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getTemplateComponent = (templateId: string) => {
  const template = templates.find((t) => t.id === templateId);
  return template?.component || NordicWhite;
};
