import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const HeroManager = ({ data, onSave }) => {
  const [localData, setLocalData] = useState({
    id: '',
    title: '',
    subheading: '',
    description: '',
    button_text: '',
    button_link: ''
  });

  useEffect(() => {
    if (data) {
      setLocalData({
        id: data.id || '',
        title: data.title || '',
        subheading: data.subheading || '',
        description: data.description || '',
        button_text: data.button_text || '',
        button_link: data.button_link || ''
      });
    }
  }, [data]);

  return (
    <div className="max-w-3xl space-y-8 bg-white p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm">
      <div className="space-y-6">
        
        {/* Hero Heading (maps to title) */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
            Hero Heading
          </label>
          <input
            type="text"
            value={localData.title}
            onChange={(e) =>
              setLocalData({ ...localData, title: e.target.value })
            }
            className="input-field"
          />
        </div>

        {/* Subheading */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
            Subheading
          </label>
          <input
            type="text"
            value={localData.subheading}
            onChange={(e) =>
              setLocalData({ ...localData, subheading: e.target.value })
            }
            className="input-field"
          />
        </div>

        {/* Tagline (maps to description) */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
            Tagline
          </label>
          <textarea
            rows="4"
            value={localData.description}
            onChange={(e) =>
              setLocalData({ ...localData, description: e.target.value })
            }
            className="input-field resize-none"
          />
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

export default HeroManager;