import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { data } = useData();
  const navigate = useNavigate();
  
  const projectIndex = data.projects.findIndex(p => p.id === id);
  const project = data.projects[projectIndex];
  
  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Link to="/projects" className="btn-primary mt-8 inline-block">Back to Projects</Link>
      </div>
    );
  }

  const nextProject = data.projects[(projectIndex + 1) % data.projects.length];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 bg-white min-h-screen"
    >
      <div className="container-custom py-12">
        <Link to="/projects" className="flex items-center space-x-2 text-neutral-500 hover:text-primary transition-colors font-medium mb-12">
          <ArrowLeft size={18} />
          <span>Back to Projects</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-12 h-[2px] bg-accent" />
              <span className="text-base font-black uppercase tracking-widest text-accent">{project.category}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{project.title}</h1>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Project Overview</h3>
                <p className="text-xl text-neutral-600 leading-relaxed font-medium">
                  {project.details || project.description}
                </p>
              </div>
              
              <div className="flex space-x-12 pt-8 border-t border-neutral-100">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Designer</h3>
                  <p className="font-bold">Adwaid</p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Year</h3>
                  <p className="font-bold">2024</p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Niche</h3>
                  <p className="font-bold">Sports</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Full width imagery showcase */}
        <div className="space-y-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="aspect-square bg-neutral-100 rounded-3xl overflow-hidden">
               <img src={project.image} className="w-full h-full object-cover" alt="" />
             </div>
             <div className="aspect-square bg-neutral-100 rounded-3xl overflow-hidden">
               <img src={project.image} className="w-full h-full object-cover grayscale" alt="" />
             </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-neutral-200 py-16 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="text-neutral-400 font-bold text-sm block mb-4 uppercase tracking-widest">Up Next</span>
              <Link to={`/projects/${nextProject.id}`} className="text-4xl md:text-6xl font-black hover:text-accent transition-colors block">
                {nextProject.title}
              </Link>
            </div>
            
            <Link to={`/projects/${nextProject.id}`} className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
               <ArrowRight size={32} />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
