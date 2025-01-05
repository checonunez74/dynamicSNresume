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
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // helper function to render text with links
  const renderTextWithLinks = (text) => {
    // Split text by spaces to check each word
    const words = text.split(' ');
    return words.map((word, index) =>
      isValidUrl(word) ? (
        <a
          key={index}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {word}
        </a>
      ) : (
        word + ' '
      )
    );
  };

  // LEVEL 1: Rendering data form FB in each section's content
  const renderSectionsContent = (key, content) => {
    if (traversingSectionsAndRendering(key)) {
      console.log('Found nested content');
      return renderNestedData(key, content);
    }

    if (typeof content === 'string' && isValidUrl(content)) {
      return (
        <div className={styles.sectionContent}>
          console.log("Found URL text")
          <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
          {renderTextWithLinks(content)}
        </div>
      );
    }

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

    if (typeof content === 'object' && content !== null) {
      return (
        <div className={styles.sectionContent}>
          <strong>{key.replace(/_/g, ' ')}:</strong>
          {Object.entries(content).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey} className={styles.listItem}>
              <strong>{nestedKey.replace(/_/g, ' ')}:</strong>{' '}
              {typeof nestedValue === 'object'
                ? renderNestedData(nestedKey, nestedValue)
                : nestedValue}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={styles.sectionContent}>
        <strong>{key.replace(/_/g, ' ')}:</strong> {content}
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
                <div key={key}>
                  {/* Sub-titles for Skills */}
                  <strong>{formatKey(key)} : </strong>{' '}
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
                    : value}
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
        <div key={key}>{renderSectionsContent(key, content)}</div>
      ))}
    </div>
  );
};

export default DataDisplay;