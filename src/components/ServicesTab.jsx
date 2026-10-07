import React from 'react';
import { useCMS } from '../context/CMSContext';
import EditableField from './EditableField';
import {
  ClipboardCheck,
  Building2,
  Cpu,
  Factory,
  Home,
  Briefcase,
  HardHat,
  Truck,
  Boxes,
  Compass,
  Wrench,
  CircleCheck,
  ChevronRight,
  PlusCircle,
  Trash2
} from 'lucide-react';

export default function ServicesTab({ onOpenQuoteModal }) {
  const {
    companyInfo,
    updateCompanyInfo,
    services,
    updateService,
    addService,
    deleteService,
    equipment,
    updateEquipment,
    updateEquipmentItem,
    isAdmin
  } = useCMS();

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'ClipboardCheck': return <ClipboardCheck size={32} />;
      case 'Building2': return <Building2 size={32} />;
      case 'Cpu': return <Cpu size={32} />;
      case 'Factory': return <Factory size={32} />;
      case 'Home': return <Home size={32} />;
      case 'Briefcase': return <Briefcase size={32} />;
      default: return <HardHat size={32} />;
    }
  };

  const getEquipmentIcon = (iconName) => {
    switch (iconName) {
      case 'Truck': return <Truck size={24} />;
      case 'Boxes': return <Boxes size={24} />;
      case 'Compass': return <Compass size={24} />;
      case 'Wrench': return <Wrench size={24} />;
      default: return <HardHat size={24} />;
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#111D30',
          backgroundImage: 'linear-gradient(to right, rgba(17, 29, 48, 0.94) 30%, rgba(28, 48, 77, 0.8) 100%), url("/project_gallery/gallery-4.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '85px 0 65px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '750px' }}>
            <span className="badge-amber" style={{ marginBottom: '16px' }}>
              <EditableField
                value={companyInfo.servicesBannerBadge}
                onChange={(val) => updateCompanyInfo('servicesBannerBadge', val)}
                as="span"
              />
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
              <EditableField
                value={companyInfo.servicesBannerTitle}
                onChange={(val) => updateCompanyInfo('servicesBannerTitle', val)}
                as="span"
              />
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.08rem', lineHeight: 1.65 }}>
              <EditableField
                value={companyInfo.servicesBannerDesc}
                onChange={(val) => updateCompanyInfo('servicesBannerDesc', val)}
                as="span"
                multiline={true}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="responsive-grid"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: 'clamp(22px, 3.8vw, 40px)',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {isAdmin && (
                  <button
                    onClick={() => deleteService(service.id)}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Delete service"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', paddingRight: isAdmin ? '44px' : 0 }}>
                    <div
                      style={{
                        width: '58px',
                        height: '58px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        color: '#F59E0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          color: '#D4AF37',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        Service Vertical 0{idx + 1}
                      </span>
                      <h2
                        style={{
                          fontSize: '1.55rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 800,
                          color: '#0F172A',
                          margin: 0,
                        }}
                      >
                        <EditableField
                          value={service.title}
                          onChange={(val) => updateService(service.id, 'title', val)}
                          as="span"
                        />
                      </h2>
                    </div>
                  </div>

                  <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <EditableField
                      value={service.details}
                      onChange={(val) => updateService(service.id, 'details', val)}
                      as="span"
                      multiline={true}
                    />
                  </p>

                  <div
                    style={{
                      backgroundColor: '#F1F5F9',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      marginBottom: '24px',
                      borderLeft: '4px solid #F59E0B',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                      <EditableField
                        value={companyInfo.servicesIdealSectorLabel}
                        onChange={(val) => updateCompanyInfo('servicesIdealSectorLabel', val)}
                        as="span"
                      />
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#334155', fontWeight: 600 }}>
                      <EditableField
                        value={service.idealProjectType}
                        onChange={(val) => updateService(service.id, 'idealProjectType', val)}
                        as="span"
                      />
                    </div>
                  </div>

                  <button
                    onClick={onOpenQuoteModal}
                    className="btn-primary"
                    style={{ padding: '12px 24px', fontSize: '0.9rem' }}
                  >
                    Inquire About {service.title} <ChevronRight size={16} />
                  </button>
                </div>

                <div>
                  <div
                    style={{
                      backgroundColor: '#16263E',
                      color: '#FFFFFF',
                      padding: '28px',
                      borderRadius: '14px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '20px',
                    }}
                  >
                    <h4
                      style={{
                        color: '#F59E0B',
                        fontSize: '0.92rem',
                        fontFamily: 'var(--font-heading)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '14px',
                      }}
                    >
                      <EditableField
                        value={companyInfo.servicesScopeHeading}
                        onChange={(val) => updateCompanyInfo('servicesScopeHeading', val)}
                        as="span"
                      />
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {service.scopeOfWork.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          style={{
                            fontSize: '0.88rem',
                            color: '#E2E8F0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                          }}
                        >
                          <CircleCheck size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ flex: 1 }}>
                            <EditableField
                              value={item}
                              onChange={(val) => {
                                const newScope = [...service.scopeOfWork];
                                newScope[itemIdx] = val;
                                updateService(service.id, 'scopeOfWork', newScope);
                              }}
                              as="span"
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      border: '1px solid #E2E8F0',
                      padding: '20px',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <h4
                      style={{
                        color: '#0F172A',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-heading)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '10px',
                      }}
                    >
                      <EditableField
                        value={companyInfo.servicesBenefitsHeading}
                        onChange={(val) => updateCompanyInfo('servicesBenefitsHeading', val)}
                        as="span"
                      />
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.keyBenefits.map((b, bIdx) => (
                        <div
                          key={bIdx}
                          style={{
                            fontSize: '0.85rem',
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'linear-gradient(135deg, #F97316 0%, #EAB308 100%)' }} />
                          <span style={{ flex: 1 }}>
                            <EditableField
                              value={b}
                              onChange={(val) => {
                                const newBenefits = [...service.keyBenefits];
                                newBenefits[bIdx] = val;
                                updateService(service.id, 'keyBenefits', newBenefits);
                              }}
                              as="span"
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Admin Add New Service Vertical Button Card */}
            {isAdmin && (
              <div
                onClick={addService}
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.03)',
                  borderRadius: '16px',
                  padding: '50px',
                  border: '2px dashed rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <PlusCircle size={50} style={{ color: '#F59E0B', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 800, margin: 0 }}>
                  Add New Service Vertical +
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.92rem', marginTop: '10px' }}>
                  Click to add a full new engineering & construction vertical with scope of work and benefits
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Machinery & Equipment Fleet */}
      <section className="section-padding" style={{ backgroundColor: '#111D30', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>
              <EditableField
                value={companyInfo.servicesEquipmentBadge}
                onChange={(val) => updateCompanyInfo('servicesEquipmentBadge', val)}
                as="span"
              />
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF', marginBottom: '12px' }}>
              <EditableField
                value={companyInfo.servicesEquipmentTitle}
                onChange={(val) => updateCompanyInfo('servicesEquipmentTitle', val)}
                as="span"
              />
            </h2>
            <p className="section-subtitle-dark" style={{ margin: '0 auto' }}>
              <EditableField
                value={companyInfo.servicesEquipmentSubtitle}
                onChange={(val) => updateCompanyInfo('servicesEquipmentSubtitle', val)}
                as="span"
                multiline={true}
              />
            </p>
          </div>

          <div className="responsive-grid-small">
            {equipment.map((eq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#16263E',
                  padding: '28px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    color: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {getEquipmentIcon(eq.icon)}
                </div>
                <h3 style={{ fontSize: '1.18rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '8px' }}>
                  <EditableField
                    value={eq.category}
                    onChange={(val) => updateEquipment(idx, 'category', val)}
                    as="span"
                  />
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px' }}>
                  <EditableField
                    value={eq.description}
                    onChange={(val) => updateEquipment(idx, 'description', val)}
                    as="span"
                    multiline={true}
                  />
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                    <EditableField
                      value={companyInfo.servicesDeployedLabel}
                      onChange={(val) => updateCompanyInfo('servicesDeployedLabel', val)}
                      as="span"
                    />
                  </div>
                  {eq.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ fontSize: '0.85rem', color: '#CBD5E1', padding: '3px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#F59E0B' }}>•</span>{' '}
                      <EditableField
                        value={item}
                        onChange={(val) => updateEquipmentItem(idx, itemIdx, val)}
                        as="span"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#16263E',
          padding: '65px 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #F97316 20%, #F59E0B 50%, #EAB308 80%, transparent 100%)',
          }}
        />
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px' }}>
            <EditableField
              value={companyInfo.servicesCtaHeading}
              onChange={(val) => updateCompanyInfo('servicesCtaHeading', val)}
              as="span"
            />
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            <EditableField
              value={companyInfo.servicesCtaSubtitle}
              onChange={(val) => updateCompanyInfo('servicesCtaSubtitle', val)}
              as="span"
              multiline={true}
            />
          </p>
          <button onClick={onOpenQuoteModal} className="btn-primary">
            <EditableField
              value={companyInfo.servicesCtaButton}
              onChange={(val) => updateCompanyInfo('servicesCtaButton', val)}
              as="span"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
