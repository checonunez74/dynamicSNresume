import { useEffect, useRef, useState } from 'react';
import styles from './Portfolio.module.css';
import crest from '../../assets/Lara.png';

const RESUME_PATH = `${process.env.PUBLIC_URL}/Ezekiel_Lara_Resume_Engineering_Lead.pdf`;
const RESUME_FILENAME = 'Ezekiel_Lara_Resume_Engineering_Lead.pdf';

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

const LayoutGridIcon = () => (
  <Icon>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Icon>
);

const ArrowDownIcon = () => (
  <Icon>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Icon>
);

const ArrowUpRightIcon = () => (
  <Icon>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
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

const Portfolio = ({ onOpenApp }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.nav}`}>
          <a className={styles.brand} href="#about">
            <img
              className={styles.monogram}
              src={crest}
              alt=""
            />
            <span className={styles.brandName}>Ezekiel Lara</span>
          </a>
          <nav className={styles.links} aria-label="Primary navigation">
            <a className={styles.navLink} href="#about">
              About
            </a>
            <a className={styles.navLink} href="#experience">
              Experience
            </a>
            <a className={styles.navLink} href="#expertise">
              Expertise
            </a>
            <a
              className={styles.resume}
              href={RESUME_PATH}
              download={RESUME_FILENAME}
            >
              <DownloadIcon /> Résumé PDF
            </a>
            <button
              type="button"
              className={styles.appButton}
              onClick={onOpenApp}
            >
              <LayoutGridIcon /> Online Resume
            </button>
          </nav>
        </div>
      </header>
      <main>
        <section className={`${styles.shell} ${styles.hero}`} id="about">
          <div>
            <div className={styles.kicker}>
              ENGINEERING LEADER · DIGITAL BANKING
            </div>
            <h1 className={styles.title}>
              I build reliable financial technology—and the teams behind it.
            </h1>
            <p className={styles.lead}>
              Engineering leader with 20+ years delivering enterprise web,
              mobile, and secure banking experiences. Deep expertise in Temenos
              Journey, frontend architecture, accessibility, and application
              modernization.
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#experience">
                View experience <ArrowDownIcon />
              </a>
              <a className={styles.secondary} href="#about">
                Get in touch <ArrowUpRightIcon />
              </a>
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
        <section className={styles.strip} id="expertise">
          <div className={`${styles.shell} ${styles.highlights}`}>
            <div className={styles.highlight}>
              <strong>20+ years</strong>
              <span>Enterprise engineering</span>
            </div>
            <div className={styles.highlight}>
              <strong>Temenos Journey</strong>
              <span>Maestro & Manager</span>
            </div>
            <div className={styles.highlight}>
              <strong>WCAG / ADA</strong>
              <span>Accessible by design</span>
            </div>
            <div className={styles.highlight}>
              <strong>Hands-on leader</strong>
              <span>Architecture to mentoring</span>
            </div>
          </div>
        </section>
        <section className={`${styles.shell} ${styles.content}`} id="experience">
          <div>
            <div className={styles.kicker}>SELECTED WORK</div>
            <h2 className={styles.heading}>
              Experience that turns complexity into outcomes.
            </h2>
            <p className={styles.sectionIntro}>
              A concise, impact-focused view of leadership, architecture, and
              delivery.
            </p>
          </div>
          <div className={styles.experience}>
            <article className={styles.role}>
              <div className={styles.roleTop}>
                <strong>Engineering Leadership · Digital Banking</strong>
                <span className={styles.date}>Recent</span>
              </div>
              <p>
                Guided complex platform initiatives, resolved high-impact
                production issues, and strengthened engineering standards across
                product, QA, accessibility, and technology teams.
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>Technical leadership</span>
                <span className={styles.tag}>Platform stability</span>
                <span className={styles.tag}>Cross-functional delivery</span>
              </div>
            </article>
            <article className={styles.role}>
              <div className={styles.roleTop}>
                <strong>Staff Engineering · Frontend Architecture</strong>
                <span className={styles.date}>20+ years</span>
              </div>
              <p>
                Designed and modernized enterprise web and mobile applications
                using JavaScript, TypeScript, React, Java, REST APIs, and secure
                integration patterns.
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>React</span>
                <span className={styles.tag}>TypeScript</span>
                <span className={styles.tag}>REST APIs</span>
                <span className={styles.tag}>Accessibility</span>
              </div>
            </article>
          </div>
        </section>
      </main>
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
