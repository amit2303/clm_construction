import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import { HardHat, Phone, ChevronRight, Menu, X, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenQuoteModal }) {
  const { companyInfo, updateCompanyInfo, isAdmin } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryPhone = companyInfo.phones && companyInfo.phones[0] ? companyInfo.phones[0] : '+91 99971 73237';

  return (
    <header
      style={{
        position: 'sticky',
        top: isAdmin ? '44px' : 0,
        zIndex: 1000,
        transition: 'background-color 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease',
        backgroundColor: isScrolled ? 'rgba(17, 29, 48, 0.97)' : '#16263E',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isScrolled ? '0 10px 30px rgba(15, 30, 54, 0.35)' : 'none',
      }}
    >
      {/* 1. TOP ANNOUNCEMENT / INFO BAR (Responsive & Clean) */}
      <div
        style={{
          backgroundColor: '#111D30',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '4px 0',
          fontSize: '0.78rem',
          color: '#94A3B8',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Left: Certifications & Operating Region */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#F59E0B',
                fontWeight: 700,
                fontSize: '0.78rem',
              }}
            >
              <HardHat size={14} style={{ flexShrink: 0 }} />
              <span className="desktop-cert-text">IS Code Structural Engineering & Quality Management</span>
              <span className="mobile-cert-text">IS Code Certified</span>
            </span>
            <span className="hide-mobile" style={{ opacity: 0.3 }}>|</span>
            <span className="hide-mobile" style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Operating: Mathura & Regional U.P.</span>
          </div>

          {/* Right: Direct Phone & Hours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={12} style={{ color: '#F59E0B' }} />
              {isAdmin ? (
                <EditableField
                  value={primaryPhone}
                  onChange={(val) => {
                    const newPhones = [...companyInfo.phones];
                    newPhones[0] = val;
                    updateCompanyInfo('phones', newPhones);
                  }}
                  as="span"
                  style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.8rem' }}
                />
              ) : (
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                  style={{
                    color: '#F8FAFC',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#F8FAFC')}
                >
                  {primaryPhone}
                </a>
              )}
            </div>

            <span className="hide-mobile" style={{ opacity: 0.3 }}>•</span>
            <span className="hide-mobile" style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
              {isAdmin ? (
                <EditableField
                  value={companyInfo.businessHours}
                  onChange={(val) => updateCompanyInfo('businessHours', val)}
                  as="span"
                />
              ) : (
                companyInfo.businessHours
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '62px',
        }}
      >
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            userSelect: 'none',
          }}
        >
          <EditableImage
            src={companyInfo.logoUrl || '/clm-logo.png'}
            alt="CLM Construction Official Logo"
            className="brand-logo-img"
            onChange={(val) => updateCompanyInfo('logoUrl', val)}
            buttonLabel="Logo"
          />
          <div>
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(1.05rem, 2.8vw, 1.25rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              <EditableField
                value={companyInfo.name}
                onChange={(val) => updateCompanyInfo('name', val)}
                as="span"
              />
            </div>
            <div
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(0.62rem, 1.5vw, 0.68rem)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '2px',
                display: 'block',
              }}
            >
              <EditableField
                value={companyInfo.tagline}
                onChange={(val) => updateCompanyInfo('tagline', val)}
                as="span"
              />
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '30px' }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#F59E0B' : '#E2E8F0',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.94rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#F59E0B';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#E2E8F0';
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      background: 'linear-gradient(90deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px rgba(245, 158, 11, 0.7)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={onOpenQuoteModal}
            className="btn-primary hide-mobile"
            style={{ padding: '10px 22px', fontSize: '0.9rem', minHeight: '44px' }}
          >
            Get a Quote <ChevronRight size={16} />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '9px',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} style={{ color: '#F59E0B' }} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 3. PROFESSIONAL MOBILE SLIDE-OVER DRAWER */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: isAdmin ? '118px' : '74px',
            zIndex: 999,
            backgroundColor: 'rgba(17, 29, 48, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#16263E',
              borderBottom: '2px solid #F59E0B',
              boxShadow: '0 20px 40px rgba(15,30,54,0.6)',
              padding: '24px 20px 30px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.16) 0%, rgba(234, 179, 8, 0.12) 100%)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                      color: isActive ? '#F59E0B' : '#F8FAFC',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '1.05rem',
                      fontFamily: 'var(--font-heading)',
                      textAlign: 'left',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={18} style={{ color: isActive ? '#F59E0B' : '#64748B' }} />
                  </button>
                );
              })}
            </div>

            {/* Mobile CTA: Get a Quote */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1rem',
                marginTop: '6px',
                borderRadius: '10px',
              }}
            >
              <span>Request Free Estimation</span>
              <ArrowRight size={18} />
            </button>

            {/* Quick Contact Desk on Phone */}
            <div
              style={{
                marginTop: '10px',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ color: '#94A3B8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Direct Engineering Support
              </div>
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                style={{
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.96rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={16} style={{ color: '#F59E0B' }} />
                </div>
                <span>{primaryPhone}</span>
              </a>

              <a
                href={`mailto:${companyInfo.email}`}
                style={{
                  color: '#94A3B8',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(234, 179, 8, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={15} style={{ color: '#EAB308' }} />
                </div>
                <span>{companyInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mobile-cert-text { display: none; }
        .desktop-cert-text { display: inline; }
        
        @media (max-width: 600px) {
          .mobile-cert-text { display: inline; }
          .desktop-cert-text { display: none; }
        }
      `}</style>
    </header>
  );
}
