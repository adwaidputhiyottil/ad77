import React from 'react';
import { LayoutDashboard, User, FolderKanban, MessageSquare, LogOut, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, handleLogout, isOpen, setIsOpen }) => {
  const handleLinkClick = (tab) => {
    setActiveTab(tab);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        w-72 bg-white border-r border-neutral-200 flex flex-col
        fixed lg:static inset-y-0 left-0 z-50
        transform lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-neutral-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-primary">ADWAID.</h1>
            <p className="text-[10px] uppercase tracking-widest font-black text-neutral-400 mt-1">Control Panel</p>
          </div>
          <button 
            className="lg:hidden p-2 text-neutral-400 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
        </div>
        
        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          <SidebarLink 
            icon={<LayoutDashboard size={20} />} 
            label="Hero Content" 
            active={activeTab === 'hero'} 
            onClick={() => handleLinkClick('hero')} 
          />
          <SidebarLink 
            icon={<User size={20} />} 
            label="About Section" 
            active={activeTab === 'about'} 
            onClick={() => handleLinkClick('about')} 
          />
          <SidebarLink 
            icon={<FolderKanban size={20} />} 
            label="Manage Projects" 
            active={activeTab === 'projects'} 
            onClick={() => handleLinkClick('projects')} 
          />
          <SidebarLink 
            icon={<MessageSquare size={20} />} 
            label="User Messages" 
            active={activeTab === 'messages'} 
            onClick={() => handleLinkClick('messages')} 
          />
        </nav>
        
        <div className="p-6 border-t border-neutral-100">
          <button 
            onClick={() => {
              handleLogout();
              if (setIsOpen) setIsOpen(false);
            }}
            className="flex items-center space-x-3 text-red-500 font-bold text-sm w-full p-3 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
      active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-neutral-500 hover:bg-neutral-100'
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-bold text-sm">{label}</span>
    </div>
    {active && <ChevronRight size={16} />}
  </button>
);

export default Sidebar;
