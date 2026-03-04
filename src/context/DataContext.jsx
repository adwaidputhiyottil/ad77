import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import LoadingScreen from '../components/ui/LoadingScreen';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState({
    hero: null,
    about: null,
    projects: [],
    messages: []
  });

  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  // 🔥 Loading fade out logic
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // =========================
  // FETCH ALL DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch Critical Data First (Hero, About, Projects)
        const [
          { data: hero },
          { data: about },
          { data: projects }
        ] = await Promise.all([
          supabase.from('hero').select('id, title, subheading, description').limit(1).single(),
          supabase.from('about').select('id, description, title, skills').limit(1).single(),
          supabase.from('projects').select('id, title, description, image, category, details, isvisible, isfeatured').order('created_at', { ascending: false })
        ]);

        const formattedProjects = (projects || []).map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image,
          category: p.category,
          details: p.details,
          isVisible: p.isvisible ?? true,
          isFeatured: p.isfeatured ?? false
        }));

        setData(prev => ({
          ...prev,
          hero: hero || null,
          about: about
            ? {
                id: about.id,
                bio: about.description,
                experience: about.title,
                skills: about.skills || []
              }
            : null,
          projects: formattedProjects
        }));

        // ✅ Hide loading screen once critical data is ready
        setLoading(false);

        // Step 2: Fetch Non-Critical Data (Messages) only if authenticated
        if (isAuthenticated) {
          const { data: messages } = await supabase
            .from('messages')
            .select('id, name, email, message, created_at')
            .order('created_at', { ascending: false });

          if (messages) {
            setData(prev => ({
              ...prev,
              messages: messages.map(m => ({
                ...m,
                date: m.created_at
              }))
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // =========================
  // HERO
  // =========================
  const updateHero = useCallback(async (heroData) => {
    await supabase
      .from('hero')
      .update({
        title: heroData.title,
        subheading: heroData.subheading,
        description: heroData.description
      })
      .eq('id', heroData.id);

    setData(prev => ({
      ...prev,
      hero: heroData
    }));
  }, []);

  // =========================
  // ABOUT
  // =========================
  const updateAbout = useCallback(async (aboutData) => {
  const { data: existing, error: fetchError } = await supabase
    .from('about')
    .select('id')
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error("Fetch About Error:", fetchError);
    return;
  }

  const mapped = {
    title: aboutData.experience,
    description: aboutData.bio,
    skills: aboutData.skills || []
  };

  if (existing) {
    const { error } = await supabase
      .from('about')
      .update(mapped)
      .eq('id', existing.id);

    if (error) {
      console.error("Update About Error:", error);
      return;
    }

    setData(prev => ({
      ...prev,
      about: { ...aboutData, id: existing.id }
    }));
  } else {
    const { data: inserted, error } = await supabase
      .from('about')
      .insert([mapped])
      .select()
      .single();

    if (error) {
      console.error("Insert About Error:", error);
      return;
    }

    setData(prev => ({
      ...prev,
      about: { ...aboutData, id: inserted.id }
    }));
  }
}, []);

  // =========================
  // PROJECTS
  // =========================
  const addProject = useCallback(async (project) => {
    const { data: inserted, error } = await supabase
      .from('projects')
      .insert([
        {
          title: project.title,
          description: project.description,
          image: project.image,
          category: project.category,
          details: project.details,
          isvisible: project.isVisible ?? true,
          isfeatured: project.isFeatured ?? false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert Error:", error);
      return;
    }

    const formatted = {
      id: inserted.id,
      title: inserted.title,
      description: inserted.description,
      image: inserted.image,
      category: inserted.category,
      details: inserted.details,
      isVisible: inserted.isvisible,
      isFeatured: inserted.isfeatured
    };

    setData(prev => ({
      ...prev,
      projects: [formatted, ...prev.projects]
    }));
  }, []);

  const updateProject = useCallback(async (id, project) => {
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        details: project.details,
        isvisible: project.isVisible,
        isfeatured: project.isFeatured
      })
      .eq('id', id);

    if (error) {
      console.error("Update Error:", error);
      return;
    }

    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...project } : p
      )
    }));
  }, []);

  const deleteProject = useCallback(async (id) => {
    await supabase.from('projects').delete().eq('id', id);

    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  }, []);

  const toggleProjectVisibility = useCallback(async (id) => {
    const project = data.projects.find(p => p.id === id);
    if (!project) return;

    const newValue = !project.isVisible;

    const { error } = await supabase
      .from('projects')
      .update({ isvisible: newValue })
      .eq('id', id);

    if (error) {
      console.error("Visibility Toggle Error:", error);
      return;
    }

    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, isVisible: newValue } : p
      )
    }));
  }, [data.projects]);

  const toggleProjectFeatured = useCallback(async (id) => {
    const project = data.projects.find(p => p.id === id);
    if (!project) return;

    const newValue = !project.isFeatured;

    const { error } = await supabase
      .from('projects')
      .update({ isfeatured: newValue })
      .eq('id', id);

    if (error) {
      console.error("Featured Toggle Error:", error);
      return;
    }

    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, isFeatured: newValue } : p
      )
    }));
  }, [data.projects]);

  // =========================
  // MESSAGES
  // =========================
  const addMessage = useCallback(async (message) => {
    try {
      const { data: inserted, error } = await supabase
        .from('messages')
        .insert([message])
        .select()
        .single();

      if (error) throw error;

      setData(prev => ({
        ...prev,
        messages: [inserted, ...prev.messages]
      }));
      
      return { success: true };
    } catch (error) {
      console.error("Add Message Error:", error);
      return { success: false, error };
    }
  }, []);

  const deleteMessage = useCallback(async (id) => {
    await supabase.from('messages').delete().eq('id', id);

    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
  }, []);

  const value = useMemo(() => ({
    data,
    loading,
    updateHero,
    updateAbout,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
    toggleProjectFeatured,
    addMessage,
    deleteMessage
  }), [
    data,
    loading,
    updateHero,
    updateAbout,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
    toggleProjectFeatured,
    addMessage,
    deleteMessage
  ]);

  return (
    <DataContext.Provider value={value}>
      {showLoading && <LoadingScreen isExiting={!loading} />}
      {children}
    </DataContext.Provider>
  );
};