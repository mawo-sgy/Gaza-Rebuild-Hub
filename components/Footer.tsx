
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowUp, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#003D66] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-end justify-center overflow-hidden bg-[#003D66] relative">
                        <Building2 className="h-6 w-6 text-white translate-y-0.5" />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-[#28A745] rounded-full p-0.5 shadow-sm border border-[#003D66]">
                        <ArrowUp className="h-3 w-3 text-white stroke-[4px]" />
                    </div>
                </div>
                <div className="flex flex-col leading-none justify-center">
                    <span className="text-[#28A745] font-bold text-xs uppercase tracking-wider mb-0.5">Gaza</span>
                    <span className="text-white font-bold text-lg tracking-tight leading-none">Rebuild Hub</span>
                </div>
             </div>
             <p className="text-blue-200 text-sm leading-relaxed mb-6">
                Connecting global expertise and resources to rebuild vital infrastructure, restore hope, and construct a sustainable future for Gaza.
             </p>
             <div className="flex space-x-4">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#28A745] transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#28A745] transition-colors"><Twitter className="h-4 w-4" /></a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#28A745] transition-colors"><Instagram className="h-4 w-4" /></a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#28A745] transition-colors"><Linkedin className="h-4 w-4" /></a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Platform</h4>
            <ul className="space-y-3 text-sm text-blue-200">
                <li><Link to="/" className="hover:text-[#28A745] transition-colors">Home</Link></li>
                <li><Link to="/projects" className="hover:text-[#28A745] transition-colors">Projects Map</Link></li>
                <li><Link to="/join-mission" className="hover:text-[#28A745] transition-colors">Expert Registration</Link></li>
                <li><Link to="/about" className="hover:text-[#28A745] transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Resources</h4>
            <ul className="space-y-3 text-sm text-blue-200">
                <li><a href="#" className="hover:text-[#28A745] transition-colors">Humanitarian Data</a></li>
                <li><a href="#" className="hover:text-[#28A745] transition-colors">Engineering Guidelines</a></li>
                <li><a href="#" className="hover:text-[#28A745] transition-colors">Safety Protocols</a></li>
                <li><a href="#" className="hover:text-[#28A745] transition-colors">Impact Reports</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Stay Updated</h4>
            <p className="text-xs text-blue-200 mb-4">Receive weekly updates on reconstruction progress.</p>
            <form className="flex">
                <input type="email" placeholder="Email address" className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-white placeholder-blue-300 text-sm w-full focus:outline-none focus:bg-white/20" />
                <button className="bg-[#28A745] hover:bg-green-600 px-4 py-2 rounded-r-lg text-white font-bold transition-colors">
                    Go
                </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
            <p>&copy; {new Date().getFullYear()} Gaza Rebuild Hub. Open Source for Humanity.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 font-medium">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
                <span>by SINWAR team</span>
            </div>
        </div>
      </div>
    </footer>
  );
};
