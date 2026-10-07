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
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
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
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.22)',
          color: '#0F172A',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 26px)',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%)',
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
                  color: '#0F172A',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Contact Engineering Team
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0, marginTop: '2px' }}>
                CLM Group of Construction • Mathura (U.P.)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              color: '#64748B',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E2E8F0';
              e.currentTarget.style.color = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: 'clamp(16px, 4vw, 26px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: 0 }}>
            Connect directly with our senior civil engineering officers for project proposals, structural consultations, or on-site inspections.
          </p>

          {/* Direct Phone Numbers */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#D97706',
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
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #FDE68A',
                    borderRadius: '8px',
                    color: '#0F172A',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEF3C7';
                    e.currentTarget.style.borderColor = '#F59E0B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#FDE68A';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Phone size={16} style={{ color: '#D97706' }} /> {phone}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Call <ExternalLink size={13} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Email Support */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#D97706',
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
                backgroundColor: '#FFFFFF',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                color: '#0F172A',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF3C7';
                e.currentTarget.style.borderColor = '#F59E0B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#FDE68A';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: '#D97706' }} /> {companyInfo.email}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Email <ExternalLink size={13} />
              </span>
            </a>
          </div>

          {/* Address & Hours */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              fontSize: '0.85rem',
              color: '#475569',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
              <MapPin size={15} style={{ color: '#D97706', flexShrink: 0 }} /> {companyInfo.address}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
              <Clock size={15} style={{ color: '#D97706', flexShrink: 0 }} /> Business Hours: {companyInfo.businessHours}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.78rem' }}>
            <ShieldCheck size={14} style={{ color: '#D97706' }} />
            <span>Licensed civil engineering and structural IS code compliant contractor</span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '0.9rem',
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              fontWeight: 700,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E2E8F0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
