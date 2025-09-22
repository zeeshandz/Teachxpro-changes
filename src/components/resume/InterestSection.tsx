import React from 'react';
import RichTextEditor from '../RichTextEditor';

interface InterestEntry {
  id: string;
  content: string;
}

interface InterestSectionProps {
  entry: InterestEntry;
  sectionId: string;
  onUpdate: (field: string, value: string) => void;
}

export function InterestSection({ entry, sectionId, onUpdate }: InterestSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Share your interests and hobbies that demonstrate valuable skills or align with your career goals.
      </p>
      <RichTextEditor
        content={entry.content || ''}
        onChange={(content) => onUpdate('content', content)}
      />
    </div>
  );
}