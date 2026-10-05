import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Camera,
  Maximize2,
  MapPin,
  Phone,
  Download,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export default function GalleryTab({ onOpenQuoteModal }) {
  const { gallery } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const categories = ['All', 'Industrial', 'Structural', 'Site Work', 'Completed'];

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  const selectedItem = selectedImageIndex !== null ? filteredGallery[selectedImageIndex] : null;

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#111D30',
          backgroundImage: 'linear-gradient(to right, rgba(17, 29, 48, 0.94) 30%, rgba(28, 48, 77, 0.8) 100%), url("/project_gallery/gallery-1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '85px 0 65px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <span className="badge-amber" style={{ marginBottom: '16px' }}>
              <Camera size={14} /> ON-SITE PHOTOGRAPHY & ARCHIVE
            </span>
            <h1
              className="page-banner-heading"
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              CLM Project Gallery
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.08rem', lineHeight: 1.65 }}>
              Authentic on-site construction photographs capturing excavation, IS code RCC structural framing, industrial plant builds (Veeba Food ETP & Warehouse), and commercial elevations across North India.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              const count = cat === 'All' ? gallery.length : gallery.filter(i => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)'
                      : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#0F172A',
                    border: isSelected ? 'none' : '1px solid #E2E8F0',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    padding: isSelected ? '11px 23px' : '10px 22px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 14px rgba(245, 158, 11, 0.3)' : '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat} Photos ({count})
                </button>
              );
            })}
          </div>

          {/* Photo Grid */}
          <div className="responsive-grid">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onClick={() => setSelectedImageIndex(idx)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.09)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: '#16263E' }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(17, 29, 48, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: '#F59E0B',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '4px',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    {item.tag}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'linear-gradient(135deg, #F97316 0%, #EAB308 100%)',
                      color: '#FFFFFF',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
                    }}
                  >
                    <Maximize2 size={16} />
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    <MapPin size={14} /> {item.location}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div
            style={{
              position: 'relative',
              marginTop: '70px',
              padding: '45px 36px',
              backgroundColor: '#16263E',
              borderRadius: '16px',
              color: '#FFFFFF',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #F97316 25%, #EAB308 75%, transparent 100%)',
              }}
            />
            <h3 style={{ fontSize: '1.65rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '8px', fontWeight: 800 }}>
              Want to Inspect Technical Blueprints or Visit Active Sites?
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Our engineering team arranges site visits for prospective clients in Mathura, Rajasthan, and regional U.P.
            </p>
            <button onClick={onOpenQuoteModal} className="btn-primary">
              <Phone size={16} /> Contact Team for Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && selectedImageIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(17, 29, 48, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              width: '100%',
              backgroundColor: '#16263E',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.14)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(15,30,54,0.6)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div
              style={{
                padding: '16px 24px',
                backgroundColor: '#111D30',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge-amber" style={{ fontSize: '0.75rem' }}>
                  Image {selectedImageIndex + 1} of {filteredGallery.length}
                </span>
                <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.88rem' }}>
                  {selectedItem.tag}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a
                  href={selectedItem.src}
                  download={`CLM-${selectedItem.id}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#94A3B8',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                  }}
                >
                  <Download size={14} /> Full Image
                </a>
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Image Viewer with Prev/Next Controls */}
            <div
              style={{
                position: 'relative',
                backgroundColor: '#000000',
                minHeight: '450px',
                maxHeight: '65vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain' }}
              />

              <button
                onClick={() => {
                  setSelectedImageIndex((selectedImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
                }}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(17, 29, 48, 0.85)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => {
                  setSelectedImageIndex((selectedImageIndex + 1) % filteredGallery.length);
                }}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(17, 29, 48, 0.85)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div style={{ padding: '20px 24px', backgroundColor: '#16263E', color: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                {selectedItem.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <MapPin size={14} /> {selectedItem.location}
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
