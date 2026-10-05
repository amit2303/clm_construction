import React from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import {
  HardHat,
  Award,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Building2,
  Cpu,
  Factory,
  ClipboardCheck,
  CircleCheck,
  ArrowUpRight,
  Briefcase,
  Users,
  PlusCircle,
  Trash2
} from 'lucide-react';

export default function HomeTab({ setActiveTab, onOpenQuoteModal, onSelectProject }) {
  const {
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
    isAdmin
  } = useCMS();

  const featuredProjects = projects.filter(p => p.isFeatured);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'ClipboardCheck': return <ClipboardCheck size={28} />;
      case 'Building2': return <Building2 size={28} />;
      case 'Cpu': return <Cpu size={28} />;
      case 'Factory': return <Factory size={28} />;
      default: return <HardHat size={28} />;
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#090D14',
          backgroundImage: 'linear-gradient(to right, rgba(9, 13, 20, 0.95) 30%, rgba(15, 23, 42, 0.8) 100%), url("/images/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          overflow: 'hidden',
          padding: 'clamp(36px, 5vh, 56px) 0 clamp(20px, 3vh, 32px) 0',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '880px' }}>
            {/* Hero Eyebrow Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <div className="badge-amber" style={{ padding: '5px 12px', fontSize: '0.76rem' }}>
                <HardHat size={14} />
                <EditableField
                  value={homeStats.heroTagline}
                  onChange={(val) => updateHomeStats('heroTagline', val)}
                  as="span"
                />
              </div>
            </div>

            {/* Hero Headline: QUALITY IS OUR on line 1, and BLUEPRINT on line 2 */}
            <h1
              className="hero-heading"
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(2.3rem, 5.2vw, 3.8rem)',
                lineHeight: 1.1,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ display: 'block', color: '#FFFFFF' }}>
                <EditableField
                  value={homeStats.heroHeadingBefore}
                  onChange={(val) => updateHomeStats('heroHeadingBefore', val)}
                  as="span"
                  style={{ color: '#FFFFFF' }}
                />
              </span>
              <span
                style={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <EditableField
                  value={homeStats.heroHeadingAccent}
                  onChange={(val) => updateHomeStats('heroHeadingAccent', val)}
                  as="span"
                />
              </span>
            </h1>

            {/* Hero Subheadline */}
            <p
              style={{
                fontSize: 'clamp(0.98rem, 1.5vw, 1.12rem)',
                color: '#CBD5E1',
                lineHeight: 1.6,
                marginBottom: '22px',
                maxWidth: '720px',
                fontWeight: 400,
              }}
            >
              <EditableField
                value={homeStats.heroDescription}
                onChange={(val) => updateHomeStats('heroDescription', val)}
                as="span"
                multiline={true}
              />
            </p>

            {/* Action Buttons */}
            <div className="mobile-stack-buttons" style={{ gap: '12px' }}>
              <button
                onClick={onOpenQuoteModal}
                className="btn-primary"
                style={{ padding: '11px 24px', minHeight: '44px', fontSize: '0.92rem' }}
              >
                Direct Contact <ChevronRight size={17} />
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className="btn-secondary"
                style={{ padding: '11px 24px', minHeight: '44px', fontSize: '0.92rem' }}
              >
                View Projects <Building2 size={17} />
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="btn-outline-gold"
                style={{ padding: '11px 24px', minHeight: '44px', fontSize: '0.92rem' }}
              >
                Contact Us
              </button>
            </div>

            {/* Quick Metrics Bar below buttons */}
            <div className="hero-metrics-grid">
              {/* Stat 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award style={{ color: '#F59E0B', flexShrink: 0 }} size={22} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', color: '#FFFFFF', lineHeight: 1.2 }}>
                    <EditableField
                      value={homeStats.stat1Value}
                      onChange={(val) => updateHomeStats('stat1Value', val)}
                      as="span"
                    />
                  </div>
                  <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.76rem)', color: '#94A3B8', marginTop: '1px', lineHeight: 1.2 }}>
                    <EditableField
                      value={homeStats.stat1Label}
                      onChange={(val) => updateHomeStats('stat1Label', val)}
                      as="span"
                    />
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp style={{ color: '#EAB308', flexShrink: 0 }} size={22} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', color: '#FFFFFF', lineHeight: 1.2 }}>
                    <EditableField
                      value={homeStats.stat2Value}
                      onChange={(val) => updateHomeStats('stat2Value', val)}
                      as="span"
                    />
                  </div>
                  <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.76rem)', color: '#94A3B8', marginTop: '1px', lineHeight: 1.2 }}>
                    <EditableField
                      value={homeStats.stat2Label}
                      onChange={(val) => updateHomeStats('stat2Label', val)}
                      as="span"
                    />
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck style={{ color: '#D4AF37', flexShrink: 0 }} size={22} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', color: '#FFFFFF', lineHeight: 1.2 }}>
                    <EditableField
                      value={homeStats.stat3Value}
                      onChange={(val) => updateHomeStats('stat3Value', val)}
                      as="span"
                    />
                  </div>
                  <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.76rem)', color: '#94A3B8', marginTop: '1px', lineHeight: 1.2 }}>
                    <EditableField
                      value={homeStats.stat3Label}
                      onChange={(val) => updateHomeStats('stat3Label', val)}
                      as="span"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUMERICAL SCOPE RIBBON (Visible in the landing view itself without scrolling) */}
      <section
        style={{
          backgroundColor: '#0B111D',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 0',
        }}
      >
        <div className="container">
          <div className="scope-ribbon-grid">
            <div>
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(90deg, #F97316 0%, #F59E0B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                <EditableField
                  value={homeStats.ribbon1Value}
                  onChange={(val) => updateHomeStats('ribbon1Value', val)}
                  as="span"
                />
              </div>
              <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)', color: '#94A3B8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                <EditableField
                  value={homeStats.ribbon1Label}
                  onChange={(val) => updateHomeStats('ribbon1Label', val)}
                  as="span"
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(90deg, #F59E0B 0%, #EAB308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                <EditableField
                  value={homeStats.ribbon2Value}
                  onChange={(val) => updateHomeStats('ribbon2Value', val)}
                  as="span"
                />
              </div>
              <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)', color: '#94A3B8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                <EditableField
                  value={homeStats.ribbon2Label}
                  onChange={(val) => updateHomeStats('ribbon2Label', val)}
                  as="span"
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                }}
              >
                <EditableField
                  value={homeStats.ribbon3Value}
                  onChange={(val) => updateHomeStats('ribbon3Value', val)}
                  as="span"
                />
              </div>
              <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)', color: '#94A3B8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                <EditableField
                  value={homeStats.ribbon3Label}
                  onChange={(val) => updateHomeStats('ribbon3Label', val)}
                  as="span"
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: '#E2E8F0',
                  lineHeight: 1.1,
                }}
              >
                <EditableField
                  value={homeStats.ribbon4Value}
                  onChange={(val) => updateHomeStats('ribbon4Value', val)}
                  as="span"
                />
              </div>
              <div style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)', color: '#94A3B8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                <EditableField
                  value={homeStats.ribbon4Label}
                  onChange={(val) => updateHomeStats('ribbon4Label', val)}
                  as="span"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CIVIL ENGINEERING EXCELLENCE (SERVICES GRID) */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge-amber" style={{ marginBottom: '16px' }}>
              OUR EXPERTISE
            </span>
            <h2 className="section-title" style={{ marginBottom: '16px', color: '#0F172A' }}>
              Civil Engineering Excellence
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Delivering high-performance structural and architectural solutions tailored to residential and heavy industrial sectors.
            </p>
          </div>

          <div className="responsive-grid">
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: 'clamp(22px, 3.5vw, 32px)',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteService(service.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Delete service"
                  >
                    <Trash2 size={15} />
                  </button>
                )}

                <div>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)',
                      color: '#F59E0B',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {getServiceIcon(service.iconName)}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: '#0F172A',
                      marginBottom: '12px',
                    }}
                  >
                    <EditableField
                      value={service.title}
                      onChange={(val) => updateService(service.id, 'title', val)}
                      as="span"
                    />
                  </h3>

                  <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    <EditableField
                      value={service.shortOverview}
                      onChange={(val) => updateService(service.id, 'shortOverview', val)}
                      as="span"
                      multiline={true}
                    />
                  </p>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      Key Highlights:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {service.scopeOfWork.slice(0, 2).map((item, idx) => (
                        <li key={idx} style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CircleCheck size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />{' '}
                          <EditableField
                            value={item}
                            onChange={(val) => {
                              const newScope = [...service.scopeOfWork];
                              newScope[idx] = val;
                              updateService(service.id, 'scopeOfWork', newScope);
                            }}
                            as="span"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F59E0B',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: 0,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D97706')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#F59E0B')}
                >
                  Explore Service Scope <ChevronRight size={16} />
                </button>
              </div>
            ))}

            {/* Admin Add New + Service Card */}
            {isAdmin && (
              <div
                onClick={addService}
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.03)',
                  borderRadius: '14px',
                  padding: '32px',
                  border: '2px dashed rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '360px',
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
                <PlusCircle size={44} style={{ color: '#F59E0B', marginBottom: '14px' }} />
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 700, margin: 0 }}>
                  Add New Service +
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '8px' }}>
                  Click to add a new editable service card directly to the website
                </p>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={() => setActiveTab('services')} className="btn-dark">
              View All Dedicated Service Verticals
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE CLM CONSTRUCTION */}
      <section className="section-padding" style={{ backgroundColor: '#090D14', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="responsive-grid" style={{ alignItems: 'center' }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '16px' }}>
                WHY CHOOSE CLM CONSTRUCTION
              </span>
              <h2
                className="section-title"
                style={{
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                <EditableField
                  value={homeStats.whyChooseHeading}
                  onChange={(val) => updateHomeStats('whyChooseHeading', val)}
                  as="span"
                />
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '30px' }}>
                <EditableField
                  value={homeStats.whyChooseText}
                  onChange={(val) => updateHomeStats('whyChooseText', val)}
                  as="span"
                  multiline={true}
                />
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Point 1 */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 179, 8, 0.12) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      color: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                      Engineering Cell & IS Code Compliance
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      Our in-house engineers design structural analysis per IS code, civil, PHE, and electrical systems, converting blueprints into flawless real-world structures.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 179, 8, 0.12) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      color: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                      38+ Years Industrial Background & Leadership
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      Co-founder Mr. Dinesh Kumar Mishra brings nearly four decades of hands-on industrial execution experience across Food & Beverage, Textile, and Auto sectors.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 179, 8, 0.12) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      color: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                      Subcontractor Partnerships & Cost Control
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      Strong partnerships with reliable subcontractors guarantee access to qualified skilled workers, maintaining smooth workflows without timeline delays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Vrindavan Villa Card */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  position: 'relative',
                }}
              >
                <EditableImage
                  src={homeStats.featuredBannerImage || '/food.jpeg'}
                  alt="CLM Construction Quality"
                  onChange={(val) => updateHomeStats('featuredBannerImage', val)}
                  fallbackSrc="/food.jpeg"
                  style={{ width: '100%', height: '420px' }}
                  buttonLabel="Change Image"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    background: 'linear-gradient(to top, rgba(9, 13, 20, 0.95), transparent)',
                  }}
                >
                  <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Featured Execution
                  </div>
                  <div style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800 }}>
                    <EditableField
                      value={homeStats.featuredBannerTitle}
                      onChange={(val) => updateHomeStats('featuredBannerTitle', val)}
                      as="span"
                    />
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '4px' }}>
                    <EditableField
                      value={homeStats.featuredBannerSubtitle}
                      onChange={(val) => updateHomeStats('featuredBannerSubtitle', val)}
                      as="span"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE PROJECTS GRID */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="badge-amber" style={{ marginBottom: '16px' }}>
                PORTFOLIO
              </span>
              <h2 className="section-title" style={{ color: '#0F172A', margin: 0 }}>Signature Projects</h2>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="btn-outline-gold"
            >
              View All Projects <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="responsive-grid">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onClick={() => onSelectProject(project)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.05)';
                }}
              >
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      zIndex: 20,
                      background: 'rgba(239, 68, 68, 0.9)',
                      border: 'none',
                      color: '#FFFFFF',
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

                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
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
                        backgroundColor: 'rgba(9, 13, 20, 0.9)',
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
                        border: project.status === 'Running (Target 2026)' ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
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
                      fontWeight: 700,
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

                  <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                    <EditableField
                      value={project.description}
                      onChange={(val) => updateProject(project.id, 'description', val)}
                      as="span"
                      multiline={true}
                    />
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid #F1F5F9',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span style={{ color: '#475569', fontWeight: 600 }}>
                      Location:{' '}
                      <EditableField
                        value={project.location}
                        onChange={(val) => updateProject(project.id, 'location', val)}
                        as="span"
                      />
                    </span>
                    <span style={{ color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
                      <EditableField
                        value={project.category}
                        onChange={(val) => updateProject(project.id, 'category', val)}
                        as="span"
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Admin Add New + Project Card */}
            {isAdmin && (
              <div
                onClick={addProject}
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.03)',
                  borderRadius: '14px',
                  padding: '32px',
                  border: '2px dashed rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '340px',
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
                <PlusCircle size={44} style={{ color: '#F59E0B', marginBottom: '14px' }} />
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 700, margin: 0 }}>
                  Add New Project +
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '8px' }}>
                  Click to add a new project card directly to the portfolio grid
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. CONTRACTORS / LEADERSHIP SECTION */}
      <section className="section-padding" style={{ backgroundColor: '#090D14', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>
              LEADERSHIP & EXPERIENCE
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              Guided by Decades of Industrial Civil Expertise
            </h2>
          </div>

          <div className="responsive-grid">
            {leadership.map((person, idx) => (
              <div
                key={person.id || idx}
                style={{
                  backgroundColor: '#0F1724',
                  borderRadius: '16px',
                  padding: 'clamp(22px, 3.5vw, 36px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
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
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Delete member"
                  >
                    <Trash2 size={15} />
                  </button>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 179, 8, 0.12) 100%)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {idx % 2 === 0 ? <Award size={24} style={{ color: '#F59E0B' }} /> : <Briefcase size={24} style={{ color: '#EAB308' }} />}
                    </div>
                    <div>
                      <h3
                        style={{
                          color: '#FFFFFF',
                          fontSize: '1.25rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 800,
                          margin: 0,
                        }}
                      >
                        <EditableField
                          value={person.name}
                          onChange={(val) => updateLeadership(person.id, 'name', val)}
                          as="span"
                        />
                      </h3>
                      <div style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>
                        <EditableField
                          value={person.title}
                          onChange={(val) => updateLeadership(person.id, 'title', val)}
                          as="span"
                        />{' '}
                        •{' '}
                        <EditableField
                          value={person.qualification}
                          onChange={(val) => updateLeadership(person.id, 'qualification', val)}
                          as="span"
                        />
                      </div>
                    </div>
                  </div>

                  <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    <EditableField
                      value={person.bio}
                      onChange={(val) => updateLeadership(person.id, 'bio', val)}
                      as="span"
                      multiline={true}
                    />
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                      Key Credentials:
                    </div>
                    {person.highlights && person.highlights.map((h, hIdx) => (
                      <div key={hIdx} style={{ fontSize: '0.85rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <CircleCheck size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />{' '}
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

                <div
                  style={{
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Experience</span>
                  <span style={{ fontSize: '0.9rem', color: '#F59E0B', fontWeight: 700 }}>
                    <EditableField
                      value={person.experienceYears}
                      onChange={(val) => updateLeadership(person.id, 'experienceYears', val)}
                      as="span"
                    />
                  </span>
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
                  padding: '36px',
                  border: '2px dashed rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '360px',
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
                <PlusCircle size={44} style={{ color: '#F59E0B', marginBottom: '14px' }} />
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 700, margin: 0 }}>
                  Add Contractor / Team +
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '8px' }}>
                  Click to add a new key contractor profile to the team showcase
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. REDESIGNED PROFESSIONAL CTA BANNER (No solid orange) */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#0F1724',
          color: '#FFFFFF',
          padding: '70px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle accent highlight line along top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #F97316 20%, #F59E0B 50%, #EAB308 80%, transparent 100%)',
          }}
        />

        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#F59E0B', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              <HardHat size={14} /> Turnkey Civil Engineering Consultations
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
              <EditableField
                value={homeStats.ctaHeading}
                onChange={(val) => updateHomeStats('ctaHeading', val)}
                as="span"
              />
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1rem', marginTop: '10px', margin: 0, lineHeight: 1.6 }}>
              <EditableField
                value={homeStats.ctaSubtitle}
                onChange={(val) => updateHomeStats('ctaSubtitle', val)}
                as="span"
                multiline={true}
              />
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="btn-primary"
            style={{
              padding: '16px 34px',
              fontSize: '1rem',
            }}
          >
            Contact Engineering Team <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
