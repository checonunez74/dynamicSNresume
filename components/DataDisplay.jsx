const DataDisplay = ({ title, data }) => {
  if (!data) return null;

  // Helper function to check if a value is a numbered object (like education/experience)
  const isNumberedObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return false;
    const keys = Object.keys(obj);
    return keys.every(key => !isNaN(key));
  };

  // LEVEL 1: Render each section's content
  const renderSectionContent = (key, content) => {
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