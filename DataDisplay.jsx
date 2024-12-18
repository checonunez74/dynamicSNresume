const DataDisplay = ({ title, data }) => {
  if (!data) return null;

  // LEVEL 1: Handles top-level sections (education, experience, etc.)
  const renderSection = (category, items) => {
    // Special handling for education and experience sections
    if (category === 'education' || category === 'experience') {
      return renderNumberedArray(items);
    }

    // Handle other sections with default renderer
    return renderValue(items);
  };

  // LEVEL 2: Handles numbered arrays (like education[0], experience[0])
  const renderNumberedArray = (items) => {
    // Convert object with numbered keys to array
    const arrayItems = Object.keys(items)
      .sort((a, b) => Number(a) - Number(b))
      .map(key => items[key]);

    return (
      <div style={{ marginLeft: '20px' }}>
        {arrayItems.map((item, index) => (
          <div key={index} style={{ 
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '5px'
          }}>
            {/* LEVEL 3: Render individual fields (degree, institution, company, etc.) */}
            {Object.entries(item).map(([key, value]) => {
              // Special handling for responsibilities array
              if (key === 'responsibilities' && Array.isArray(value)) {
                return (
                  <div key={key} style={{ marginTop: '10px' }}>
                    <strong style={{ 
                      textTransform: 'capitalize',
                      color: '#444'
                    }}>
                      {key.replace(/_/g, ' ')}:
                    </strong>
                    <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
                      {value.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return (
                <div key={key} style={{ marginBottom: '10px' }}>
                  <strong style={{ 
                    textTransform: 'capitalize',
                    color: '#444'
                  }}>
                    {key.replace(/_/g, ' ')}:
                  </strong>{' '}
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // General value renderer for other types of data
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return <p>{value.join(', ')}</p>;
    } else if (typeof value === 'object' && value !== null) {
      return renderNestedObject(value);
    }
    return <span>{value}</span>;
  };

  // Handle nested objects for other sections
  const renderNestedObject = (obj) => {
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(obj).map(([key, value], index) => (
          <div key={`${key}-${index}`} style={{ marginBottom: '10px' }}>
            <h3 style={{ 
              textTransform: 'capitalize',
              color: '#666',
              fontSize: '16px',
              marginBottom: '5px'
            }}>
              {key.replace(/_/g, ' ')}
            </h3>
            <div style={{ marginLeft: '10px' }}>
              {renderValue(value)}
            </div>
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

      {/* Main section loop */}
      {Object.entries(data).map(([category, items], index) => (
        <div key={`${category}-${index}`} style={{ 
          marginBottom: '30px',
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '5px'
        }}>
          <h2 style={{
            textTransform: 'capitalize',
            color: '#444',
            marginBottom: '15px',
            fontSize: '18px'
          }}>
            {category.replace(/_/g, ' ')}
          </h2>
          {renderSection(category, items)}
        </div>
      ))}
    </div>
  );
};

export default DataDisplay; 