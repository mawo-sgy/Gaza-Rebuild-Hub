
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById } from '../services/mockData';
import { Project } from '../types';
import { ArrowLeft, CreditCard, Heart, ShieldCheck, Loader2, Check } from 'lucide-react';

export const Donate: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then(data => {
        setProject(data || null);
        setLoading(false);
      });
    }
  }, [projectId]);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value));
  };

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Redirect back to project page after 3 seconds
      setTimeout(() => {
        if (project) {
          navigate(`/projects/${project.id}`);
        }
      }, 3000);
    }, 1500);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#003D66]">Loading...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
      
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#003D66]/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-[bounce_0.5s_ease-out]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-[#28A745]" />
            </div>
            <h2 className="text-3xl font-bold text-[#003D66] mb-4">Thank You!</h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              Thank you for your generosity! Your contribution is directly fueling the reconstruction of <span className="font-bold text-slate-900">{project.title}</span> in Gaza. 
              <br/><br/>
              Together, we rebuild hope.
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="h-full bg-[#28A745] animate-[width_3s_linear] w-full origin-left"></div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Redirecting you back to project details...</p>
          </div>
        </div>
      )}

      <div className="container max-w-5xl mx-auto">
        <Link to={`/projects/${project.id}`} className="inline-flex items-center text-slate-500 hover:text-[#003D66] mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Cancel & Return
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left: Project Context */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
               <div className="p-6">
                  <h2 className="text-xl font-bold text-[#003D66] mb-2">{project.title}</h2>
                  <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                  <div className="flex items-center text-sm text-[#28A745] font-medium bg-green-50 px-3 py-2 rounded-lg inline-block">
                     <ShieldCheck className="h-4 w-4 mr-2" /> Verified Humanitarian Project
                  </div>
               </div>
            </div>
            
            <div className="bg-[#003D66] text-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-lg mb-2 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-[#28A745]" /> Why Donate?
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                    Every dollar goes directly to material costs and local labor. We provide full transparency on how funds are utilized, tracking progress from foundation to completion.
                </p>
            </div>
          </div>

          {/* Right: Donation Form */}
          <div className="lg:col-span-3">
             <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                <h1 className="text-2xl font-bold text-[#003D66] mb-6">Secure Donation</h1>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                   
                   {/* Amount Selection */}
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Select Donation Amount</label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                         {[25, 50, 100].map((val) => (
                             <button
                               key={val}
                               type="button"
                               onClick={() => handlePresetClick(val)}
                               className={`py-3 rounded-lg border font-bold text-lg transition-all ${
                                 amount === val && customAmount === ''
                                   ? 'bg-[#003D66] text-white border-[#003D66] shadow-md'
                                   : 'bg-white text-slate-600 border-slate-300 hover:border-[#003D66] hover:text-[#003D66]'
                               }`}
                             >
                               ${val}
                             </button>
                         ))}
                      </div>
                      <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                          <input 
                            type="number" 
                            placeholder="Custom Amount" 
                            min="1"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className={`w-full pl-8 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#003D66] outline-none transition-all font-medium bg-white text-slate-900 ${
                                customAmount !== '' ? 'border-[#003D66] bg-blue-50/10' : 'border-slate-300'
                            }`}
                          />
                      </div>
                   </div>

                   {/* Personal Info */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                         <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#003D66] outline-none bg-white text-slate-900 placeholder-slate-400"
                            placeholder="e.g. John Doe"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                         <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#003D66] outline-none bg-white text-slate-900 placeholder-slate-400"
                            placeholder="john@example.com"
                         />
                      </div>
                   </div>

                   {/* Fake Payment Fields */}
                   <div>
                       <label className="block text-sm font-medium text-slate-700 mb-3">Payment Method</label>
                       <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                               <CreditCard className="h-5 w-5 text-slate-400" />
                               <span className="text-slate-500 text-sm font-medium">Card ending in •••• 4242</span>
                           </div>
                           <span className="text-xs text-[#28A745] font-bold">Secure</span>
                       </div>
                   </div>

                   <button 
                     type="submit" 
                     disabled={isProcessing}
                     className="w-full bg-[#28A745] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/10 transition-all transform hover:-translate-y-1 flex items-center justify-center text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                      {isProcessing ? (
                         <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing Donation...</>
                      ) : (
                         `Donate $${amount}`
                      )}
                   </button>
                   
                   <p className="text-center text-xs text-slate-400">
                      Gaza Rebuild Hub is a non-profit initiative.
                   </p>

                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
