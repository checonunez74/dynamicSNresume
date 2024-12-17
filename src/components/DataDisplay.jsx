import { margin, maxWidth, padding, style, textAlign } from "@mui/system";

const DataDisplay = ({ title, data }) => {

  if (!data) return null;

  return (
    <div style={{ textAlign: 'left', padding: '20px' }}>
      
      <h1 style={{
        textTransform: 'capitalize',
        color: '#333',
        borderBottom: '1px solid #eee'
      }}>{title}</h1>

      {Object.entries(data).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '20px' }}>
          <div>
            {Array.isArray(items) ? (
              <p>{items.join(', ')}</p>
            ) : typeof items === 'object' ? (
              <p>
                {Object.entries(items)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')}
              </p>
            ) : (
              <p>{items}</p>
            )}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default DataDisplay;