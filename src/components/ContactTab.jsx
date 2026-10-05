import React from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import {
  Phone,
  Mail,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function ContactTab() {
  const { companyInfo, updateCompanyInfo, isAdmin } = useCMS();

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#090D14',
          backgroundImage: 'linear-gradient(to right, rgba(9, 13, 20, 0.95) 30%, rgba(15, 23, 42, 0.75) 100%), url("/project_gallery/gallery-6.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '85px 0 65px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '750px' }}>
            <span className="badge-amber" style={{ marginBottom: '16px' }}>
              DIRECT CONTACT & INQUIRIES
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
              Contact CLM Construction Company
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.08rem', lineHeight: 1.65 }}>
              Reach out directly to our civil engineering leadership team for project discussions, site visits, structural analysis, or tender proposals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="responsive-grid">
            {/* Left Card: Direct Phone & Email */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: 'clamp(22px, 3.5vw, 36px)',
                border: '1px solid #E2E8F0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              }}
            >
              <span className="badge-amber" style={{ marginBottom: '12px' }}>
                DIRECT PHONE & EMAIL
              </span>
              <h3
                style={{
                  fontSize: '1.55rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '10px',
                }}
              >
                Call or Email Our Team
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Connect directly with our engineering officers and project managers. No forms or waiting — instant phone call and email support.
              </p>

              {/* Direct Phone Numbers */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Phone size={15} style={{ color: '#F59E0B' }} /> Direct Phone Numbers
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {companyInfo.phones && companyInfo.phones.map((phone, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                        padding: '14px 18px',
                        backgroundColor: 'rgba(245, 158, 11, 0.05)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        borderRadius: '10px',
                        color: '#0F172A',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <Phone size={18} style={{ color: '#F59E0B' }} />
                        {isAdmin ? (
                          <EditableField
                            value={phone}
                            onChange={(val) => {
                              const newPhones = [...companyInfo.phones];
                              newPhones[idx] = val;
                              updateCompanyInfo('phones', newPhones);
                            }}
                            as="span"
                            style={{ color: '#0F172A', fontWeight: 700 }}
                          />
                        ) : (
                          <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ color: '#0F172A', textDecoration: 'none' }}>
                            {phone}
                          </a>
                        )}
                      </div>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        style={{
                          fontSize: '0.82rem',
                          color: '#D97706',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none',
                        }}
                      >
                        Call Now <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Desk */}
              <div>
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Mail size={15} style={{ color: '#EAB308' }} /> Email Inquiry Desk
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    padding: '14px 18px',
                    backgroundColor: 'rgba(234, 179, 8, 0.05)',
                    border: '1px solid rgba(234, 179, 8, 0.2)',
                    borderRadius: '10px',
                    color: '#0F172A',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={18} style={{ color: '#EAB308' }} />
                    {isAdmin ? (
                      <EditableField
                        value={companyInfo.email}
                        onChange={(val) => updateCompanyInfo('email', val)}
                        as="span"
                        style={{ color: '#0F172A', fontWeight: 700 }}
                      />
                    ) : (
                      <a href={`mailto:${companyInfo.email}`} style={{ color: '#0F172A', textDecoration: 'none' }}>
                        {companyInfo.email}
                      </a>
                    )}
                  </div>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    style={{
                      fontSize: '0.82rem',
                      color: '#B45309',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                    }}
                  >
                    Send Email <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card: Mathura Headquarters Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 179, 8, 0.12) 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F59E0B',
                    flexShrink: 0,
                  }}
                >
                  <Building2 size={24} />
                </div>
                <div>
                  <span className="badge-gold" style={{ marginBottom: '4px' }}>
                    REGISTERED OFFICE
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Mathura Headquarters
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      color: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Office Location
                    </div>
                    <div style={{ fontSize: '0.98rem', color: '#0F172A', fontWeight: 600, marginTop: '2px', lineHeight: 1.5 }}>
                      <EditableField
                        value={companyInfo.address}
                        onChange={(val) => updateCompanyInfo('address', val)}
                        as="span"
                        multiline={true}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      color: '#EAB308',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Working Hours
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#0F172A', fontWeight: 600, marginTop: '2px' }}>
                      <EditableField
                        value={companyInfo.businessHours}
                        onChange={(val) => updateCompanyInfo('businessHours', val)}
                        as="span"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      color: '#D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Operating Region
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#0F172A', fontWeight: 600, marginTop: '2px' }}>
                      Mathura, Vrindavan, Agra, Sonipat, Rajasthan & North India
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#0F1724',
                  borderRadius: '14px',
                  padding: '28px',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.08)',
                  marginTop: '30px',
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
                    background: 'linear-gradient(90deg, #F97316 0%, #EAB308 100%)',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F59E0B', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
                  <ShieldCheck size={20} /> IS Code Compliant Engineering
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  For technical structural analysis, site blueprints, or tender documents, please call our engineering team directly at{' '}
                  <strong style={{ color: '#FFFFFF' }}>+91 99971 73237</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span className="badge-gold" style={{ marginBottom: '8px' }}>
              OFFICE LOCATION MAP
            </span>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: '#0F172A', fontWeight: 800 }}>
              Mathura (281004) Uttar Pradesh
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
              Shri Ji Garden Heights, 2nd floor-205, Mathura (U.P.)
            </p>
          </div>
          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
              height: '400px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
            }}
          >
            <iframe
              title="CLM Construction Mathura Map"
              src="https://maps.google.com/maps?q=Mathura%20281004%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
