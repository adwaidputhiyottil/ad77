import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { data, loading } = useData();

  if (loading) return null;

  const projects = Array.isArray(data?.projects) ? data.projects : [];

  // 🔥 Always safe categories generation
  const categories = [
    ...new Set(
      projects
        .map((p) => p.category)
        .filter(Boolean)
    )
  ];

  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(
    (project) =>
      project?.isVisible &&
      (filter === 'All' || project.category === filter)
  );

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-neutral-100 min-h-screen">
      <div className="container-custom px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <h1 className="text-5xl md:text-8xl font-black mb-4 md:mb-6">
              Selected<br />Works
            </h1>
            <p className="text-neutral-500 text-base md:text-lg max-w-md">
              A curated collection of sports graphics, branding, and digital illustrations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-neutral-500 border border-neutral-200 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-200"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className="p-3 md:p-4 bg-white rounded-full text-primary transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl"
                    >
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center space-x-2 mb-2 md:mb-3">
                    <span className="w-6 md:w-8 h-[1px] bg-accent" />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-accent">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                    {project.title}
                  </h3>

                  <p className="text-neutral-500 text-sm mb-4 md:mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <Link
                    to={`/projects/${project.id}`}
                    className="flex items-center space-x-2 text-primary font-bold text-xs md:text-sm hover:translate-x-1 transition-transform"
                  >
                    <span>View Project</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <Search size={48} className="mx-auto text-neutral-300 mb-4" />
            <h3 className="text-xl font-bold text-neutral-400">
              No projects found in this category.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default Projects;