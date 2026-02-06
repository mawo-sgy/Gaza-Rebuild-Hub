
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { ExpertRegistration } from './pages/ExpertRegistration';
import { GeminiAssistant } from './components/GeminiAssistant';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>(process.env.API_KEY || '');
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar onOpenAssistant={() => setShowAssistant(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/join-mission" element={<ExpertRegistration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-brand-primary text-slate-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Gaza Rebuild Hub. Open Source for Humanity.</p>
          </div>
        </footer>

        {/* Global AI Assistant Modal */}
        {showAssistant && (
           <GeminiAssistant onClose={() => setShowAssistant(false)} apiKey={apiKey} />
        )}
      </div>
    </HashRouter>
  );
};

export default App;
