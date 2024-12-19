import React from 'react';


const DataDisplay = ({ title, data }) => {
  if (!data) return null;

  // Helper function to check if a value is a numbered object (like education/experience)
  const isNumberedObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return false;
    const keys = Object.keys(obj);
    return keys.every(key => !isNaN(key));
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

  // Helper function to check if section needs numbered list rendering
  const needsNumberedListRendering = (sectionKey) => {
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
            href={word}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#2196f3',
              textDecoreation: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
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

  // LEVEL 1: Render each section's content
  const renderSectionContent = (key, content) => {
    // Special handling for sections that need numbered list rendering
    if (needsNumberedListRendering(key)) {
      return renderNumberedListSection(key, content);
    }
    
    // Handle numbered objects (education/experience)
    if (isNumberedObject(content)) {
      return renderNumberedItems(content);
    }
    
    // Handle arrays
    if (Array.isArray(content)) {
      return (
        <div style={{ marginLeft: '20px' }}>
          {content.map((item, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              • {item}
            </div>
          ))}
        </div>
      );
    }
    
    // Handle nested objects
    if (typeof content === 'object' && content !== null) {
      return renderNestedObject(content);
    }
    
    // Handle primitive values
    return <div style={{ marginLeft: '20px' }}>{content}</div>;
  };

    // Helper function for Skills, Certifications, and Publications
  const renderNumberedListSection = (sectionKey, items) => {
    // If items is directly an object with numbered keys
    if (isNumberedObject(items)) {
      return (
        <div style={{ marginLeft: '20px' }}>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {Object.values(items).map((item, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: '#f5f5f5',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxShadow: '0 1px 2px rgb(0,0,0,0.05)',
                  // Spread operator to add additional styles for publications
                  width: sectionKey === 'certifications' || sectionKey === 'publicationns' ? '100%' : 'auto',
                  padding: sectionKey === 'certifications' ? '12px 15px' : '8px 15px',
                  fontStyle: sectionKey === 'publications' ? 'italic' : 'normal'
                }}
              >
                {sectionKey === 'publications' ? renderTextWithLinks(item) : item}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // For nested structure (like skills with categories)
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(items).map(([category, categoryItems]) => (
          <div key={category} style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              textTransform: 'capitalize',
              color: '#444',
              fontSize: '16px',
              marginBottom: '10px'
            }}>
              {category.replace(/_/g, ' ')}
            </h3>
            <div style={{ 
              marginLeft: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {Object.values(categoryItems).map((item, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '8px 15px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    // Different styling for different sections
                    ...(sectionKey === 'certifications' && {
                      width: '100%',
                      padding: '12px 15px'
                    }),
                    ...(sectionKey === 'publications' && {
                      width: '100%',
                      fontStyle: 'italic'
                    })
                  }}
                >
                  {sectionKey === 'publications' ? renderTextWithLinks(item) : item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // LEVEL 2: Render numbered items (education/experience entries)
  const renderNumberedItems = (items) => {
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(items)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([_, item]) => (
            <div
              key={item.institution || item.company}
              style={{
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {renderEducationExperienceItem(item)}
            </div>
          ))}
      </div>
    );
  };

  // LEVEL 3: Render individual education/experience items
  const renderEducationExperienceItem = (item) => {
    return Object.entries(item).map(([key, value]) => {
      // Special handling for responsibilities array
      if (key === 'responsibilities' && Array.isArray(value)) {
        return (
          <div key={key} style={{ marginTop: '10px' }}>
            <strong style={{ 
              textTransform: 'capitalize',
              color: '#444',
              display: 'block',
              marginBottom: '5px'
            }}>
              {key.replace(/_/g, ' ')}:
            </strong>
            <ul style={{ 
              marginTop: '5px',
              marginLeft: '20px',
              listStyleType: 'disc'
            }}>
              {value.map((resp, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>{resp}</li>
              ))}
            </ul>
          </div>
        );
      }

      return (
        <div key={key} style={{ marginBottom: '8px' }}>
          <strong style={{ 
            textTransform: 'capitalize',
            color: '#444'
          }}>
            {key.replace(/_/g, ' ')}:
          </strong>{' '}
          <span style={{ color: '#666' }}>{value}</span>
        </div>
      );
    });
  };

  // Handle nested objects for other sections
  const renderNestedObject = (obj) => {
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(obj).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '15px' }}>
            <h3 style={{ 
              textTransform: 'capitalize',
              color: '#444',
              fontSize: '16px',
              marginBottom: '8px'
            }}>
              {key.replace(/_/g, ' ')}
            </h3>
            {renderSectionContent(key, value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ 
      textAlign: 'left', 
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{
        textTransform: 'capitalize',
        color: '#333',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
        marginBottom: '20px'
      }}>
        {title}
      </h1>

      {/* Main content renderer */}
      {Object.entries(data).map(([key, content]) => (
        <div key={key}>
          {renderSectionContent(key, content)}
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;