import React from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import {
  Target,
  Eye,
  Award,
  Briefcase,
  Users,
  ShieldCheck,
  CircleCheck,
  ChevronRight,
  PlusCircle,
  Trash2
} from 'lucide-react';

export default function AboutTab({ onOpenQuoteModal }) {
  const {
    companyInfo,
    updateCompanyInfo,
    leadership,
    updateLeadership,
    addContractor,
    deleteContractor,
    isAdmin
  } = useCMS();

  const strengths = [
    {
      title: 'Team Expertise',
      desc: 'A highly skilled workforce with experience in various construction projects ensuring top-tier quality and execution efficiency.',
      icon: Users,
    },
    {
      title: 'Efficient Operations',
      desc: 'Streamlined processes, effective project management, and a focus on cost control contributing to timely project completion within budget.',
      icon: Briefcase,
    },
    {
      title: 'Strong Reputation',
      desc: 'A history of successful projects and satisfied clients leading to positive word-of-mouth referrals and a trusted brand image.',
      icon: Award,
    },
    {
      title: 'Subcontractor Relationships',
      desc: 'Building strong partnerships with reliable subcontractors guarantees access to qualified workers and ensures a smooth workflow.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#111D30',
          backgroundImage: 'linear-gradient(to right, rgba(17, 29, 48, 0.94) 30%, rgba(28, 48, 77, 0.8) 100%), url("/project_gallery/gallery-5.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '85px 0 65px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '750px' }}>
            <span className="badge-amber" style={{ marginBottom: '16px' }}>
              ABOUT CLM GROUP OF CONSTRUCTION
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
              Built on Trust, Precision Engineering & Craftsmanship
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.08rem', lineHeight: 1.65 }}>
              <EditableField
                value={companyInfo.history}
                onChange={(val) => updateCompanyInfo('history', val)}
                as="span"
                multiline={true}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="responsive-grid">
            {/* Mission Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'clamp(22px, 3.5vw, 36px)',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                Our Mission
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                "
                <EditableField
                  value={companyInfo.mission}
                  onChange={(val) => updateCompanyInfo('mission', val)}
                  as="span"
                  multiline={true}
                />
                "
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '6px',
                  color: '#D97706',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}
              >
                Targeting{' '}
                <EditableField
                  value={companyInfo.targetProjectsUpcoming}
                  onChange={(val) => updateCompanyInfo('targetProjectsUpcoming', val)}
                  as="span"
                />{' '}
                in Upcoming Year
              </div>
            </div>

            {/* Vision Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'clamp(22px, 3.5vw, 36px)',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  color: '#EAB308',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Eye size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                Our Vision
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                "
                <EditableField
                  value={companyInfo.vision}
                  onChange={(val) => updateCompanyInfo('vision', val)}
                  as="span"
                  multiline={true}
                />
                "
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.25)',
                  borderRadius: '6px',
                  color: '#CA8A04',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}
              >
                Target Execution: Regional Infrastructure & Turnkey Projects
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Contractors Section */}
      <section className="section-padding" style={{ backgroundColor: '#111D30', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>
              OUR FOUNDERS & DIRECTORS
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              Leadership Backed by Decades of Civil Engineering Success
            </h2>
          </div>

          <div className="responsive-grid">
            {leadership.map((person, idx) => (
              <div
                key={person.id || idx}
                style={{
                  backgroundColor: '#16263E',
                  borderRadius: '16px',
                  padding: 'clamp(22px, 3.5vw, 36px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 12px 36px rgba(15,30,54,0.3)',
                  position: 'relative',
                }}
              >
                {isAdmin && (
                  <button
                    onClick={() => deleteContractor(person.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#EF4444',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Delete contractor"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 179, 8, 0.12) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      boxShadow: '0 4px 18px rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {idx % 2 === 0 ? <Award size={26} style={{ color: '#F59E0B' }} /> : <Briefcase size={26} style={{ color: '#EAB308' }} />}
                  </div>
                  <div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: 0 }}>
                      <EditableField
                        value={person.name}
                        onChange={(val) => updateLeadership(person.id, 'name', val)}
                        as="span"
                      />
                    </h3>
                    <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>
                      <EditableField
                        value={person.title}
                        onChange={(val) => updateLeadership(person.id, 'title', val)}
                        as="span"
                      />
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                      <EditableField
                        value={person.qualification}
                        onChange={(val) => updateLeadership(person.id, 'qualification', val)}
                        as="span"
                      />{' '}
                      •{' '}
                      <EditableField
                        value={person.experienceYears}
                        onChange={(val) => updateLeadership(person.id, 'experienceYears', val)}
                        as="span"
                      />
                    </div>
                  </div>
                </div>

                <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  <EditableField
                    value={person.bio}
                    onChange={(val) => updateLeadership(person.id, 'bio', val)}
                    as="span"
                    multiline={true}
                  />
                </p>

                <h4 style={{ color: '#FFFFFF', fontSize: '0.88rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                  Core Competencies & Sector Track Record:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {person.highlights && person.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ fontSize: '0.88rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CircleCheck size={16} style={{ color: '#F59E0B', flexShrink: 0 }} />{' '}
                      <EditableField
                        value={h}
                        onChange={(val) => {
                          const newHighlights = [...person.highlights];
                          newHighlights[hIdx] = val;
                          updateLeadership(person.id, 'highlights', newHighlights);
                        }}
                        as="span"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Admin Add New + Contractor Card */}
            {isAdmin && (
              <div
                onClick={addContractor}
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.03)',
                  borderRadius: '14px',
                  padding: '40px',
                  border: '2px dashed rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '380px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textAlign: 'center',
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
                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 800, margin: 0 }}>
                  Add Contractor / Leadership +
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '10px' }}>
                  Click to add a new key contractor profile to the company leadership
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why We Stand Out (Strengths) */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px auto' }}>
            <span className="badge-amber" style={{ marginBottom: '12px' }}>
              OUR STRENGTHS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0F172A' }}>
              Why We Stand Out
            </h2>
          </div>

          <div className="responsive-grid">
            {strengths.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    padding: '28px',
                    borderRadius: '12px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.09) 0%, rgba(234, 179, 8, 0.09) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      color: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skilled Workforce & Operational Pillars */}
      <section className="section-padding" style={{ backgroundColor: '#111D30', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px auto' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>
              MANPOWER BACKBONE
            </span>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFFFFF' }}>
              Our Skilled Workforce & Operational Pillars
            </h2>
          </div>

          <div className="responsive-grid-small">
            <div style={{ backgroundColor: '#16263E', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Pillar 1
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px' }}>
                Engineers & Professionals
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Our team designs, plans, and manages construction projects to meet safety standards and client requirements. Skilled tradespeople maintain buildings' structural integrity and functionality.
              </p>
            </div>

            <div style={{ backgroundColor: '#16263E', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: '#EAB308', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Pillar 2
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px' }}>
                Labour Force
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                General laborers assist skilled tradespeople by performing tasks like moving materials, cleaning, digging, and basic construction, requiring physical strength, tool skills, and precise instruction following.
              </p>
            </div>

            <div style={{ backgroundColor: '#16263E', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Pillar 3
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px' }}>
                Support Staff & Safety Officers
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                The administrative team oversees documentation, procurement, scheduling, and logistics. Dedicated safety officers ensure a safe work environment while HR manages recruitment and compliance.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={onOpenQuoteModal} className="btn-primary">
              Contact Our Engineering Team <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
