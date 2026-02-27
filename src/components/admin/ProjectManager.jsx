import React from 'react';
import { Plus, Star, EyeOff, Eye, Pencil, Trash2 } from 'lucide-react';

const ProjectManager = ({ projects, categories, onToggleVisibility, onToggleFeatured, onDelete, onAdd, onEdit }) => (
  <div className="space-y-6">
    <div className="flex justify-end">
      <button onClick={onAdd} className="btn-primary flex items-center space-x-2">
        <Plus size={20} />
        <span>Add New Project</span>
      </button>
    </div>
    
    <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-neutral-100">
          <tr>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Project</th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 hidden sm:table-cell text-center">Featured</th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 hidden sm:table-cell">Category</th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 hidden md:table-cell">Status</th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
              <td className="p-6">
                <div className="flex items-center space-x-3">
                   <img src={project.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-100 flex-shrink-0" />
                   <div>
                     <p className="font-bold text-sm leading-tight">{project.title}</p>
                     <p className="text-[10px] text-neutral-400 sm:hidden mt-0.5">{project.category}</p>
                   </div>
                </div>
              </td>
              <td className="p-6 hidden sm:table-cell text-center">
                <button 
                  onClick={() => onToggleFeatured(project.id)}
                  title={project.isFeatured ? "Remove from Featured" : "Add to Featured"}
                  className="p-2 hover:bg-white rounded-lg transition-all"
                >
                  <Star size={18} className={project.isFeatured ? 'text-amber-400 fill-amber-400 mx-auto' : 'text-neutral-200 mx-auto'} />
                </button>
              </td>
              <td className="p-6 hidden sm:table-cell">
                <span className="text-sm text-neutral-500 font-medium">{project.category}</span>
              </td>
              <td className="p-6 hidden md:table-cell">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.isVisible ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  {project.isVisible ? 'Visible' : 'Hidden'}
                </span>
              </td>
              <td className="p-6">
                <div className="flex items-center space-x-2">
                  <button onClick={() => onToggleVisibility(project.id)} className="p-2 hover:bg-white rounded-lg text-neutral-400 hover:text-primary transition-colors">
                    {project.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button onClick={() => onEdit(project)} className="p-2 hover:bg-white rounded-lg text-neutral-400 hover:text-accent transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => { if(confirm('Delete project?')) onDelete(project.id) }} className="p-2 hover:bg-white rounded-lg text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProjectManager;
