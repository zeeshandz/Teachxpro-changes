import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface Skill {
  icon: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

interface SkillsAndToolsProps {
  skills: Skill[];
}

const getIcon = (iconName: string) => {
  const Icon = (Icons as any)[iconName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')];
  return Icon ? <Icon className="h-5 w-5" /> : <Icons.Code2 className="h-5 w-5" />;
};

function SkillsAndTools({ skills }: SkillsAndToolsProps) {
  return (
    <div className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Skills and Tools You Will Learn
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Master the essential tools and technologies used by industry professionals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  {getIcon(skill.icon)}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      skill.level === 'Beginner' 
                        ? 'bg-green-400/20 text-green-400'
                        : skill.level === 'Intermediate'
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'bg-red-400/20 text-red-400'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsAndTools;