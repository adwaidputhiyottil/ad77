import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const About = () => {
  const { data, loading } = useData();

  // 🛑 Prevent crash while loading or if about is null
  if (loading || !data?.about) {
    return null;
  }

  const { about } = data;

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container-custom px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">The Person <br />Behind the Work</h2>
            <div className="w-20 h-1.5 bg-accent mb-8" />
            
            <div className="space-y-6 text-neutral-600 text-base md:text-lg leading-relaxed">
              <p className="font-bold text-primary text-lg md:text-xl text-balance">
                {about.bio}
              </p>
              <p>
                With a deep passion for sports and a keen eye for detail, I bridge the gap between athletics and aesthetics. My work is defined by bold compositions, dynamic energy, and professional precision.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Experience</h3>
              <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                <span className="text-accent font-black text-4xl sm:text-5xl block mb-2">
                  {about.experience}
                </span>
                <p className="text-neutral-500 font-medium text-sm sm:text-base">
                  Professional Experience in Graphic Designing
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {about.skills?.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-6 py-3 bg-neutral-100 text-primary rounded-full text-sm font-semibold border border-transparent hover:border-accent hover:text-accent transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;