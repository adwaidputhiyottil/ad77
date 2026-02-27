import React from 'react';
import Hero from '../../components/sections/Hero';
import About from '../../components/sections/About';
import FeaturedProjects from '../../components/sections/FeaturedProjects';
import Contact from '../../components/sections/Contact';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <FeaturedProjects />
      <Contact />
    </motion.div>
  );
};

export default Home;
