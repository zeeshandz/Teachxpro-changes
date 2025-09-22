import React from 'react';
import { Wand2, Loader2 } from 'lucide-react';

interface AIGeneratorProps {
  jobTitle: string;
  isGenerating: boolean;
  onJobTitleChange: (title: string) => void;
  onGenerate: () => void;
}

export function AIGenerator({ jobTitle, isGenerating, onJobTitleChange, onGenerate }: AIGeneratorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => onJobTitleChange(e.target.value)}
          placeholder="e.g. Frontend Developer"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
      <button
        onClick={onGenerate}
        disabled={!jobTitle || isGenerating}
        className="w-full flex items-center justify-center py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            Generate with AI
            <Wand2 className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
}