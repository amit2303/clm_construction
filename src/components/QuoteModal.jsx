import React from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  X
} from 'lucide-react';

export default function QuoteModal({ isOpen, onClose }) {
  const { companyInfo } = useCMS();

  if (!isOpen) return null;

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
        backdropFilter: 'blur(8px)',
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
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#16263E',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(15, 30, 54, 0.6)',
          color: '#F8FAFC',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 26px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #1C3050 0%, #16263E 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/clm-logo.png"
              alt="CLM Group of Construction"
              className="brand-logo-img"
              style={{ height: '40px' }}
            />
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#FFFFFF',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Contact Engineering Team
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0, marginTop: '2px' }}>
                CLM Group of Construction • Mathura (U.P.)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              color: '#94A3B8',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: 'clamp(16px, 4vw, 26px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.5', margin: 0 }}>
            Connect directly with our senior civil engineering officers for project proposals, structural consultations, or on-site inspections.
          </p>

          {/* Direct Phone Numbers */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F59E0B',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}
            >
              <Phone size={15} /> Direct Phone Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {companyInfo.phones && companyInfo.phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(245, 158, 11, 0.06)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.06)')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Phone size={16} style={{ color: '#F59E0B' }} /> {phone}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Call <ExternalLink size={13} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Email Support */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#EAB308',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '10px',
              }}
            >
              <Mail size={15} /> Official Email Inquiries
            </div>
            <a
              href={`mailto:${companyInfo.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: 'rgba(234, 179, 8, 0.06)',
                border: '1px solid rgba(234, 179, 8, 0.2)',
                borderRadius: '8px',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(234, 179, 8, 0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(234, 179, 8, 0.06)')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: '#EAB308' }} /> {companyInfo.email}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#CA8A04', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Email <ExternalLink size={13} />
              </span>
            </a>
          </div>

          {/* Address & Hours */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '10px',
              fontSize: '0.85rem',
              color: '#94A3B8',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#CBD5E1' }}>
              <MapPin size={15} style={{ color: '#F59E0B', flexShrink: 0 }} /> {companyInfo.address}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#CBD5E1' }}>
              <Clock size={15} style={{ color: '#EAB308', flexShrink: 0 }} /> Business Hours: {companyInfo.businessHours}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.78rem' }}>
            <ShieldCheck size={14} style={{ color: '#D4AF37' }} />
            <span>Licensed civil engineering and structural IS code compliant contractor</span>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
