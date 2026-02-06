
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapComponent } from '../components/MapComponent';
import { getProjects } from '../services/mockData';
import { Project } from '../types';
import { ArrowRight, Users, Building, DollarSign } from 'lucide-react';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const totalRaised = projects.reduce((acc, curr) => acc + curr.raised, 0);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Rebuilding Gaza, <br/> 
            <span className="text-brand-success">Piece by Piece.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            A transparent platform connecting global engineering experts and donors 
            with critical reconstruction initiatives in Gaza.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/projects" className="bg-brand-success hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 flex items-center justify-center shadow-lg shadow-green-900/20">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/join-mission" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center">
              Register as Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StatCard icon={Building} label="Active Projects" value={projects.length.toString()} />
           <StatCard icon={Users} label="Verified Experts" value="142" />
           <StatCard icon={DollarSign} label="Funds Deployed" value={`$${(totalRaised / 1000).toFixed(0)}k`} />
        </div>
      </div>

      {/* Interactive Map */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Live Impact Map</h2>
                <p className="text-slate-500 mt-2">Explore active reconstruction sites across the region.</p>
            </div>
            <Link to="/projects" className="text-brand-primary font-medium hover:text-blue-900 hidden md:block">
                See all list view &rarr;
            </Link>
        </div>
        <MapComponent projects={projects} />
      </section>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-4">
        <div className="bg-brand-primary/10 p-4 rounded-full text-brand-primary">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{label}</div>
        </div>
    </div>
);
