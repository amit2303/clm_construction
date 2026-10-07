import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCMS } from '../context/CMSContext';
import {
  Camera,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  X,
  Save,
  CheckCircle2,
  FileCheck,
  FolderOpen
} from 'lucide-react';

const PRESET_IMAGES = [
  { url: '/food.jpeg', name: 'Veeba Food Plant & Infrastructure' },
  { url: '/ETP.jpg', name: 'Veeba ETP Structural Facility' },
  { url: '/jainaudi.jpeg', name: 'Jain Auditorium Complex' },
  { url: '/images/hero.jpg', name: 'Commercial High-Rise Site' },
  { url: '/images/vrindavan-villa.jpg', name: 'Vrindavan Luxury Villa' },
  { url: '/images/blueprint-cad-highrise.jpg', name: 'Engineering CAD & Blueprint' },
  { url: '/images/construction-logistics-trucks.jpg', name: 'Heavy Machinery & Fleet' },
  { url: '/images/iso-quality-inspection.jpg', name: 'ISO Quality & Site Inspection' },
  { url: '/project_gallery/gallery-1.jpg', name: 'Excavation & Deep Footing' },
  { url: '/project_gallery/gallery-2.jpg', name: 'Heavy RCC Framework' },
  { url: '/project_gallery/gallery-3.jpg', name: 'Industrial Warehouse Execution' },
  { url: '/project_gallery/gallery-4.jpg', name: 'Commercial Glass Elevation' },
  { url: '/project_gallery/gallery-5.jpg', name: 'Concrete Slab Pouring' },
  { url: '/project_gallery/gallery-6.jpg', name: 'Retaining Wall & Drainage' },
  { url: '/project_gallery/gallery-7.jpg', name: 'Steel Truss Erection' },
  { url: '/project_gallery/gallery-8.jpg', name: 'Turnkey Commercial Site' },
  { url: '/clm-logo.png', name: 'CLM Official Logo' }
];

export default function EditableImage({
  src,
  alt = 'CLM Construction Image',
  onChange,
  className = '',
  style = {},
  imgStyle = {},
  fallbackSrc = '/ETP.jpg',
  aspectRatio,
  buttonLabel = 'Change Image',
  buttonPosition = 'top-right',
  buttonStyle = {},
  compact = false
}) {
  const { isAdmin, showToast, saveChanges } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(src || '');
  const [activeTab, setActiveTab] = useState('preset'); // 'preset' | 'upload' | 'url'
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Sync tempUrl whenever modal opens or src changes
  useEffect(() => {
    if (isModalOpen) {
      setTempUrl(src || '');
      setUploadedFileInfo(null);
      // Lock body scroll when centered modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, src]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  if (!isAdmin || !onChange) {
    return (
      <img
        src={src || fallbackSrc}
        alt={alt}
        className={className}
        style={{ ...style, ...imgStyle }}
        onError={(e) => {
          if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
            e.currentTarget.src = fallbackSrc;
          }
        }}
      />
    );
  }

  const processFile = (file) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB. Please select an image under 8MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target.result;
      setTempUrl(dataUrl);
      setUploadedFileInfo({
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
        type: file.type
      });
      if (showToast) {
        showToast(`✓ Image loaded (${Math.round(file.size / 1024)} KB) - Click 'Save Image' to apply`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (tempUrl && tempUrl.trim()) {
      onChange(tempUrl.trim());
      setIsModalOpen(false);
      if (saveChanges) {
        saveChanges();
      }
      if (showToast) {
        showToast('✓ Photo updated and saved successfully!');
      }
    }
  };

  const renderModal = () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={() => setIsModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 65px rgba(15, 23, 42, 0.35)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#0F172A',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Fixed Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
              }}
            >
              <Camera size={20} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontFamily: 'var(--font-heading)',
                  color: '#0F172A',
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Change & Upload Photo
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748B' }}>
                Select from site repository, upload from computer, or paste image URL
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
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

        {/* 2. Source Tabs Switcher */}
        <div
          style={{
            padding: '14px 24px 0 24px',
            display: 'flex',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            flexShrink: 0,
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('preset')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px 8px 0 0',
              border: '1px solid',
              borderColor: activeTab === 'preset' ? '#F59E0B #F59E0B transparent #F59E0B' : 'transparent',
              background: activeTab === 'preset' ? '#FEF3C7' : 'transparent',
              color: activeTab === 'preset' ? '#B45309' : '#64748B',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <ImageIcon size={16} />
            <span>Site Library</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px 8px 0 0',
              border: '1px solid',
              borderColor: activeTab === 'upload' ? '#F59E0B #F59E0B transparent #F59E0B' : 'transparent',
              background: activeTab === 'upload' ? '#FEF3C7' : 'transparent',
              color: activeTab === 'upload' ? '#B45309' : '#64748B',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <Upload size={16} />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px 8px 0 0',
              border: '1px solid',
              borderColor: activeTab === 'url' ? '#F59E0B #F59E0B transparent #F59E0B' : 'transparent',
              background: activeTab === 'url' ? '#FEF3C7' : 'transparent',
              color: activeTab === 'url' ? '#B45309' : '#64748B',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <LinkIcon size={16} />
            <span>Enter URL</span>
          </button>
        </div>

        {/* 3. Live Preview & Quick Action Strip */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '64px',
                height: '46px',
                borderRadius: '6px',
                backgroundColor: '#E2E8F0',
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {tempUrl ? (
                <img
                  src={tempUrl}
                  alt="Preview Thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = fallbackSrc; }}
                />
              ) : (
                <ImageIcon size={20} style={{ color: '#94A3B8' }} />
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                  Selected Photo Preview
                </span>
                {tempUrl ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: '#DCFCE7',
                      color: '#15803D',
                      padding: '2px 7px',
                      borderRadius: '12px',
                    }}
                  >
                    <CheckCircle2 size={11} /> Ready to Save
                  </span>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>None chosen yet</span>
                )}
              </div>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#64748B',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginTop: '1px',
                }}
              >
                {uploadedFileInfo ? (
                  <span>Uploaded: {uploadedFileInfo.name} ({uploadedFileInfo.sizeKb} KB)</span>
                ) : (
                  <span>{tempUrl || 'Select or upload an image below'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Direct Save Button */}
          {tempUrl && (
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary"
              style={{
                padding: '7px 16px',
                fontSize: '0.82rem',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Save this selected image right now"
            >
              <Save size={14} /> Quick Save
            </button>
          )}
        </div>

        {/* 4. Scrollable Tab Body */}
        <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto' }}>
          {/* TAB 1: PRESET SITE LIBRARY */}
          {activeTab === 'preset' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>
                  Click an authentic construction photo from the company library (double-click to apply instantly):
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  {PRESET_IMAGES.length} photographs
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '12px',
                  padding: '4px',
                }}
              >
                {PRESET_IMAGES.map((img) => {
                  const isSelected = tempUrl === img.url;
                  return (
                    <div
                      key={img.url}
                      onClick={() => setTempUrl(img.url)}
                      onDoubleClick={() => {
                        setTempUrl(img.url);
                        onChange(img.url);
                        setIsModalOpen(false);
                        if (saveChanges) saveChanges();
                        if (showToast) showToast(`✓ Saved: ${img.name}`);
                      }}
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected ? '2.5px solid #F59E0B' : '1px solid #E2E8F0',
                        position: 'relative',
                        height: '92px',
                        backgroundColor: '#F8FAFC',
                        boxShadow: isSelected ? '0 0 0 3px rgba(245, 158, 11, 0.25), 0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.06)',
                        transition: 'all 0.18s ease',
                      }}
                      title={`${img.name} (Double-click to save immediately)`}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.25s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />

                      {/* Photo Title Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.5) 70%, transparent 100%)',
                          padding: '4px 6px',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          lineHeight: 1.15,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {img.name}
                      </div>

                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: '#F59E0B',
                            color: '#111D30',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                          }}
                        >
                          <Check size={13} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FILE */}
          {activeTab === 'upload' && (
            <div style={{ padding: '8px 0' }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />

              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  border: isDragging ? '2.5px dashed #2563EB' : '2px dashed #F59E0B',
                  borderRadius: '14px',
                  padding: '36px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragging ? '#EFF6FF' : '#FFFBEB',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px auto',
                    color: '#D97706',
                  }}
                >
                  <Upload size={28} />
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.02rem', color: '#0F172A', marginBottom: '6px' }}>
                  Click to choose a photo or drag & drop here
                </div>
                <div style={{ color: '#64748B', fontSize: '0.82rem', marginBottom: '14px' }}>
                  Supports JPG, PNG, WEBP, GIF, SVG (Up to 8MB)
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ padding: '9px 20px', fontSize: '0.86rem', pointerEvents: 'none' }}
                >
                  <FolderOpen size={15} /> Browse from Device
                </button>
              </div>

              {/* Uploaded File Confirmation Box & Direct Save Option */}
              {uploadedFileInfo && (
                <div
                  style={{
                    marginTop: '18px',
                    padding: '16px 18px',
                    borderRadius: '12px',
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#DCFCE7',
                        color: '#16A34A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#166534' }}>
                        {uploadedFileInfo.name} ({uploadedFileInfo.sizeKb} KB)
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#15803D' }}>
                        ✓ Upload complete! Click "Save Image" to apply to website.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    style={{
                      backgroundColor: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '9px 18px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                    }}
                  >
                    <Save size={15} /> Save Uploaded Image
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ENTER URL */}
          {activeTab === 'url' && (
            <div style={{ padding: '8px 0' }}>
              <label style={{ display: 'block', fontSize: '0.86rem', color: '#1E293B', marginBottom: '8px', fontWeight: 700 }}>
                Direct Web Image Link (URL):
              </label>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => {
                    setTempUrl(e.target.value);
                    setUploadedFileInfo(null);
                  }}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  style={{
                    flex: 1,
                    padding: '11px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />

                {tempUrl && (
                  <button
                    type="button"
                    onClick={() => setTempUrl('')}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '0 12px',
                      color: '#64748B',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.78rem',
                  color: '#475569',
                  lineHeight: 1.5,
                }}
              >
                <strong>Quick Tip:</strong> You can paste any direct web image URL (from Unsplash, company cloud, or CDN) or local assets like <code>/images/hero.jpg</code> or <code>/food.jpeg</code>.
              </div>
            </div>
          )}
        </div>

        {/* 5. Fixed Sticky Modal Footer with PROMINENT Save Image Button */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            background: '#F8FAFC',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {tempUrl ? (
              <span style={{ fontSize: '0.82rem', color: '#16A34A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle2 size={14} /> Ready to apply
              </span>
            ) : (
              <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Please select or upload a photo
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#475569',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!tempUrl}
              className="btn-primary"
              style={{
                padding: '10px 26px',
                fontSize: '0.88rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                opacity: tempUrl ? 1 : 0.5,
                cursor: tempUrl ? 'pointer' : 'not-allowed',
                boxShadow: tempUrl ? '0 4px 14px rgba(245, 158, 11, 0.4)' : 'none',
              }}
            >
              <Save size={16} /> Save Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const isLogo = className.includes('brand-logo') || buttonLabel === 'Logo';

  if (isLogo) {
    return (
      <div
        className="admin-editable-logo-wrapper"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'middle',
          flexShrink: 0,
          ...style
        }}
      >
        <img
          src={src || fallbackSrc}
          alt={alt}
          className={className}
          style={{ ...imgStyle }}
          onError={(e) => {
            if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
              e.currentTarget.src = fallbackSrc;
            }
          }}
        />

        {/* Compact Admin Badge for Logo */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTempUrl(src || '');
            setIsModalOpen(true);
          }}
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            zIndex: 35,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
            color: '#111D30',
            border: '2px solid #FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.backgroundColor = '#FBBF24';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#F59E0B';
          }}
          title="Admin: Click to replace logo"
        >
          <Camera size={12} />
        </button>

        {isModalOpen && createPortal(renderModal(), document.body)}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        display: style.display || 'block',
        width: style.width || '100%',
        height: style.height || '100%',
        ...style
      }}
      className={`admin-editable-image-wrapper ${className}`}
    >
      <img
        src={src || fallbackSrc}
        alt={alt}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: imgStyle.objectFit || 'cover',
          display: 'block',
          ...imgStyle
        }}
        onError={(e) => {
          if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
            e.currentTarget.src = fallbackSrc;
          }
        }}
      />

      {/* Admin Floating Change Button */}
      {(() => {
        const positionStyles = {
          'top-right': { top: '10px', right: '10px' },
          'bottom-right': { bottom: '10px', right: '10px' },
          'top-left': { top: '10px', left: '10px' },
          'bottom-left': { bottom: '10px', left: '10px' },
        }[buttonPosition] || { top: '10px', right: '10px' };

        return (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTempUrl(src || '');
              setIsModalOpen(true);
            }}
            style={{
              position: 'absolute',
              ...positionStyles,
              zIndex: 25,
              background: 'rgba(17, 29, 48, 0.92)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(245, 158, 11, 0.6)',
              color: '#F59E0B',
              padding: compact ? '4px 8px' : '6px 12px',
              borderRadius: compact ? '12px' : '20px',
              fontSize: compact ? '0.7rem' : '0.78rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: compact ? '4px' : '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15,30,54,0.4)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              ...buttonStyle,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F59E0B';
              e.currentTarget.style.color = '#111D30';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(17, 29, 48, 0.92)';
              e.currentTarget.style.color = '#F59E0B';
            }}
            title="Admin: Click to replace this image"
          >
            <Camera size={compact ? 11 : 13} />
            <span>{buttonLabel}</span>
          </button>
        );
      })()}

      {/* Center of Screen Portal Modal */}
      {isModalOpen && createPortal(renderModal(), document.body)}
    </div>
  );
}
