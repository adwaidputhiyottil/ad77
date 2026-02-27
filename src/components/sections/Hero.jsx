import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { data, loading } = useData();

  // 🛑 Prevent crash while loading or if hero is null
  if (loading || !data?.hero) {
    return null;
  }

  const { hero } = data;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-neutral-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-200/50 -skew-x-12 transform translate-x-1/2 hidden lg:block" />
      
      <div className="container-custom relative z-10 w-full">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-bold tracking-widest uppercase mb-4 text-sm md:text-base"
          >
            {hero.subheading}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-8"
          >
            {hero.title?.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-2xl text-neutral-500 max-w-2xl mb-12 leading-relaxed"
          >
            {hero.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/projects" className="btn-primary group w-full sm:w-auto">
              View Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a href="#contact" className="btn-outline w-full sm:w-auto text-center">
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Visual background elements */}
      <div className="absolute bottom-[-5%] right-[-5%] opacity-5 hidden sm:block pointer-events-none">
        <h2 className="text-[12rem] md:text-[20rem] font-black leading-none select-none text-primary transform rotate-[-5deg]">DESIGN</h2>
      </div>
    </section>
  );
};

export default Hero;