import React, { useState, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import { Camera, Upload, Link as LinkIcon, Image as ImageIcon, Check, X, Eye } from 'lucide-react';

const PRESET_IMAGES = [
  { url: '/images/hero.jpg', name: 'Hero Construction Site' },
  { url: '/food.jpeg', name: 'Veeba Plant / Factory' },
  { url: '/ETP.jpg', name: 'ETP Structural Facility' },
  { url: '/jainaudi.jpeg', name: 'Jain Auditorium Complex' },
  { url: '/project_gallery/gallery-1.jpg', name: 'Excavation & Footing' },
  { url: '/project_gallery/gallery-2.jpg', name: 'RCC Framing' },
  { url: '/project_gallery/gallery-3.jpg', name: 'Industrial Warehouse' },
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
  buttonLabel = 'Change Image'
}) {
  const { isAdmin } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(src || '');
  const [activeTab, setActiveTab] = useState('preset'); // 'upload' | 'url' | 'preset'
  const fileInputRef = useRef(null);

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

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target.result;
        setTempUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempUrl && tempUrl.trim()) {
      onChange(tempUrl);
      setIsModalOpen(false);
    }
  };

  const renderModal = () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(17, 29, 48, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={() => setIsModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#16263E',
          borderRadius: '16px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 25px 60px rgba(15, 30, 54, 0.6)',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
          overflowY: 'auto',
          color: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#111D30',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Camera size={18} style={{ color: '#F59E0B' }} />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', margin: 0 }}>
              Customize Image
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Image Preview Box */}
          <div
            style={{
              height: '180px',
              backgroundColor: '#111D30',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tempUrl ? (
              <img
                src={tempUrl}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.src = fallbackSrc; }}
              />
            ) : (
              <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={24} /> No image specified
              </div>
            )}
            <span
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                fontSize: '0.72rem',
                background: 'rgba(0,0,0,0.6)',
                color: '#F59E0B',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Live Preview
            </span>
          </div>

          {/* Source Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('preset')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: activeTab === 'preset' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                background: activeTab === 'preset' ? 'rgba(245, 158, 11, 0.12)' : '#111D30',
                color: activeTab === 'preset' ? '#F59E0B' : '#94A3B8',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <ImageIcon size={15} /> Site Library
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: activeTab === 'upload' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                background: activeTab === 'upload' ? 'rgba(245, 158, 11, 0.12)' : '#111D30',
                color: activeTab === 'upload' ? '#F59E0B' : '#94A3B8',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Upload size={15} /> Upload File
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: activeTab === 'url' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                background: activeTab === 'url' ? 'rgba(245, 158, 11, 0.12)' : '#111D30',
                color: activeTab === 'url' ? '#F59E0B' : '#94A3B8',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <LinkIcon size={15} /> Enter URL
            </button>
          </div>

          {/* Tab 1: Presets */}
          {activeTab === 'preset' && (
            <div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '12px' }}>
                Select an authentic project or site photograph from the repository:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: '10px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  padding: '4px',
                }}
              >
                {PRESET_IMAGES.map((img) => {
                  const isSelected = tempUrl === img.url;
                  return (
                    <div
                      key={img.url}
                      onClick={() => setTempUrl(img.url)}
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        height: '75px',
                        boxShadow: isSelected ? '0 0 10px rgba(245, 158, 11, 0.4)' : 'none',
                      }}
                      title={img.name}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(245, 158, 11, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Check size={20} style={{ color: '#FFFFFF' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Upload */}
          {activeTab === 'upload' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  border: '2px dashed rgba(245, 158, 11, 0.5)',
                  borderRadius: '12px',
                  padding: '30px 20px',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(245, 158, 11, 0.04)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.04)'; }}
              >
                <Upload size={36} style={{ color: '#F59E0B', margin: '0 auto 12px auto' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '6px' }}>
                  Click to choose an image from your computer
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                  Supports JPG, PNG, WEBP (Max 5MB)
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: URL */}
          {activeTab === 'url' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '8px', fontWeight: 600 }}>
                Image Web Address (URL):
              </label>
              <input
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or /images/..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#111D30',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <p style={{ color: '#94A3B8', fontSize: '0.78rem', marginTop: '8px' }}>
                Tip: You can paste any direct web image link or local path.
              </p>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            background: '#111D30',
          }}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#CBD5E1',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary"
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            <Check size={15} /> Apply Image
          </button>
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
          style={{
            ...imgStyle
          }}
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
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
            color: '#111D30',
            border: '1.5px solid #111D30',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
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
          <Camera size={11} />
        </button>

        {isModalOpen && renderModal()}
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
          top: '10px',
          right: '10px',
          zIndex: 25,
          background: 'rgba(17, 29, 48, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(245, 158, 11, 0.6)',
          color: '#F59E0B',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(15,30,54,0.4)',
          transition: 'all 0.2s ease',
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
        <Camera size={13} />
        <span>{buttonLabel}</span>
      </button>

      {isModalOpen && renderModal()}
    </div>
  );
}
