import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const AboutManager = ({ data, onSave }) => {
  const safeData = {
    bio: data?.bio || '',
    experience: data?.experience || '',
    skills: Array.isArray(data?.skills) ? data.skills : []
  };

  const [localData, setLocalData] = useState(safeData);
  const [newSkill, setNewSkill] = useState('');

  // 🔄 Keep localData synced when data loads async
  useEffect(() => {
    setLocalData({
      bio: data?.bio || '',
      experience: data?.experience || '',
      skills: Array.isArray(data?.skills) ? data.skills : []
    });
  }, [data]);

  const addSkill = () => {
    if (newSkill && !localData.skills.includes(newSkill)) {
      setLocalData({
        ...localData,
        skills: [...localData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setLocalData({
      ...localData,
      skills: localData.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="max-w-3xl space-y-8 bg-white p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">About Bio</label>
          <textarea 
            rows="6"
            value={localData.bio}
            onChange={(e) => setLocalData({...localData, bio: e.target.value})}
            className="input-field resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">Experience Label</label>
          <input 
            type="text"
            value={localData.experience}
            onChange={(e) => setLocalData({...localData, experience: e.target.value})}
            className="input-field"
          />
        </div>
        
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">Skills</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {(localData.skills || []).map(skill => (
              <span key={skill} className="px-4 py-2 bg-neutral-100 rounded-full text-xs font-bold flex items-center space-x-2">
                <span>{skill}</span>
                <button onClick={() => removeSkill(skill)} className="text-neutral-400 hover:text-red-500">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <input 
              type="text"
              placeholder="Add skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="input-field"
            />
            <button onClick={addSkill} className="btn-primary py-2 px-6">
              Add
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onSave(localData)}
        className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2"
      >
        <Save size={18} />
        <span>Save Changes</span>
      </button>
    </div>
  );
};

export default AboutManager;