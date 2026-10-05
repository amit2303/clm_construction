import React from 'react';
import { Phone, MessageSquare, Calculator } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function MobileBottomBar({ onOpenQuoteModal }) {
  const { companyInfo } = useCMS();
  const primaryPhone = companyInfo?.phones?.[0] || '+91 99971 73237';
  const cleanPhone = primaryPhone.replace(/\D/g, '');

  return (
    <aside className="mobile-bottom-bar" aria-label="Quick contact actions">
      {/* 1. Direct Call */}
      <a
        href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
        className="mobile-bottom-bar-btn"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
        aria-label="Direct Phone Call"
      >
        <Phone size={17} style={{ color: '#F59E0B' }} />
        <span>Call</span>
      </a>

      {/* 2. Direct WhatsApp */}
      <a
        href={`https://wa.me/${cleanPhone}?text=Hello%20CLM%20Group%20of%20Construction%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-bar-btn"
        style={{
          background: 'rgba(34, 197, 94, 0.15)',
          color: '#4ADE80',
          border: '1px solid rgba(34, 197, 94, 0.35)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={17} style={{ color: '#22C55E' }} />
        <span>WhatsApp</span>
      </a>

      {/* 3. Request Quote / Estimate */}
      <button
        type="button"
        onClick={onOpenQuoteModal}
        className="mobile-bottom-bar-btn mobile-bottom-bar-btn-primary"
        style={{
          background: 'linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #EAB308 100%)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
        }}
        aria-label="Request Free Estimate"
      >
        <Calculator size={17} />
        <span>Free Estimate</span>
      </button>
    </aside>
  );
}
