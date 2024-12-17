import {Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import SkillsDisplay from './components/DataDisplay.jsx';
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
    'summary',
    'education',
    'experience',
    'skills',
    'certifications',
    'publications',
    
  ];

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
                  component={(data) => <SkillsDisplay data={data} title={section.replace(/_/g, ' ')}/>}
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
