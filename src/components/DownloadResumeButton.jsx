import styles from './DownloadResumeButton.module.css';
import { DEFAULT_RESUME, resumeHref } from '../data/careerTracks';

const DownloadResumeButton = ({
  variant = 'default',
  filename = DEFAULT_RESUME.filename,
  children = 'Download Resume (PDF)',
}) => {
  return (
    <a
      href={resumeHref(filename)}
      download={filename}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </a>
  );
};

export default DownloadResumeButton;
