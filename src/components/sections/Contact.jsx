import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const { addMessage } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      addMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container-custom px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto border border-neutral-200 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-200/50 flex flex-col lg:flex-row">
          <div className="bg-primary text-white p-8 md:p-12 lg:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Let's Create<br />Something Bold</h2>
              <p className="text-neutral-400 text-base md:text-lg mb-8">
                Ready to elevate your game? Drop a message and let's discuss your next project.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="flex items-center space-x-4 text-neutral-300">
                <span className="w-6 md:w-8 h-[1px] bg-accent" />
                <span className="text-sm md:text-base">Available for new projects</span>
              </p>
              <h3 className="text-lg md:text-xl font-bold">hello@adwaid.design</h3>
            </div>
          </div>
          
          <div className="p-8 md:p-12 lg:w-3/5 bg-white">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-neutral-500">Thank you for reaching out. I'll get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-accent font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-500 ml-1">Your Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-500 ml-1">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-500 ml-1">Project Details</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell me about your project..."
                      className="input-field resize-none"
                    ></textarea>
                  </div>
                  <button
                    disabled={status === 'sending'}
                    type="submit"
                    className="btn-primary w-full md:w-auto px-12 py-4 flex items-center justify-center space-x-2"
                  >
                    {status === 'sending' ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
