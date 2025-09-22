import React, { useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { Loader2, Wand2 } from 'lucide-react';
import { openai } from '../../lib/openai';

interface WorkExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  summary: string;
}

interface WorkExperienceSectionProps {
  entry: WorkExperienceEntry;
  sectionId: string;
  entryIndex: number;
  onUpdate: (field: string, value: any) => void;
}

export function WorkExperienceSection({ entry, sectionId, entryIndex, onUpdate }: WorkExperienceSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!entry.position || !entry.company) {
      alert('Please fill in the position and company fields first');
      return;
    }

    setIsGenerating(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer. Generate a concise, professional work experience summary."
          },
          {
            role: "user",
            content: `Generate a professional work experience summary for a ${entry.position} position at ${entry.company}. 
                     Focus on achievements, responsibilities, and impact. Use action verbs and quantifiable results.`
          }
        ]
      });

      if (completion.choices[0]?.message?.content) {
        const summary = completion.choices[0].message.content.trim();
        // Update the summary directly
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
            Company
          </label>
          <input
            type="text"
            value={entry.company}
            onChange={(e) => onUpdate('company', e.target.value)}
            placeholder="e.g. Google"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            value={entry.position}
            onChange={(e) => onUpdate('position', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={entry.location}
          onChange={(e) => onUpdate('location', e.target.value)}
          placeholder="e.g. San Francisco, CA"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="month"
            value={entry.startDate}
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
              value={entry.endDate}
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
          <div className="text-sm text-gray-500">Write about your role, achievements and responsibilities</div>
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
          content={entry.summary}
          onChange={(content) => onUpdate('summary', content)}
        />
      </div>
    </div>
  );
}