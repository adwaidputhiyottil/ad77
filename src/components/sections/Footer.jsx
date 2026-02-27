import React from 'react';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tighter mb-2">AD77.</h2>
            <p className="text-neutral-500 text-sm max-w-xs">
              Specializing in premium sports graphic design and digital illustration.
            </p>
          </div>
          
          <div className="flex space-x-6 text-neutral-400">
            <a href="#" className="hover:text-primary transition-colors duration-300"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors duration-300"><Twitter size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors duration-300"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors duration-300"><Mail size={20} /></a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} AD77 Designs. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
