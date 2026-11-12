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

const LayersIcon = () => (
  <Icon>
    <rect x="3" y="3" width="7" height="18" rx="1" />
    <rect x="14" y="3" width="7" height="18" rx="1" />
  </Icon>
);

const PackageIcon = () => (
  <Icon>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" x2="12" y1="22" y2="12" />
  </Icon>
);

const DatabaseIcon = () => (
  <Icon>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

const GitBranchIcon = () => (
  <Icon>
    <line x1="6" x2="6" y1="3" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </Icon>
);

const TerminalIcon = () => (
  <Icon>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
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
          <div className={styles.portraitColumn}>
          <div className={styles.portrait}>
            <img
              className={styles.portraitImage}
              src={`${process.env.PUBLIC_URL}/EzekMugPic.jpg`}
              alt="Ezekiel Lara"
            />
          </div>
            <aside className={styles.buildCard}>
              <p className={styles.buildardKicker}>Technical walkthrough</p>
              <p className={styles.buildCardText}>
                Click below for a technical walkthrough of how this web app was build and how it is maintained.
              </p>
              <a 
                className={styles.primary} 
                href="#how-it-works"
                onClick={(event) => scrollToSection(event, 'how-it-works')}
              >
                How this app was built
              </a>
            </aside>
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
        <section className={`${styles.shell} ${styles.howBuilt}`} id="how-it-works">
          <div className={styles.expertiseIntro}>
            <div className={styles.kicker}>HOW THIS APP WAS BUILT</div>
            <h2 className={styles.heading}>
              One codebase, two public sites, a reviewable path to production.
            </h2>
            <p className={styles.sectionIntro}>
              This is a single React app, not three websites. The homepage is the
              public portfolio. The original résumé still runs as its own view.
              Career-track pages reuse the same layout so a hiring audience sees
              the right proof without a separate product to maintain.
            </p>
          </div>
          <div className={styles.howBuiltGrid}>
            <article className={styles.role}>
              <span className={styles.howBuiltIcon} aria-hidden="true">
                <LayersIcon />
              </span>
              <strong>Isolated UI</strong>
              <p>
                The portfolio and the online résumé share one app, not one style
                sheet. A landing-page change cannot leak into the résumé view,
                which is the isolation you want when two products ship from the
                same repository.
              </p>
              <img
                className={styles.howBuiltArt}
                src={`${process.env.PUBLIC_URL}/browser-windows-2.png`}
                alt=""
              />
            </article>
            <article className={styles.role}>
              <span className={styles.howBuiltIcon} aria-hidden="true">
                <PackageIcon />
              </span>
              <strong>One static build</strong>
              <p>
                Routing lives in the client so hosting can stay a static artifact.
                One build serves the portfolio, the résumé, and the career-track
                pages on both public domains—no server routing to operate.
              </p>
              <img
                className={styles.howBuiltArt}
                src={`${process.env.PUBLIC_URL}/software-cube-pages-6.png`}
                alt=""
              />
            </article>
            <article className={styles.role}>
              <span className={styles.howBuiltIcon} aria-hidden="true">
                <DatabaseIcon />
              </span>
              <strong>Live data, two hosts</strong>
              <p>
                The online résumé reads from Firebase Realtime Database, so content
                can change without a code deploy. The same production build is
                published to{' '}
                <a
                  href="https://ezekiellara.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ezekiellara.web.app
                </a>
                {' '}and{' '}
                <a
                  href="https://sergion-icv.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sergion-icv.web.app
                </a>
                .
              </p>
              <img
                className={styles.howBuiltArt}
                src={`${process.env.PUBLIC_URL}/Database-windows-4.png`}
                alt=""
              />
            </article>
            <article className={styles.role}>
              <span className={styles.howBuiltIcon} aria-hidden="true">
                <MailIcon />
              </span>
              <strong>Contact without a backend</strong>
              <p>
                The contact form sends from the browser. There is no mail server,
                inbox credential, or extra service to patch—lower operational load
                for a brochure-and-contact surface.
              </p>
              <button
                type="button"
                className={`${styles.primary} ${styles.howBuiltDemo}`}
                onClick={() => setShowContact(true)}
              >
                Send email
              </button>
              <img
                className={styles.howBuiltArt}
                src={`${process.env.PUBLIC_URL}/Contact%20Form-1.png`}
                alt=""
              />
            </article>
            <article className={styles.role}>
              <span className={styles.howBuiltIcon} aria-hidden="true">
                <GitBranchIcon />
              </span>
              <strong>GitHub as system of record</strong>
              <p>
                GitHub is the system of record at{' '}
                <a
                  href="https://github.com/checonunez74/dynamicSNresume"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/checonunez74/dynamicSNresume
                </a>
                . Feature work is isolated on branches and
                reaches main through pull requests, so the history stays reviewable. Merge
                does not publish production; release is a separate, explicit step.
              </p>
              <img
                className={styles.howBuiltArt}
                src={`${process.env.PUBLIC_URL}/GitHub-cards-5.png`}
                alt=""
              />
            </article>
            <article className={styles.role}>
              <span className={styles.howBuiltIcon} aria-hidden="true">
                <TerminalIcon />
              </span>
              <strong>Operator-driven release</strong>
              <p>
                Production is not merge-triggered. I compile the Create React App locally
                with npm run build, inspect the static artifact, then publish both Firebase
                Hosting targets from the CLI in one deploy. That keeps environment,
                timing, and blast radius under the keyboard instead of an unattended
                pipeline. GitHub Actions still builds pull-request previews so a running
                site can be reviewed before merge—CI for confidence, CD by choice.
              </p>
              <img
                className={styles.howBuiltArt}
                src={`${process.env.PUBLIC_URL}/Manual-terminal-3.png`}
                alt=""
              />
            </article>
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
