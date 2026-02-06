import React, { useState } from 'react';
import { X, MessageSquare, Image as ImageIcon, Search, Zap, Loader2 } from 'lucide-react';
import * as GeminiService from '../services/geminiService';

interface GeminiAssistantProps {
  onClose: () => void;
  apiKey: string;
}

type Mode = 'chat' | 'image' | 'analysis';

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onClose, apiKey }) => {
  const [mode, setMode] = useState<Mode>('analysis');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      if (mode === 'analysis') {
        const result = await GeminiService.analyzeProjectFeasibility(prompt);
        setResponse(result || "No analysis generated.");
      } else if (mode === 'chat') {
        const result = await GeminiService.getConstructionStatus(prompt);
        setResponse(result.text + (result.sources?.length ? `\n\nSources: ${result.sources.length} refs found.` : ''));
      } else if (mode === 'image') {
        const imgData = await GeminiService.generateProjectRender(prompt, imageSize);
        if (imgData) {
            setResponse(`<img src="${imgData}" alt="Generated Render" class="w-full rounded-lg shadow-md" />`);
        } else {
            setResponse("Failed to generate image.");
        }
      }
    } catch (err) {
      setResponse("An error occurred connecting to Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2 text-slate-800">
            <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2 className="font-bold text-lg">AI Architect Assistant</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-slate-50">
            {response ? (
                <div className="prose prose-slate max-w-none">
                     {mode === 'image' ? (
                        <div dangerouslySetInnerHTML={{ __html: response }} />
                     ) : (
                        <div className="whitespace-pre-wrap bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-sm leading-relaxed text-slate-700">
                            {response}
                        </div>
                     )}
                     <button 
                        onClick={() => setResponse(null)}
                        className="mt-4 text-sky-600 text-sm font-medium hover:underline"
                     >
                        Ask another question
                     </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                     <div className="p-4 bg-sky-100 rounded-full">
                         <BotIcon mode={mode} />
                     </div>
                     <p className="text-slate-500 max-w-xs">
                        {mode === 'analysis' && "I can reason through complex engineering challenges using deep thinking."}
                        {mode === 'chat' && "I can search the web for real-time material costs and availability."}
                        {mode === 'image' && "I can visualize your architectural concepts in 4K resolution."}
                     </p>
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
            {/* Mode Switcher */}
            <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => setMode('analysis')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center space-x-2 ${mode === 'analysis' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                    <Zap className="h-4 w-4" /> <span>Think</span>
                </button>
                <button 
                  onClick={() => setMode('chat')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center space-x-2 ${mode === 'chat' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                    <Search className="h-4 w-4" /> <span>Search</span>
                </button>
                <button 
                  onClick={() => setMode('image')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all flex items-center justify-center space-x-2 ${mode === 'image' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                    <ImageIcon className="h-4 w-4" /> <span>Visualize</span>
                </button>
            </div>

            {mode === 'image' && (
                <div className="flex space-x-2 mb-3 items-center">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Resolution:</span>
                    {(['1K', '2K', '4K'] as const).map(s => (
                        <button 
                           key={s} 
                           onClick={() => setImageSize(s)}
                           className={`text-xs px-2 py-1 rounded border ${imageSize === s ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    mode === 'analysis' ? "e.g., Evaluate the stability of ..." :
                    mode === 'image' ? "e.g., A modern hospital in Gaza City..." :
                    "e.g., Where can I find cement near..."
                  }
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  disabled={loading || !prompt}
                  className="absolute right-2 top-2 p-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageSquare className="h-5 w-5" />}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

const BotIcon = ({ mode }: { mode: Mode }) => {
    if (mode === 'image') return <ImageIcon className="h-8 w-8 text-purple-600" />;
    if (mode === 'chat') return <Search className="h-8 w-8 text-sky-600" />;
    return <Zap className="h-8 w-8 text-slate-800" />;
};
