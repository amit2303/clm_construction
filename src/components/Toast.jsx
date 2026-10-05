import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCMS();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 10000,
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        padding: '14px 22px',
        borderRadius: '12px',
        border: '1px solid #10B981',
        boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 15px rgba(16, 185, 129, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.92rem',
        fontWeight: 600,
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
      <span>{toastMessage}</span>
    </div>
  );
}
