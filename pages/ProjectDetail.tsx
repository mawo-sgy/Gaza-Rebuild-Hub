
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/mockData';
import { Project } from '../types';
import { MapPin, Calendar, ArrowLeft, CheckCircle, HardHat, TrendingUp, DollarSign } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then(data => {
        setProject(data || null);
        setLoading(false);
      });
    }
  }, [projectId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-brand-primary">Loading Project Data...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;

  const percentFunded = Math.min(100, Math.round((project.raised / project.budget) * 100));

  return (
    <div className="pb-20 bg-slate-50">
      
      {/* 1. Hero Image & Ribbon */}
      <div className="relative h-[400px] w-full">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent"></div>
        
        {/* Navigation Back */}
        <Link to="/projects" className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
        </Link>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="container mx-auto">
                {/* Status Ribbon */}
                <span className="inline-block bg-brand-success text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded mb-4 shadow-lg">
                    {project.status}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
                <div className="flex items-center text-slate-200 text-lg">
                    <MapPin className="h-5 w-5 mr-2" /> {project.location.address}
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Transparency & Details */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* 2. Transparency Dashboard */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-brand-primary flex items-center">
                        <TrendingUp className="h-6 w-6 mr-2 text-brand-success" />
                        Transparency Dashboard
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <div className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">Total Budget</div>
                        <div className="text-3xl font-bold text-slate-900">${project.budget.toLocaleString()}</div>
                     </div>
                     <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <div className="text-green-800 text-sm font-medium uppercase tracking-wide mb-1">Funds Raised</div>
                        <div className="text-3xl font-bold text-brand-success">${project.raised.toLocaleString()}</div>
                     </div>
                </div>

                <div className="mb-2 flex justify-between text-sm font-bold text-slate-700">
                    <span>Progress</span>
                    <span>{percentFunded}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-6">
                    <div 
                        className="bg-brand-success h-4 rounded-full shadow-[0_0_10px_rgba(40,167,69,0.5)] relative overflow-hidden" 
                        style={{ width: `${percentFunded}%` }}
                    >
                         <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-lg">
                    {project.description}
                </p>
                
                <div className="mt-6">
                    <button className="w-full py-4 bg-brand-success hover:bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-900/10 transition-all transform hover:-translate-y-1">
                        Donate to this Project
                    </button>
                </div>
            </div>

            {/* 4. Updates Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-brand-primary mb-6">Project Timeline</h3>
                {project.updates && project.updates.length > 0 ? (
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {project.updates.map((update) => (
                            <div key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-slate-500">
                                    <CheckCircle className="h-5 w-5 text-brand-success" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-slate-900">{update.title}</div>
                                        <time className="font-mono text-xs text-slate-500">{update.date}</time>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-2">{update.description}</p>
                                    {update.imageUrl && (
                                        <img src={update.imageUrl} alt="Update" className="rounded-lg w-full h-32 object-cover mt-2" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400 italic">No updates posted yet.</p>
                )}
            </div>

        </div>

        {/* Right Column: Experts */}
        <div className="space-y-6">
            {/* 3. Expert Needs */}
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-brand-primary p-6">
                <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center">
                    <HardHat className="h-5 w-5 mr-2" />
                    Expertise Needed
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                    This project requires specific technical skills. Apply if you can help.
                </p>
                
                <div className="space-y-3">
                    {project.expertNeeds && project.expertNeeds.length > 0 ? (
                        project.expertNeeds.map((need, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <div className="font-bold text-slate-800">{need.role}</div>
                                    <div className="text-xs text-slate-500">{need.count} positions open</div>
                                </div>
                                <Link 
                                    to="/join-mission"
                                    className="bg-brand-primary hover:bg-blue-900 text-white text-xs px-3 py-2 rounded font-medium transition-colors"
                                >
                                    I Can Help
                                </Link>
                            </div>
                        ))
                    ) : (
                         <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm text-center">
                            All expert roles currently filled!
                         </div>
                    )}
                </div>
            </div>

            <div className="bg-brand-primary rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Spread the Word</h3>
                    <p className="text-blue-100 text-sm mb-4">Sharing this project increases its chance of funding by 40%.</p>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded font-medium transition-colors">
                        Share Project
                    </button>
                 </div>
                 <div className="absolute -right-6 -bottom-6 text-white/5">
                    <TrendingUp className="w-32 h-32" />
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
};
