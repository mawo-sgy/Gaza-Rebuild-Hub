
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, LayoutGrid, Building2, ArrowUp } from 'lucide-react';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [imageError, setImageError] = useState(false);

  const navItemClass = (path: string) => 
    clsx(
      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
      location.pathname === path 
        ? "bg-white/10 text-white" 
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    );

  return (
    <nav className="bg-brand-primary border-b border-brand-primary sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          {/* Logo Container */}
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-[140px] flex items-center justify-center">
             {!imageError ? (
               <img 
                 src="/logo.png" 
                 alt="Gaza Rebuild Hub" 
                 className="h-10 w-auto object-contain"
                 onError={() => setImageError(true)}
               />
             ) : (
               /* Fallback Vector Logo (Matches your design) */
               <div className="flex items-center gap-3">
                  <div className="relative">
                      {/* Icon imitating the logo structure */}
                      <div className="w-8 h-8 rounded-full border-2 border-brand-primary flex items-end justify-center overflow-hidden bg-sky-50 relative">
                          <Building2 className="h-5 w-5 text-brand-primary translate-y-0.5" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                          <ArrowUp className="h-3 w-3 text-brand-success stroke-[4px]" />
                      </div>
                  </div>
                  <div className="flex flex-col leading-none justify-center">
                      <span className="text-brand-success font-bold text-xs uppercase tracking-wider mb-0.5">Gaza</span>
                      <span className="text-brand-primary font-bold text-sm tracking-tight leading-none">Rebuild</span>
                      <span className="text-brand-primary font-bold text-sm tracking-tight leading-none">Hub</span>
                  </div>
               </div>
             )}
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={navItemClass('/')}>
            <Map className="h-4 w-4" />
            <span>Map View</span>
          </Link>
          <Link to="/projects" className={navItemClass('/projects')}>
            <LayoutGrid className="h-4 w-4" />
            <span>Projects</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
