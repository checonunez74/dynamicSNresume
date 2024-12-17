import React, { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData'; // Path to your helper function

console.log("This is fetchData", fetchData);

function DynamicDataComponent({ path, component }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Dynamically fetch data based on the provided path
    fetchData(
      path, // Dynamic path (e.g., 'skills', 'summary')
      (fetchedData) => {
        setData(fetchedData); // Update state with fetched data
      },
      (error) => {
        console.error('Error fetching data:', error); // Handle errors
      }
    );
  }, [path]);

  console.log("Data from useFirebaseData", data);

  if (data) {
    const ComponentToRender = component;
    return <ComponentToRender data={data} />;
  }

  return <div>Loading...</div>;
};

export default DynamicDataComponent;
