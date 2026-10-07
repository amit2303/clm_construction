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
    updateStrength,
    updatePillar,
    leadership,
    updateLeadership,
    addContractor,
    deleteContractor,
    isAdmin
  } = useCMS();

  const strengthIcons = [Users, Briefcase, Award, ShieldCheck];
  const strengthsList = companyInfo.aboutStrengths || [];
  const pillarsList = companyInfo.aboutPillars || [];

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
              <EditableField
                value={companyInfo.aboutBannerBadge}
                onChange={(val) => updateCompanyInfo('aboutBannerBadge', val)}
                as="span"
              />
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
              <EditableField
                value={companyInfo.aboutBannerTitle}
                onChange={(val) => updateCompanyInfo('aboutBannerTitle', val)}
                as="span"
              />
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
                <EditableField
                  value={companyInfo.aboutMissionTitle}
                  onChange={(val) => updateCompanyInfo('aboutMissionTitle', val)}
                  as="span"
                />
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
                <EditableField
                  value={companyInfo.aboutMissionBadgePrefix}
                  onChange={(val) => updateCompanyInfo('aboutMissionBadgePrefix', val)}
                  as="span"
                />{' '}
                <EditableField
                  value={companyInfo.targetProjectsUpcoming}
                  onChange={(val) => updateCompanyInfo('targetProjectsUpcoming', val)}
                  as="span"
                />{' '}
                <EditableField
                  value={companyInfo.aboutMissionBadgeSuffix}
                  onChange={(val) => updateCompanyInfo('aboutMissionBadgeSuffix', val)}
                  as="span"
                />
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
                <EditableField
                  value={companyInfo.aboutVisionTitle}
                  onChange={(val) => updateCompanyInfo('aboutVisionTitle', val)}
                  as="span"
                />
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
                <EditableField
                  value={companyInfo.aboutVisionBadge}
                  onChange={(val) => updateCompanyInfo('aboutVisionBadge', val)}
                  as="span"
                />
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
              <EditableField
                value={companyInfo.aboutLeadershipBadge}
                onChange={(val) => updateCompanyInfo('aboutLeadershipBadge', val)}
                as="span"
              />
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              <EditableField
                value={companyInfo.aboutLeadershipTitle}
                onChange={(val) => updateCompanyInfo('aboutLeadershipTitle', val)}
                as="span"
              />
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingRight: isAdmin ? '40px' : 0 }}>
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
                  <EditableField
                    value={companyInfo.aboutCompetenciesTitle}
                    onChange={(val) => updateCompanyInfo('aboutCompetenciesTitle', val)}
                    as="span"
                  />
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
              <EditableField
                value={companyInfo.aboutStrengthsBadge}
                onChange={(val) => updateCompanyInfo('aboutStrengthsBadge', val)}
                as="span"
              />
            </span>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0F172A' }}>
              <EditableField
                value={companyInfo.aboutStrengthsTitle}
                onChange={(val) => updateCompanyInfo('aboutStrengthsTitle', val)}
                as="span"
              />
            </h2>
          </div>

          <div className="responsive-grid">
            {strengthsList.map((item, idx) => {
              const IconComp = strengthIcons[idx % strengthIcons.length] || Award;
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
                    <EditableField
                      value={item.title}
                      onChange={(val) => updateStrength(idx, 'title', val)}
                      as="span"
                    />
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    <EditableField
                      value={item.desc}
                      onChange={(val) => updateStrength(idx, 'desc', val)}
                      as="span"
                      multiline={true}
                    />
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
              <EditableField
                value={companyInfo.aboutWorkforceBadge}
                onChange={(val) => updateCompanyInfo('aboutWorkforceBadge', val)}
                as="span"
              />
            </span>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFFFFF' }}>
              <EditableField
                value={companyInfo.aboutWorkforceTitle}
                onChange={(val) => updateCompanyInfo('aboutWorkforceTitle', val)}
                as="span"
              />
            </h2>
          </div>

          <div className="responsive-grid-small">
            {pillarsList.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#16263E',
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ color: idx === 0 ? '#F59E0B' : idx === 1 ? '#EAB308' : '#D4AF37', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  <EditableField
                    value={pillar.badge}
                    onChange={(val) => updatePillar(idx, 'badge', val)}
                    as="span"
                  />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px' }}>
                  <EditableField
                    value={pillar.title}
                    onChange={(val) => updatePillar(idx, 'title', val)}
                    as="span"
                  />
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <EditableField
                    value={pillar.desc}
                    onChange={(val) => updatePillar(idx, 'desc', val)}
                    as="span"
                    multiline={true}
                  />
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={onOpenQuoteModal} className="btn-primary">
              <EditableField
                value={companyInfo.aboutCtaButton}
                onChange={(val) => updateCompanyInfo('aboutCtaButton', val)}
                as="span"
              /> <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
