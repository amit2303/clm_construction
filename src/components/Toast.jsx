import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast() {
  const { toastMessage, isAdmin } = useCMS();

  if (!toastMessage) return null;

  // Determine toast type
  const isError = toastMessage.toLowerCase().includes('error') || toastMessage.toLowerCase().includes('failed');

  return (
    <div
      style={{
        position: 'fixed',
        // If admin bar is visible, push down; otherwise show from top
        top: isAdmin ? '56px' : '20px',
        right: '20px',
        zIndex: 10000,
        backgroundColor: isError ? '#1A1A2E' : '#0F172A',
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '10px',
        border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.6)' : '#10B981'}`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.4), 0 0 14px ${isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.25)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.88rem',
        fontWeight: 600,
        animation: 'fadeIn 0.25s ease-out',
        maxWidth: 'calc(100vw - 40px)',
        pointerEvents: 'none',
      }}
    >
      {isError
        ? <Info size={18} style={{ color: '#EF4444', flexShrink: 0 }} />
        : <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0 }} />
      }
      <span style={{ lineHeight: 1.4 }}>{toastMessage}</span>
    </div>
  );
}
