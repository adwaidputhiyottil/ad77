import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Sports Graphics",
    description: "High-impact visual content tailored for athletes, teams, and sports brands across digital platforms.",
    price: "$199"
  },
  {
    id: 2,
    title: "Brand Identity",
    description: "Complete branding systems including logos, color palettes, typography, and brand guidelines.",
    price: "$299"
  },
  {
    id: 3,
    title: "Social Media Design",
    description: "Engaging and dynamic content optimized for Instagram, Twitter, and other social platforms.",
    price: "$149"
  },
  {
    id: 4,
    title: "Digital Illustrations",
    description: "Custom illustrations crafted with bold composition and dynamic storytelling.",
    price: "$249"
  }
];

const Services = () => {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-neutral-100 min-h-screen px-6 md:px-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-accent font-black uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block">
            My Offerings
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 md:mb-8 leading-tight">
            Design<br />Services
          </h1>
          <p className="text-neutral-500 text-base md:text-lg px-4">
            I provide specialized design solutions tailored specifically for sports brands, athletes, and digital-first agencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:border-accent flex flex-col h-full bg-white p-10"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <Check size={28} />
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-neutral-500 font-medium mb-12 flex-grow leading-relaxed">
                {service.description}
              </p>

              <div className="pt-8 border-t border-neutral-100">
                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">
                  Package Start
                </p>
                <p className="text-3xl font-black text-primary">
                  {service.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 p-8 md:p-20 bg-primary rounded-[2rem] md:rounded-[3rem] text-white text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 text-balance">
            Need a custom design package?
          </h2>
          <p className="text-neutral-400 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
            I offer bespoke solutions for long-term projects and specific branding needs. Let's build something unique.
          </p>
          <a
            href="/#contact"
            className="btn-primary bg-white text-primary hover:bg-neutral-200 w-full sm:w-auto"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;