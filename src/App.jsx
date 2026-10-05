import React, { useState } from 'react';
import { CMSProvider } from './context/CMSContext';
import AdminBar from './components/AdminBar';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ProjectModal from './components/ProjectModal';
import AdminLoginModal from './components/AdminLoginModal';
import SaveButton from './components/SaveButton';
import Toast from './components/Toast';
import MobileBottomBar from './components/MobileBottomBar';

import HomeTab from './components/HomeTab';
import AboutTab from './components/AboutTab';
import ServicesTab from './components/ServicesTab';
import ProjectsTab from './components/ProjectsTab';
import GalleryTab from './components/GalleryTab';
import ContactTab from './components/ContactTab';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeTab
            setActiveTab={setActiveTab}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        );
      case 'about':
        return <AboutTab onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />;
      case 'services':
        return <ServicesTab onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />;
      case 'projects':
        return (
          <ProjectsTab
            initialView="projects"
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        );
      case 'gallery':
        return (
          <ProjectsTab
            initialView="gallery"
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        );
      case 'contact':
        return <ContactTab />;
      default:
        return (
          <HomeTab
            setActiveTab={setActiveTab}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Admin Sticky Toolbar */}
      <AdminBar />

      {/* Main Header / Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Dynamic Content View */}
      <main style={{ flex: 1 }}>
        {renderActiveTab()}
      </main>

      {/* Footer with Triple-Click Admin Login Trigger */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Modals & Overlays */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteModal={() => {
          setSelectedProject(null);
          setIsQuoteModalOpen(true);
        }}
      />

      <AdminLoginModal />

      {/* Floating Save Changes Button (Bottom Right) */}
      <SaveButton />

      {/* Action Toast Notifications */}
      <Toast />

      {/* Floating Mobile Bottom Action Bar (Phones Only) */}
      <MobileBottomBar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
