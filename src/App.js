import { HashRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './features/portfolio/Portfolio';
import OnlineResume from './features/online-resume/OnlineResume';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/mobile-engineering"
          element={<Portfolio trackId="mobile-engineering" />}
        />
        <Route
          path="/engineering-leadership"
          element={<Portfolio trackId="engineering-leadership" />}
        />
        <Route
          path="/temenos"
          element={<Portfolio trackId="temenos" />}
        />
        <Route path="/resume" element={<OnlineResume />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
