import React, { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData';

function DynamicDataComponent({ path, component: Component, title }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = fetchData(
      path,
      (fetchedData) => {
        const wrappedData = {
          [path]: fetchedData
        };
        setData(wrappedData);
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching ${path} data:`, error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [path]);

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#666' 
      }}>
        Loading {path}...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#ff4444' 
      }}>
        Error loading {path}: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#666' 
      }}>
        No {path} data available
      </div>
    );
  }

  return <Component data={data} title={title} />;
}

export default DynamicDataComponent; 