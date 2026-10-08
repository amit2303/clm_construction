import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
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
const TOKEN_KEY = 'clm_cms_token_v1';

export function CMSProvider({ children }) {
  // Authentication & Admin Mode State
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [sessionToken, setSessionToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving'
  const [lastSavedTime, setLastSavedTime] = useState('Just now');
  const [toastMessage, setToastMessage] = useState(null);
  const [showOutlines, setShowOutlines] = useState(false);
  const isHydratedRef = useRef(false);

  // Verify server token on mount
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return;
      try {
        const res = await fetch('/api/admin-verify', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.valid) {
          setIsAdmin(true);
          localStorage.setItem(AUTH_KEY, 'true');
        } else {
          setIsAdmin(false);
          setSessionToken(null);
          localStorage.removeItem(AUTH_KEY);
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch {
        // Offline or server not responding
      }
    };
    verifySession();
  }, []);

  useEffect(() => {
    if (showOutlines && isAdmin) {
      document.body.classList.add('show-cms-outlines');
    } else {
      document.body.classList.remove('show-cms-outlines');
    }
  }, [showOutlines, isAdmin]);

  // Synchronous initial load from localStorage
  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_company`);
      return saved ? { ...initialCompanyInfo, ...JSON.parse(saved) } : initialCompanyInfo;
    } catch {
      return initialCompanyInfo;
    }
  });

  const [homeStats, setHomeStats] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_homeStats`);
      return saved ? { ...initialHomeStats, ...JSON.parse(saved) } : initialHomeStats;
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

  const [changeCount, setChangeCount] = useState(0);

  // Background check for server-stored disk data (/data/cms_data.json) on initial mount
  useEffect(() => {
    const checkServerData = async () => {
      try {
        const res = await fetch('/data/cms_data.json');
        if (res.ok) {
          const serverData = await res.json();
          const localTimestamp = parseInt(localStorage.getItem(`${STORAGE_KEY}_timestamp`) || '0', 10);
          const serverTimestamp = serverData.lastSaved || 0;

          // If no local changes or server has strictly newer data, hydrate from server
          if (!localStorage.getItem(`${STORAGE_KEY}_company`) || serverTimestamp > localTimestamp) {
            if (serverData.companyInfo) setCompanyInfo(serverData.companyInfo);
            if (serverData.homeStats) setHomeStats(serverData.homeStats);
            if (serverData.services) setServices(serverData.services);
            if (serverData.projects) setProjects(serverData.projects);
            if (serverData.leadership) setLeadership(serverData.leadership);
            if (serverData.equipment) setEquipment(serverData.equipment);
            if (serverData.gallery) setGallery(serverData.gallery);
            localStorage.setItem(`${STORAGE_KEY}_timestamp`, (serverTimestamp || Date.now()).toString());
          }
        }
      } catch {
        // Offline or file not found - continue with localStorage/initialData
      } finally {
        isHydratedRef.current = true;
      }
    };
    checkServerData();
  }, []);

  // Synchronous persist helper to localStorage
  const persistToLocalStorage = useCallback((dataToSave) => {
    try {
      const ts = Date.now().toString();
      localStorage.setItem(`${STORAGE_KEY}_company`, JSON.stringify(dataToSave.companyInfo));
      localStorage.setItem(`${STORAGE_KEY}_homeStats`, JSON.stringify(dataToSave.homeStats));
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(dataToSave.services));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(dataToSave.projects));
      localStorage.setItem(`${STORAGE_KEY}_leadership`, JSON.stringify(dataToSave.leadership));
      localStorage.setItem(`${STORAGE_KEY}_equipment`, JSON.stringify(dataToSave.equipment));
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(dataToSave.gallery));
      localStorage.setItem(`${STORAGE_KEY}_timestamp`, ts);
      setSaveStatus('saved');
      setLastSavedTime('Just now');
    } catch (err) {
      console.error('LocalStorage write failed:', err);
    }
  }, []);

  // Server disk persist helper via /api/cms-save
  const persistToServerDisk = useCallback(async (dataToSave) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const payload = {
        companyInfo: dataToSave.companyInfo,
        homeStats: dataToSave.homeStats,
        services: dataToSave.services,
        projects: dataToSave.projects,
        leadership: dataToSave.leadership,
        equipment: dataToSave.equipment,
        gallery: dataToSave.gallery,
        lastSaved: Date.now()
      };
      await fetch('/api/cms-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      setHasUnsavedChanges(false);
      setChangeCount(0);
      setSaveStatus('saved');
    } catch {
      // Graceful fallback if server API endpoint is not running
    }
  }, []);

  // 1. INSTANT CONTINUOUS AUTO-SAVE (Runs whenever any data state changes AND unsaved changes exist)
  // Ensures changes are NEVER lost on page refresh, navigation, or browser close!
  useEffect(() => {
    // Only auto-save after initial component mount AND when user has actually made edits
    if (!isHydratedRef.current || !hasUnsavedChanges) {
      return;
    }

    setSaveStatus('saving');

    const dataToSave = {
      companyInfo,
      homeStats,
      services,
      projects,
      leadership,
      equipment,
      gallery
    };

    // 1a. Fast local save (80ms debounce so rapid typing is silky smooth)
    const localTimer = setTimeout(() => {
      persistToLocalStorage(dataToSave);
    }, 80);

    // 1b. Server disk sync (600ms debounce)
    const serverTimer = setTimeout(() => {
      persistToServerDisk(dataToSave);
    }, 600);

    return () => {
      clearTimeout(localTimer);
      clearTimeout(serverTimer);
    };
  }, [companyInfo, homeStats, services, projects, leadership, equipment, gallery, hasUnsavedChanges, persistToLocalStorage, persistToServerDisk]);

  // 2. IMMEDIATE BEFOREUNLOAD & PAGEHIDE SAFETY NET
  // Synchronously commits everything to localStorage before browser reloads or tab closes
  useEffect(() => {
    const handleImmediateSave = () => {
      persistToLocalStorage({
        companyInfo,
        homeStats,
        services,
        projects,
        leadership,
        equipment,
        gallery
      });
    };

    window.addEventListener('beforeunload', handleImmediateSave);
    window.addEventListener('pagehide', handleImmediateSave);
    return () => {
      window.removeEventListener('beforeunload', handleImmediateSave);
      window.removeEventListener('pagehide', handleImmediateSave);
    };
  }, [companyInfo, homeStats, services, projects, leadership, equipment, gallery, persistToLocalStorage]);

  const markChanged = () => {
    setHasUnsavedChanges(true);
    setChangeCount(prev => prev + 1);
  };

  // Highly Secure Server Authentication (PBKDF2 SHA-512 + Brute-Force Protection)
  const login = async (username, password) => {
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setSessionToken(data.token);
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(TOKEN_KEY, data.token);
        setIsLoginModalOpen(false);
        showToast('✓ Admin Mode Active: Secure Inline Editing Enabled');
        return { success: true };
      } else {
        return {
          success: false,
          error: data.error || 'Authentication failed',
          isLockedOut: !!data.isLockedOut,
          remainingSeconds: data.remainingSeconds,
          attemptsLeft: data.attemptsLeft
        };
      }
    } catch (err) {
      // Offline fallback: check if server down
      return {
        success: false,
        error: 'Unable to connect to authentication server. Please verify backend is running.'
      };
    }
  };

  // Secure Password Reset via Master Recovery Key
  const resetPassword = async (recoveryKey, newPassword) => {
    try {
      const res = await fetch('/api/admin-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryKey, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setSessionToken(data.token);
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(TOKEN_KEY, data.token);
        setIsLoginModalOpen(false);
        showToast('✓ Password reset successfully! Admin access restored.');
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Password reset failed' };
      }
    } catch (err) {
      return { success: false, error: 'Connection error during password reset.' };
    }
  };

  // Authenticated Change Password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = sessionToken || localStorage.getItem(TOKEN_KEY);
      const res = await fetch('/api/admin-change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('✓ Admin password changed successfully!');
        setIsChangePasswordOpen(false);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Password change failed' };
      }
    } catch (err) {
      return { success: false, error: 'Connection error during password change.' };
    }
  };

  // Logout handler
  const logout = () => {
    setIsAdmin(false);
    setSessionToken(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    showToast('Logged out of Admin Mode');
  };

  // Explicit Save handler for manual "Save Changes" button trigger
  const saveChanges = async () => {
    setSaveStatus('saving');
    const dataToSave = {
      companyInfo,
      homeStats,
      services,
      projects,
      leadership,
      equipment,
      gallery
    };

    // Synchronous immediate save
    persistToLocalStorage(dataToSave);
    // Background disk save
    await persistToServerDisk(dataToSave);

    setHasUnsavedChanges(false);
    setChangeCount(0);
    setSaveStatus('saved');
    setLastSavedTime('Just now');
    showToast('✓ All changes saved permanently! Safe on refresh.');
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
      localStorage.removeItem(`${STORAGE_KEY}_timestamp`);

      setCompanyInfo(initialCompanyInfo);
      setHomeStats(initialHomeStats);
      setServices(initialServices);
      setProjects(initialProjects);
      setLeadership(initialLeadership);
      setEquipment(initialEquipment);
      setGallery(initialGallery);
      setHasUnsavedChanges(false);
      setChangeCount(0);
      setSaveStatus('saved');

      persistToServerDisk({
        companyInfo: initialCompanyInfo,
        homeStats: initialHomeStats,
        services: initialServices,
        projects: initialProjects,
        leadership: initialLeadership,
        equipment: initialEquipment,
        gallery: initialGallery
      });

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

  const addGalleryItem = () => {
    const newId = `gallery-${Date.now()}`;
    const newItem = {
      id: newId,
      title: "New Gallery Photo",
      category: "Site Work",
      location: "Project Site, U.P.",
      description: "On-site construction photography showcasing structural execution and site operations.",
      src: "/ETP.jpg",
      tag: "Site Operations"
    };
    setGallery(prev => [...prev, newItem]);
    markChanged();
    showToast('New gallery photo added — click the camera icon to change it');
  };

  const deleteGalleryItem = (id) => {
    if (window.confirm('Remove this gallery photo?')) {
      setGallery(prev => prev.filter(g => g.id !== id));
      markChanged();
      showToast('Gallery photo removed');
    }
  };

  // Strengths & Pillars Handlers
  const updateStrength = (index, field, value) => {
    setCompanyInfo(prev => {
      const list = [...(prev.aboutStrengths || initialCompanyInfo.aboutStrengths)];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, aboutStrengths: list };
    });
    markChanged();
  };

  const updatePillar = (index, field, value) => {
    setCompanyInfo(prev => {
      const list = [...(prev.aboutPillars || initialCompanyInfo.aboutPillars)];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, aboutPillars: list };
    });
    markChanged();
  };

  // Equipment Handlers
  const updateEquipment = (index, field, value) => {
    setEquipment(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    markChanged();
  };

  const updateEquipmentItem = (categoryIndex, itemIndex, value) => {
    setEquipment(prev => {
      const updated = [...prev];
      const newItems = [...updated[categoryIndex].items];
      newItems[itemIndex] = value;
      updated[categoryIndex] = { ...updated[categoryIndex], items: newItems };
      return updated;
    });
    markChanged();
  };

  return (
    <CMSContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        sessionToken,
        hasUnsavedChanges,
        changeCount,
        saveStatus,
        lastSavedTime,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isChangePasswordOpen,
        setIsChangePasswordOpen,
        toastMessage,
        showOutlines,
        setShowOutlines,
        login,
        logout,
        resetPassword,
        changePassword,
        saveChanges,
        resetToDefaults,
        showToast,
        // Data & Setters
        companyInfo,
        updateCompanyInfo,
        updateStrength,
        updatePillar,
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
        updateEquipment,
        updateEquipmentItem,
        gallery,
        updateGallery,
        addGalleryItem,
        deleteGalleryItem,
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
