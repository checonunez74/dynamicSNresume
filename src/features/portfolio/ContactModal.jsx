import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Portfolio.module.css';
import { PROFILE } from '../../data/profile';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = 'elara@el79devs.com';

const ContactModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setError(
        'EmailJS is not configured yet. Add your service, template, and public keys to .env.'
      );
      return;
    }

    setStatus('sending');
    setError('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message,
          to_email: TO_EMAIL,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setError('Message could not be sent. Please try again.');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="contact-title"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="contact-title" className={styles.modalTitle}>
          Contact Ezekiel
        </h2>
        <ul className={styles.modalContacts}>
          <li>
            <span>Email</span>
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {PROFILE.linkedinLabel}
            </a>
          </li>
          <li>
            <span>Phone</span>
            <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
          </li>
        </ul>
        {status === 'sent' ? (
          <p className={styles.modalSuccess}>Thanks. Your message was sent.</p>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <p className={styles.modalFormTitle}>Send a message</p>
            <label className={styles.modalLabel} htmlFor="contact-name">
              Name
              <input
                id="contact-name"
                className={styles.modalInput}
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
              />
            </label>
            <label className={styles.modalLabel} htmlFor="contact-email">
              Email
              <input
                id="contact-email"
                className={styles.modalInput}
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
              />
            </label>
            <label className={styles.modalLabel} htmlFor="contact-message">
              Message
              <textarea
                id="contact-message"
                className={styles.modalInput}
                name="message"
                rows="5"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </label>
            {status === 'error' && (
              <p className={styles.modalError}>{error}</p>
            )}
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.primary}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        )}
        {status === 'sent' && (
          <div className={styles.modalActions}>
            <button type="button" className={styles.primary} onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
