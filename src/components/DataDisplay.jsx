import React from 'react';
import styles from './DataDisplay.module.css'
import '../styles/global.css'


const DataDisplay = ({ title, data }) => {
  if (!data) return null;

  // Helper function to check if a value is a numbered object (like education/experience)
  const isArrayObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return false;
    const keys = Object.keys(obj);
    return keys.every((key) => !isNaN(key));
  };

  // Helper function to check if section needs numbered list rendering
  const traversingSectionsAndRendering = (sectionKey) => {
    return ['skills', 'certifications', 'publications'].includes(sectionKey);
  };

  // Helper function to detect URLs in text
  const isValidUrl = (string) => {
    if (typeof string !== 'string') return false;
    try {
      new URL(string);
      return true;
    } catch (_) {
      // Allow bare domains like www.linkedin.com/...
      try {
        new URL(`https://${string}`);
        return (
          string.includes('.') &&
          !string.includes(' ') &&
          !string.includes('@')
        );
      } catch {
        return false;
      }
    }
  };

  const toHref = (string) => {
    try {
      new URL(string);
      return string;
    } catch (_) {
      return `https://${string}`;
    }
  };

  const formatLabel = (key) =>
    key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const cardStyle = {
    marginLeft: '20px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    lineHeight: 1.6,
  };

  const renderContactInformation = (content) => {
    let fields =
      content && typeof content === 'object' && !Array.isArray(content)
        ? { ...content }
        : {};

    // Flatten { name, contact: { email, phone, ... } } shapes
    if (fields.contact && typeof fields.contact === 'object') {
      const { contact, ...rest } = fields;
      fields = { ...rest, ...contact };
    }

    return (
      <div style={cardStyle}>
        {Object.entries(fields).map(([fieldKey, fieldValue]) => {
          if (typeof fieldValue === 'object' && fieldValue !== null) {
            return null;
          }

          const value = String(fieldValue ?? '');

          return (
            <div key={fieldKey} style={{ marginBottom: '14px' }}>
              <strong
                style={{
                  display: 'block',
                  color: '#444',
                  marginBottom: '4px',
                }}
              >
                {formatLabel(fieldKey)} :
              </strong>
              {isValidUrl(value) ? (
                <a
                  href={toHref(value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2196f3', textDecoration: 'none' }}
                >
                  {value}
                </a>
              ) : (
                <span style={{ color: '#667' }}>{value}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Helper function to check if section needs numbered list rendering
  const traversingSectionsAndRendering = (sectionKey) => {
    return ['skills', 'certifications', 'publications'].includes(sectionKey);
  };

  // helper function to render text with links
  const renderTextWithLinks = (text) => {
    // Split text by spaces to check each word
    const words = text.split(' ');

    return words.map((word, index) => {
      if (isValidUrl(word)) {
        return (
          <React.Fragment key={index}>
            <a
              href={toHref(word)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2196f3',
                textDecoration: 'none',
              }}
            >
              {word}
            </a>
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  // LEVEL 1: Rendering data form FB in each section's content
  const renderSectionsContent = (key, content) => {
    // Executes renderNestedData function when finds nested objects
    if (traversingSectionsAndRendering(key)) {
      console.log('Found nested content');
      return renderNestedData(key, content);
    }
    // Looks for URL strings
    if (typeof content === 'string' && isValidUrl(content)) {
      return (
        <div className={styles.sectionContent}>
          <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
          {renderTextWithLinks(content)}
        </div>
      );
    }
    // Looks for Array objects
    if (isArrayObject(content)) {
      console.log('Found an Array -Rendering');
      return renderArrayItemsByIndex(content);
    }

    if (Array.isArray(content)) {
      return (
        <div className={styles.sectionContent}>
          <strong>{key.replace(/_/g, ' ')}:</strong>
          <ul className={styles.list}>
            {content.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {typeof item === 'object'
                  ? renderNestedData(key, item) // Process nested objects
                  : item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // Finds not nested objects –Consultant
    if (typeof content === 'object' && content !== null) {
      console.log("Consultant section")
      return (
        <div className={styles.sectionContent}>
          {/* <strong>{key.replace(/_/g, ' ')}:</strong> */}
          {Object.entries(content).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey} className={styles.listItem}>
              {/* <strong>{nestedKey.replace(/_/g, ' ')}:</strong>{' '} */}
              {typeof nestedValue === 'object'
                ? renderNestedData(nestedKey, nestedValue)
                : nestedValue}
            </div>
          ))}
        </div>
      );
    }
    
  // Contact Information — one gray card, stacked label/value (matches Summary card look)
  if (
    (key === 'Contact_Information' || key === 'contact' || key === 'consultant') &&
    typeof content === 'object' &&
    content !== null
  ) {
    return renderContactInformation(content);
  }

  // Handle objects (nested key-value pairs)
  if (typeof content === 'object' && content !== null) {
    console.log("Using the handle objects function")
    return (
      <div className={styles.sectionContent}>
        {/* <strong>{key.replace(/_/g, ' ')}:</strong> */}
        <div className={styles.defaultBox}>{content}</div>
      </div>
    );
  }

    // Handle primitive values (e.g. Summary) — gray card
    return (
      <div style={cardStyle}>
        {typeof content === 'string' && isValidUrl(content)
          ? renderTextWithLinks(content)
          : content}
      </div>
    );
  };

  // Function for >>>>Skills, Certifications, and Publications<<<<
  const renderNestedData = (sectionKey, items) => {
    const formatKey = (key) =>
      key
        .split(/[_\d]/) // Remove underscores and digits
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Skills page: category labels + wrapping gray chips (no bullets)
      if (sectionKey === 'skills') {
        const chipStyle = {
          display: 'inline-block',
          backgroundColor: '#f5f5f5',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#555',
          margin: '0 8px 8px 0',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
          whiteSpace: 'nowrap',
        };

        const getChipLabels = (value) => {
          if (Array.isArray(value)) {
            return value.map((item) =>
              typeof item === 'object' && item !== null
                ? Object.values(item).join(' ')
                : String(item)
            );
          }
          if (typeof value === 'object' && value !== null) {
            // e.g. { Temenos: 5, JavaScript: 4 } → chip per key
            return Object.keys(value);
          }
          return [String(value)];
        };

        return (
          <div style={{ marginLeft: '20px' }}>
            {Object.entries(items || {}).map(([categoryKey, categoryValue]) => (
              <div key={categoryKey} style={{ marginBottom: '24px' }}>
                <strong
                  style={{
                    display: 'block',
                    color: '#444',
                    marginBottom: '10px',
                    fontSize: '16px',
                  }}
                >
                  {formatKey(categoryKey)} :
                </strong>
                <div>
                  {getChipLabels(categoryValue).map((label, index) => (
                    <div key={`${categoryKey}-${index}`} style={chipStyle}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      // Helper function to validate URLs
      const isValidUrl = (string) => {
        try {
          new URL(string);
          return true;
        } catch (_) {
          return false;
        }
      };
    const isMiniBoxSection =
      sectionKey === 'skills' || sectionKey === 'certifications';

    return (
      <div
        className={
          isMiniBoxSection ? styles.miniBoxContainer : styles.defaultBox
        }
      >
        <div className={styles.nestedContent}>
          {Array.isArray(items)
            ? items.map((item, index) => (
                <div
                  key={index}
                  className={
                    isMiniBoxSection ? styles.miniBox : styles.listItem
                  }
                >
                  {typeof item === 'object'
                    ? Object.entries(item).map(([nestedKey, nestedValue]) => (
                        <div key={nestedKey}>
                          <strong>{formatKey(nestedKey)}:</strong> {nestedValue}
                        </div>
                      ))
                    : `• ${(item)}`}
                </div>
              ))
            : Object.entries(items).map(([key, value]) => (
                <div key={key} className={ styles.subTitle}>
                  {/* Sub-titles for Skills */}
                  <strong>{formatKey(key)} : </strong>{' '}<br />
                  {typeof value === 'object'
                    ? Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <div
                          key={nestedKey}
                          className={
                            isMiniBoxSection ? styles.miniBox : styles.listItem
                          }
                        >
                        {/* Nested values for Publications */}
                          {renderTextWithLinks(nestedValue)}
                        </div>
                      ))
                    : renderTextWithLinks(value)}
                </div>
              ))}
        </div>
      </div>
    );
  };

  // LEVEL 2: Render items by index >>>>>>>education/experience entries<<<<<<<<<
  const renderArrayItemsByIndex = (items) => {
    console.log('Education and experience items are rendered by index');
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(items)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([_, item]) => (
            <div
              key={item.institution || item.company}
              className="backgroundBox" //<<<<<<Boxes for education and experience
            >
              {renderEducationExperienceItem(item)}
            </div>
          ))}
      </div>
    );
  };

  // LEVEL 3: Render individual education/experience items
  const renderEducationExperienceItem = (item) => {
    console.log('Rendering Education and Experience function');
    return Object.entries(item).map(([key, value]) => {
      // Special handling for >>>>>responsibilities<<<<< array
      if (key === 'responsibilities' && Array.isArray(value)) {
        return (
          <div key={key} className={styles.subTitle}>
            <strong>{key.replace(/_/g, ' ')}:</strong>
            <ul className={styles.list}>
              {value.map((resp, i) => (
                <li key={i} className={styles.listItem}>
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      return (
        <div key={key} style={{ marginBottom: '8px' }}>
          <strong className={styles.subTitle}>{key.replace(/_/g, ' ')}:</strong>{' '}
          {/* Value is for Educations/Experience Not Responsabilities Nor Skills */}
          <span style={{ color: '#667' }}>{value}</span>
        </div>
      );
    });
  };

  return (
    <div className={styles.dataDisplay}>
      <h1 className={styles.title}>{title}</h1>
      {Object.entries(data).map(([key, content]) => (
        <div key={key}>
          {renderSectionsContent(key, content)}
          {console.log("renderedSectionsContent called")}          
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;