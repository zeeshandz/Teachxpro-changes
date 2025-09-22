import React, { useState, useEffect } from 'react';
import { X, Loader2, Plus } from 'lucide-react';
import { generateSkills } from '../../lib/openai';

interface Skill {
  id: string;
  name: string;
}

interface SkillsSectionProps {
  resumeTitle: string;
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

export function SkillsSection({ resumeTitle, skills, onUpdate }: SkillsSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resumeTitle && (!skills || skills.length === 0)) {
      generateSkillsList();
    }
  }, [resumeTitle, skills]);

  const generateSkillsList = async () => {
    if (!resumeTitle) {
      setError('Please provide a resume title first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generatedSkills = await generateSkills(resumeTitle);
      if (!generatedSkills || !Array.isArray(generatedSkills)) {
        throw new Error('Invalid skills data received');
      }

      const skillsList = generatedSkills.map((skill: string) => ({
        id: crypto.randomUUID(),
        name: skill
      }));
      onUpdate(skillsList);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate skills';
      setError(`Failed to generate skills: ${errorMessage}`);
      console.error('Error generating skills:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill = {
      id: crypto.randomUUID(),
      name: newSkill.trim()
    };
    
    onUpdate([...(skills || []), skill]);
    setNewSkill('');
  };

  const removeSkill = (skillId: string) => {
    onUpdate(skills.filter(skill => skill.id !== skillId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Generating skills...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {(skills || []).map((skill, index) => (
                index < 10 && (
                <div
                  key={skill.id}
                  className="group flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full"
                >
                  <span className="text-sm text-gray-700">{skill.name}</span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                )
              ))}
            </div>

            {/* Add New Skill */}
            <div className={`flex gap-2 ${skills.length >= 10 ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new skill"
                disabled={skills.length >= 10}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                onClick={addSkill}
                disabled={!newSkill.trim() || skills.length >= 10}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
            {skills.length >= 10 && (
              <p className="text-sm text-gray-500">
                Maximum of 10 skills reached. Remove a skill to add a new one.
              </p>
            )}
          </>
        )}

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Regenerate Button */}
        <button
          onClick={generateSkillsList}
          disabled={isLoading || !resumeTitle}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Regenerate Skills
        </button>
      </div>
    </div>
  );
}