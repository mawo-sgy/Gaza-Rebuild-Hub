
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { ExpertRegistration } from './pages/ExpertRegistration';
import { Donate } from './pages/Donate';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/donate/:projectId" element={<Donate />} />
            <Route path="/join-mission" element={<ExpertRegistration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
