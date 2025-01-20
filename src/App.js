import { Box } from '@mui/material';
import { useState } from 'react';
import DynamicDataComponent from '../src/hooks/useFirebaseData.jsx';
import DataDisplay from './components/DataDisplay.jsx';
import Sidebar from './features/sidebar/Sidebar'; // Import Sidebar
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('summary');

  const sections = [
    'consultant',
    'summary',
    'education',
    'experience',
    'skills',
    'certifications',
    'publications',
  ];

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <main>
        <Box sx={{ display: 'flex' }}>
          {/* 🔹 Sidebar Component */}
          <Sidebar data={sections} onSelectSection={setSelectedSection} />

          {/* 🔹 Main Content */}
          <Box role="tabpanel" sx={{ width: '100%', p: 3 }}>
            {/* <h1>{selectedSection.replace(/_/g, ' ')}</h1> */}
            <DynamicDataComponent
              key={selectedSection}
              path={selectedSection}
              component={DataDisplay}
              title={selectedSection.replace(/_/g, ' ')}
            />
          </Box>
        </Box>
      </main>
    </div>
  );
}

export default App;