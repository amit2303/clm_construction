import React, { useRef, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowUp,
  Lock
} from 'lucide-react';

export default function Footer({ setActiveTab, onOpenQuoteModal }) {
  const { companyInfo, updateCompanyInfo, isAdmin, setIsLoginModalOpen } = useCMS();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    scrollToTop();
  };

  // Secret Triple-Click on copyright to authenticate as Admin
  const handleCopyrightClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current === 1) {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 700);
    } else if (clickCountRef.current === 3) {
      clearTimeout(clickTimerRef.current);
      clickCountRef.current = 0;
      setIsLoginModalOpen(true);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects & Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#090D14',
        color: '#CBD5E1',
        paddingTop: '65px',
        paddingBottom: '30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main Footer Grid with Proper Column Alignment */}
        <div className="footer-grid">
          {/* Column 1: Brand & Overview */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <EditableImage
                src={companyInfo.logoUrl || '/clm-logo.png'}
                alt="CLM Construction Company Logo"
                className="brand-logo-img"
                onChange={(val) => updateCompanyInfo('logoUrl', val)}
                buttonLabel="Logo"
              />
              <div>
                <h3
                  style={{
                    color: '#FFFFFF',
                    fontSize: '1.15rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  <EditableField
                    value={companyInfo.name}
                    onChange={(val) => updateCompanyInfo('name', val)}
                    as="span"
                  />
                </h3>
                <span
                  style={{
                    background: 'linear-gradient(90deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginTop: '3px',
                  }}
                >
                  <EditableField
                    value={companyInfo.tagline}
                    onChange={(val) => updateCompanyInfo('tagline', val)}
                    as="span"
                  />
                </span>
              </div>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '22px' }}>
              A respected regional contractor in Uttar Pradesh, specializing in full-cycle project planning, civil framing, IS Code structural design, residential villas, and commercial/industrial infrastructure.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 14px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '6px',
                color: '#F59E0B',
                fontSize: '0.82rem',
                fontWeight: 600,
                alignSelf: 'flex-start',
              }}
            >
              <ShieldCheck size={16} style={{ flexShrink: 0 }} />
              <span>IS Code Structural Standard Compliant</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Quick Navigation
              </h4>
              <div
                style={{
                  width: '36px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #F97316 0%, #EAB308 100%)',
                  marginTop: '8px',
                  borderRadius: '2px',
                }}
              />
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#CBD5E1',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F59E0B';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#CBD5E1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <ChevronRight size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Office Contact Info */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Verified Office Contact
              </h4>
              <div
                style={{
                  width: '36px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #F97316 0%, #EAB308 100%)',
                  marginTop: '8px',
                  borderRadius: '2px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', flexShrink: 0, display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                  <MapPin size={17} style={{ color: '#F59E0B' }} />
                </div>
                <div style={{ color: '#CBD5E1', lineHeight: '1.5' }}>
                  <EditableField
                    value={companyInfo.address}
                    onChange={(val) => updateCompanyInfo('address', val)}
                    as="span"
                    multiline={true}
                  />
                </div>
              </div>

              {/* Phone Numbers */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', flexShrink: 0, display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                  <Phone size={17} style={{ color: '#F59E0B' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {companyInfo.phones && companyInfo.phones.map((phone, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                      {isAdmin ? (
                        <EditableField
                          value={phone}
                          onChange={(val) => {
                            const newPhones = [...companyInfo.phones];
                            newPhones[idx] = val;
                            updateCompanyInfo('phones', newPhones);
                          }}
                          as="span"
                          style={{ color: '#F8FAFC', fontWeight: 600 }}
                        />
                      ) : (
                        <a
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          style={{ color: '#F8FAFC', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#F8FAFC')}
                        >
                          {phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '20px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <Mail size={17} style={{ color: '#F59E0B' }} />
                </div>
                <div>
                  {isAdmin ? (
                    <EditableField
                      value={companyInfo.email}
                      onChange={(val) => updateCompanyInfo('email', val)}
                      as="span"
                      style={{ color: '#F8FAFC', fontWeight: 600 }}
                    />
                  ) : (
                    <a
                      href={`mailto:${companyInfo.email}`}
                      style={{ color: '#F8FAFC', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#F8FAFC')}
                    >
                      {companyInfo.email}
                    </a>
                  )}
                </div>
              </div>

              {/* Business Hours */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '20px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <Clock size={17} style={{ color: '#F59E0B' }} />
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                  <EditableField
                    value={companyInfo.businessHours}
                    onChange={(val) => updateCompanyInfo('businessHours', val)}
                    as="span"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Have a Project in Mind? */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h4
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Have a Project in Mind?
              </h4>
              <div
                style={{
                  width: '36px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #F97316 0%, #EAB308 100%)',
                  marginTop: '8px',
                  borderRadius: '2px',
                }}
              />
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.6', marginBottom: '20px' }}>
              Get in touch with our engineering team for preliminary budget estimations, site inspections, or structural planning.
            </p>

            <button
              onClick={onOpenQuoteModal}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px 20px',
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Phone size={16} />
              <span>Contact Engineering Team</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar with Hidden Triple-Click Login Trigger */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: '#64748B',
          }}
        >
          {/* Triple-click trigger on copyright text */}
          <div
            onClick={handleCopyrightClick}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'color 0.2s ease',
            }}
            title="Tip: Triple-click here to authenticate as Admin"
          >
            © {new Date().getFullYear()} <strong style={{ color: '#CBD5E1' }}>{companyInfo.name}</strong>. All rights reserved. Quality is Our Blueprint.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span>Mathura (281004) U.P.</span>
            <span style={{ opacity: 0.3 }}>•</span>
            
            {/* Quick Admin Auth Button trigger */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: isAdmin ? '#10B981' : '#64748B',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.8rem',
                transition: 'color 0.2s ease',
                padding: 0,
              }}
              title="Admin CMS Access"
            >
              <Lock size={12} />
              <span>{isAdmin ? 'Admin Active' : 'Admin'}</span>
            </button>

            <span style={{ opacity: 0.3 }}>•</span>

            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#CBD5E1',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                e.currentTarget.style.color = '#F59E0B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.95fr 1.35fr 1.15fr;
          gap: 40px;
          margin-bottom: 50px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}
