import React from 'react';
import RichTextEditor from '../RichTextEditor';

interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  summary: string;
}

interface CertificationSectionProps {
  entry: CertificationEntry;
  sectionId: string;
  entryIndex: number;
  onUpdate: (field: string, value: any) => void;
}

export function CertificationSection({ entry, sectionId, entryIndex, onUpdate }: CertificationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certification Name
          </label>
          <input
            type="text"
            value={entry.name || ''}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="e.g. AWS Certified Solutions Architect"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issuer
          </label>
          <input
            type="text"
            value={entry.issuer || ''}
            onChange={(e) => onUpdate('issuer', e.target.value)}
            placeholder="e.g. Amazon Web Services"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date Earned
        </label>
        <input
          type="month"
          value={entry.date || ''}
          onChange={(e) => onUpdate('date', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <RichTextEditor
          content={entry.summary || ''}
          onChange={(content) => onUpdate('summary', content)}
        />
      </div>
    </div>
  );
}