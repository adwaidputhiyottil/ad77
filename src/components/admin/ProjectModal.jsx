import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Star } from 'lucide-react';

const ProjectModal = ({ project, categories, onClose, onSave }) => {

  const safeCategories = Array.isArray(categories) && categories.length > 0
    ? categories
    : ['Sports Design',
      'Brand Identity',
      'Logo Design',
      'Illustration'
    ];

  const [formData, setFormData] = useState(
    project || {
      title: '',
      category: safeCategories[0],
      description: '',
      image: '',
      details: '',
      isVisible: true,
      isFeatured: false
    }
  );

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-black">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
              Project Title
            </label>
            <input
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. NBA Finals 2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
                Category
              </label>
              <select
                className="input-field appearance-none bg-white cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {safeCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
                Project Image
              </label>

              <div className="flex space-x-2">
                <div className="flex-grow">
                  <input
                    className="input-field"
                    value={formData.image?.startsWith?.('data:') ? 'Local Image Attached' : formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL (https://...)"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-neutral-100 p-3 rounded-xl text-neutral-500 hover:bg-neutral-200 transition-colors"
                  title="Upload from device"
                >
                  <Upload size={20} />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>

              {formData.image && (
                <div className="mt-4 relative group aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {uploading && (
                <p className="text-xs text-accent animate-pulse font-bold mt-2">
                  Uploading image...
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
              Short Description
            </label>
            <input
              className="input-field"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary for cards"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
              Project Details
            </label>
            <textarea
              rows="4"
              className="input-field resize-none"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="In-depth details for the project page..."
            />
          </div>

          <div className="flex items-center space-x-3 p-2 bg-neutral-50 rounded-2xl border border-neutral-100">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${formData.isFeatured
                  ? 'bg-amber-100 text-amber-600 shadow-sm'
                  : 'bg-white text-neutral-400 border border-neutral-200'
                }`}
            >
              <Star size={16} className={formData.isFeatured ? 'fill-amber-600' : ''} />
              <span>{formData.isFeatured ? 'Featured on Home' : 'Not Featured'}</span>
            </button>

            <p className="text-[10px] text-neutral-400">
              Featured projects appear on the home page.
            </p>
          </div>

        </div>

        <div className="p-8 border-t border-neutral-100 bg-neutral-50 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-8 py-3 font-bold text-neutral-500 hover:text-primary transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(formData)}
            className="btn-primary py-3 px-10"
          >
            Save Project
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;