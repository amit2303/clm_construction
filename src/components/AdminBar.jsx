import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Edit3, Check, RotateCcw, LogOut, Save, Eye, EyeOff } from 'lucide-react';

export default function AdminBar() {
  const {
    isAdmin,
    hasUnsavedChanges,
    changeCount,
    saveChanges,
    resetToDefaults,
    logout,
    showOutlines,
    setShowOutlines
  } = useCMS();

  if (!isAdmin) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#111D30',
        color: '#FFFFFF',
        borderBottom: '2px solid #F59E0B',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        fontSize: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 179, 8, 0.15) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#F59E0B',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '0.75rem',
          }}
        >
          <Edit3 size={13} />
          Inline CMS Active
        </div>
        <span style={{ color: '#CBD5E1' }} className="hide-mobile">
          Hover and click any text or photo directly to edit in place.
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Toggle Editable Outlines Map */}
        <button
          type="button"
          onClick={() => setShowOutlines(!showOutlines)}
          style={{
            background: showOutlines ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            color: showOutlines ? '#F59E0B' : '#94A3B8',
            border: showOutlines ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.15)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={showOutlines ? 'Hide outline boxes' : 'Highlight all editable fields'}
        >
          {showOutlines ? <Eye size={13} /> : <EyeOff size={13} />}
          <span>{showOutlines ? 'Outlines: ON' : 'Highlight Areas'}</span>
        </button>
        {hasUnsavedChanges ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#F59E0B',
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#F59E0B',
                animation: 'pulse 1.5s infinite',
              }}
            />
            {changeCount} Unsaved Change{changeCount !== 1 ? 's' : ''}
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#10B981',
              fontWeight: 600,
            }}
          >
            <Check size={14} /> All Saved
          </span>
        )}

        {hasUnsavedChanges && (
          <button
            onClick={saveChanges}
            style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
            }}
          >
            <Save size={13} />
            Save Changes
          </button>
        )}

        <button
          onClick={resetToDefaults}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#CBD5E1',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title="Reset all content to original defaults"
        >
          <RotateCcw size={13} />
          Reset Defaults
        </button>

        <button
          onClick={logout}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title="Exit Admin Mode"
        >
          <LogOut size={13} />
          Exit Editor
        </button>
      </div>
    </div>
  );
}
