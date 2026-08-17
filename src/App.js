import { Box } from '@mui/material';
import { useState } from 'react';
import DynamicDataComponent from './hooks/useFirebaseData.jsx';
import DataDisplay from './components/DataDisplay.jsx';
import Sidebar from './features/sidebar/Sidebar';
import DownloadResumeButton from './components/DownloadResumeButton.jsx';
import Portfolio from './features/portfolio/Portfolio.jsx';
import './App.css';

function App() {
  const [mode, setMode] = useState('portfolio');
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

  if (mode === 'portfolio') {
    return <Portfolio onOpenApp={() => setMode('app')} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          type="button"
          className="portfolio-back"
          onClick={() => setMode('portfolio')}
        >
          Back to portfolio
        </button>
        <DownloadResumeButton variant="fixed" />
      </header>
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
