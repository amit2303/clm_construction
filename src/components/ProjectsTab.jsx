import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import {
  MapPin,
  Maximize2,
  ArrowUpRight,
  PlusCircle,
  Trash2,
  Camera,
  Building2,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Layers
} from 'lucide-react';

export default function ProjectsTab({ onSelectProject, onOpenQuoteModal, initialView = 'projects' }) {
  const {
    projects,
    gallery,
    updateProject,
    updateGallery,
    addProject,
    deleteProject,
    isAdmin
  } = useCMS();

  const [activeTabMode, setActiveTabMode] = useState(initialView); // 'projects' or 'gallery'
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    if (initialView) {
      setActiveTabMode(initialView);
    }
  }, [initialView]);

  const selectedItem = selectedImageIndex !== null ? gallery[selectedImageIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev + 1) % gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, gallery.length]);

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#111D30',
          backgroundImage: 'linear-gradient(to right, rgba(17, 29, 48, 0.94) 30%, rgba(28, 48, 77, 0.8) 100%), url("/images/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '85px 0 65px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span className="badge-gold" style={{ marginBottom: '16px' }}>
              OUR PORTFOLIO & ON-SITE GALLERY
            </span>
            <h1
              className="page-banner-heading"
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Executed Projects & Gallery
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.08rem', lineHeight: 1.65 }}>
              Explore CLM Group of Construction's structural achievements — including active 2026 target builds, commercial developments, and high-resolution on-site engineering photography.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          {/* Sub-navigation Switcher: Projects vs Gallery (Fully Responsive) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '36px',
            }}
          >
            <div className="projects-tab-switcher">
              <button
                type="button"
                onClick={() => setActiveTabMode('projects')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  borderRadius: '30px',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.82rem, 2.2vw, 0.94rem)',
                  cursor: 'pointer',
                  background: activeTabMode === 'projects'
                    ? 'linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)'
                    : 'transparent',
                  color: activeTabMode === 'projects' ? '#FFFFFF' : '#94A3B8',
                  boxShadow: activeTabMode === 'projects' ? '0 4px 14px rgba(245, 158, 11, 0.35)' : 'none',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Building2 size={16} />
                <span>Portfolios ({projects.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabMode('gallery')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  borderRadius: '30px',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.82rem, 2.2vw, 0.94rem)',
                  cursor: 'pointer',
                  background: activeTabMode === 'gallery'
                    ? 'linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)'
                    : 'transparent',
                  color: activeTabMode === 'gallery' ? '#FFFFFF' : '#94A3B8',
                  boxShadow: activeTabMode === 'gallery' ? '0 4px 14px rgba(245, 158, 11, 0.35)' : 'none',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Camera size={16} />
                <span>Gallery ({gallery.length})</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: PROJECT PORTFOLIOS */}
          {activeTabMode === 'projects' && (
            <div>
              {/* Projects Grid */}
              <div className="responsive-grid">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.09)';
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.04)';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    {/* Admin Delete Project Button */}
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
                            deleteProject(project.id);
                          }
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          zIndex: 10,
                          backgroundColor: '#EF4444',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    <div>
                      <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                        <EditableImage
                          src={project.image}
                          alt={project.title}
                          onChange={(val) => updateProject(project.id, 'image', val)}
                          fallbackSrc="/ETP.jpg"
                          buttonLabel="Change Image"
                        />
                        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap', zIndex: 15 }}>
                          <span
                            style={{
                              backgroundColor: 'rgba(17, 29, 48, 0.92)',
                              color: '#F59E0B',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '4px 12px',
                              borderRadius: '4px',
                              border: '1px solid rgba(245, 158, 11, 0.3)',
                            }}
                          >
                            <EditableField
                              value={project.category}
                              onChange={(val) => updateProject(project.id, 'category', val)}
                              as="span"
                            />
                          </span>
                          <span
                            style={{
                              background: project.status === 'Running (Target 2026)'
                                ? 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)'
                                : '#0F172A',
                              color: '#FFFFFF',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '4px 10px',
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                              border: project.status === 'Running (Target 2026)' ? 'none' : '1px solid rgba(255,255,255,0.15)',
                            }}
                          >
                            <EditableField
                              value={project.status}
                              onChange={(val) => updateProject(project.id, 'status', val)}
                              as="span"
                            />
                          </span>
                        </div>
                      </div>

                      <div style={{ padding: '24px' }}>
                        <h3
                          style={{
                            fontSize: '1.25rem',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            color: '#0F172A',
                            marginBottom: '8px',
                          }}
                        >
                          <EditableField
                            value={project.title}
                            onChange={(val) => updateProject(project.id, 'title', val)}
                            as="span"
                          />
                        </h3>

                        <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', marginBottom: '20px' }}>
                          <EditableField
                            value={project.description}
                            onChange={(val) => updateProject(project.id, 'description', val)}
                            as="span"
                            multiline={true}
                          />
                        </p>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            padding: '12px',
                            backgroundColor: '#F8FAFC',
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            marginBottom: '20px',
                            border: '1px solid #E2E8F0',
                          }}
                        >
                          <div>
                            <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>
                              Client / Scope
                            </span>
                            <span style={{ fontWeight: 600, color: '#0F172A' }}>
                              <EditableField
                                value={project.client || 'CLM Construction Client'}
                                onChange={(val) => updateProject(project.id, 'client', val)}
                                as="span"
                              />
                            </span>
                          </div>
                          <div>
                            <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>
                              Location
                            </span>
                            <span style={{ fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={13} style={{ color: '#F59E0B' }} />
                              <EditableField
                                value={project.location}
                                onChange={(val) => updateProject(project.id, 'location', val)}
                                as="span"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '16px 24px',
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <button
                        onClick={() => onSelectProject(project)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0F172A',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-heading)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
                      >
                        Inspect Specifications <ArrowUpRight size={16} />
                      </button>

                      {project.year && (
                        <span style={{ color: '#94A3B8', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={13} />
                          <EditableField
                            value={project.year}
                            onChange={(val) => updateProject(project.id, 'year', val)}
                            as="span"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Admin Add New Project Card */}
                {isAdmin && (
                  <div
                    onClick={addProject}
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.03)',
                      borderRadius: '14px',
                      padding: '36px',
                      border: '2px dashed rgba(245, 158, 11, 0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '360px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.03)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <PlusCircle size={48} style={{ color: '#F59E0B', marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 800, margin: 0 }}>
                      Add New Project +
                    </h3>
                    <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '10px' }}>
                      Click to add a new project directly to this portfolio gallery
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: ON-SITE PHOTO GALLERY */}
          {activeTabMode === 'gallery' && (
            <div>
              {/* Photo Grid */}
              <div className="responsive-grid">
                {gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      position: 'relative',
                    }}
                    onClick={() => setSelectedImageIndex(idx)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.09)';
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.04)';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: '#16263E' }}>
                      <EditableImage
                        src={item.src}
                        alt={item.title}
                        onChange={(val) => updateGallery(item.id, 'src', val)}
                        fallbackSrc="/ETP.jpg"
                        buttonLabel="Change Photo"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(17, 29, 48, 0.88)',
                          backdropFilter: 'blur(8px)',
                          color: '#F59E0B',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '4px',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          zIndex: 10,
                        }}
                      >
                        <EditableField
                          value={item.tag}
                          onChange={(val) => updateGallery(item.id, 'tag', val)}
                          as="span"
                        />
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          background: 'linear-gradient(135deg, #F97316 0%, #EAB308 100%)',
                          color: '#FFFFFF',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
                          zIndex: 10,
                        }}
                      >
                        <Maximize2 size={16} />
                      </div>
                    </div>

                    <div style={{ padding: '20px' }}>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 800,
                          color: '#0F172A',
                          marginBottom: '6px',
                          lineHeight: 1.3,
                        }}
                      >
                        <EditableField
                          value={item.title}
                          onChange={(val) => updateGallery(item.id, 'title', val)}
                          as="span"
                        />
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                        <MapPin size={14} />
                        <EditableField
                          value={item.location}
                          onChange={(val) => updateGallery(item.id, 'location', val)}
                          as="span"
                        />
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                        <EditableField
                          value={item.description}
                          onChange={(val) => updateGallery(item.id, 'description', val)}
                          as="span"
                          multiline={true}
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Banner */}
          <div
            style={{
              position: 'relative',
              marginTop: '70px',
              padding: '45px 36px',
              backgroundColor: '#16263E',
              borderRadius: '16px',
              color: '#FFFFFF',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #F97316 25%, #EAB308 75%, transparent 100%)',
              }}
            />
            <h3 style={{ fontSize: '1.65rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '10px', fontWeight: 800 }}>
              Planning a Custom Residential, Commercial, or Industrial Build?
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Let CLM Construction estimate your structural bill of quantities, plot requirements, and IS code engineering scope.
            </p>
            <button onClick={onOpenQuoteModal} className="btn-primary">
              Request Technical Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Gallery Images */}
      {selectedItem && selectedImageIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(17, 29, 48, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              width: '100%',
              backgroundColor: '#16263E',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.14)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(15,30,54,0.6)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div
              style={{
                padding: '16px 24px',
                backgroundColor: '#111D30',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge-amber" style={{ fontSize: '0.75rem' }}>
                  Image {selectedImageIndex + 1} of {filteredGallery.length}
                </span>
                <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.88rem' }}>
                  {selectedItem.tag}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a
                  href={selectedItem.src}
                  download={`CLM-${selectedItem.id}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#94A3B8',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                  }}
                >
                  <Download size={14} /> Full Image
                </a>
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Image Viewer with Prev/Next Controls */}
            <div
              style={{
                position: 'relative',
                backgroundColor: '#000000',
                minHeight: '450px',
                maxHeight: '65vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain' }}
              />

              <button
                onClick={() => {
                  setSelectedImageIndex((selectedImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
                }}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(17, 29, 48, 0.85)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => {
                  setSelectedImageIndex((selectedImageIndex + 1) % filteredGallery.length);
                }}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(17, 29, 48, 0.85)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Caption & Location */}
            <div style={{ padding: '20px 24px', backgroundColor: '#16263E' }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '6px' }}>
                {selectedItem.title}
              </h3>
              <div style={{ color: '#F59E0B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <MapPin size={14} /> {selectedItem.location}
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
