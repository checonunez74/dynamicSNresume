import { HashRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './features/portfolio/Portfolio';
import OnlineResume from './features/online-resume/OnlineResume';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/resume" element={<OnlineResume />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
