import React, { useState, useEffect } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { getProjects } from '../services/mockData';
import { Project, ProjectCategory } from '../types';
import { Filter } from 'lucide-react';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reconstruction Projects</h1>
          <p className="text-slate-500 mt-1">Browse, fund, or contribute expertise to active sites.</p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm overflow-x-auto max-w-full">
            <div className="px-3 text-slate-400">
                <Filter className="h-4 w-4" />
            </div>
            {['All', ...Object.values(ProjectCategory)].map((category) => (
                <button
                    key={category}
                    onClick={() => setFilter(category as ProjectCategory | 'All')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                        filter === category 
                        ? 'bg-slate-800 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
          <div className="text-center py-20">
              <p className="text-slate-400">No projects found in this category.</p>
          </div>
      )}
    </div>
  );
};