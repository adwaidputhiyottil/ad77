import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedProjects = () => {
  const { data } = useData();
  // Filter for projects marked as featured and visible
  const featured = data.projects
    .filter(p => p.isVisible && p.isFeatured)
    .slice(0, 4); // Display up to 4 featured projects

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">Featured <br />Sports Designs</h2>
            <div className="w-16 md:w-20 h-1.5 bg-accent mb-6 md:mb-8" />
            <p className="text-neutral-500 text-base md:text-lg max-w-xl">
              A glimpse into high-impact sports branding and professional digital illustrations.
            </p>
          </div>
          
          <Link to="/projects" className="flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group">
            <span>Explore All Projects</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <Link to={`/projects/${project.id}`}>
                <div className="aspect-[16/10] bg-neutral-100 rounded-xl md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 shadow-xl md:shadow-2xl shadow-neutral-200/50">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2 md:mb-3">
                    <span className="text-xs font-black uppercase tracking-widest text-accent">{project.category}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black group-hover:text-accent transition-colors">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
