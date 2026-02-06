
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/mockData';
import { Project } from '../types';
import { MapPin, ArrowLeft, CheckCircle, HardHat, TrendingUp, Clock, FileText, Download, Hammer, ListChecks } from 'lucide-react';
import { ProjectStatusTracker } from '../components/ProjectStatusTracker';

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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#003D66]">Loading Project Data...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;

  const percentFunded = Math.min(100, Math.round((project.raised / project.budget) * 100));
  
  // Calculate Cumulative "Master" Progress
  const subProjects = project.subProjects || [];
  const masterProgress = subProjects.length > 0
    ? Math.round(subProjects.reduce((acc, curr) => acc + curr.completion, 0) / subProjects.length)
    : 0;

  return (
    <div className="pb-20 bg-slate-50 font-sans">
      
      {/* 1. Hero Image & Ribbon */}
      <div className="relative h-[400px] w-full group">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003D66] via-[#003D66]/40 to-transparent opacity-90"></div>
        
        {/* Navigation Back */}
        <Link to="/projects" className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center transition-colors border border-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
        </Link>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-[#28A745] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow-lg">
                      {project.status}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded border border-white/20">
                      {project.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-2 font-sans tracking-tight">{project.title}</h1>
                <div className="flex items-center text-slate-200 text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-[#28A745]" /> {project.location.address}
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Progress & Visuals */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Master Progress Bar (Cumulative) */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-[#003D66] flex items-center">
                        <TrendingUp className="h-6 w-6 mr-3 text-[#28A745]" />
                        Overall Completion
                    </h2>
                    <span className="text-3xl font-extrabold text-[#28A745]">{masterProgress}%</span>
                </div>
                
                {/* Master Bar */}
                <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden mb-8 shadow-inner border border-slate-200">
                    <div 
                        className="bg-[#28A745] h-full rounded-full shadow-[0_0_15px_rgba(40,167,69,0.4)] relative overflow-hidden transition-all duration-1000 ease-out flex items-center justify-end pr-2" 
                        style={{ width: `${masterProgress}%` }}
                    >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                {/* Sub-Projects List */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide flex items-center mb-3">
                        <ListChecks className="h-4 w-4 mr-2" /> Task Breakdown
                    </h3>
                    {subProjects.length > 0 ? (
                        subProjects.map((sub) => (
                            <div key={sub.id} className="group">
                                <div className="flex justify-between text-sm mb-1 font-medium text-slate-700">
                                    <span>{sub.title}</span>
                                    <span>{sub.completion}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-[#003D66] h-2 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500"
                                        style={{ width: `${sub.completion}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-400 italic text-sm">No sub-projects defined currently.</p>
                    )}
                </div>
            </div>

            {/* Infrastructure Milestone Tracker */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-[#003D66] flex items-center">
                        Milestone Timeline
                    </h3>
                    <span className="text-sm text-slate-400 font-mono">ID: {project.id}</span>
                 </div>
                 <ProjectStatusTracker 
                    currentPhase={project.currentPhase} 
                    category={project.category} 
                 />
            </div>

            {/* Live Updates Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-[#003D66] mb-6 flex items-center">
                    <Clock className="h-5 w-5 mr-2" /> Live Field Updates
                </h3>
                {project.updates && project.updates.length > 0 ? (
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {project.updates.map((update) => (
                            <div key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-slate-500">
                                    <CheckCircle className="h-5 w-5 text-[#28A745]" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 mb-2 text-xs font-mono text-slate-500 uppercase border-b border-slate-200 pb-2">
                                        <span>{update.date}</span>
                                        <span className="text-slate-300">•</span>
                                        <span>{update.title}</span>
                                        {update.author && (
                                            <>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-[#003D66] font-bold">{update.author}</span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-slate-600 text-sm mb-2 leading-relaxed">{update.description}</p>
                                    {update.imageUrl && (
                                        <img src={update.imageUrl} alt="Update" className="rounded-lg w-full h-32 object-cover mt-2 border border-slate-200" />
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

        {/* Right Column: Financials, Brief & Experts */}
        <div className="space-y-6">
            
            {/* Transparency Financials */}
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-[#28A745] p-8">
                 <h3 className="text-lg font-bold text-[#003D66] mb-6">Financial Transparency</h3>
                 
                 <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                             <span className="text-slate-500">Total Budget Needed</span>
                             <span className="font-bold text-slate-900">${project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                             <span className="text-slate-500">Funds Deployed</span>
                             <span className="font-bold text-[#28A745]">${project.raised.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-[#28A745] h-3 rounded-full shadow-[0_0_10px_rgba(40,167,69,0.3)] relative overflow-hidden transition-all duration-1000 ease-out" 
                            style={{ width: `${percentFunded}%` }}
                        ></div>
                    </div>
                    
                    <div className="text-center">
                        <span className="text-3xl font-extrabold text-[#003D66]">{percentFunded}%</span>
                        <span className="text-slate-400 text-sm ml-2">Funded</span>
                    </div>

                    <Link to={`/donate/${project.id}`} className="block w-full py-3 bg-[#28A745] hover:bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 text-center">
                        Donate Now
                    </Link>
                 </div>
            </div>

            {/* Technical Brief */}
            {project.technicalBrief && (
                <div className="bg-[#003D66] text-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center border-b border-blue-800 pb-2">
                        <FileText className="h-5 w-5 mr-2 text-[#28A745]" />
                        Technical Brief
                    </h3>
                    
                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="text-blue-300 block text-xs uppercase tracking-wider mb-1">Estimated Timeline</span>
                            <div className="font-bold">{project.technicalBrief.estimatedDuration}</div>
                        </div>

                        <div>
                            <span className="text-blue-300 block text-xs uppercase tracking-wider mb-1">Required Certifications</span>
                            <ul className="list-disc list-inside text-slate-200 space-y-1">
                                {project.technicalBrief.requiredCertifications.map((cert, idx) => (
                                    <li key={idx}>{cert}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <span className="text-blue-300 block text-xs uppercase tracking-wider mb-1">Equipment Needed</span>
                            <div className="flex flex-wrap gap-2">
                                {project.technicalBrief.equipmentNeeded.map((item, idx) => (
                                    <span key={idx} className="bg-blue-900/50 px-2 py-1 rounded text-xs border border-blue-700 flex items-center">
                                        <Hammer className="h-3 w-3 mr-1 opacity-70" /> {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button className="w-full mt-2 py-2 border border-white/20 hover:bg-white/10 rounded flex items-center justify-center transition-colors text-sm font-medium">
                            <Download className="h-4 w-4 mr-2" /> Download Blueprints
                        </button>
                    </div>
                </div>
            )}

            {/* Expert Needs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-[#003D66] mb-4 flex items-center">
                    <HardHat className="h-5 w-5 mr-2 text-slate-400" />
                    Expertise Needed
                </h3>
                <div className="space-y-3">
                    {project.expertNeeds && project.expertNeeds.length > 0 ? (
                        project.expertNeeds.map((need, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <div className="font-bold text-slate-800 text-sm">{need.role}</div>
                                    <div className="text-xs text-slate-500">{need.count} positions open</div>
                                </div>
                                <Link 
                                    to="/join-mission"
                                    className="text-[#003D66] hover:text-blue-800 text-xs font-bold border border-[#003D66]/20 hover:border-[#003D66] px-3 py-1.5 rounded transition-all"
                                >
                                    Apply
                                </Link>
                            </div>
                        ))
                    ) : (
                         <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm text-center flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 mr-2" /> Roles Filled
                         </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
