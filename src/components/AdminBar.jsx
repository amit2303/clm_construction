import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Edit3, Check, RotateCcw, LogOut, Save, Eye, EyeOff, Pencil, KeyRound } from 'lucide-react';

export default function AdminBar() {
  const {
    isAdmin,
    hasUnsavedChanges,
    saveStatus,
    changeCount,
    saveChanges,
    resetToDefaults,
    logout,
    showOutlines,
    setShowOutlines,
    setIsChangePasswordOpen,
  } = useCMS();

  if (!isAdmin) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#0C1624',
        color: '#FFFFFF',
        borderBottom: '2px solid #F59E0B',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        height: '44px',
        fontSize: '0.82rem',
        overflow: 'hidden',
      }}
    >
      {/* Left: Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#F59E0B',
            padding: '3px 9px',
            borderRadius: '4px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontSize: '0.7rem',
            whiteSpace: 'nowrap',
          }}
        >
          <Pencil size={11} />
          <span>CMS Active</span>
        </div>

        {/* Change indicator — desktop only */}
        {saveStatus === 'saving' ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#FBBF24',
              fontWeight: 600,
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#FBBF24',
                display: 'inline-block',
                animation: 'pulse 1s infinite',
                flexShrink: 0,
              }}
            />
            Saving...
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#34D399',
              fontWeight: 600,
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
            }}
          >
            <Check size={13} strokeWidth={2.5} /> Auto-Saved (Safe on Refresh)
          </span>
        )}
      </div>

      {/* Right: Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Highlight Editable Areas Toggle */}
        <button
          type="button"
          onClick={() => setShowOutlines(!showOutlines)}
          style={{
            background: showOutlines ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            color: showOutlines ? '#F59E0B' : '#94A3B8',
            border: showOutlines ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.15)',
            padding: '4px 8px',
            borderRadius: '5px',
            fontSize: '0.73rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          title={showOutlines ? 'Hide editable outlines' : 'Highlight all editable fields'}
        >
          {showOutlines ? <Eye size={12} /> : <EyeOff size={12} />}
          <span className="hide-mobile">{showOutlines ? 'Hide Areas' : 'Show Areas'}</span>
        </button>

        {/* Save Button — shown when there are changes */}
        {hasUnsavedChanges && (
          <button
            onClick={saveChanges}
            style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              padding: '5px 12px',
              borderRadius: '5px',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#059669'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10B981'; }}
          >
            <Save size={12} />
            <span>Save{changeCount > 0 ? ` (${changeCount})` : ''}</span>
          </button>
        )}

        {/* Reset */}
        <button
          onClick={resetToDefaults}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94A3B8',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 600,
            fontSize: '0.73rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
          title="Reset all content to original defaults"
        >
          <RotateCcw size={12} />
          <span className="hide-mobile">Reset</span>
        </button>

        {/* Change Password */}
        <button
          onClick={() => setIsChangePasswordOpen(true)}
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#F59E0B',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 600,
            fontSize: '0.73rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
          title="Change Admin Password"
        >
          <KeyRound size={12} />
          <span className="hide-mobile">Password</span>
        </button>

        {/* Exit */}
        <button
          onClick={logout}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 700,
            fontSize: '0.73rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
          title="Exit Admin Mode"
        >
          <LogOut size={12} />
          <span>Exit</span>
        </button>
      </div>
    </div>
  );
}
