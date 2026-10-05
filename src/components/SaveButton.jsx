import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Save, CheckCircle2 } from 'lucide-react';

export default function SaveButton() {
  const { isAdmin, hasUnsavedChanges, saveChanges, changeCount } = useCMS();

  if (!isAdmin || !hasUnsavedChanges) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9998,
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <button
        onClick={saveChanges}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#10B981',
          color: '#FFFFFF',
          border: 'none',
          padding: '16px 26px',
          borderRadius: '9999px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.6), 0 8px 10px -6px rgba(16, 185, 129, 0.6)',
          transition: 'all 0.25s ease',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
          e.currentTarget.style.backgroundColor = '#059669';
          e.currentTarget.style.boxShadow = '0 16px 32px -5px rgba(16, 185, 129, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.backgroundColor = '#10B981';
          e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.6), 0 8px 10px -6px rgba(16, 185, 129, 0.6)';
        }}
        title="Click to commit and save all inline edits to persistent storage"
      >
        <Save size={20} />
        <span>Save Changes</span>
        {changeCount > 0 && (
          <span
            style={{
              backgroundColor: '#047857',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.8rem',
              fontWeight: 800,
            }}
          >
            {changeCount}
          </span>
        )}
      </button>
    </div>
  );
}
