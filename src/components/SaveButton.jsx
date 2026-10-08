import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Save } from 'lucide-react';

export default function SaveButton() {
  const { isAdmin, hasUnsavedChanges, saveChanges, changeCount } = useCMS();

  if (!isAdmin || !hasUnsavedChanges) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(64px + 16px)', // Stay above mobile bottom bar
        right: '20px',
        zIndex: 9998,
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="save-btn-floating"
    >
      <button
        onClick={saveChanges}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#10B981',
          color: '#FFFFFF',
          border: 'none',
          padding: '13px 22px',
          borderRadius: '9999px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.55)',
          transition: 'all 0.25s ease',
          outline: 'none',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.backgroundColor = '#059669';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.backgroundColor = '#10B981';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.55)';
        }}
        title="Save all inline edits to persistent storage"
      >
        <Save size={18} />
        <span>Save Changes</span>
        {changeCount > 0 && (
          <span
            style={{
              backgroundColor: '#047857',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 800,
              minWidth: '22px',
              textAlign: 'center',
            }}
          >
            {changeCount}
          </span>
        )}
      </button>
      <style>{`
        @media (min-width: 769px) {
          .save-btn-floating {
            bottom: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .save-btn-floating {
            right: 12px !important;
            bottom: calc(64px + 12px) !important;
          }
          .save-btn-floating button {
            padding: 10px 18px !important;
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </div>
  );
}
