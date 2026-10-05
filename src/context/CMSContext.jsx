import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCompanyInfo,
  initialLeadership,
  initialServices,
  initialProjects,
  initialEquipment,
  initialGallery,
  initialHomeStats
} from '../data/initialData';

const CMSContext = createContext(null);

const STORAGE_KEY = 'clm_cms_data_v1';
const AUTH_KEY = 'clm_cms_auth_v1';

export function CMSProvider({ children }) {
  // Authentication & Admin Mode State
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showOutlines, setShowOutlines] = useState(false);

  useEffect(() => {
    if (showOutlines && isAdmin) {
      document.body.classList.add('show-cms-outlines');
    } else {
      document.body.classList.remove('show-cms-outlines');
    }
  }, [showOutlines, isAdmin]);

  // Content Data States
  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_company`);
      return saved ? JSON.parse(saved) : initialCompanyInfo;
    } catch {
      return initialCompanyInfo;
    }
  });

  const [homeStats, setHomeStats] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_homeStats`);
      return saved ? JSON.parse(saved) : initialHomeStats;
    } catch {
      return initialHomeStats;
    }
  });

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [leadership, setLeadership] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_leadership`);
      return saved ? JSON.parse(saved) : initialLeadership;
    } catch {
      return initialLeadership;
    }
  });

  const [equipment, setEquipment] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_equipment`);
      return saved ? JSON.parse(saved) : initialEquipment;
    } catch {
      return initialEquipment;
    }
  });

  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      return saved ? JSON.parse(saved) : initialGallery;
    } catch {
      return initialGallery;
    }
  });

  // Track changes count for visual feedback
  const [changeCount, setChangeCount] = useState(0);

  const markChanged = () => {
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
  };

  // Login handler
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setIsLoginModalOpen(false);
      showToast('Admin Mode Active: Inline Editing Enabled');
      return true;
    }
    return false;
  };

  // Logout handler
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
    showToast('Logged out of Admin Mode');
  };

  // Save all changes to localStorage
  const saveChanges = () => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_company`, JSON.stringify(companyInfo));
      localStorage.setItem(`${STORAGE_KEY}_homeStats`, JSON.stringify(homeStats));
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_leadership`, JSON.stringify(leadership));
      localStorage.setItem(`${STORAGE_KEY}_equipment`, JSON.stringify(equipment));
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));

      setHasUnsavedChanges(false);
      setChangeCount(0);
      showToast('✓ All changes saved successfully to persistent storage!');
    } catch (err) {
      console.error('Failed to save changes:', err);
      showToast('Error saving changes. Check console.');
    }
  };

  // Reset to default data
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all site content back to defaults?')) {
      localStorage.removeItem(`${STORAGE_KEY}_company`);
      localStorage.removeItem(`${STORAGE_KEY}_homeStats`);
      localStorage.removeItem(`${STORAGE_KEY}_services`);
      localStorage.removeItem(`${STORAGE_KEY}_projects`);
      localStorage.removeItem(`${STORAGE_KEY}_leadership`);
      localStorage.removeItem(`${STORAGE_KEY}_equipment`);
      localStorage.removeItem(`${STORAGE_KEY}_gallery`);

      setCompanyInfo(initialCompanyInfo);
      setHomeStats(initialHomeStats);
      setServices(initialServices);
      setProjects(initialProjects);
      setLeadership(initialLeadership);
      setEquipment(initialEquipment);
      setGallery(initialGallery);
      setHasUnsavedChanges(false);
      setChangeCount(0);
      showToast('Reset all content back to factory defaults');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Update specific fields
  const updateCompanyInfo = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
    markChanged();
  };

  const updateHomeStats = (field, value) => {
    setHomeStats(prev => ({ ...prev, [field]: value }));
    markChanged();
  };

  // Dynamic Array Handlers: Services
  const updateService = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    markChanged();
  };

  const addService = () => {
    const newId = `service-${Date.now()}`;
    const newService = {
      id: newId,
      title: "New Construction Service",
      shortOverview: "Detailed overview of the specialized civil engineering or construction capability.",
      scopeOfWork: [
        "Phase 1: Planning and IS Code Structural Design",
        "Phase 2: Execution and Quality Assurance"
      ],
      idealProjectType: "Residential, Commercial & Industrial Facilities",
      keyBenefits: [
        "Guaranteed structural safety",
        "Executed strictly on budget"
      ],
      iconName: "Building2",
      details: "Full details explaining client advantages, execution standards, and technical specifications."
    };
    setServices(prev => [...prev, newService]);
    markChanged();
    showToast('New Service added to collection');
  };

  const deleteService = (id) => {
    if (window.confirm('Delete this service vertical?')) {
      setServices(prev => prev.filter(s => s.id !== id));
      markChanged();
      showToast('Service removed');
    }
  };

  // Dynamic Array Handlers: Projects
  const updateProject = (id, field, value) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    markChanged();
  };

  const addProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject = {
      id: newId,
      title: "New Construction Project Title",
      category: "Industrial",
      status: "Running (Target 2026)",
      location: "Mathura, Uttar Pradesh",
      estimatedCost: "Turnkey Scope",
      area: "3,500 sq.ft.",
      year: "Running Project (Target 2026)",
      isFeatured: true,
      description: "Brief summary describing the construction scope, civil RCC foundations, and structural specifications.",
      scope: [
        "Foundation Excavation & Heavy RCC Footing",
        "Structural IS Code Compliant Framework"
      ],
      image: "/ETP.jpg"
    };
    setProjects(prev => [...prev, newProject]);
    markChanged();
    showToast('New Project added to portfolio');
  };

  const deleteProject = (id) => {
    if (window.confirm('Delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      markChanged();
      showToast('Project removed');
    }
  };

  // Dynamic Array Handlers: Contractors & Leadership
  const updateLeadership = (id, field, value) => {
    setLeadership(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
    markChanged();
  };

  const addContractor = () => {
    const newId = `contractor-${Date.now()}`;
    const newMember = {
      id: newId,
      name: "New Key Contractor / Engineer",
      title: "Senior Project Engineer & Contractor",
      qualification: "B.Tech in Civil Engineering",
      experienceYears: "15+ Years Industrial Experience",
      bio: "Seasoned civil engineer with extensive expertise in IS code compliant execution, heavy equipment management, and quality control.",
      highlights: [
        "15+ Years of Site Supervision & Structural Engineering",
        "Expertise in Industrial and Commercial Execution"
      ]
    };
    setLeadership(prev => [...prev, newMember]);
    markChanged();
    showToast('New Contractor / Team Member added');
  };

  const deleteContractor = (id) => {
    if (window.confirm('Delete this contractor / leadership profile?')) {
      setLeadership(prev => prev.filter(l => l.id !== id));
      markChanged();
      showToast('Contractor profile removed');
    }
  };

  // Keyboard shortcut listener: Ctrl + Shift + A to toggle admin login
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsLoginModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dynamic Array Handlers: Gallery
  const updateGallery = (id, field, value) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
    markChanged();
  };

  return (
    <CMSContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        hasUnsavedChanges,
        changeCount,
        isLoginModalOpen,
        setIsLoginModalOpen,
        toastMessage,
        showOutlines,
        setShowOutlines,
        login,
        logout,
        saveChanges,
        resetToDefaults,
        showToast,
        // Data & Setters
        companyInfo,
        updateCompanyInfo,
        homeStats,
        updateHomeStats,
        services,
        updateService,
        addService,
        deleteService,
        projects,
        updateProject,
        addProject,
        deleteProject,
        leadership,
        updateLeadership,
        addContractor,
        deleteContractor,
        equipment,
        gallery,
        updateGallery,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
