import React from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectCategory } from '../types';
import { MapPin, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const percentFunded = Math.min(100, Math.round((project.raised / project.budget) * 100));
  
  const categoryColor = {
    [ProjectCategory.HOSPITAL]: 'bg-red-100 text-red-700',
    [ProjectCategory.SCHOOL]: 'bg-yellow-100 text-yellow-700',
    [ProjectCategory.HOUSING]: 'bg-green-100 text-green-700',
    [ProjectCategory.INFRASTRUCTURE]: 'bg-slate-100 text-slate-700',
  }[project.category];

  return (
    <Link 
      to={`/projects/${project.id}`}
      className="block group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:border-brand-primary h-full flex flex-col"
    >
      <div className="relative h-48 bg-slate-200 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${categoryColor}`}>
          {project.category}
        </span>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-brand-primary mb-2 group-hover:text-blue-800 transition-colors">{project.title}</h3>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {project.location.address}
        </div>
        
        <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-500">Funded</span>
            <span className="text-slate-900">{percentFunded}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-brand-success h-2.5 rounded-full" 
              style={{ width: `${percentFunded}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>${project.raised.toLocaleString()} raised</span>
            <span>Goal: ${project.budget.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
             <div className="flex -space-x-2">
               {/* Mock Donors */}
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                   {String.fromCharCode(64 + i)}
                 </div>
               ))}
               <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">
                 +12
               </div>
             </div>
             <span className="text-brand-success text-sm font-medium flex items-center group-hover:underline">
               View Details <TrendingUp className="h-4 w-4 ml-1" />
             </span>
        </div>
      </div>
    </Link>
  );
};