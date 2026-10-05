import React from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import {
  MapPin,
  Maximize2,
  Calendar,
  CircleCheck,
  Building2,
  X
} from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenQuoteModal }) {
  const { updateProject } = useCMS();

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(17, 29, 48, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#16263E',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(15, 30, 54, 0.6)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Image & Titles */}
        <div style={{ position: 'relative', height: 'clamp(200px, 35vw, 290px)', width: '100%', overflow: 'hidden' }}>
          <EditableImage
            src={project.image}
            alt={project.title}
            onChange={(val) => updateProject(project.id, 'image', val)}
            fallbackSrc="/ETP.jpg"
            buttonLabel="Change Project Image"
            style={{ width: '100%', height: '100%' }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, #16263E 0%, rgba(22, 38, 62, 0.4) 60%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close project modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(17, 29, 48, 0.85)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30,
            }}
          >
            <X size={20} />
          </button>

          <div style={{ position: 'absolute', bottom: '16px', left: 'clamp(14px, 3vw, 24px)', right: 'clamp(14px, 3vw, 24px)', zIndex: 20 }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
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
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  backgroundColor: project.status === 'Running (Target 2026)' ? 'rgba(245, 158, 11, 0.2)' : '#1E293B',
                  border: project.status === 'Running (Target 2026)' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: project.status === 'Running (Target 2026)' ? '#F59E0B' : '#E2E8F0',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                <EditableField
                  value={project.status}
                  onChange={(val) => updateProject(project.id, 'status', val)}
                  as="span"
                />
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.2rem, 3.5vw, 1.65rem)',
                color: '#FFFFFF',
                fontWeight: 800,
                margin: 0,
              }}
            >
              <EditableField
                value={project.title}
                onChange={(val) => updateProject(project.id, 'title', val)}
                as="span"
              />
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 'clamp(16px, 3.5vw, 28px)' }}>
          {/* Key Metric Specs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} style={{ color: '#F59E0B' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Location</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8FAFC' }}>
                  <EditableField
                    value={project.location}
                    onChange={(val) => updateProject(project.id, 'location', val)}
                    as="span"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Maximize2 size={20} style={{ color: '#EAB308' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Built Area</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8FAFC' }}>
                  <EditableField
                    value={project.area}
                    onChange={(val) => updateProject(project.id, 'area', val)}
                    as="span"
                  />
                </div>
              </div>
            </div>

            {project.year && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={20} style={{ color: '#D4AF37' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Timeline</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8FAFC' }}>
                    <EditableField
                      value={project.year}
                      onChange={(val) => updateProject(project.id, 'year', val)}
                      as="span"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '10px' }}>
            Project Overview
          </h4>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            <EditableField
              value={project.description}
              onChange={(val) => updateProject(project.id, 'description', val)}
              as="span"
              multiline={true}
            />
          </p>

          <h4 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '14px' }}>
            Key Executed Scope of Work
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '12px',
              marginBottom: '30px',
            }}
          >
            {project.scope && project.scope.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <CircleCheck size={18} style={{ color: '#22C55E', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                  <EditableField
                    value={item}
                    onChange={(val) => {
                      const newScope = [...(project.scope || [])];
                      newScope[idx] = val;
                      updateProject(project.id, 'scope', newScope);
                    }}
                    as="span"
                  />
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={16} style={{ color: '#D4AF37' }} /> Verified CLM Construction Portfolio Record
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="btn-primary"
            >
              Contact Team for Similar Build
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
