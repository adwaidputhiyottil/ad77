import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { CheckCircle2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import sub-components
import Sidebar from '../../components/admin/Sidebar';
import HeroManager from '../../components/admin/HeroManager';
import AboutManager from '../../components/admin/AboutManager';
import ProjectManager from '../../components/admin/ProjectManager';
import ProjectModal from '../../components/admin/ProjectModal';
import MessageManager from '../../components/admin/MessageManager';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const { 
    data, 
    updateHero, 
    updateAbout, 
    addProject, 
    updateProject, 
    deleteProject, 
    toggleProjectVisibility, 
    toggleProjectFeatured, 
    deleteMessage 
  } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSave = (callback, payload) => {
    callback(payload);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
       <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
           <div className="flex items-center space-x-4">
             <button 
               className="lg:hidden p-2 text-neutral-400 hover:text-primary transition-colors"
               onClick={() => setIsMenuOpen(true)}
             >
               <Menu size={24} />
             </button>
             <div>
               <h2 className="text-2xl lg:text-4xl font-black capitalize">{activeTab.replace('-', ' ')}</h2>
               <p className="text-neutral-500 text-xs lg:text-base">Manage your website content and display.</p>
             </div>
           </div>
           
           <AnimatePresence>
             {saveStatus === 'success' && (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg font-bold text-sm"
               >
                 <CheckCircle2 size={18} />
                 <span>Changes Saved</span>
               </motion.div>
             )}
           </AnimatePresence>
        </header>

        {activeTab === 'hero' && (
          <HeroManager data={data.hero} onSave={(payload) => handleSave(updateHero, payload)} />
        )}

        {activeTab === 'about' && (
          <AboutManager data={data.about} onSave={(payload) => handleSave(updateAbout, payload)} />
        )}

        {activeTab === 'projects' && (
          <ProjectManager 
            projects={data.projects} 
            categories={data.categories}
            onToggleVisibility={toggleProjectVisibility}
            onToggleFeatured={toggleProjectFeatured}
            onDelete={deleteProject}
            onAdd={() => { setEditingProject(null); setShowModal(true); }}
            onEdit={(p) => { setEditingProject(p); setShowModal(true); }}
          />
        )}
        {activeTab === 'messages' && (
          <MessageManager 
            messages={data.messages || []} 
            onDelete={(id) => { if(confirm('Delete message?')) deleteMessage(id); }} 
          />
        )}
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <ProjectModal 
            project={editingProject} 
            categories={data.categories}
            onClose={() => setShowModal(false)}
            onSave={(p) => {
              if (editingProject) {
                updateProject(editingProject.id, p);
              } else {
                addProject(p);
              }
              setShowModal(false);
              setSaveStatus('success');
              setTimeout(() => setSaveStatus(null), 3000);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
