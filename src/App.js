import {Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import DynamicDataComponent from '../src/hooks/useFirebaseData.jsx';
import DataDisplay from './components/DataDisplay.jsx';
import './App.css';

function App() {
  const [value, setValue] = useState(0);

  const testData = {
  computer_languages: ["Java", "JavaScript"],
  tools: ["VS Code", "Git"]
  };

  const allyProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  };

  const sections = [
    'consultant',
    'summary',
    'education',
    'experience',
    'skills',
    'certifications',
    'publications'
  ];

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Box sx={{ display: 'flex' }}>
          <Tabs 
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={handleChange}>
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
                  title={section.replace(/_/g, ' ')} // Added title prop
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
