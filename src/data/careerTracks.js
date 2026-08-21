export const resumeHref = (filename) =>
  `${process.env.PUBLIC_URL}/${filename}`;

export const DEFAULT_RESUME = {
  filename: 'Ezekiel_Lara_Resume.pdf',
  shortLabel: 'Engineering Lead résumé',
  buttonLabel: 'Download Engineering Lead résumé',
};

export const CAREER_TRACKS = [
  {
    id: 'engineering-leadership',
    path: '/engineering-leadership',
    websiteLabel: 'Engineering Leadership',
    careerTrack: 'Broad technical leadership',
    targetRole: 'Engineering Leader — Mobile, Digital Banking & Accessibility',
    seeking: 'Seeking Engineering Leader roles',
    summary:
      'Hands-on engineering leader: architecture, mentoring, production triage, and cross-functional delivery across product, QA, accessibility, and technology teams.',
    resume: DEFAULT_RESUME,
  },
  {
    id: 'mobile-engineering',
    path: '/mobile-engineering',
    websiteLabel: 'Mobile Engineering',
    careerTrack: 'Mobile leadership',
    targetRole: 'Mobile Engineering Director — iOS, Android & Fintech',
    seeking: 'Seeking Mobile Engineering Director roles',
    summary:
      'Director of Engineering for Fixi, a 5.0-rated iOS and Android marketplace. Swift, Flutter, live location, payments, and production mobile delivery.',
    proof: {
      href: 'https://getfixi.app/',
      label: 'View Fixi',
    },
    resume: {
      filename: 'Ezekiel_Lara_Resume_Mobile_Engineering_Director.pdf',
      shortLabel: 'Mobile Leadership résumé',
      buttonLabel: 'Download Mobile Leadership résumé',
    },
  },
  {
    id: 'temenos',
    path: '/temenos',
    websiteLabel: 'Temenos & Digital Banking',
    careerTrack: 'Specialized fintech',
    targetRole: 'Temenos Journey Lead — Digital Banking Engineering',
    seeking: 'Seeking Temenos and digital banking roles',
    summary:
      'Journey Maestro and Journey Manager work at Webster Bank, First National Bank, and Temenos: onboarding, loan origination, authentication, and WCAG-compliant journeys.',
    resume: {
      filename: 'Ezekiel_Lara_Resume_Temenos_Digital_Banking.pdf',
      shortLabel: 'Temenos résumé',
      buttonLabel: 'Download Temenos résumé',
    },
  },
];

export const getTrackById = (trackId) =>
  CAREER_TRACKS.find((track) => track.id === trackId);

export const getResumeForTrack = (trackId) =>
  getTrackById(trackId)?.resume ?? DEFAULT_RESUME;
