import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import DynamicDataComponent from '../hooks/useFirebaseData';
import DataDisplay from '../components/DataDisplay';

function App() {
  const [value, setValue] = useState(0);
  const [sections, setSections] = useState(['education', 'experience']);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Box sx={{ display: 'flex' }}>
          <Tabs 
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={(_, newValue) => setValue(newValue)}>
              {sections.map((section, index) => (
                <Tab
                  key={section}
                  label={section.replace(/_/g, ' ')}
                  {...allyProps(index)}
                />
              ))}
          </Tabs>

          <Box role='tabpanel' sx={{ width: '100%', p: 3}}>
            {sections.map((section, index) => (
              value === index && (
                <DynamicDataComponent
                  key={section}
                  path={section}
                  component={DataDisplay}
                  title={section.replace(/_/g, ' ')}
                />
              )
            ))}
          </Box>
        </Box>
      </main>
    </div>
  );
}

export default App; 