import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import LoadingScreen from '../components/ui/LoadingScreen';
import { initialData } from '../data/mockData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  
  // Initialize with mock data to prevent "Creative Designer" fallback shifts
  const [data, setData] = useState({
    hero: initialData.hero,
    about: initialData.about,
    projects: initialData.projects,
    messages: []
  });

  // Smooth loading transition
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [
        { data: hero },
        { data: about },
        { data: projects }
      ] = await Promise.all([
        supabase.from('hero_section').select('*').limit(1).single(),
        supabase.from('about_section').select('*').limit(1).single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false })
      ]);

      let messages = [];
      if (isAuthenticated) {
        const { data: msgs } = await supabase
          .from('messages')
          .select('id, name, email, message, created_at')
          .order('created_at', { ascending: false });
        messages = msgs || [];
      }

      setData(prev => ({
        hero: hero ? {
          title: hero.title || hero.heading,
          subheading: hero.subheading,
          description: hero.description || hero.tagline
        } : prev.hero,
        about: about ? {
          bio: about.description,
          experience: about.title,
          skills: about.skills || prev.about.skills
        } : prev.about,
        projects: projects?.length > 0 ? projects.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image_url,
          category: p.category,
          tags: p.tags || [],
          link: p.project_url,
          isVisible: p.isvisible ?? true
        })) : prev.projects,
        messages: messages.map(m => ({
          id: m.id,
          sender: m.name,
          email: m.email,
          text: m.message,
          date: m.created_at
        }))
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Keep existing mock data on error
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateHero = useCallback(async (heroData) => {
    try {
      const { error } = await supabase
        .from('hero_section')
        .update(heroData)
        .eq('id', data.hero.id);
      if (error) throw error;
      await fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [data.hero, fetchData]);

  const updateAbout = useCallback(async (aboutData) => {
    try {
      const { error } = await supabase
        .from('about_section')
        .update({
          description: aboutData.bio,
          title: aboutData.experience,
          skills: aboutData.skills
        })
        .eq('id', data.hero.id); // Assuming same ID structure
      if (error) throw error;
      await fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [data.hero, fetchData]);

  const addProject = useCallback(async (project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          description: project.description,
          image_url: project.image,
          category: project.category,
          tags: project.tags,
          project_url: project.link,
          isvisible: true
        }]);
      if (error) throw error;
      await fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [fetchData]);

  const toggleProjectVisibility = useCallback(async (id, isvisible) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ isvisible })
        .eq('id', id);
      if (error) throw error;
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? { ...p, isVisible: isvisible } : p)
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const addMessage = useCallback(async (message) => {
    try {
      // 🚀 PRODUCTION FIX: We insert 'blindly' for guests (no .select())
      const { error } = await supabase
        .from('messages')
        .insert([message]);

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error("Add Message Error:", error);
      return { success: false, error };
    }
  }, []);

  const deleteMessage = useCallback(async (id) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setData(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m.id !== id)
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, []);

  const value = useMemo(() => ({
    data,
    loading,
    updateHero,
    updateAbout,
    addProject,
    toggleProjectVisibility,
    deleteProject,
    addMessage,
    deleteMessage,
    refreshData: fetchData
  }), [
    data,
    loading,
    updateHero,
    updateAbout,
    addProject,
    toggleProjectVisibility,
    deleteProject,
    addMessage,
    deleteMessage,
    fetchData
  ]);

  return (
    <DataContext.Provider value={value}>
      {showLoading && <LoadingScreen isExiting={!loading} />}
      {children}
    </DataContext.Provider>
  );
};