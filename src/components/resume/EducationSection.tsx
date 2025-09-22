import React, { useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { Loader2, Wand2 } from 'lucide-react';
import { openai } from '../../lib/openai';

interface EducationEntry {
  id: string;
  institution: string;
  typeOfStudy: string;
  areaOfStudy: string;
  score: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  summary: string;
}

interface EducationSectionProps {
  entry: EducationEntry;
  sectionId: string;
  entryIndex: number;
  onUpdate: (field: string, value: any) => void;
}

export function EducationSection({ entry, sectionId, entryIndex, onUpdate }: EducationSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!entry.institution || !entry.typeOfStudy || !entry.areaOfStudy) {
      alert('Please fill in the institution, type of study, and area of study fields first');
      return;
    }

    setIsGenerating(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer. Generate a concise, professional education summary."
          },
          {
            role: "user",
            content: `Generate a professional education summary for a ${entry.typeOfStudy} in ${entry.areaOfStudy} from ${entry.institution}. 
                     Focus on academic achievements, relevant coursework, and key skills developed.`
          }
        ]
      });

      if (completion.choices[0]?.message?.content) {
        const summary = completion.choices[0].message.content.trim();
        onUpdate('summary', summary);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Institution
          </label>
          <input
            type="text"
            value={entry.institution || ''}
            onChange={(e) => onUpdate('institution', e.target.value)}
            placeholder="e.g. University of California"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type of Study
          </label>
          <select
            value={entry.typeOfStudy || ''}
            onChange={(e) => onUpdate('typeOfStudy', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">Select Type</option>
            <option value="Bachelor's">Bachelor's Degree</option>
            <option value="Master's">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Diploma">Diploma</option>
            <option value="Certificate">Certificate</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area of Study
          </label>
          <input
            type="text"
            value={entry.areaOfStudy || ''}
            onChange={(e) => onUpdate('areaOfStudy', e.target.value)}
            placeholder="e.g. Computer Science"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Score/Grade
          </label>
          <input
            type="text"
            value={entry.score || ''}
            onChange={(e) => onUpdate('score', e.target.value)}
            placeholder="e.g. 3.8 GPA or First Class"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="month"
            value={entry.startDate || ''}
            onChange={(e) => onUpdate('startDate', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <div className="space-y-2">
            <input
              type="month"
              value={entry.endDate || ''}
              onChange={(e) => onUpdate('endDate', e.target.value)}
              disabled={entry.isPresent}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`present-${entry.id}`}
                checked={entry.isPresent}
                onChange={(e) => onUpdate('isPresent', e.target.checked)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor={`present-${entry.id}`} className="text-sm text-gray-600">
                Present
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500">Write about your academic achievements and relevant coursework</div>
          <button
              onClick={generateSummary}
              disabled={isGenerating}
              className="inline-flex items-center px-3 py-1.5 text-xs bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-3 w-3 mr-1" />
                  Generate Summary
                </>
              )}
            </button>
        </div>
        <RichTextEditor
          content={entry.summary || ''}
          onChange={(content) => onUpdate('summary', content)}
        />
      </div>
    </div>
  );
}