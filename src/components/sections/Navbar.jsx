import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleLinkClick = (path) => {
    setIsOpen(false);
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (location.pathname === route || (route === '/' && location.pathname === '/')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
          ADWAID.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={`text-sm font-bold transition-all duration-300 ${
                (location.pathname === link.path) ? 'text-accent' : 'text-primary hover:text-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/#contact" onClick={() => handleLinkClick('/#contact')} className="btn-primary py-2 px-5 text-sm">
            Let's Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
          >
            <div className="container-custom py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className="text-xl font-black hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={() => handleLinkClick('/#contact')}
                className="btn-primary text-center py-4"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
