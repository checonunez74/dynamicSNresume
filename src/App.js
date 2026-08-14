import { Box } from '@mui/material';
import { useState } from 'react';
import DynamicDataComponent from './hooks/useFirebaseData.jsx';
import DataDisplay from './components/DataDisplay.jsx';
import Sidebar from './features/sidebar/Sidebar';
import DownloadResumeButton from './components/DownloadResumeButton.jsx';
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('summary');

  const sections = [
    'Contact_Information',
    'summary',
    'education',
    'experience',
    'skills',
    'certifications',
    'publications',
  ];

  return (
    <div className="App">
      <DownloadResumeButton variant="fixed" />
      <header className="App-header"></header>
      <main>
        <Box sx={{ display: 'flex' }}>
          <Sidebar data={sections} onSelectSection={setSelectedSection} />

          <Box role="tabpanel" sx={{ width: '100%', p: 3 }}>
            <DynamicDataComponent
              key={selectedSection}
              path={selectedSection}
              title={selectedSection.replace(/_/g, ' ')}
              component={DataDisplay}
            />
          </Box>
        </Box>
      </main>
    </div>
  );
}

export default App;
