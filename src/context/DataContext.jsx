import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    hero: null,
    about: null,
    projects: [],
    messages: []
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ALL DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      const { data: hero } = await supabase
        .from('hero')
        .select('*')
        .limit(1)
        .single();

      const { data: about } = await supabase
        .from('about')
        .select('*')
        .limit(1)
        .single();

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      // 🔁 Format projects to frontend shape
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

      setData({
        hero: hero || null,
        about: about
          ? {
              id: about.id,
              bio: about.description,
              experience: about.title,
              skills: about.skills || []
            }
          : null,
        projects: formattedProjects,
        messages: messages || []
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  // =========================
  // HERO
  // =========================
  const updateHero = async (heroData) => {
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
  };

  // =========================
  // ABOUT
  // =========================
  const updateAbout = async (aboutData) => {
  // Always get the first existing row
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
    // ✅ Update existing record
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
    // ✅ Insert ONLY if table is completely empty
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
};

  // =========================
  // PROJECTS
  // =========================
  const addProject = async (project) => {
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
  };

  const updateProject = async (id, project) => {
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
  };

  const deleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id);

    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const toggleProjectVisibility = async (id) => {
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
  };

  const toggleProjectFeatured = async (id) => {
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
  };

  // =========================
  // MESSAGES
  // =========================
  const addMessage = async (message) => {
    const { data: inserted } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    setData(prev => ({
      ...prev,
      messages: [inserted, ...prev.messages]
    }));
  };

  const deleteMessage = async (id) => {
    await supabase.from('messages').delete().eq('id', id);

    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
  };

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);