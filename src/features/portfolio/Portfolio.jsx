import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';
import styles from './Portfolio.module.css';
import crest from '../../assets/Lara.png';
import {
  CAREER_TRACKS,
  getResumeForTrack,
  getTrackById,
  resumeHref,
} from '../../data/careerTracks';
import { EXPERIENCE, PROFILE, PROOF_POINTS } from '../../data/profile';

const Icon = ({ children }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const DownloadIcon = () => (
  <Icon>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Icon>
);

const ArrowDownIcon = () => (
  <Icon>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Icon>
);

const BackToTopGraphic = () => {
  const motionRef = useRef(null);

  useEffect(() => {
    const el = motionRef.current;
    if (!el) return undefined;

    let frameId = 0;
    let start = 0;
    const duration = 5500;
    const distance = 50;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % duration) / duration;
      const hidden = el.offsetHeight;
      const y = hidden - distance * progress;
      el.style.transform = `translateY(${y}px)`;
      el.style.opacity = String(1 - progress);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <span ref={motionRef} className={styles.backToTopMotion}>
      <svg
        className={styles.backToTopGraphic}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path d="M12 18l12-12 12 12" />
        <path d="M12 26l12-12 12 12" />
      </svg>
    </span>
  );
};

const Portfolio = ({ trackId }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const activeResume = getResumeForTrack(trackId);
  const activeTrack = getTrackById(trackId);
  const seeking = activeTrack?.seeking ?? PROFILE.seeking;
  const roleLine = activeTrack?.targetRole ?? PROFILE.roleLine;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trackId]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrandClick = (event) => {
    if (!trackId) {
      scrollToSection(event, 'about');
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.nav}`}>
          <Link className={styles.brand} to="/" onClick={handleBrandClick}>
            <img
              className={styles.monogram}
              src={crest}
              alt=""
            />
            <span className={styles.brandName}>{PROFILE.name}</span>
          </Link>
          <nav className={styles.links} aria-label="Primary navigation">
            <a
              className={`${styles.navLink} ${styles.headerEmail}`}
              href={`mailto:${PROFILE.email}`}
            >
              {PROFILE.email}
            </a>
            <a
              className={styles.navLink}
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {PROFILE.linkedinLabel}
            </a>
            <a
              className={styles.resume}
              href={resumeHref(activeResume.filename)}
              download={activeResume.filename}
            >
              <DownloadIcon /> Résumé PDF
            </a>
            <Link className={styles.quietLink} to="/resume">
              Online résumé
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section className={`${styles.shell} ${styles.hero}`} id="about">
          <div>
            <p className={styles.kicker}>{seeking}</p>
            <h1 className={styles.title}>{PROFILE.name}</h1>
            <p className={styles.roleLine}>{roleLine}</p>
            <p className={styles.lead}>{PROFILE.lead}</p>
            <dl className={styles.proof}>
              {PROOF_POINTS.map((point) => (
                <div key={point.value} className={styles.proofItem}>
                  <dt>{point.value}</dt>
                  <dd>{point.label}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.contactRow}>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {PROFILE.linkedinLabel}
              </a>
              <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
            </div>
            <div className={styles.actions}>
              <a
                className={styles.primary}
                href={resumeHref(activeResume.filename)}
                download={activeResume.filename}
              >
                Download Résumé <DownloadIcon />
              </a>
              <a
                className={styles.secondary}
                href="#experience"
                onClick={(event) => scrollToSection(event, 'experience')}
              >
                View Leadership Experience <ArrowDownIcon />
              </a>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setShowContact(true)}
              >
                Send a message
              </button>
            </div>
          </div>
          <div className={styles.portrait}>
            <img
              className={styles.portraitImage}
              src={`${process.env.PUBLIC_URL}/EzekMugPic.jpg`}
              alt="Ezekiel Lara"
            />
          </div>
        </section>
        <section className={`${styles.shell} ${styles.expertise}`} id="expertise">
          <div className={styles.expertiseIntro}>
            <div className={styles.kicker}>SUPPORTING DEPTH</div>
            <h2 className={styles.heading}>
              Same leadership identity. Targeted proof when a role needs it.
            </h2>
            <p className={styles.sectionIntro}>
              The homepage résumé is the Engineering Lead version. Use a
              track page or its PDF only when an application is specifically
              mobile, leadership, or Temenos.
            </p>
          </div>
          <div className={styles.expertiseGrid}>
            {CAREER_TRACKS.map((track) => {
              const isActive = track.id === trackId;

              return (
                <article
                  key={track.id}
                  className={`${styles.expertiseCard} ${
                    isActive
                      ? styles.expertiseCardActive
                      : trackId
                        ? styles.expertiseCardInactive
                        : ''
                  }`}
                >
                  <p className={styles.expertiseTrack}>{track.careerTrack}</p>
                  <h3 className={styles.expertiseTitle}>
                    {track.websiteLabel}
                  </h3>
                  <p className={styles.expertiseSummary}>{track.summary}</p>
                  <div className={styles.expertiseActions}>
                    {track.proof && (
                      <a
                        className={styles.proofLink}
                        href={track.proof.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>{track.proof.label}</strong>
                      </a>
                    )}
                    {!isActive && (
                      <Link className={styles.cardLink} to={track.path}>
                        View {track.websiteLabel}
                      </Link>
                    )}
                    <a
                      className={styles.cardDownload}
                      href={resumeHref(track.resume.filename)}
                      download={track.resume.filename}
                    >
                      {track.resume.buttonLabel}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section className={`${styles.shell} ${styles.content}`} id="experience">
          <div>
            <div className={styles.kicker}>LEADERSHIP EXPERIENCE</div>
            <h2 className={styles.heading}>
              Teams, platforms, and measurable delivery.
            </h2>
            <p className={styles.sectionIntro}>
              Named employers, dates, and outcomes from recent mobile,
              banking, and Temenos work.
            </p>
          </div>
          <div className={styles.experience}>
            {EXPERIENCE.map((role) => (
              <article key={`${role.company}-${role.dates}`} className={styles.role}>
                <div className={styles.roleTop}>
                  <strong>
                    {role.title} · {role.company}
                  </strong>
                  <span className={styles.date}>{role.dates}</span>
                </div>
                <p>{role.summary}</p>
                <div className={styles.tags}>
                  {role.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showBackToTop && (
        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <BackToTopGraphic />
        </button>
      )}
    </div>
  );
};

export default Portfolio;
