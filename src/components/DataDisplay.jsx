import React from 'react';


const DataDisplay = ({ title, data }) => {
  if (!data) return null;

  // Helper function to check if a value is a numbered object (like education/experience)
  const isArrayObject = (obj) => {
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
              href={word}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2196f3',
                textDecoration: 'none',
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

  // LEVEL 1: Rendering data form FB in each section's content 
  const renderSectionsContent = (key, content) => {
    console.log("Contents data has: ", content)
   
  ///////////////
    // Special handling for sections that need numbered list rendering
    if (traversingSectionsAndRendering(key)) {
      console.log("using traversingSectionsAndRender conditional")
      return renderNestedData(key, content);
    }

    if (typeof content === 'string' && isValidUrl(content)) {
      console.log("content is a String", content)
      return (
        <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
          <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
          {renderTextWithLinks(content)}
        </div>
      );
    }
    
    // Handle array objects (education/experience)
    if (isArrayObject(content)) {
      return renderArrayItemsByIndex(content);
    }
    
    // Handle arrays
    if (Array.isArray(content)) {
      console.log("content is an Array")
      return (
        <div style={{ marginLeft: '20px' }}>
          {content.map((item, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {isValidUrl(item) ? renderTextWithLinks(item) : `${item}`}
            </div>
          ))}
        </div>
      );
    }
    
  // Handle objects (nested key-value pairs)
  if (typeof content === 'object' && content !== null) {
    console.log("Using the handle objects function")
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(content).map(([nestedKey, nestedValue]) => (
          <div key={nestedKey} style={{ marginBottom: '10px' }}>
            <strong>{nestedKey.replace(/_/g, ' ')}:</strong>
            {Array.isArray(nestedValue) ? (
              <div style={{ marginLeft: '20px' }}>
                {nestedValue.map((url, index) =>
                  isValidUrl(url) ? (
                    <div key={index} style={{ marginBottom: '5px' }}>
                      {renderTextWithLinks(url)}
                    </div>
                  ) : (
                    <div key={index}>{url}</div>
                  )
                )}
              </div>
            ) : (
              renderSectionsContent(nestedKey, nestedValue)
            )}
          </div>
        ))}
      </div>
    );
  }
    // Handle primitive values
    return (
      <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
        <strong>{key.replace(/_/g, ' ')}:</strong> {content}
      </div>);
  };

// Helper function for Skills, Certifications, and Publications
  const renderNestedData = (sectionKey, items) => {
      console.log("Using Skills, Certificates and PUblications Function")
      //Format keys text function
      const formatKey = (key) => {
        //removing underscore from text in keys
        return key
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

      // Helper function to validate URLs
      const isValidUrl = (string) => {
        try {
          new URL(string);
          return true;
        } catch (_) {
          return false;
        }
      };

      // LINKS -Helper function to render text with links
      const renderTextWithLinks = (text) => {
        const words = text.split(' ');
        return words.map((word, index) =>
          isValidUrl(word) ? (
            <a
              href={word}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2196f3',
                textDecoration: 'none',
              }}
              key={index}
            >
              {word}
            </a>
          ) : (
            word + ' '
          )
        );
      };

      const renderNestedContent = (key, value) => {
        // If value is a primitive, render directly
        if (typeof value !== 'object' || value === null) {
          return (
            <div
              key={key}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px 15px 10px 15px',
                borderRadius: '8px',
                fontSize: '14px',
                boxShadow: '0 1px 2px rgb(0,0,0,0.05)',
                marginBottom: '10px',
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              <strong>{formatKey(key)}:</strong> {value}
            </div>
          );
        }

        // If value is an array, render each item
        if (Array.isArray(value)) {
          return (
            <div key={key} style={{ marginLeft: '20px' }}>
              <strong>{formatKey(key)}:</strong>
              <div style={{ marginLeft: '20px' }}>
                {value.map((item, index) =>
                  typeof item === 'object' ? (
                    renderNestedContent(index, item)
                  ) : (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#f5f5f5',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxShadow: '0 1px 2px rgb(0,0,0,0.05)',
                        marginBottom: '10px',
                        marginTop: '10px',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    >
                      {isValidUrl(item) ? renderTextWithLinks(item) : `• ${item}`}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        }

        // If value is an object, recurse into its properties
        if (typeof value === 'object') {
          {console.log("the value is an Object")}
          return (
            <div key={key} style={{ marginLeft: '20px' }}>
              <strong>{formatKey(key)}:</strong>
              <div style={{ marginLeft: '20px' }}>
                {Object.entries(value).map(([nestedKey, nestedValue]) =>
                  renderNestedContent(nestedKey, nestedValue)
                )}
              </div>
            </div>
          );
        }

        return null; // Fallback for unexpected content
      };

      // Main logic for rendering the array list section
      return (
        <div style={{ marginLeft: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {Object.entries(items).map(([key, value]) => renderNestedContent(key, value))}
          </div>
        </div>
      );
  };

  // LEVEL 2: Render items by index(education/experience entries)
  const renderArrayItemsByIndex = (items) => {
    console.log("Education and experience items are rendered by index")
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
    console.log("Using Education and Experience function")
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
          <span style={{ color: '#667' }}>{value}</span>
        </div>
      );
    });
  };

  // Handle nested objects for other sections
  const renderNestedObject = (obj) => {
    console.log("Using nested objects function")
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
            {renderSectionsContent(key, value)}
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
        (<div key={key}>
          {renderSectionsContent(key, content)}
        </div>)
      ))}
    </div>
  );
};

export default DataDisplay;