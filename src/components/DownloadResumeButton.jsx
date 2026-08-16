import styles from './DownloadResumeButton.module.css';

const RESUME_PATH = `${process.env.PUBLIC_URL}/Ezekiel_Lara_Resume_Engineering_Lead.pdf`;
const RESUME_FILENAME = `Ezekiel_Lara_Resume_Engineering_Lead.pdf`;

const DownloadResumeButton = ({ variant = 'default' }) => {
    return (
        <a 
          href={RESUME_PATH} 
          download={RESUME_FILENAME} 
          className={`${styles.button} ${styles[variant]}`}
          
        >
            Download Resume (PDF)
        </a>
    );
};

export default DownloadResumeButton;