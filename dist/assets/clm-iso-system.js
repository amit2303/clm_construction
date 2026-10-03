/**
 * CLM Construction - ISO 9001:2015 Quality Management System & Civil Engineering Animations
 * Enterprise Architectural Engineering Simulation
 */

(function () {
  'use strict';

  // State
  let isModalOpen = false;
  let activeSimTab = 'highrise';

  // Constants
  const CERT_IMAGE_URL = '/images/iso-9001-certificate.png';
  const CERT_PDF_URL = '/images/CLM GROUP OF CONSTRUCTION 9001.pdf';
  const CERT_NUM = 'QM-20631';
  const REGISTRAR = 'US Certification & Inspection Limited (London, UK)';
  const VERIFY_URL = 'https://www.uscertifications.co.uk';

  // 1. Create Modal Lightbox in DOM
  function createCertificateModal() {
    if (document.getElementById('clm-cert-modal')) return;

    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'clm-cert-modal';
    modalBackdrop.className = 'clm-modal-backdrop';

    modalBackdrop.innerHTML = `
      <div class="clm-modal-container" role="dialog" aria-modal="true">
        <button class="clm-modal-close-btn" id="clm-modal-close" aria-label="Close Certificate View">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="clm-modal-content-grid">
          <!-- Certificate Visual Preview -->
          <div class="clm-modal-cert-preview">
            <img src="${CERT_IMAGE_URL}" alt="CLM Group of Construction ISO 9001:2015 Certificate QM-20631" class="clm-modal-cert-img" loading="eager" />
          </div>

          <!-- Audit & Validation Credentials -->
          <div class="clm-modal-details">
            <div>
              <div class="clm-modal-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                OFFICIALLY ACCREDITED AUDIT
              </div>

              <h2 class="clm-modal-title">ISO 9001:2015 Certified</h2>
              <p class="clm-modal-sub">
                CLM Group of Construction operates a fully compliant, internationally audited 
                <strong>Quality Management System (QMS)</strong>. Our certified protocols assure unyielding 
                engineering precision, structural safety, and verified compliance across every civil development.
              </p>

              <div class="clm-meta-table">
                <div class="clm-meta-row">
                  <span class="clm-meta-label">Standard</span>
                  <span class="clm-meta-val highlight">ISO 9001:2015 (Quality Management System)</span>
                </div>
                <div class="clm-meta-row">
                  <span class="clm-meta-label">Certificate No.</span>
                  <span class="clm-meta-val" style="font-family: monospace; letter-spacing: 0.05em; color: #ff6b00; font-size: 1rem;">${CERT_NUM}</span>
                </div>
                <div class="clm-meta-row">
                  <span class="clm-meta-label">Accreditation Body</span>
                  <span class="clm-meta-val">${REGISTRAR}</span>
                </div>
                <div class="clm-meta-row">
                  <span class="clm-meta-label">Scope of Activities</span>
                  <span class="clm-meta-val" style="font-size: 0.85rem; line-height: 1.5;">
                    Construction, Execution and Project Management of Civil, Residential, Commercial, Industrial and Infrastructure Projects.
                  </span>
                </div>
                <div class="clm-meta-row">
                  <span class="clm-meta-label">Certification Status</span>
                  <span class="clm-meta-val" style="color: #22c55e; display: flex; align-items: center; gap: 6px;">
                    <span class="clm-live-dot"></span> Validated & Active (Cycle: 2026 – 2029)
                  </span>
                </div>
                <div class="clm-meta-row">
                  <span class="clm-meta-label">Registered Office</span>
                  <span class="clm-meta-val" style="font-size: 0.85rem;">
                    Shri Ji Garden Heights, 2nd Floor-205, Mathura - 281004 (U.P.), India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    // Event handlers for modal
    const closeBtn = document.getElementById('clm-modal-close');
    closeBtn.addEventListener('click', closeCertificateModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeCertificateModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isModalOpen) closeCertificateModal();
    });
  }

  function openCertificateModal() {
    createCertificateModal();
    const modal = document.getElementById('clm-cert-modal');
    if (modal) {
      modal.classList.add('open');
      isModalOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCertificateModal() {
    const modal = document.getElementById('clm-cert-modal');
    if (modal) {
      modal.classList.remove('open');
      isModalOpen = false;
      document.body.style.overflow = '';
    }
  }

  // 2. Create Floating Sticky Badge
  function createFloatingBadge() {
    if (document.getElementById('clm-floating-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'clm-floating-badge';
    badge.className = 'clm-floating-iso-badge';
    badge.setAttribute('title', 'Click to view ISO 9001:2015 Official Certificate & Audit Credentials');
    badge.innerHTML = `
      <div class="clm-floating-iso-seal">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B0E14" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>
      <div class="clm-floating-iso-text">
        <span class="clm-floating-iso-title">
          <span class="clm-live-dot"></span> ISO 9001:2015 CERTIFIED
        </span>
        <span class="clm-floating-iso-sub">Quality Management System • QM-20631</span>
      </div>
    `;

    badge.addEventListener('click', openCertificateModal);
    document.body.appendChild(badge);
  }

  // 3. Enhance Navbar with ISO Badge and Navigation link
  function enhanceNavbar() {
    // Remove "ISO 9001 Quality" from main nav links
    const existingIsoLinks = document.querySelectorAll('.clm-iso-nav-link');
    existingIsoLinks.forEach(link => link.remove());
    
    // Force single line text on all nav items so "About Us" and "Project Gallery" don't wrap
    if (!document.getElementById('clm-nav-nowrap')) {
      const style = document.createElement('style');
      style.id = 'clm-nav-nowrap';
      style.innerHTML = `
        nav a, nav li, nav button, .nav-link, .menu-item {
          white-space: nowrap !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // 4. Ambient Construction Background Animations
  function renderAmbientAnimations() {
    if (document.getElementById('clm-ambient-bg')) return;
    const bgContainer = document.createElement('div');
    bgContainer.id = 'clm-ambient-bg';
    bgContainer.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:0; overflow:hidden; opacity:0.1;';

    // SVG Definitions
    const defs = `
      <defs>
        <linearGradient id="craneSteel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#997B1A" />
        </linearGradient>
        <linearGradient id="girderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF6B00" />
          <stop offset="50%" stop-color="#FFA040" />
          <stop offset="100%" stop-color="#FF6B00" />
        </linearGradient>
      </defs>
    `;

    // Crane (Top Right)
    const craneSvg = `
      <svg viewBox="100 0 300 250" style="position:absolute; top:5%; right:5%; width:300px; height:250px;">
        ${defs}
        <g id="tower-crane" transform="scale(0.8)">
          <!-- Crane Concrete Counterweight Foundation Base -->
          <rect x="105" y="248" width="30" height="12" fill="#475569" stroke="#94A3B8" stroke-width="1" />
          <!-- Crane Vertical Lattice Mast -->
          <g stroke="url(#craneSteel)" stroke-width="1.5">
            <line x1="112" y1="248" x2="112" y2="45" />
            <line x1="128" y1="248" x2="128" y2="45" />
            <path d="M 112 248 L 128 230 L 112 212 L 128 194 L 112 176 L 128 158 L 112 140 L 128 122 L 112 104 L 128 86 L 112 68 L 128 50 L 112 45" fill="none" stroke-width="1" />
          </g>
          <!-- Operator Cab & Turntable Slewing Unit -->
          <rect x="110" y="38" width="22" height="14" rx="2" fill="#1E293B" stroke="#D4AF37" stroke-width="1.2" />
          <rect x="122" y="40" width="8" height="8" rx="1" fill="#38BDF8" opacity="0.8" />
          <!-- Crane Apex Peak & Aviation Warning Beacon -->
          <polygon points="120,40 120,12 126,40" fill="#997B1A" stroke="#D4AF37" stroke-width="1" />
          <circle cx="120" cy="10" r="3" fill="#FF3333" class="clm-beacon-light" />
          <!-- Rotating Jib Assembly (Slewing Animation) -->
          <g class="clm-crane-jib">
            <line x1="120" y1="12" x2="260" y2="42" stroke="#94A3B8" stroke-width="1" />
            <line x1="120" y1="12" x2="20" y2="42" stroke="#94A3B8" stroke-width="1" />
            <rect x="15" y="42" width="95" height="6" fill="#1E293B" stroke="#D4AF37" stroke-width="1" />
            <g stroke="#D4AF37" stroke-width="1.2">
              <line x1="120" y1="42" x2="310" y2="42" stroke-width="2"/>
              <line x1="120" y1="36" x2="310" y2="42" />
              <path d="M 120 42 L 140 38 L 160 42 L 180 38 L 200 42 L 220 39 L 240 42 L 260 40 L 280 42 L 300 41" fill="none" stroke-width="0.8" />
            </g>
            <!-- Hoist Trolley Unit -->
            <g class="clm-crane-trolley-group" transform="translate(190, 42)">
              <rect x="-8" y="0" width="16" height="7" rx="1" fill="#FF6B00" stroke="#FFFFFF" stroke-width="0.8" />
              <g class="clm-crane-cable">
                <line x1="-3" y1="7" x2="-3" y2="70" stroke="#CBD5E1" stroke-width="1" />
                <line x1="3" y1="7" x2="3" y2="70" stroke="#CBD5E1" stroke-width="1" />
                <polygon points="-5,70 5,70 0,76" fill="#D4AF37" />
              </g>
              <g class="clm-girder-cargo" transform="translate(0, 88)">
                <line x1="0" y1="-2" x2="-30" y2="10" stroke="#94A3B8" stroke-width="0.8" />
                <line x1="0" y1="-2" x2="30" y2="10" stroke="#94A3B8" stroke-width="0.8" />
                <rect x="-45" y="10" width="90" height="10" rx="1" fill="url(#girderGrad)" stroke="#FFFFFF" stroke-width="0.8" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    `;

    // Truck (Bottom Left)
    const truckSvg = `
      <svg viewBox="0 0 100 50" style="position:absolute; bottom:10%; left:5%; width:150px; height:75px;">
        <g id="fleet-stage">
          <rect x="0" y="22" width="85" height="12" fill="#1E293B" rx="2"/>
          <circle cx="15" cy="34" r="5" fill="#0B0E14" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="28" cy="34" r="5" fill="#0B0E14" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="68" cy="34" r="5" fill="#0B0E14" stroke="#94A3B8" stroke-width="1"/>
          <path d="M 58 22 L 85 22 L 85 8 L 72 8 L 62 16 Z" fill="#0284C7" stroke="#38BDF8" stroke-width="0.8"/>
          <rect x="66" y="10" width="10" height="7" fill="#E0F2FE" opacity="0.8"/>
          <ellipse cx="36" cy="14" rx="22" ry="12" fill="#475569" stroke="#94A3B8" stroke-width="1" transform="rotate(-12 36 14)"/>
          <line x1="20" y1="14" x2="52" y2="14" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,2"/>
        </g>
      </svg>
    `;

    // Building (Middle Right)
    const buildingSvg = `
      <svg viewBox="0 0 250 250" style="position:absolute; top:40%; left:10%; width:200px; height:200px;">
        <g id="rising-tower" transform="scale(0.8)">
          <g stroke="#38BDF8" stroke-width="1.8" class="clm-building-col">
            <line x1="20" y1="260" x2="20" y2="40" />
            <line x1="60" y1="260" x2="60" y2="40" />
            <line x1="100" y1="260" x2="100" y2="40" />
            <line x1="140" y1="260" x2="140" y2="40" />
            <line x1="180" y1="260" x2="180" y2="40" />
            <line x1="220" y1="260" x2="220" y2="40" />
          </g>
          <g stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8">
            <line x1="20" y1="260" x2="60" y2="220" />
            <line x1="60" y1="260" x2="20" y2="220" />
            <line x1="60" y1="220" x2="100" y2="180" />
            <line x1="100" y1="220" x2="60" y2="180" />
            <line x1="100" y1="180" x2="140" y2="140" />
            <line x1="140" y1="180" x2="100" y2="140" />
            <line x1="140" y1="140" x2="180" y2="100" />
            <line x1="180" y1="140" x2="140" y2="100" />
            <line x1="180" y1="100" x2="220" y2="60" />
            <line x1="220" y1="100" x2="180" y2="60" />
          </g>
          <g class="clm-floor-slab">
            <rect x="15" y="220" width="210" height="5" fill="#334155" stroke="#38BDF8" stroke-width="1"/>
            <rect x="15" y="180" width="210" height="5" fill="#334155" stroke="#38BDF8" stroke-width="1"/>
            <rect x="15" y="140" width="210" height="5" fill="#334155" stroke="#38BDF8" stroke-width="1"/>
            <rect x="15" y="100" width="210" height="5" fill="#334155" stroke="#38BDF8" stroke-width="1"/>
            <rect x="15" y="60" width="165" height="5" fill="rgba(255, 107, 0, 0.4)" stroke="#FF6B00" stroke-width="1.5" stroke-dasharray="4,2"/>
          </g>
        </g>
      </svg>
    `;

    bgContainer.innerHTML = craneSvg + truckSvg + buildingSvg;
    document.body.appendChild(bgContainer);
  }

  // 5. Dedicated ISO 9001:2015 Quality Management System Section
  function renderIsoSection() {
    if (document.getElementById('clm-iso-section')) return;

    // Find mount location: right after hero stats section or above services
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const sections = mainElement.querySelectorAll('section');
    let targetSection = null;
    if (sections.length >= 2) {
      targetSection = sections[1]; // After hero & metric stats banner
    }

    const isoSection = document.createElement('section');
    isoSection.id = 'clm-iso-section';
    isoSection.className = 'clm-iso-section';

    isoSection.innerHTML = `
      <div class="clm-iso-grid-bg"></div>
      <div class="clm-iso-glow-orb gold"></div>
      <div class="clm-iso-glow-orb amber"></div>

      <div class="container" style="position:relative; z-index:3;">
        
        <!-- Header -->
        <div class="clm-iso-header">
          <div class="clm-iso-eyebrow">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            INTERNATIONAL STANDARD OF EXCELLENCE
          </div>
          <h2 class="clm-iso-title">
            Certified Quality Management System <br/>
            <span class="gold-gradient">ISO 9001:2015 Accredited</span>
          </h2>
          <p class="clm-iso-lead">
            At CLM Group of Construction, exceptional quality is not an afterthought—it is the immutable blueprint of every foundation we lay. 
            Our comprehensive Quality Management System is independently assessed, internationally certified, and audited to guarantee 
            uncompromising structural safety, verifiable material integrity, and turnkey project delivery.
          </p>
        </div>

        <!-- Minimal Certificate Display -->
        <div class="clm-iso-main-grid" style="display:flex; justify-content:center; margin-bottom: 20px;">
          <div class="clm-certificate-card-wrap" style="max-width: 600px; width: 100%;">
            <div class="clm-certificate-frame" id="clm-cert-card-trigger">
              <div class="clm-gold-seal-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                OFFICIAL SEAL // QM-20631
              </div>

              <div class="clm-certificate-inner">
                <img src="${CERT_IMAGE_URL}" alt="ISO 9001:2015 Quality Management Certificate" class="clm-certificate-img" />
                <div class="clm-certificate-hover-overlay">
                  <div style="font-size:0.75rem; color:#D4AF37; font-family:monospace; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">
                    AUDITED BY US CERTIFICATION & INSPECTION LTD
                  </div>
                  <h4 style="color:#FFFFFF; font-size:1.25rem; font-family:var(--font-heading); font-weight:800; margin-bottom:12px;">
                    ISO 9001:2015 Certificate of Registration
                  </h4>
                  <div class="clm-cert-action-bar">
                    <button class="btn-primary" id="clm-btn-zoom-cert" style="padding:10px 18px; font-size:0.85rem;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      Inspect Full Resolution
                    </button>
                    <a href="${CERT_PDF_URL}" download="CLM_Construction_ISO_9001_Certificate.pdf" class="btn-secondary" style="padding:10px 16px; font-size:0.85rem;" onclick="event.stopPropagation();">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (targetSection && targetSection.parentNode) {
      targetSection.parentNode.insertBefore(isoSection, targetSection.nextSibling);
    } else {
      mainElement.appendChild(isoSection);
    }

    // Attach events for certificate modal
    const triggerCard = document.getElementById('clm-cert-card-trigger');
    if (triggerCard) triggerCard.addEventListener('click', openCertificateModal);

    const zoomBtn = document.getElementById('clm-btn-zoom-cert');
    if (zoomBtn) zoomBtn.addEventListener('click', openCertificateModal);
  }

  
  
  function injectMinimalText() {
    if (document.getElementById('clm-minimal-iso-line')) return;
    
    const paragraphs = document.querySelectorAll('p');
    for (let p of paragraphs) {
      if (p.textContent.includes('We provide end-to-end planning')) {
        const minimalLine = document.createElement('div');
        minimalLine.id = 'clm-minimal-iso-line';
        minimalLine.style.cssText = 'color: #c5a028; font-size: 0.9rem; font-weight: 700; margin-top: 16px; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-heading, "Montserrat"); text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s;';
        minimalLine.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          ISO 9001:2015 CERTIFIED QMS (QM-20631)
        `;
        minimalLine.addEventListener('click', window.openIsoCertificateModal || openCertificateModal);
        minimalLine.addEventListener('mouseenter', () => minimalLine.style.opacity = '0.7');
        minimalLine.addEventListener('mouseleave', () => minimalLine.style.opacity = '1');
        
        p.parentNode.insertBefore(minimalLine, p.nextSibling);
        break;
      }
    }
  }


  // 7. Inject Hero Crane Animation
  function injectHeroAnimation() {
    if (document.getElementById('clm-hero-crane')) return;
    
    // Find the hero container by looking for the main paragraph
    const paragraphs = document.querySelectorAll('p');
    let heroContainer = null;
    for (let p of paragraphs) {
      if (p.textContent.includes('We provide end-to-end planning')) {
        let curr = p.parentElement;
        while (curr && curr !== document.body) {
          if (curr.classList.contains('container') || curr.tagName === 'SECTION' || curr.tagName === 'HEADER') {
            heroContainer = curr;
            break;
          }
          curr = curr.parentElement;
        }
        break;
      }
    }
    
    if (!heroContainer) return;
    
    // Ensure relative positioning
    if (getComputedStyle(heroContainer).position === 'static') {
      heroContainer.style.position = 'relative';
    }

    const craneWrap = document.createElement('div');
    craneWrap.id = 'clm-hero-crane';
    craneWrap.style.cssText = 'position: absolute; right: 2%; top: 10%; width: 600px; height: 500px; pointer-events: none; z-index: 10; opacity: 0.9;';
    
    craneWrap.innerHTML = `
<svg width="100%" height="100%" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="latticeMast" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0,12 L12,0 M12,12 L0,0" fill="none" stroke="#FBBF24" stroke-width="0.8"/>
            <rect x="0" y="0" width="12" height="12" fill="none" stroke="#FBBF24" stroke-width="0.5"/>
          </pattern>
          <pattern id="latticeJib" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0,12 L12,0 M12,12 L0,0" fill="none" stroke="#FBBF24" stroke-width="0.8"/>
            <rect x="0" y="0" width="12" height="12" fill="none" stroke="#FBBF24" stroke-width="0.5"/>
          </pattern>
        </defs>

        <style>
          /* CRANE 12s LOOP */
          .sim-trolley { animation: trolley-move 12s ease-in-out infinite; }
          .sim-hook-block { animation: hook-move 12s ease-in-out infinite; }
          .sim-cable { transform-origin: top center; animation: cable-stretch 12s ease-in-out infinite; }
          .sim-rebar-lift { animation: rebar-lift 12s step-end infinite; }
          
          @keyframes trolley-move {
            0%, 15% { transform: translateX(300px); }
            25%, 40% { transform: translateX(300px); }
            50%, 65% { transform: translateX(90px); }
            75%, 90% { transform: translateX(90px); }
            100% { transform: translateX(300px); }
          }
          @keyframes hook-move {
            0%, 5% { transform: translateY(270px); }
            15%, 40% { transform: translateY(5px); }
            50%, 55% { transform: translateY(5px); }
            60%, 65% { transform: translateY(20px); }
            75%, 95% { transform: translateY(5px); }
            100% { transform: translateY(270px); }
          }
          @keyframes cable-stretch {
            0%, 5% { transform: scaleY(270); }
            15%, 40% { transform: scaleY(5); }
            50%, 55% { transform: scaleY(5); }
            60%, 65% { transform: scaleY(20); }
            75%, 95% { transform: scaleY(5); }
            100% { transform: scaleY(270); }
          }
          @keyframes rebar-lift {
            0%, 62.5% { opacity: 1; }
            62.6%, 100% { opacity: 0; }
          }

          /* 36s NARRATIVE LOOP FOR BARS */
          .pile-1 { animation: pile-1 36s step-end infinite; }
          .pile-2 { animation: pile-2 36s step-end infinite; }
          .pile-3 { animation: pile-3 36s step-end infinite; }
          
          .truck-bar-1 { animation: truck-bar-1 36s step-end infinite; }
          .truck-bar-2 { animation: truck-bar-2 36s step-end infinite; }
          .truck-bar-3 { animation: truck-bar-3 36s step-end infinite; }

          @keyframes pile-1 { 0%, 20.8% { opacity: 0; } 20.81%, 100% { opacity: 1; } }
          @keyframes pile-2 { 0%, 54.2% { opacity: 0; } 54.21%, 100% { opacity: 1; } }
          @keyframes pile-3 { 0%, 87.5% { opacity: 0; } 87.51%, 100% { opacity: 1; } }

          @keyframes truck-bar-1 { 0%, 6.9% { opacity: 1; } 6.91%, 100% { opacity: 0; } }
          @keyframes truck-bar-2 { 0%, 40.3% { opacity: 1; } 40.31%, 100% { opacity: 0; } }
          @keyframes truck-bar-3 { 0%, 73.6% { opacity: 1; } 73.61%, 100% { opacity: 0; } }
        </style>

        <!-- BASELINE / GROUND -->
        <line x1="20" y1="440" x2="580" y2="440" stroke="#CBD5E1" stroke-width="0.5" opacity="0.5"/>

        <!-- COMPLEX 8-STORY BUILDING -->
        <g id="sim-building" transform="translate(50, 440)">
          <defs>
            <pattern id="masonry2" width="16" height="8" patternUnits="userSpaceOnUse">
              <rect width="16" height="8" fill="#0F172A" stroke="#475569" stroke-width="0.5"/>
              <line x1="8" y1="0" x2="8" y2="4" stroke="#475569" stroke-width="0.5"/>
              <line x1="0" y1="4" x2="16" y2="4" stroke="#475569" stroke-width="0.5"/>
              <line x1="0" y1="8" x2="16" y2="8" stroke="#475569" stroke-width="0.5"/>
            </pattern>
            <pattern id="scaffold" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0,8 L8,0 M8,8 L0,0" fill="none" stroke="#F59E0B" stroke-width="0.3" opacity="0.6"/>
            </pattern>
          </defs>

          <!-- INTERIORS & WALLS -->
          <!-- Floor 1 (0 to -32): Full Masonry -->
          <rect x="0" y="-32" width="180" height="32" fill="url(#masonry2)"/>
          <!-- Doors in Bay 2 & 3 -->
          <rect x="55" y="-24" width="25" height="24" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" stroke-width="0.8"/>
          <rect x="100" y="-24" width="25" height="24" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" stroke-width="0.8"/>
          
          <!-- Floor 2 (-32 to -64): Masonry Outer, Glass Inner -->
          <rect x="0" y="-64" width="45" height="32" fill="url(#masonry2)"/>
          <rect x="135" y="-64" width="45" height="32" fill="url(#masonry2)"/>
          <rect x="45" y="-64" width="90" height="32" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="45" y1="-48" x2="135" y2="-48" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="90" y1="-64" x2="90" y2="-32" stroke="#38BDF8" stroke-width="0.5"/>

          <!-- Floor 3 (-64 to -96): Full Glass Curtain Wall -->
          <rect x="0" y="-96" width="180" height="32" fill="rgba(14, 165, 233, 0.12)" />
          <line x1="0" y1="-80" x2="180" y2="-80" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="22.5" y1="-96" x2="22.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="67.5" y1="-96" x2="67.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="112.5" y1="-96" x2="112.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="157.5" y1="-96" x2="157.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>

          <!-- Floor 4 (-96 to -128): Full Glass Curtain Wall -->
          <rect x="0" y="-128" width="180" height="32" fill="rgba(14, 165, 233, 0.12)" />
          <line x1="0" y1="-112" x2="180" y2="-112" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="22.5" y1="-128" x2="22.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="67.5" y1="-128" x2="67.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="112.5" y1="-128" x2="112.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="157.5" y1="-128" x2="157.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>

          <!-- Floor 5 (-128 to -160): Scaffold / Installation -->
          <rect x="0" y="-160" width="180" height="32" fill="url(#scaffold)"/>
          <line x1="0" y1="-144" x2="180" y2="-144" stroke="#94A3B8" stroke-width="0.5" stroke-dasharray="2,2"/>
          
          <!-- Floors 6, 7, 8: Bare Steel (no background walls needed) -->
          <!-- X-Bracing for Core in Floor 6 & 7 (Bay 2 & 3) -->
          <line x1="45" y1="-160" x2="135" y2="-224" stroke="#64748B" stroke-width="0.5"/>
          <line x1="135" y1="-160" x2="45" y2="-224" stroke="#64748B" stroke-width="0.5"/>
          
          <!-- COLUMNS (Drawn over walls, under slabs) -->
          <g stroke="#64748B" stroke-width="1.5">
            <line x1="0" y1="0" x2="0" y2="-256" />
            <line x1="4" y1="0" x2="4" y2="-256" />
            <line x1="45" y1="0" x2="45" y2="-256" />
            <line x1="49" y1="0" x2="49" y2="-256" />
            <line x1="90" y1="0" x2="90" y2="-256" />
            <line x1="94" y1="0" x2="94" y2="-256" />
            <line x1="135" y1="0" x2="135" y2="-256" />
            <line x1="139" y1="0" x2="139" y2="-256" />
            <line x1="180" y1="0" x2="180" y2="-256" />
            <line x1="184" y1="0" x2="184" y2="-256" />
          </g>
          
          <!-- SLABS -->
          <!-- Ground Base -->
          <rect x="-5" y="0" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-32" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-64" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-96" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-128" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-160" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-192" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-224" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          
          <!-- Top Active Slab (Orange) -->
          <rect x="-5" y="-256" width="194" height="4" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,2"/>
          
          <!-- Formwork Struts (Connecting top slab to columns) -->
          <line x1="22.5" y1="-252" x2="22.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>
          <line x1="67.5" y1="-252" x2="67.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>
          <line x1="112.5" y1="-252" x2="112.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>
          <line x1="157.5" y1="-252" x2="157.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>

          <!-- PILING REBARS ON TOP SLAB -->
          <g transform="translate(90, -259)">
            <g class="pile-1">
              <line x1="-35" y1="0" x2="35" y2="0" stroke="#64748B" stroke-width="2"/>
              <line x1="-25" y1="-1" x2="-25" y2="1" stroke="#334155" stroke-width="1"/>
              <line x1="25" y1="-1" x2="25" y2="1" stroke="#334155" stroke-width="1"/>
            </g>
            <g class="pile-2">
              <line x1="-35" y1="-3" x2="35" y2="-3" stroke="#64748B" stroke-width="2"/>
              <line x1="-15" y1="-4" x2="-15" y2="-2" stroke="#334155" stroke-width="1"/>
              <line x1="15" y1="-4" x2="15" y2="-2" stroke="#334155" stroke-width="1"/>
            </g>
            <g class="pile-3">
              <line x1="-35" y1="-6" x2="35" y2="-6" stroke="#64748B" stroke-width="2"/>
              <line x1="-5" y1="-7" x2="-5" y2="-5" stroke="#334155" stroke-width="1"/>
              <line x1="5" y1="-7" x2="5" y2="-5" stroke="#334155" stroke-width="1"/>
            </g>
          </g>
        </g>

        <!-- TRUCK (Thinner, realistic lines) -->
        <g id="sim-truck" transform="translate(310, 425)">
          <rect x="0" y="5" width="100" height="4" fill="none" stroke="#64748B" stroke-width="1"/>
          <circle cx="20" cy="14" r="5" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="20" cy="14" r="2" fill="#1E293B"/>
          <circle cx="45" cy="14" r="5" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="45" cy="14" r="2" fill="#1E293B"/>
          <path d="M 100,9 L 115,9 L 122,2 L 122,-5 L 105,-5 Z" fill="none" stroke="#38BDF8" stroke-width="1"/>
          <path d="M 107,-2 L 118,-2 L 118,2 L 107,2 Z" fill="none" stroke="#0284C7" stroke-width="0.5"/>
          <circle cx="112" cy="14" r="5" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="112" cy="14" r="2" fill="#1E293B"/>
          
          <g class="truck-bar-3">
            <line x1="10" y1="3" x2="90" y2="3" stroke="#64748B" stroke-width="2"/>
          </g>
          <g class="truck-bar-2">
            <line x1="10" y1="0" x2="90" y2="0" stroke="#64748B" stroke-width="2"/>
          </g>
          <g class="truck-bar-1">
            <line x1="10" y1="-3" x2="90" y2="-3" stroke="#64748B" stroke-width="2"/>
          </g>
        </g>

        <!-- CRANE MAST -->
        <g id="sim-mast" transform="translate(450, 70)">
          <line x1="0" y1="0" x2="0" y2="370" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="24" y1="0" x2="24" y2="370" stroke="#FBBF24" stroke-width="1.5"/>
          <rect x="0" y="0" width="24" height="370" fill="url(#latticeMast)" />
        </g>

        <!-- CRANE JIB & CABIN -->
        <g id="sim-jib-assembly" transform="translate(50, 70)">
          <line x1="400" y1="20" x2="520" y2="20" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="400" y1="32" x2="520" y2="32" stroke="#FBBF24" stroke-width="1.5"/>
          <rect x="400" y="20" width="120" height="12" fill="url(#latticeJib)" />
          
          <rect x="470" y="10" width="6" height="30" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <rect x="480" y="10" width="6" height="30" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <rect x="490" y="10" width="6" height="30" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <line x1="470" y1="15" x2="496" y2="15" stroke="#94A3B8" stroke-width="0.5"/>
          
          <rect x="380" y="32" width="16" height="12" fill="none" stroke="#38BDF8" stroke-width="1"/>
          <line x1="380" y1="38" x2="396" y2="38" stroke="#38BDF8" stroke-width="0.5"/>
          
          <polygon points="400,20 412,-30 424,20" fill="none" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="412" y1="-30" x2="250" y2="20" stroke="#E2E8F0" stroke-width="0.5"/>
          <line x1="412" y1="-30" x2="100" y2="20" stroke="#E2E8F0" stroke-width="0.5"/>
          <line x1="412" y1="-30" x2="510" y2="20" stroke="#E2E8F0" stroke-width="0.5"/>

          <line x1="0" y1="20" x2="400" y2="20" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="0" y1="32" x2="400" y2="32" stroke="#FBBF24" stroke-width="1.5"/>
          <rect x="0" y="20" width="400" height="12" fill="url(#latticeJib)" />
          
          <!-- TROLLEY & HOIST -->
          <g class="sim-trolley">
            <rect x="-10" y="34" width="20" height="6" fill="none" stroke="#F59E0B" stroke-width="1"/>
            <circle cx="-5" cy="34" r="2" fill="#F59E0B"/>
            <circle cx="5" cy="34" r="2" fill="#F59E0B"/>
            
            <g transform="translate(0, 40)">
              <line x1="-8" y1="0" x2="-8" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              <line x1="-2" y1="0" x2="-2" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              <line x1="2" y1="0" x2="2" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              <line x1="8" y1="0" x2="8" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              
              <g class="sim-hook-block">
                <rect x="-12" y="0" width="24" height="8" fill="none" stroke="#FBBF24" stroke-width="1"/>
                <circle cx="-6" cy="4" r="2" fill="none" stroke="#1E293B" stroke-width="0.5"/>
                <circle cx="6" cy="4" r="2" fill="none" stroke="#1E293B" stroke-width="0.5"/>
                <path d="M 0,8 Q 4,12 0,16 Q -4,16 -4,12" fill="none" stroke="#FBBF24" stroke-width="1.5"/>
                
                <g class="sim-rebar-lift" transform="translate(0, 16)">
                  <line x1="0" y1="0" x2="-35" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  <line x1="0" y1="0" x2="35" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  <line x1="0" y1="0" x2="-15" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  <line x1="0" y1="0" x2="15" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  
                  <line x1="-40" y1="25" x2="40" y2="25" stroke="#64748B" stroke-width="2"/>
                  <line x1="-20" y1="24" x2="-20" y2="26" stroke="#334155" stroke-width="1"/>
                  <line x1="20" y1="24" x2="20" y2="26" stroke="#334155" stroke-width="1"/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `;
    heroContainer.appendChild(craneWrap);
  }

// 8. Inject About Us Mixer Animation
  function injectAboutAnimation() {
    if (document.getElementById('clm-about-mixer')) return;
    
    // Changed to inject as a fixed background watermark
    const mixerWrap = document.createElement('div');
    mixerWrap.id = 'clm-about-mixer';
    mixerWrap.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 350px; height: 280px; pointer-events: none; z-index: 9999; opacity: 0.3; transition: opacity 0.5s ease;';
    mixerWrap.innerHTML = `

      <svg width="100%" height="100%" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
        <style>
          .spin-band {
            animation: band-spin 1.5s linear infinite;
          }
          @keyframes band-spin {
            to { stroke-dashoffset: -20; }
          }
          
          .mix-pour {
            animation: pour-flow 0.4s linear infinite;
          }
          @keyframes pour-flow {
            to { stroke-dashoffset: -8; }
          }
          
          .mix-worker-arms {
            transform-origin: 340px 75px;
            animation: tilt-bag 1.5s ease-in-out infinite alternate;
          }
          @keyframes tilt-bag {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-15deg); }
          }
          
          .mix-truck {
            transform-origin: center;
            animation: truck-vibrate 0.1s linear infinite alternate;
          }
          @keyframes truck-vibrate {
            0% { transform: translateY(0px); }
            100% { transform: translateY(0.5px); }
          }
          
          .mix-smoke circle {
            animation: smoke-rise 2s ease-in infinite;
          }
          .mix-smoke circle:nth-child(2) { animation-delay: 0.6s; }
          .mix-smoke circle:nth-child(3) { animation-delay: 1.2s; }
          
          @keyframes smoke-rise {
            0% { transform: translateY(0) scale(1); opacity: 0.5; }
            100% { transform: translateY(-20px) scale(2); opacity: 0; }
          }
        </style>
        
        <g transform="translate(0, 40)">
          <!-- BASELINE -->
          <line x1="10" y1="350" x2="490" y2="350" stroke="#CBD5E1" stroke-width="0.5" opacity="0.5"/>
          <line x1="10" y1="352" x2="490" y2="352" stroke="#CBD5E1" stroke-width="0.3" opacity="0.3"/>
          <line x1="10" y1="354" x2="490" y2="354" stroke="#CBD5E1" stroke-width="0.2" opacity="0.2"/>

          <!-- TRUCK CHASSIS & CABIN -->
          <g class="mix-truck" stroke="#64748B" stroke-width="1.2" fill="none">
            <!-- Chassis rails -->
            <rect x="40" y="278" width="290" height="6" rx="1" fill="#0F172A" stroke="#475569" stroke-width="0.8"/>
            <rect x="40" y="284" width="290" height="4" rx="1" fill="#0F172A" stroke="#475569" stroke-width="0.8"/>
            <!-- Chassis rivets -->
            <line x1="50" y1="281" x2="50" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="80" y1="281" x2="80" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="110" y1="281" x2="110" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="140" y1="281" x2="140" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="170" y1="281" x2="170" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="200" y1="281" x2="200" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="230" y1="281" x2="230" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="260" y1="281" x2="260" y2="281" stroke-width="2" stroke-linecap="round"/>
            <line x1="290" y1="281" x2="290" y2="281" stroke-width="2" stroke-linecap="round"/>
            
            <!-- Fuel Tank -->
            <rect x="130" y="288" width="45" height="22" rx="4" fill="#1E293B" stroke="#94A3B8"/>
            <line x1="140" y1="288" x2="140" y2="310" stroke="#CBD5E1" stroke-width="0.8"/>
            <line x1="155" y1="288" x2="155" y2="310" stroke="#CBD5E1" stroke-width="0.8"/>
            <line x1="170" y1="288" x2="170" y2="310" stroke="#CBD5E1" stroke-width="0.8"/>
            <circle cx="135" cy="292" r="1.5" fill="#94A3B8"/>
            
            <!-- Air Tanks -->
            <rect x="185" y="288" width="25" height="15" rx="2" fill="#0F172A" stroke="#94A3B8"/>
            <circle cx="192" cy="295" r="4" stroke="#64748B"/>
            <circle cx="203" cy="295" r="4" stroke="#64748B"/>

            <!-- Suspension -->
            <path d="M 60 288 Q 80 300 100 288" stroke-width="1.5"/>
            <path d="M 65 291 Q 80 302 95 291" stroke-width="1"/>
            <path d="M 220 288 Q 240 300 260 288" stroke-width="1.5"/>
            <path d="M 280 288 Q 300 300 320 288" stroke-width="1.5"/>
            
            <!-- Fenders -->
            <path d="M 215 315 A 35 35 0 0 1 265 315" stroke="#475569" stroke-width="1.5" stroke-dasharray="2,1"/>
            <path d="M 275 315 A 35 35 0 0 1 325 315" stroke="#475569" stroke-width="1.5" stroke-dasharray="2,1"/>

            <!-- Cabin -->
            <path d="M 35 280 L 35 200 C 35 175 50 165 80 165 L 110 165 L 125 220 L 125 280 Z" fill="rgba(14, 165, 233, 0.03)" stroke="#38BDF8" stroke-width="1.2"/>
            <path d="M 40 230 L 40 185 C 40 175 48 172 75 172 L 95 172 L 105 200 L 115 230 Z" fill="rgba(14, 165, 233, 0.1)" stroke="#38BDF8" stroke-width="1"/>
            <path d="M 75 172 L 75 230" stroke="#38BDF8" stroke-width="1"/>
            <line x1="85" y1="210" x2="95" y2="200" stroke="#38BDF8" stroke-width="1"/> 
            <path d="M 110 230 L 110 245 L 120 245" stroke="#38BDF8" stroke-width="0.8"/>
            <rect x="105" y="240" width="8" height="3" rx="1" stroke="#38BDF8" stroke-width="0.8"/>
            
            <!-- Bumper & Grille -->
            <path d="M 32 280 L 32 260 L 35 260 L 35 280 Z" fill="#334155" stroke="#475569"/>
            <line x1="35" y1="270" x2="45" y2="270" stroke-width="0.8"/>
            <line x1="35" y1="275" x2="45" y2="275" stroke-width="0.8"/>
            <rect x="30" y="255" width="8" height="12" rx="2" fill="#FBBF24" stroke="#F59E0B" stroke-width="0.5"/>
            <line x1="10" y1="261" x2="30" y2="261" stroke="#FBBF24" stroke-width="0.5" stroke-dasharray="3,2"/>
            
            <rect x="328" y="270" width="4" height="12" rx="1" fill="#EF4444" stroke="#B91C1C"/>

            <!-- Exhaust Pipe -->
            <path d="M 125 280 L 125 180 L 132 180" stroke-width="1.5"/>
            <path d="M 120 170 L 137 170 L 134 180 L 123 180 Z" fill="#475569"/>
            <g class="mix-smoke" stroke="none">
              <circle cx="130" cy="165" r="3" fill="#64748B"/>
              <circle cx="128" cy="155" r="5" fill="#64748B"/>
              <circle cx="132" cy="140" r="8" fill="#64748B"/>
            </g>

            <!-- Wheels (Highly detailed) -->
            <circle cx="80" cy="315" r="25" fill="#0F172A" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="80" cy="315" r="14" stroke="#CBD5E1" stroke-width="0.8"/>
            <circle cx="80" cy="315" r="6" stroke="#CBD5E1" stroke-width="1.5"/>
            <circle cx="80" cy="315" r="2" fill="#334155"/>
            <line x1="80" y1="301" x2="80" y2="309" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="80" y1="321" x2="80" y2="329" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="66" y1="315" x2="74" y2="315" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="86" y1="315" x2="94" y2="315" stroke="#CBD5E1" stroke-width="1"/>
            
            <circle cx="240" cy="315" r="25" fill="#0F172A" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="240" cy="315" r="14" stroke="#CBD5E1" stroke-width="0.8"/>
            <circle cx="240" cy="315" r="6" stroke="#CBD5E1" stroke-width="1.5"/>
            <circle cx="240" cy="315" r="2" fill="#334155"/>
            <line x1="240" y1="301" x2="240" y2="309" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="240" y1="321" x2="240" y2="329" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="226" y1="315" x2="234" y2="315" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="246" y1="315" x2="254" y2="315" stroke="#CBD5E1" stroke-width="1"/>

            <circle cx="300" cy="315" r="25" fill="#0F172A" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="300" cy="315" r="14" stroke="#CBD5E1" stroke-width="0.8"/>
            <circle cx="300" cy="315" r="6" stroke="#CBD5E1" stroke-width="1.5"/>
            <circle cx="300" cy="315" r="2" fill="#334155"/>
            <line x1="300" y1="301" x2="300" y2="309" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="300" y1="321" x2="300" y2="329" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="286" y1="315" x2="294" y2="315" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="306" y1="315" x2="314" y2="315" stroke="#CBD5E1" stroke-width="1"/>

            <!-- Water Tank -->
            <rect x="132" y="210" width="20" height="40" rx="3" fill="rgba(14, 165, 233, 0.05)" stroke="#64748B" stroke-width="1"/>
            <line x1="132" y1="220" x2="152" y2="220" stroke="#64748B" stroke-width="0.5"/>
            <line x1="132" y1="230" x2="152" y2="230" stroke="#64748B" stroke-width="0.5"/>
            <line x1="132" y1="240" x2="152" y2="240" stroke="#64748B" stroke-width="0.5"/>

            <!-- Drum Mounts -->
            <path d="M 130 278 L 145 220 L 165 220 L 165 278" stroke-width="2"/>
            <circle cx="155" cy="225" r="3" fill="#334155"/>
            <path d="M 260 278 L 265 195 L 285 195 L 285 278" stroke-width="2"/>
            <circle cx="275" cy="200" r="4" fill="#334155"/>

            <!-- Rear Ladder & Chute -->
            <line x1="320" y1="278" x2="320" y2="180" stroke-width="1.5"/>
            <line x1="312" y1="278" x2="312" y2="180" stroke-width="1.5"/>
            <path d="M 312 270 L 320 270 M 312 250 L 320 250 M 312 230 L 320 230 M 312 210 L 320 210 M 312 190 L 320 190" stroke-width="1.2"/>
            <path d="M 315 220 C 330 230 340 250 340 270" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
          </g>

          <!-- MIXER DRUM -->
          <g class="mix-truck" transform="rotate(-15 210 210)">
            <path d="M 150 170 C 120 170, 120 250, 150 250 L 180 260 L 280 225 A 8 15 0 0 0 280 195 L 180 160 Z" stroke="#FBBF24" stroke-width="1.5" fill="none"/>
            <ellipse cx="280" cy="210" rx="8" ry="15" stroke="#FBBF24" stroke-width="1.5" fill="none"/>
            
            <!-- Spiral Blades -->
            <path d="M 160 166 C 170 190, 170 230, 160 255" stroke="#F59E0B" stroke-width="0.5" stroke-dasharray="2,2" fill="none"/>
            <path d="M 180 160 C 195 190, 195 230, 180 260" stroke="#F59E0B" stroke-width="0.5" stroke-dasharray="2,2" fill="none"/>
            <path d="M 210 170 C 230 190, 230 220, 210 248" stroke="#F59E0B" stroke-width="0.5" stroke-dasharray="2,2" fill="none"/>
            <path d="M 240 182 C 255 195, 255 215, 240 238" stroke="#F59E0B" stroke-width="0.5" stroke-dasharray="2,2" fill="none"/>

            <!-- Spinning Bands -->
            <path class="spin-band" d="M 155 168 Q 185 210 155 252" stroke="#FBBF24" stroke-width="1.5" fill="none" stroke-dasharray="10,5"/>
            <path class="spin-band" d="M 175 162 Q 215 210 175 258" stroke="#FBBF24" stroke-width="1.5" fill="none" stroke-dasharray="14,7"/>
            <path class="spin-band" d="M 195 166 Q 235 210 195 254" stroke="#FBBF24" stroke-width="1.5" fill="none" stroke-dasharray="14,7"/>
            <path class="spin-band" d="M 215 173 Q 250 210 215 247" stroke="#FBBF24" stroke-width="1.5" fill="none" stroke-dasharray="12,6"/>
            <path class="spin-band" d="M 235 180 Q 260 210 235 240" stroke="#FBBF24" stroke-width="1.5" fill="none" stroke-dasharray="10,5"/>
            <path class="spin-band" d="M 255 188 Q 275 210 255 232" stroke="#FBBF24" stroke-width="1.5" fill="none" stroke-dasharray="8,4"/>
          </g>

          <!-- HOPPER -->
          <g class="mix-truck" stroke="#94A3B8" stroke-width="1.2" fill="none">
            <path d="M 245 135 L 315 135 L 290 190 L 270 190 Z" fill="rgba(14, 165, 233, 0.08)"/>
            <line x1="255" y1="135" x2="275" y2="190" stroke-width="0.8" stroke-dasharray="2,2"/>
            <line x1="305" y1="135" x2="285" y2="190" stroke-width="0.8" stroke-dasharray="2,2"/>
            <line x1="285" y1="200" x2="290" y2="190" stroke-width="2"/>
            <rect x="240" y="130" width="80" height="5" rx="1" stroke-width="1.5" fill="#1E293B"/>
          </g>

          <!-- SCAFFOLDING -->
          <g stroke="#64748B" stroke-width="1" fill="none">
            <line x1="320" y1="350" x2="320" y2="140" stroke-width="1.5"/>
            <line x1="323" y1="350" x2="323" y2="140" stroke-width="0.5" stroke="#94A3B8"/>
            <line x1="380" y1="350" x2="380" y2="140" stroke-width="1.5"/>
            <line x1="383" y1="350" x2="383" y2="140" stroke-width="0.5" stroke="#94A3B8"/>
            <line x1="440" y1="350" x2="440" y2="140" stroke-width="1.5"/>
            <line x1="443" y1="350" x2="443" y2="140" stroke-width="0.5" stroke="#94A3B8"/>
            
            <!-- Decks -->
            <line x1="310" y1="280" x2="450" y2="280" stroke-width="2"/>
            <rect x="310" y="276" width="140" height="4" fill="rgba(14, 165, 233, 0.1)"/>
            <line x1="310" y1="210" x2="450" y2="210" stroke-width="2"/>
            <rect x="310" y="206" width="140" height="4" fill="rgba(14, 165, 233, 0.1)"/>
            <line x1="290" y1="140" x2="450" y2="140" stroke-width="3"/> 
            <rect x="290" y="136" width="160" height="4" fill="rgba(14, 165, 233, 0.1)"/>
            
            <line x1="315" y1="350" x2="328" y2="350" stroke-width="3"/>
            <line x1="375" y1="350" x2="388" y2="350" stroke-width="3"/>
            <line x1="435" y1="350" x2="448" y2="350" stroke-width="3"/>

            <!-- Bracing -->
            <path d="M 320 350 L 380 280 M 380 350 L 320 280 M 380 350 L 440 280 M 440 350 L 380 280" stroke-width="0.8" opacity="0.7"/>
            <path d="M 320 280 L 380 210 M 380 280 L 320 210 M 380 280 L 440 210 M 440 280 L 380 210" stroke-width="0.8" opacity="0.7"/>
            <path d="M 320 210 L 380 140 M 380 210 L 320 140 M 380 210 L 440 140 M 440 210 L 380 140" stroke-width="0.8" opacity="0.7"/>
            
            <!-- Handrails -->
            <line x1="320" y1="110" x2="440" y2="110" stroke-width="1.5" stroke="#38BDF8"/>
            <line x1="320" y1="125" x2="440" y2="125" stroke-width="1" stroke="#38BDF8"/>
            <line x1="320" y1="140" x2="320" y2="110" stroke-width="1.5" stroke="#38BDF8"/>
            <line x1="380" y1="140" x2="380" y2="110" stroke-width="1.5" stroke="#38BDF8"/>
            <line x1="440" y1="140" x2="440" y2="110" stroke-width="1.5" stroke="#38BDF8"/>

            <!-- Ladder -->
            <line x1="410" y1="350" x2="410" y2="110" stroke-width="2"/>
            <line x1="425" y1="350" x2="425" y2="110" stroke-width="2"/>
            <path d="M 410 340 L 425 340 M 410 320 L 425 320 M 410 300 L 425 300 M 410 280 L 425 280 M 410 260 L 425 260 M 410 240 L 425 240 M 410 220 L 425 220 M 410 200 L 425 200 M 410 180 L 425 180 M 410 160 L 425 160 M 410 140 L 425 140 M 410 120 L 425 120" opacity="0.8"/>
            
            <!-- Tools -->
            <circle cx="360" cy="150" r="3" stroke="#CBD5E1"/>
            <line x1="360" y1="153" x2="360" y2="165" stroke="#CBD5E1"/>
          </g>

          <!-- WORKER (Detailed body) -->
          <g stroke="#38BDF8" fill="none">
            <circle cx="340" cy="60" r="8" stroke-width="1.5"/>
            <path d="M 330 62 C 330 50, 350 50, 350 62" fill="#F59E0B" stroke="#F59E0B" stroke-width="1"/>
            <line x1="327" y1="62" x2="353" y2="62" stroke="#F59E0B" stroke-width="2"/>
            <text x="340" y="58" font-family="Arial" font-size="4" font-weight="900" fill="#0F172A" text-anchor="middle" stroke="none">CLM</text>

            <path d="M 335 70 L 345 70 L 348 105 L 332 105 Z" fill="rgba(14, 165, 233, 0.2)" stroke-width="1.2"/>
            <path d="M 336 75 L 344 75 M 337 85 L 343 85 M 338 95 L 342 95" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="2,1"/>
            <line x1="340" y1="70" x2="340" y2="105" stroke-width="0.5"/> 

            <!-- Pants -->
            <path d="M 332 105 L 338 105 L 340 140 L 328 140 Z" fill="#0F172A" stroke-width="1"/>
            <path d="M 342 105 L 348 105 L 352 140 L 340 140 Z" fill="#0F172A" stroke-width="1"/>
            
            <!-- Boots -->
            <path d="M 328 140 L 340 140 L 340 135 L 325 135 Z" fill="#38BDF8" stroke-width="1"/>
            <path d="M 340 140 L 352 140 L 355 135 L 340 135 Z" fill="#38BDF8" stroke-width="1"/>
            
            <g class="mix-worker-arms">
              <!-- Arm Sleeves -->
              <path d="M 335 75 L 315 88 L 295 82 L 300 78 L 320 83 L 340 70 Z" fill="rgba(14, 165, 233, 0.1)" stroke-width="1"/>
              <path d="M 345 75 L 320 95 L 295 88 L 298 84 L 322 89 L 342 70 Z" fill="rgba(14, 165, 233, 0.1)" stroke-width="1"/>
              
              <!-- Hands -->
              <circle cx="295" cy="81" r="3" fill="#38BDF8"/>
              <circle cx="296" cy="86" r="3" fill="#38BDF8"/>

              <rect x="260" y="65" width="38" height="24" rx="4" stroke="#CBD5E1" stroke-width="1.2" fill="rgba(100, 116, 139, 0.2)"/>
              <rect x="265" y="70" width="28" height="14" rx="2" stroke="#94A3B8" stroke-width="0.8" stroke-dasharray="2,2"/>
              <line x1="268" y1="75" x2="290" y2="75" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="268" y1="79" x2="285" y2="79" stroke="#CBD5E1" stroke-width="1"/>
              <circle cx="280" cy="77" r="2" fill="#FBBF24" stroke="none"/>
              
              <path d="M 260 77 L 250 90 L 260 88 Z" fill="#94A3B8" stroke="#CBD5E1" stroke-width="1"/>
              
              <path class="mix-pour" d="M 255 85 Q 265 110 275 140" stroke="#94A3B8" stroke-width="2.5" stroke-dasharray="6,4"/>
              <path class="mix-pour" d="M 252 87 Q 270 115 285 140" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4,6"/>
              <path class="mix-pour" d="M 258 88 Q 268 112 280 140" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="2,4"/>
            </g>
          </g>
        </g>
      </svg>

    `;
    document.body.appendChild(mixerWrap);
  }

  
  function injectLoaderTruckAnimation() {
    if (document.getElementById('clm-driving-truck')) return;
    
    // Add global keyframes for driving
    if (!document.getElementById('clm-truck-styles')) {
      const style = document.createElement('style');
      style.id = 'clm-truck-styles';
      style.innerHTML = `
        @keyframes drive-across {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 600px)); }
        }
      `;
      document.head.appendChild(style);
    }

    const loaderWrap = document.createElement('div');
    loaderWrap.id = 'clm-driving-truck';
    // Start way off-screen left, drive across entirely to the right
    loaderWrap.style.cssText = 'position: fixed; bottom: 20px; left: -300px; width: 450px; height: 300px; pointer-events: none; z-index: 9998; opacity: 0.3; animation: drive-across 12s linear infinite;';
    
    loaderWrap.innerHTML = `

      <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
        <style>
          .wheel-spin {
            transform-origin: center;
            animation: spin-wheel 4s linear infinite;
          }
          @keyframes spin-wheel {
            100% { transform: rotate(360deg); }
          }
        </style>
        
        <g stroke="#94A3B8" stroke-width="1" fill="none">
          <!-- Heavy Chassis Base -->
          <rect x="80" y="270" width="380" height="12" stroke="#475569" stroke-width="1.5" fill="rgba(15, 23, 42, 0.5)"/>
          <line x1="80" y1="276" x2="460" y2="276" stroke="#475569" stroke-width="0.5"/>
          
          <!-- Cross members / technical joints -->
          <path d="M 120 270 L 120 282 M 160 270 L 160 282 M 200 270 L 200 282 M 240 270 L 240 282 M 280 270 L 280 282 M 320 270 L 320 282" stroke="#64748B" stroke-width="1"/>
          
          <!-- Hydraulic Lifting System (Technical) -->
          <path d="M 230 270 L 250 200" stroke="#38BDF8" stroke-width="6"/>
          <path d="M 233 260 L 247 210" stroke="#0F172A" stroke-width="2"/>
          
          <!-- Fuel and Air Tanks (Technical) -->
          <rect x="250" y="285" width="50" height="20" rx="2" stroke="#38BDF8" stroke-width="1" fill="rgba(56, 189, 248, 0.05)"/>
          <line x1="260" y1="285" x2="260" y2="305" stroke="#38BDF8" stroke-dasharray="2,2"/>
          <line x1="275" y1="285" x2="275" y2="305" stroke="#38BDF8" stroke-dasharray="2,2"/>
          <line x1="290" y1="285" x2="290" y2="305" stroke="#38BDF8" stroke-dasharray="2,2"/>
          
          <rect x="310" y="285" width="30" height="15" rx="7.5" stroke="#FBBF24" stroke-width="1"/>
          <circle cx="317" cy="292.5" r="4" stroke="#FBBF24"/>
          <circle cx="333" cy="292.5" r="4" stroke="#FBBF24"/>

          <!-- Cabin (Modern European/Cab-over design) -->
          <path d="M 370 270 L 370 140 L 440 140 L 460 170 L 460 270 Z" stroke="#38BDF8" stroke-width="1.5" fill="rgba(15, 23, 42, 0.4)"/>
          
          <path d="M 380 150 L 435 150 L 450 175 L 450 210 L 380 210 Z" stroke="#38BDF8" stroke-width="1" fill="rgba(56, 189, 248, 0.1)"/>
          <line x1="420" y1="150" x2="420" y2="210" stroke="#38BDF8" stroke-width="1"/> 
          
          <rect x="425" y="220" width="15" height="3" stroke="#94A3B8"/> 
          <line x1="380" y1="235" x2="460" y2="235" stroke="#475569" stroke-width="0.5"/> 
          <path d="M 445 150 L 445 130 L 465 130 L 465 150" stroke="#475569"/> 
          <rect x="455" y="135" width="6" height="20" stroke="#FBBF24" fill="#0F172A"/> 
          
          <rect x="460" y="235" width="10" height="35" stroke="#38BDF8" stroke-width="1"/>
          <path d="M 460 240 L 470 240 M 460 245 L 470 245 M 460 250 L 470 250 M 460 255 L 470 255" stroke="#475569"/>
          
          <path d="M 470 260 L 485 260 L 485 270 L 470 270 Z" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="485" y1="262" x2="520" y2="270" stroke="#FBBF24" stroke-width="0.5" stroke-dasharray="4,2"/> 
          <line x1="485" y1="268" x2="520" y2="270" stroke="#FBBF24" stroke-width="0.5" stroke-dasharray="4,2"/>

          <!-- Tipper Bed -->
          <g stroke="#FBBF24" stroke-width="1.2">
            <path d="M 80 260 L 360 260 L 360 120 L 80 120 Z" fill="rgba(245, 158, 11, 0.02)"/>
            <rect x="75" y="115" width="290" height="5" stroke="#FBBF24" stroke-width="1.5" fill="rgba(15, 23, 42, 0.8)"/>
            
            <path d="M 120 120 L 120 260 M 160 120 L 160 260 M 200 120 L 200 260 M 240 120 L 240 260 M 280 120 L 280 260 M 320 120 L 320 260" stroke-width="1" opacity="0.6"/>
            <path d="M 80 120 L 120 260 M 120 120 L 160 260 M 160 120 L 200 260 M 200 120 L 240 260 M 240 120 L 280 260 M 280 120 L 320 260 M 320 120 L 360 260" stroke-width="0.5" opacity="0.3"/>
            
            <circle cx="85" cy="265" r="5" stroke="#38BDF8" stroke-width="1.5"/>
            <circle cx="85" cy="265" r="1.5" stroke="#38BDF8" stroke-width="1"/>
          </g>

          <!-- Technical Grid/Piled Bricks -->
            <rect x="211" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 216 79.5)" />
            <rect x="209" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 214 103.5)" />
            <rect x="239" y="87" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-18 244 89.5)" />
            <rect x="203" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 208 79.5)" />
            <rect x="259" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 264 103.5)" />
            <rect x="226" y="73" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 231 75.5)" />
            <rect x="222" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 227 106.5)" />
            <rect x="213" y="80" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 218 82.5)" />
            <rect x="272" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 277 85.5)" />
            <rect x="205" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 210 109.5)" />
            <rect x="254" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(18 259 97.5)" />
            <rect x="129" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 134 105.5)" />
            <rect x="259" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 264 111.5)" />
            <rect x="146" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-18 151 109.5)" />
            <rect x="226" y="66" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 231 68.5)" />
            <rect x="269" y="82" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 274 84.5)" />
            <rect x="182" y="89" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 187 91.5)" />
            <rect x="176" y="87" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 181 89.5)" />
            <rect x="170" y="85" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(9 175 87.5)" />
            <rect x="154" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 159 92.5)" />
            <rect x="305" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 310 107.5)" />
            <rect x="214" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(11 219 108.5)" />
            <rect x="222" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 227 79.5)" />
            <rect x="235" y="76" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 240 78.5)" />
            <rect x="257" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 262 103.5)" />
            <rect x="183" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 188 113.5)" />
            <rect x="215" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 220 93.5)" />
            <rect x="264" y="99" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(15 269 101.5)" />
            <rect x="185" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 190 116.5)" />
            <rect x="244" y="73" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-18 249 75.5)" />
            <rect x="285" y="108" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-3 290 110.5)" />
            <rect x="273" y="82" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 278 84.5)" />
            <rect x="293" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 298 116.5)" />
            <rect x="218" y="61" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(8 223 63.5)" />
            <rect x="189" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 194 85.5)" />
            <rect x="152" y="89" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 157 91.5)" />
            <rect x="80" y="115" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 85 117.5)" />
            <rect x="262" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-12 267 97.5)" />
            <rect x="323" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 328 106.5)" />
            <rect x="156" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 161 105.5)" />
            <rect x="225" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 230 105.5)" />
            <rect x="145" y="89" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 150 91.5)" />
            <rect x="340" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(13 345 116.5)" />
            <rect x="236" y="81" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 241 83.5)" />
            <rect x="324" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 329 104.5)" />
            <rect x="119" y="100" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 124 102.5)" />
            <rect x="223" y="86" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 228 88.5)" />
            <rect x="188" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 193 85.5)" />
            <rect x="183" y="96" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(9 188 98.5)" />
            <rect x="239" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 244 79.5)" />
            <rect x="306" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 311 105.5)" />
            <rect x="217" y="67" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 222 69.5)" />
            <rect x="177" y="85" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 182 87.5)" />
            <rect x="288" y="88" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 293 90.5)" />
            <rect x="237" y="108" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 242 110.5)" />
            <rect x="340" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(6 345 111.5)" />
            <rect x="227" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 232 113.5)" />
            <rect x="251" y="92" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(11 256 94.5)" />
            <rect x="233" y="69" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 238 71.5)" />
            <rect x="183" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 188 93.5)" />
            <rect x="208" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 213 116.5)" />
            <rect x="131" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-6 136 105.5)" />
            <rect x="249" y="79" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 254 81.5)" />
            <rect x="185" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 190 93.5)" />
            <rect x="220" y="84" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 225 86.5)" />
            <rect x="340" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 345 113.5)" />
            <rect x="334" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 339 116.5)" />
            <rect x="219" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 224 108.5)" />
            <rect x="178" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 183 93.5)" />
            <rect x="223" y="81" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 228 83.5)" />
            <rect x="209" y="87" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-3 214 89.5)" />
            <rect x="324" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 329 116.5)" />
            <rect x="130" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 135 100.5)" />
            <rect x="187" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 192 115.5)" />
            <rect x="123" y="99" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 128 101.5)" />
            <rect x="193" y="92" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 198 94.5)" />
            <rect x="303" y="94" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-12 308 96.5)" />
            <rect x="340" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 345 113.5)" />
            <rect x="222" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 227 111.5)" />
            <rect x="250" y="97" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 255 99.5)" />
            <rect x="150" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 155 103.5)" />
            <rect x="258" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(8 263 85.5)" />
            <rect x="224" y="97" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 229 99.5)" />
            <rect x="280" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 285 95.5)" />
            <rect x="279" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 284 116.5)" />
            <rect x="249" y="74" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 254 76.5)" />
            <rect x="206" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(15 211 111.5)" />
            <rect x="340" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 345 112.5)" />
            <rect x="266" y="100" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 271 102.5)" />
            <rect x="139" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-19 144 108.5)" />
            <rect x="240" y="99" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 245 101.5)" />
            <rect x="173" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 178 85.5)" />
            <rect x="279" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 284 93.5)" />
            <rect x="267" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 272 106.5)" />
            <rect x="188" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(16 193 95.5)" />
            <rect x="184" y="108" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 189 110.5)" />
            <rect x="177" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 182 79.5)" />
            <rect x="242" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 247 100.5)" />
            <rect x="215" y="84" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-19 220 86.5)" />
            <rect x="144" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(15 149 93.5)" />
            <rect x="282" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 287 111.5)" />
            <rect x="177" y="82" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-14 182 84.5)" />
            <rect x="174" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 179 109.5)" />
            <rect x="339" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 344 116.5)" />
            <rect x="220" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(15 225 104.5)" />
            <rect x="247" y="88" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 252 90.5)" />
            <rect x="298" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 303 113.5)" />
            <rect x="334" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(15 339 115.5)" />
            <rect x="316" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 321 105.5)" />
            <rect x="235" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 240 107.5)" />
            <rect x="237" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 242 106.5)" />
            <rect x="176" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 181 112.5)" />
            <rect x="239" y="89" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 244 91.5)" />
            <rect x="328" y="112" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 333 114.5)" />
            <rect x="258" y="88" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 263 90.5)" />
            <rect x="225" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 230 115.5)" />
            <rect x="181" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 186 116.5)" />
            <rect x="172" y="112" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 177 114.5)" />
            <rect x="256" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 261 115.5)" />
            <rect x="213" y="68" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 218 70.5)" />
            <rect x="213" y="94" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 218 96.5)" />
            <rect x="168" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 173 95.5)" />
            <rect x="217" y="61" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 222 63.5)" />
            <rect x="314" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(8 319 108.5)" />
            <rect x="215" y="81" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 220 83.5)" />
            <rect x="130" y="108" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-6 135 110.5)" />
            <rect x="174" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 179 106.5)" />
            <rect x="327" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-3 332 108.5)" />
            <rect x="178" y="81" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-3 183 83.5)" />
            <rect x="248" y="112" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 253 114.5)" />
            <rect x="287" y="94" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 292 96.5)" />
            <rect x="172" y="78" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 177 80.5)" />
            <rect x="148" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 153 107.5)" />
            <rect x="253" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 258 93.5)" />
            <rect x="92" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 97 116.5)" />
            <rect x="241" y="72" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 246 74.5)" />
            <rect x="183" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 188 109.5)" />
            <rect x="179" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 184 104.5)" />
            <rect x="224" y="74" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 229 76.5)" />
            <rect x="232" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 237 109.5)" />
            <rect x="147" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 152 95.5)" />
            <rect x="263" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 268 97.5)" />
            <rect x="216" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 221 103.5)" />
            <rect x="214" y="67" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 219 69.5)" />
            <rect x="287" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 292 103.5)" />
            <rect x="340" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(13 345 111.5)" />
            <rect x="116" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 121 112.5)" />
            <rect x="249" y="97" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(18 254 99.5)" />
            <rect x="284" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 289 108.5)" />
            <rect x="167" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 172 111.5)" />
            <rect x="299" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 304 104.5)" />
            <rect x="160" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 165 93.5)" />
            <rect x="227" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 232 97.5)" />
            <rect x="147" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 152 92.5)" />
            <rect x="212" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-14 217 93.5)" />
            <rect x="272" y="88" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 277 90.5)" />
            <rect x="214" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 219 85.5)" />
            <rect x="198" y="87" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 203 89.5)" />
            <rect x="105" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 110 112.5)" />
            <rect x="282" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 287 112.5)" />
            <rect x="215" y="80" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 220 82.5)" />
            <rect x="224" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(18 229 109.5)" />
            <rect x="133" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 138 107.5)" />
            <rect x="268" y="86" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 273 88.5)" />
            <rect x="206" y="82" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 211 84.5)" />
            <rect x="225" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 230 85.5)" />
            <rect x="189" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-18 194 100.5)" />
            <rect x="226" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 231 85.5)" />
            <rect x="304" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 309 97.5)" />
            <rect x="234" y="67" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 239 69.5)" />
            <rect x="232" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 237 104.5)" />
            <rect x="271" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(13 276 108.5)" />
            <rect x="219" y="61" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 224 63.5)" />
            <rect x="244" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-6 249 116.5)" />
            <rect x="158" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 163 106.5)" />
            <rect x="135" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-12 140 115.5)" />
            <rect x="254" y="78" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(6 259 80.5)" />
            <rect x="224" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 229 93.5)" />
            <rect x="188" y="79" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 193 81.5)" />
            <rect x="122" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 127 112.5)" />
            <rect x="285" y="88" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-18 290 90.5)" />
            <rect x="80" y="115" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 85 117.5)" />
            <rect x="278" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 283 107.5)" />
            <rect x="204" y="99" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 209 101.5)" />
            <rect x="302" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 307 113.5)" />
            <rect x="281" y="87" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 286 89.5)" />
            <rect x="231" y="86" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-5 236 88.5)" />
            <rect x="165" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-6 170 100.5)" />
            <rect x="285" y="88" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(18 290 90.5)" />
            <rect x="129" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(13 134 109.5)" />
            <rect x="202" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(18 207 104.5)" />
            <rect x="158" y="92" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(12 163 94.5)" />
            <rect x="153" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(9 158 100.5)" />
            <rect x="203" y="79" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 208 81.5)" />
            <rect x="232" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 237 111.5)" />
            <rect x="197" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 202 92.5)" />
            <rect x="209" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-12 214 109.5)" />
            <rect x="229" y="74" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(11 234 76.5)" />
            <rect x="153" y="106" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 158 108.5)" />
            <rect x="324" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 329 103.5)" />
            <rect x="302" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 307 105.5)" />
            <rect x="269" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 274 105.5)" />
            <rect x="113" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 118 105.5)" />
            <rect x="226" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 231 100.5)" />
            <rect x="160" y="100" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 165 102.5)" />
            <rect x="186" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-6 191 106.5)" />
            <rect x="206" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 211 79.5)" />
            <rect x="174" y="85" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 179 87.5)" />
            <rect x="120" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-11 125 104.5)" />
            <rect x="197" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(8 202 93.5)" />
            <rect x="292" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 297 97.5)" />
            <rect x="209" y="74" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 214 76.5)" />
            <rect x="224" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 229 92.5)" />
            <rect x="229" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 234 115.5)" />
            <rect x="209" y="108" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 214 110.5)" />
            <rect x="190" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 195 111.5)" />
            <rect x="156" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-17 161 92.5)" />
            <rect x="232" y="112" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 237 114.5)" />
            <rect x="246" y="73" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 251 75.5)" />
            <rect x="165" y="83" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-14 170 85.5)" />
            <rect x="172" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 177 116.5)" />
            <rect x="200" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 205 105.5)" />
            <rect x="230" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 235 92.5)" />
            <rect x="178" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 183 95.5)" />
            <rect x="271" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 276 103.5)" />
            <rect x="216" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 221 103.5)" />
            <rect x="230" y="97" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 235 99.5)" />
            <rect x="259" y="82" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 264 84.5)" />
            <rect x="285" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 290 105.5)" />
            <rect x="221" y="73" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(8 226 75.5)" />
            <rect x="200" y="100" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(16 205 102.5)" />
            <rect x="156" y="108" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 161 110.5)" />
            <rect x="145" y="100" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 150 102.5)" />
            <rect x="101" y="112" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(16 106 114.5)" />
            <rect x="230" y="72" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 235 74.5)" />
            <rect x="199" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 204 105.5)" />
            <rect x="212" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 217 100.5)" />
            <rect x="250" y="112" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 255 114.5)" />
            <rect x="195" y="71" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 200 73.5)" />
            <rect x="220" y="77" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 225 79.5)" />
            <rect x="340" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(3 345 115.5)" />
            <rect x="303" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 308 115.5)" />
            <rect x="197" y="70" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 202 72.5)" />
            <rect x="178" y="94" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(6 183 96.5)" />
            <rect x="252" y="97" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 257 99.5)" />
            <rect x="200" y="91" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 205 93.5)" />
            <rect x="188" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 193 103.5)" />
            <rect x="264" y="89" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 269 91.5)" />
            <rect x="185" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 190 109.5)" />
            <rect x="340" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-7 345 112.5)" />
            <rect x="149" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 154 100.5)" />
            <rect x="340" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(6 345 116.5)" />
            <rect x="160" y="89" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-5 165 91.5)" />
            <rect x="203" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(5 208 105.5)" />
            <rect x="222" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 227 92.5)" />
            <rect x="179" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 184 95.5)" />
            <rect x="336" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 341 113.5)" />
            <rect x="331" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 336 107.5)" />
            <rect x="194" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(16 199 116.5)" />
            <rect x="211" y="87" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-15 216 89.5)" />
            <rect x="254" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 259 105.5)" />
            <rect x="158" y="92" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(13 163 94.5)" />
            <rect x="264" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 269 100.5)" />
            <rect x="214" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 219 112.5)" />
            <rect x="307" y="99" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(11 312 101.5)" />
            <rect x="137" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(17 142 103.5)" />
            <rect x="108" y="107" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-8 113 109.5)" />
            <rect x="214" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 219 95.5)" />
            <rect x="186" y="95" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-6 191 97.5)" />
            <rect x="222" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 227 92.5)" />
            <rect x="169" y="86" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 174 88.5)" />
            <rect x="234" y="93" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 239 95.5)" />
            <rect x="222" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(8 227 103.5)" />
            <rect x="202" y="105" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-4 207 107.5)" />
            <rect x="162" y="114" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 167 116.5)" />
            <rect x="124" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(0 129 100.5)" />
            <rect x="117" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 122 115.5)" />
            <rect x="154" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 159 103.5)" />
            <rect x="209" y="97" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-13 214 99.5)" />
            <rect x="159" y="98" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(18 164 100.5)" />
            <rect x="171" y="102" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 176 104.5)" />
            <rect x="298" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(14 303 113.5)" />
            <rect x="181" y="103" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(10 186 105.5)" />
            <rect x="255" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-18 260 111.5)" />
            <rect x="297" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(19 302 115.5)" />
            <rect x="255" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 260 106.5)" />
            <rect x="289" y="111" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 294 113.5)" />
            <rect x="269" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(16 274 106.5)" />
            <rect x="322" y="104" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-5 327 106.5)" />
            <rect x="250" y="78" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(1 255 80.5)" />
            <rect x="122" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-16 127 103.5)" />
            <rect x="177" y="110" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(4 182 112.5)" />
            <rect x="227" y="70" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-1 232 72.5)" />
            <rect x="340" y="109" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-9 345 111.5)" />
            <rect x="328" y="113" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(7 333 115.5)" />
            <rect x="226" y="70" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-2 231 72.5)" />
            <rect x="174" y="101" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-3 179 103.5)" />
            <rect x="285" y="92" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(13 290 94.5)" />
            <rect x="238" y="90" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(-10 243 92.5)" />
            <rect x="276" y="100" width="10" height="5" stroke="#475569" stroke-width="0.5" fill="none" transform="rotate(2 281 102.5)" />


          <!-- Dimension Lines -->
          <g stroke="#38BDF8" stroke-width="0.5" opacity="0.5">
            <line x1="80" y1="355" x2="480" y2="355" />
            <line x1="80" y1="350" x2="80" y2="360" />
            <line x1="480" y1="350" x2="480" y2="360" />
            <text x="280" y="352" font-family="monospace" font-size="8" fill="#38BDF8" stroke="none" text-anchor="middle">L=10400mm</text>
            
            <line x1="60" y1="120" x2="60" y2="260" />
            <line x1="55" y1="120" x2="65" y2="120" />
            <line x1="55" y1="260" x2="65" y2="260" />
            <text x="50" y="190" font-family="monospace" font-size="8" fill="#38BDF8" stroke="none" transform="rotate(-90 50 190)" text-anchor="middle">H=2400mm</text>
            
            <line x1="220" y1="40" x2="250" y2="80" />
            <line x1="250" y1="80" x2="270" y2="80" />
            <text x="275" y="82" font-family="monospace" font-size="8" fill="#FBBF24" stroke="none">MAX PAYLOAD: 35 TONNES</text>
          </g>


          <g transform="translate(130, 315)">
            <circle class="wheel-spin" cx="0" cy="0" r="35" stroke="#94A3B8" stroke-width="1.5" fill="rgba(15,23,42,0.8)"/>
            <circle class="wheel-spin" cx="0" cy="0" r="28" stroke="#475569" stroke-width="1" stroke-dasharray="4,2" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="18" stroke="#38BDF8" stroke-width="1" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="5" stroke="#38BDF8" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="1" fill="#38BDF8"/>
            <g class="wheel-spin">
              <path d="M 0 -18 L 0 -5 M 0 18 L 0 5 M -18 0 L -5 0 M 18 0 L 5 0 M -12 -12 L -3.5 -3.5 M 12 12 L 3.5 3.5 M -12 12 L -3.5 3.5 M 12 -12 L 3.5 -3.5" stroke="#38BDF8" stroke-width="1"/>
              <!-- Treads on the outer rim -->
              <path d="M 0 -35 L 0 -38 M 12 -33 L 13 -36 M 24 -26 L 27 -28 M 32 -13 L 35 -14 M 35 0 L 38 0 M 32 13 L 35 14 M 24 26 L 27 28 M 12 33 L 13 36 M 0 35 L 0 38 M -12 33 L -13 36 M -24 26 L -27 28 M -32 13 L -35 14 M -35 0 L -38 0 M -32 -13 L -35 -14 M -24 -26 L -27 -28 M -12 -33 L -13 -36" stroke="#94A3B8" stroke-width="1.5"/>
            </g>
          </g>
    

          <g transform="translate(210, 315)">
            <circle class="wheel-spin" cx="0" cy="0" r="35" stroke="#94A3B8" stroke-width="1.5" fill="rgba(15,23,42,0.8)"/>
            <circle class="wheel-spin" cx="0" cy="0" r="28" stroke="#475569" stroke-width="1" stroke-dasharray="4,2" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="18" stroke="#38BDF8" stroke-width="1" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="5" stroke="#38BDF8" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="1" fill="#38BDF8"/>
            <g class="wheel-spin">
              <path d="M 0 -18 L 0 -5 M 0 18 L 0 5 M -18 0 L -5 0 M 18 0 L 5 0 M -12 -12 L -3.5 -3.5 M 12 12 L 3.5 3.5 M -12 12 L -3.5 3.5 M 12 -12 L 3.5 -3.5" stroke="#38BDF8" stroke-width="1"/>
              <!-- Treads on the outer rim -->
              <path d="M 0 -35 L 0 -38 M 12 -33 L 13 -36 M 24 -26 L 27 -28 M 32 -13 L 35 -14 M 35 0 L 38 0 M 32 13 L 35 14 M 24 26 L 27 28 M 12 33 L 13 36 M 0 35 L 0 38 M -12 33 L -13 36 M -24 26 L -27 28 M -32 13 L -35 14 M -35 0 L -38 0 M -32 -13 L -35 -14 M -24 -26 L -27 -28 M -12 -33 L -13 -36" stroke="#94A3B8" stroke-width="1.5"/>
            </g>
          </g>
    

          <g transform="translate(420, 315)">
            <circle class="wheel-spin" cx="0" cy="0" r="35" stroke="#94A3B8" stroke-width="1.5" fill="rgba(15,23,42,0.8)"/>
            <circle class="wheel-spin" cx="0" cy="0" r="28" stroke="#475569" stroke-width="1" stroke-dasharray="4,2" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="18" stroke="#38BDF8" stroke-width="1" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="5" stroke="#38BDF8" fill="none"/>
            <circle class="wheel-spin" cx="0" cy="0" r="1" fill="#38BDF8"/>
            <g class="wheel-spin">
              <path d="M 0 -18 L 0 -5 M 0 18 L 0 5 M -18 0 L -5 0 M 18 0 L 5 0 M -12 -12 L -3.5 -3.5 M 12 12 L 3.5 3.5 M -12 12 L -3.5 3.5 M 12 -12 L 3.5 -3.5" stroke="#38BDF8" stroke-width="1"/>
              <!-- Treads on the outer rim -->
              <path d="M 0 -35 L 0 -38 M 12 -33 L 13 -36 M 24 -26 L 27 -28 M 32 -13 L 35 -14 M 35 0 L 38 0 M 32 13 L 35 14 M 24 26 L 27 28 M 12 33 L 13 36 M 0 35 L 0 38 M -12 33 L -13 36 M -24 26 L -27 28 M -32 13 L -35 14 M -35 0 L -38 0 M -32 -13 L -35 -14 M -24 -26 L -27 -28 M -12 -33 L -13 -36" stroke="#94A3B8" stroke-width="1.5"/>
            </g>
          </g>
    
        </g>
      </svg>

    `;
    
    document.body.appendChild(loaderWrap);
  }

  
  function injectBgCrane() {
    if (document.getElementById('clm-bg-crane')) return;
    const bgCrane = document.createElement('div');
    bgCrane.id = 'clm-bg-crane';
    bgCrane.style.cssText = 'position: fixed; bottom: 0; right: 0; width: 600px; height: 500px; pointer-events: none; z-index: 9999; opacity: 0.2; transition: opacity 0.5s ease;';
    bgCrane.innerHTML = `
<svg width="100%" height="100%" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="latticeMast" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0,12 L12,0 M12,12 L0,0" fill="none" stroke="#FBBF24" stroke-width="0.8"/>
            <rect x="0" y="0" width="12" height="12" fill="none" stroke="#FBBF24" stroke-width="0.5"/>
          </pattern>
          <pattern id="latticeJib" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0,12 L12,0 M12,12 L0,0" fill="none" stroke="#FBBF24" stroke-width="0.8"/>
            <rect x="0" y="0" width="12" height="12" fill="none" stroke="#FBBF24" stroke-width="0.5"/>
          </pattern>
        </defs>

        <style>
          /* CRANE 12s LOOP */
          .sim-trolley { animation: trolley-move 12s ease-in-out infinite; }
          .sim-hook-block { animation: hook-move 12s ease-in-out infinite; }
          .sim-cable { transform-origin: top center; animation: cable-stretch 12s ease-in-out infinite; }
          .sim-rebar-lift { animation: rebar-lift 12s step-end infinite; }
          
          @keyframes trolley-move {
            0%, 15% { transform: translateX(300px); }
            25%, 40% { transform: translateX(300px); }
            50%, 65% { transform: translateX(90px); }
            75%, 90% { transform: translateX(90px); }
            100% { transform: translateX(300px); }
          }
          @keyframes hook-move {
            0%, 5% { transform: translateY(270px); }
            15%, 40% { transform: translateY(5px); }
            50%, 55% { transform: translateY(5px); }
            60%, 65% { transform: translateY(20px); }
            75%, 95% { transform: translateY(5px); }
            100% { transform: translateY(270px); }
          }
          @keyframes cable-stretch {
            0%, 5% { transform: scaleY(270); }
            15%, 40% { transform: scaleY(5); }
            50%, 55% { transform: scaleY(5); }
            60%, 65% { transform: scaleY(20); }
            75%, 95% { transform: scaleY(5); }
            100% { transform: scaleY(270); }
          }
          @keyframes rebar-lift {
            0%, 62.5% { opacity: 1; }
            62.6%, 100% { opacity: 0; }
          }

          /* 36s NARRATIVE LOOP FOR BARS */
          .pile-1 { animation: pile-1 36s step-end infinite; }
          .pile-2 { animation: pile-2 36s step-end infinite; }
          .pile-3 { animation: pile-3 36s step-end infinite; }
          
          .truck-bar-1 { animation: truck-bar-1 36s step-end infinite; }
          .truck-bar-2 { animation: truck-bar-2 36s step-end infinite; }
          .truck-bar-3 { animation: truck-bar-3 36s step-end infinite; }

          @keyframes pile-1 { 0%, 20.8% { opacity: 0; } 20.81%, 100% { opacity: 1; } }
          @keyframes pile-2 { 0%, 54.2% { opacity: 0; } 54.21%, 100% { opacity: 1; } }
          @keyframes pile-3 { 0%, 87.5% { opacity: 0; } 87.51%, 100% { opacity: 1; } }

          @keyframes truck-bar-1 { 0%, 6.9% { opacity: 1; } 6.91%, 100% { opacity: 0; } }
          @keyframes truck-bar-2 { 0%, 40.3% { opacity: 1; } 40.31%, 100% { opacity: 0; } }
          @keyframes truck-bar-3 { 0%, 73.6% { opacity: 1; } 73.61%, 100% { opacity: 0; } }
        </style>

        <!-- BASELINE / GROUND -->
        <line x1="20" y1="440" x2="580" y2="440" stroke="#CBD5E1" stroke-width="0.5" opacity="0.5"/>

        <!-- COMPLEX 8-STORY BUILDING -->
        <g id="sim-building" transform="translate(50, 440)">
          <defs>
            <pattern id="masonry2" width="16" height="8" patternUnits="userSpaceOnUse">
              <rect width="16" height="8" fill="#0F172A" stroke="#475569" stroke-width="0.5"/>
              <line x1="8" y1="0" x2="8" y2="4" stroke="#475569" stroke-width="0.5"/>
              <line x1="0" y1="4" x2="16" y2="4" stroke="#475569" stroke-width="0.5"/>
              <line x1="0" y1="8" x2="16" y2="8" stroke="#475569" stroke-width="0.5"/>
            </pattern>
            <pattern id="scaffold" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0,8 L8,0 M8,8 L0,0" fill="none" stroke="#F59E0B" stroke-width="0.3" opacity="0.6"/>
            </pattern>
          </defs>

          <!-- INTERIORS & WALLS -->
          <!-- Floor 1 (0 to -32): Full Masonry -->
          <rect x="0" y="-32" width="180" height="32" fill="url(#masonry2)"/>
          <!-- Doors in Bay 2 & 3 -->
          <rect x="55" y="-24" width="25" height="24" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" stroke-width="0.8"/>
          <rect x="100" y="-24" width="25" height="24" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" stroke-width="0.8"/>
          
          <!-- Floor 2 (-32 to -64): Masonry Outer, Glass Inner -->
          <rect x="0" y="-64" width="45" height="32" fill="url(#masonry2)"/>
          <rect x="135" y="-64" width="45" height="32" fill="url(#masonry2)"/>
          <rect x="45" y="-64" width="90" height="32" fill="rgba(14, 165, 233, 0.15)" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="45" y1="-48" x2="135" y2="-48" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="90" y1="-64" x2="90" y2="-32" stroke="#38BDF8" stroke-width="0.5"/>

          <!-- Floor 3 (-64 to -96): Full Glass Curtain Wall -->
          <rect x="0" y="-96" width="180" height="32" fill="rgba(14, 165, 233, 0.12)" />
          <line x1="0" y1="-80" x2="180" y2="-80" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="22.5" y1="-96" x2="22.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="67.5" y1="-96" x2="67.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="112.5" y1="-96" x2="112.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="157.5" y1="-96" x2="157.5" y2="-64" stroke="#38BDF8" stroke-width="0.5"/>

          <!-- Floor 4 (-96 to -128): Full Glass Curtain Wall -->
          <rect x="0" y="-128" width="180" height="32" fill="rgba(14, 165, 233, 0.12)" />
          <line x1="0" y1="-112" x2="180" y2="-112" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="22.5" y1="-128" x2="22.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="67.5" y1="-128" x2="67.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="112.5" y1="-128" x2="112.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>
          <line x1="157.5" y1="-128" x2="157.5" y2="-96" stroke="#38BDF8" stroke-width="0.5"/>

          <!-- Floor 5 (-128 to -160): Scaffold / Installation -->
          <rect x="0" y="-160" width="180" height="32" fill="url(#scaffold)"/>
          <line x1="0" y1="-144" x2="180" y2="-144" stroke="#94A3B8" stroke-width="0.5" stroke-dasharray="2,2"/>
          
          <!-- Floors 6, 7, 8: Bare Steel (no background walls needed) -->
          <!-- X-Bracing for Core in Floor 6 & 7 (Bay 2 & 3) -->
          <line x1="45" y1="-160" x2="135" y2="-224" stroke="#64748B" stroke-width="0.5"/>
          <line x1="135" y1="-160" x2="45" y2="-224" stroke="#64748B" stroke-width="0.5"/>
          
          <!-- COLUMNS (Drawn over walls, under slabs) -->
          <g stroke="#64748B" stroke-width="1.5">
            <line x1="0" y1="0" x2="0" y2="-256" />
            <line x1="4" y1="0" x2="4" y2="-256" />
            <line x1="45" y1="0" x2="45" y2="-256" />
            <line x1="49" y1="0" x2="49" y2="-256" />
            <line x1="90" y1="0" x2="90" y2="-256" />
            <line x1="94" y1="0" x2="94" y2="-256" />
            <line x1="135" y1="0" x2="135" y2="-256" />
            <line x1="139" y1="0" x2="139" y2="-256" />
            <line x1="180" y1="0" x2="180" y2="-256" />
            <line x1="184" y1="0" x2="184" y2="-256" />
          </g>
          
          <!-- SLABS -->
          <!-- Ground Base -->
          <rect x="-5" y="0" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-32" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-64" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-96" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-128" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-160" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-192" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          <rect x="-5" y="-224" width="194" height="4" fill="#0F172A" stroke="#94A3B8" stroke-width="0.8"/>
          
          <!-- Top Active Slab (Orange) -->
          <rect x="-5" y="-256" width="194" height="4" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,2"/>
          
          <!-- Formwork Struts (Connecting top slab to columns) -->
          <line x1="22.5" y1="-252" x2="22.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>
          <line x1="67.5" y1="-252" x2="67.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>
          <line x1="112.5" y1="-252" x2="112.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>
          <line x1="157.5" y1="-252" x2="157.5" y2="-224" stroke="#F59E0B" stroke-width="0.8"/>

          <!-- PILING REBARS ON TOP SLAB -->
          <g transform="translate(90, -259)">
            <g class="pile-1">
              <line x1="-35" y1="0" x2="35" y2="0" stroke="#64748B" stroke-width="2"/>
              <line x1="-25" y1="-1" x2="-25" y2="1" stroke="#334155" stroke-width="1"/>
              <line x1="25" y1="-1" x2="25" y2="1" stroke="#334155" stroke-width="1"/>
            </g>
            <g class="pile-2">
              <line x1="-35" y1="-3" x2="35" y2="-3" stroke="#64748B" stroke-width="2"/>
              <line x1="-15" y1="-4" x2="-15" y2="-2" stroke="#334155" stroke-width="1"/>
              <line x1="15" y1="-4" x2="15" y2="-2" stroke="#334155" stroke-width="1"/>
            </g>
            <g class="pile-3">
              <line x1="-35" y1="-6" x2="35" y2="-6" stroke="#64748B" stroke-width="2"/>
              <line x1="-5" y1="-7" x2="-5" y2="-5" stroke="#334155" stroke-width="1"/>
              <line x1="5" y1="-7" x2="5" y2="-5" stroke="#334155" stroke-width="1"/>
            </g>
          </g>
        </g>

        <!-- TRUCK (Thinner, realistic lines) -->
        <g id="sim-truck" transform="translate(310, 425)">
          <rect x="0" y="5" width="100" height="4" fill="none" stroke="#64748B" stroke-width="1"/>
          <circle cx="20" cy="14" r="5" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="20" cy="14" r="2" fill="#1E293B"/>
          <circle cx="45" cy="14" r="5" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="45" cy="14" r="2" fill="#1E293B"/>
          <path d="M 100,9 L 115,9 L 122,2 L 122,-5 L 105,-5 Z" fill="none" stroke="#38BDF8" stroke-width="1"/>
          <path d="M 107,-2 L 118,-2 L 118,2 L 107,2 Z" fill="none" stroke="#0284C7" stroke-width="0.5"/>
          <circle cx="112" cy="14" r="5" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <circle cx="112" cy="14" r="2" fill="#1E293B"/>
          
          <g class="truck-bar-3">
            <line x1="10" y1="3" x2="90" y2="3" stroke="#64748B" stroke-width="2"/>
          </g>
          <g class="truck-bar-2">
            <line x1="10" y1="0" x2="90" y2="0" stroke="#64748B" stroke-width="2"/>
          </g>
          <g class="truck-bar-1">
            <line x1="10" y1="-3" x2="90" y2="-3" stroke="#64748B" stroke-width="2"/>
          </g>
        </g>

        <!-- CRANE MAST -->
        <g id="sim-mast" transform="translate(450, 70)">
          <line x1="0" y1="0" x2="0" y2="370" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="24" y1="0" x2="24" y2="370" stroke="#FBBF24" stroke-width="1.5"/>
          <rect x="0" y="0" width="24" height="370" fill="url(#latticeMast)" />
        </g>

        <!-- CRANE JIB & CABIN -->
        <g id="sim-jib-assembly" transform="translate(50, 70)">
          <line x1="400" y1="20" x2="520" y2="20" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="400" y1="32" x2="520" y2="32" stroke="#FBBF24" stroke-width="1.5"/>
          <rect x="400" y="20" width="120" height="12" fill="url(#latticeJib)" />
          
          <rect x="470" y="10" width="6" height="30" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <rect x="480" y="10" width="6" height="30" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <rect x="490" y="10" width="6" height="30" fill="none" stroke="#94A3B8" stroke-width="1"/>
          <line x1="470" y1="15" x2="496" y2="15" stroke="#94A3B8" stroke-width="0.5"/>
          
          <rect x="380" y="32" width="16" height="12" fill="none" stroke="#38BDF8" stroke-width="1"/>
          <line x1="380" y1="38" x2="396" y2="38" stroke="#38BDF8" stroke-width="0.5"/>
          
          <polygon points="400,20 412,-30 424,20" fill="none" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="412" y1="-30" x2="250" y2="20" stroke="#E2E8F0" stroke-width="0.5"/>
          <line x1="412" y1="-30" x2="100" y2="20" stroke="#E2E8F0" stroke-width="0.5"/>
          <line x1="412" y1="-30" x2="510" y2="20" stroke="#E2E8F0" stroke-width="0.5"/>

          <line x1="0" y1="20" x2="400" y2="20" stroke="#FBBF24" stroke-width="1.5"/>
          <line x1="0" y1="32" x2="400" y2="32" stroke="#FBBF24" stroke-width="1.5"/>
          <rect x="0" y="20" width="400" height="12" fill="url(#latticeJib)" />
          
          <!-- TROLLEY & HOIST -->
          <g class="sim-trolley">
            <rect x="-10" y="34" width="20" height="6" fill="none" stroke="#F59E0B" stroke-width="1"/>
            <circle cx="-5" cy="34" r="2" fill="#F59E0B"/>
            <circle cx="5" cy="34" r="2" fill="#F59E0B"/>
            
            <g transform="translate(0, 40)">
              <line x1="-8" y1="0" x2="-8" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              <line x1="-2" y1="0" x2="-2" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              <line x1="2" y1="0" x2="2" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              <line x1="8" y1="0" x2="8" y2="1" class="sim-cable" stroke="#E2E8F0" stroke-width="0.5"/>
              
              <g class="sim-hook-block">
                <rect x="-12" y="0" width="24" height="8" fill="none" stroke="#FBBF24" stroke-width="1"/>
                <circle cx="-6" cy="4" r="2" fill="none" stroke="#1E293B" stroke-width="0.5"/>
                <circle cx="6" cy="4" r="2" fill="none" stroke="#1E293B" stroke-width="0.5"/>
                <path d="M 0,8 Q 4,12 0,16 Q -4,16 -4,12" fill="none" stroke="#FBBF24" stroke-width="1.5"/>
                
                <g class="sim-rebar-lift" transform="translate(0, 16)">
                  <line x1="0" y1="0" x2="-35" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  <line x1="0" y1="0" x2="35" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  <line x1="0" y1="0" x2="-15" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  <line x1="0" y1="0" x2="15" y2="25" stroke="#FBBF24" stroke-width="0.5" />
                  
                  <line x1="-40" y1="25" x2="40" y2="25" stroke="#64748B" stroke-width="2"/>
                  <line x1="-20" y1="24" x2="-20" y2="26" stroke="#334155" stroke-width="1"/>
                  <line x1="20" y1="24" x2="20" y2="26" stroke="#334155" stroke-width="1"/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `;
    document.body.appendChild(bgCrane);
  }

  function init() {

  // Global CSS overrides for image backgrounds being cut off
  if (!document.getElementById('clm-global-fixes')) {
    const style = document.createElement('style');
    style.id = 'clm-global-fixes';
    style.innerHTML = `
      div[style*="background-image"],
      section[style*="background-image"],
      .hero, .banner, .page-header {
        background-position: center 20% !important; 
      }
      /* If 20% is still cutting heads, maybe top center */
      /* top center might cut the bottom, which is usually fine */
      div[style*="background-image"], section[style*="background-image"] {
        background-position: center 10% !important;
      }
    `;
    document.head.appendChild(style);
  }

    // createFloatingBadge(); // Removed floating badge as requested
    enhanceNavbar();
    renderAmbientAnimations();
    injectMinimalText();
    injectHeroAnimation();
    injectLoaderTruckAnimation();
    injectBgCrane();
    injectAboutAnimation();
    
    // Observe React DOM updates
    const rootEl = document.getElementById('root');
    if (rootEl) {
      const observer = new MutationObserver(() => {

        // Revert to foolproof text-based page detection
        const text = document.body.textContent;
        const isHome = text.includes('We provide end-to-end planning') || text.includes('Pioneering Infrastructure');
        const isAbout = text.includes('BUILT ON TRUST') || text.includes('Founded in 2023');
        const isServices = text.includes('Our Services');
        const isProjects = text.includes('Our Projects') || text.includes('Project Gallery');
        const isContact = text.includes('Contact Us') && !isHome; // Just an approximation
        
        // Get elements
        const bgMixer = document.getElementById('clm-about-mixer');
        const bgTruck = document.getElementById('clm-driving-truck');
        const bgCrane = document.getElementById('clm-bg-crane');
        
        // Hide all backgrounds by default
        if (bgMixer) bgMixer.style.display = 'none';
        if (bgTruck) bgTruck.style.display = 'none';
        if (bgCrane) bgCrane.style.display = 'none';
        
        // Distribute safely
        if (isHome) {
            // Home has Hero Crane
        } else if (isAbout) {
            if (bgMixer) bgMixer.style.display = 'block';
        } else if (isServices) {
            if (bgTruck) bgTruck.style.display = 'block';
        } else if (isProjects) {
            if (bgCrane) bgCrane.style.display = 'block';
        } else {
            // Fallback for contact or any other pages
            if (bgMixer) bgMixer.style.display = 'block';
        }

        enhanceNavbar();
        injectMinimalText();
    injectHeroAnimation();
    injectLoaderTruckAnimation();
    injectBgCrane();
    injectAboutAnimation();
        injectLoaderTruckAnimation();
      });
      observer.observe(rootEl, { childList: true, subtree: true });
    }
  }

  // Expose global modal opener
  window.openIsoCertificateModal = openCertificateModal;

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
