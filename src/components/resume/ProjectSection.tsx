import React, { useState } from 'react';
import { X, Loader2, Wand2 } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';
import { openai } from '../../lib/openai';

interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  keywords: string[];
  summary: string;
}

interface ProjectSectionProps {
  entry: ProjectEntry;
  sectionId: string;
  entryIndex: number;
  onUpdate: (field: string, value: any) => void;
}

export function ProjectSection({ entry, sectionId, entryIndex, onUpdate }: ProjectSectionProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!entry.name || !entry.description) {
      alert('Please fill in the project name and description fields first');
      return;
    }

    setIsGenerating(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer. Generate a concise, professional project summary."
          },
          {
            role: "user",
            content: `Generate a professional project summary for ${entry.name}: ${entry.description}. 
                     Focus on technical details, achievements, and impact. Use action verbs and highlight key technologies.`
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

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    const updatedKeywords = [...(entry.keywords || []), newKeyword.trim()];
    onUpdate('keywords', updatedKeywords);
    setNewKeyword('');
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = entry.keywords?.filter((_, i) => i !== index) || [];
    onUpdate('keywords', updatedKeywords);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            type="text"
            value={entry.name || ''}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="e.g. E-commerce Platform"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={entry.description || ''}
            onChange={(e) => onUpdate('description', e.target.value)}
            placeholder="e.g. A full-stack e-commerce solution"
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
          Keywords
        </label>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {entry.keywords?.map((keyword, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full"
              >
                <span className="text-sm text-gray-700">{keyword}</span>
                <button
                  onClick={() => removeKeyword(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add keywords (press Enter or comma to add)"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-500">Write about the project goals, technologies used, and your role</div>
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