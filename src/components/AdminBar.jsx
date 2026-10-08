import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Check, RotateCcw, LogOut, Save, Eye, EyeOff, Pencil, KeyRound } from 'lucide-react';

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
    <>
      <div className="admin-bar-root" role="toolbar" aria-label="CMS Administration Toolbar">
        {/* Left: Status Badge & Auto-Save Indicator */}
        <div className="admin-bar-left">
          <div className="admin-cms-badge" title="Inline Content Management Active">
            <Pencil size={11} className="admin-badge-icon" />
            <span className="admin-badge-text-full">CMS Active</span>
            <span className="admin-badge-text-short">CMS</span>
          </div>

          {/* Auto-Save Status Indicator */}
          {saveStatus === 'saving' ? (
            <span className="admin-status-text saving" title="Syncing changes...">
              <span className="admin-pulse-dot" />
              <span className="admin-status-label-full">Saving...</span>
              <span className="admin-status-label-short">Saving</span>
            </span>
          ) : (
            <span className="admin-status-text saved" title="All edits are auto-saved in real-time">
              <Check size={13} strokeWidth={2.6} className="admin-check-icon" />
              <span className="admin-status-label-full">Auto-Saved (Safe on Refresh)</span>
              <span className="admin-status-label-mid">Saved</span>
            </span>
          )}
        </div>

        {/* Right: Operational Controls */}
        <div className="admin-bar-right">
          {/* 1. Highlight Editable Areas Toggle */}
          <button
            type="button"
            onClick={() => setShowOutlines(!showOutlines)}
            className={`admin-btn admin-btn-tool ${showOutlines ? 'active' : ''}`}
            title={showOutlines ? 'Hide editable area highlights' : 'Highlight all editable fields'}
            aria-label={showOutlines ? 'Hide editable areas' : 'Highlight editable areas'}
          >
            {showOutlines ? <Eye size={13} /> : <EyeOff size={13} />}
            <span className="admin-btn-label hide-mobile">
              {showOutlines ? 'Hide Areas' : 'Show Areas'}
            </span>
          </button>

          {/* 2. Change Password */}
          <button
            type="button"
            onClick={() => setIsChangePasswordOpen(true)}
            className="admin-btn admin-btn-tool admin-btn-password"
            title="Change Admin Password"
            aria-label="Change Admin Password"
          >
            <KeyRound size={13} />
            <span className="admin-btn-label hide-mobile">Password</span>
          </button>

          {/* 3. Reset Defaults */}
          <button
            type="button"
            onClick={resetToDefaults}
            className="admin-btn admin-btn-tool"
            title="Reset all content to original defaults"
            aria-label="Reset content to defaults"
          >
            <RotateCcw size={13} />
            <span className="admin-btn-label hide-mobile">Reset</span>
          </button>

          {/* 4. Save Changes Button — Highly prominent when edits exist */}
          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={saveChanges}
              className="admin-btn admin-btn-save"
              title="Save all changes permanently to disk"
              aria-label="Save changes to disk"
            >
              <Save size={13} />
              <span>Save{changeCount > 0 ? ` (${changeCount})` : ''}</span>
            </button>
          )}

          {/* 5. Exit Admin View — Always visible and prominent in red */}
          <button
            type="button"
            onClick={logout}
            className="admin-btn admin-btn-exit"
            title="Exit Admin Mode"
            aria-label="Exit Admin Mode"
          >
            <LogOut size={13} />
            <span>Exit</span>
          </button>
        </div>
      </div>

      <style>{`
        /* ===================================================
           ADMIN BAR ROOT & RESPONSIVE LAYOUT
           =================================================== */
        .admin-bar-root {
          position: sticky;
          top: 0;
          z-index: 9999;
          background-color: #0C1624;
          color: #FFFFFF;
          border-bottom: 2px solid #F59E0B;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          height: 44px;
          font-size: 0.82rem;
          box-sizing: border-box;
          width: 100%;
          /* Smooth touch scrolling if ultra-narrow, NEVER clip items with hidden */
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .admin-bar-root::-webkit-scrollbar {
          display: none;
        }

        /* Left side: Status badge & auto-save text */
        .admin-bar-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          min-width: 0;
        }

        .admin-cms-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #F59E0B;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.7rem;
          white-space: nowrap;
          user-select: none;
          flex-shrink: 0;
        }

        .admin-badge-text-short {
          display: none;
        }

        .admin-status-text {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
          font-size: 0.76rem;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .admin-status-text.saving {
          color: #FBBF24;
        }
        .admin-status-text.saved {
          color: #34D399;
        }

        .admin-status-label-mid,
        .admin-status-label-short {
          display: none;
        }

        .admin-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #FBBF24;
          display: inline-block;
          animation: pulse 1s infinite;
          flex-shrink: 0;
        }

        /* Right side: Action buttons */
        .admin-bar-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          margin-left: auto;
        }

        .admin-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 5px;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s ease;
          padding: 4px 9px;
          min-height: 28px;
          box-sizing: border-box;
          border: 1px solid transparent;
          user-select: none;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        /* Secondary tool buttons */
        .admin-btn-tool {
          background-color: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          color: #94A3B8;
        }
        .admin-btn-tool:hover {
          background-color: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }
        .admin-btn-tool.active {
          background-color: rgba(245, 158, 11, 0.2);
          color: #F59E0B;
          border-color: #F59E0B;
        }

        .admin-btn-password {
          background-color: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.3);
          color: #F59E0B;
        }
        .admin-btn-password:hover {
          background-color: rgba(245, 158, 11, 0.22);
          border-color: #F59E0B;
        }

        /* Primary action: Save Changes */
        .admin-btn-save {
          background-color: #10B981;
          border-color: #059669;
          color: #FFFFFF;
          font-weight: 700;
          padding: 4px 11px;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.45);
          animation: adminSavePulse 2s infinite ease-in-out;
        }
        .admin-btn-save:hover,
        .admin-btn-save:active {
          background-color: #059669;
        }

        @keyframes adminSavePulse {
          0%, 100% { box-shadow: 0 2px 8px rgba(16, 185, 129, 0.45); }
          50% { box-shadow: 0 2px 14px rgba(16, 185, 129, 0.75); }
        }

        /* Primary action: Exit Admin Mode */
        .admin-btn-exit {
          background-color: rgba(239, 68, 68, 0.18);
          border-color: rgba(239, 68, 68, 0.45);
          color: #EF4444;
          font-weight: 700;
          padding: 4px 11px;
        }
        .admin-btn-exit:hover,
        .admin-btn-exit:active {
          background-color: #EF4444;
          border-color: #EF4444;
          color: #FFFFFF;
        }

        /* ===================================================
           RESPONSIVE BREAKPOINTS (TABLET & MOBILE)
           =================================================== */
        @media (max-width: 900px) {
          .admin-status-label-full {
            display: none !important;
          }
          .admin-status-label-mid {
            display: inline !important;
          }
          .admin-status-label-short {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .admin-bar-root {
            padding: 0 8px;
            gap: 5px;
          }
          .admin-bar-left {
            gap: 6px;
          }
          .admin-bar-right {
            gap: 4px;
          }
          .admin-btn {
            padding: 5px 8px;
            min-height: 32px;
            font-size: 0.73rem;
          }
          .admin-btn-tool {
            padding: 5px 7px;
          }
          .admin-btn-save {
            padding: 5px 9px;
            font-size: 0.74rem;
          }
          .admin-btn-exit {
            padding: 5px 9px;
            font-size: 0.74rem;
          }
        }

        @media (max-width: 480px) {
          .admin-bar-root {
            padding: 0 6px;
            gap: 4px;
          }
          .admin-cms-badge {
            padding: 2px 5px;
            font-size: 0.67rem;
          }
          .admin-badge-text-full {
            display: none !important;
          }
          .admin-badge-text-short {
            display: inline !important;
          }
          /* On narrow mobile phones, show only check icon or short text */
          .admin-status-label-mid {
            display: none !important;
          }
          .admin-status-label-short {
            display: inline !important;
          }
          .admin-btn {
            padding: 5px 6px;
            gap: 3px;
          }
          .admin-btn-tool {
            padding: 5px 6px;
          }
          .admin-btn-save {
            padding: 5px 8px;
          }
          .admin-btn-exit {
            padding: 5px 8px;
          }
        }

        @media (max-width: 360px) {
          /* Ultra-compact screens like iPhone SE 1st gen */
          .admin-status-text.saved span {
            display: none !important;
          }
          .admin-cms-badge {
            padding: 2px 4px;
          }
        }
      `}</style>
    </>
  );
}
