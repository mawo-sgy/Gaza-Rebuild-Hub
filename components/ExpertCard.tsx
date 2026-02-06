
import React from 'react';
import { Expert } from '../types';
import { MapPin, Briefcase, CheckCircle, Globe } from 'lucide-react';

interface ExpertCardProps {
  expert: Expert;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-brand-primary border border-slate-200">
            {expert.imageUrl ? (
              <img src={expert.imageUrl} alt={expert.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              expert.name.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{expert.name}</h3>
            <p className="text-sm text-slate-500">{expert.title}</p>
          </div>
        </div>
        {expert.verified && (
          <div className="text-brand-success" title="Verified Expert">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs font-medium border ${
          expert.availability === 'On-site' ? 'bg-orange-50 text-orange-700 border-orange-200' :
          expert.availability === 'Remote' ? 'bg-purple-50 text-purple-700 border-purple-200' :
          'bg-blue-50 text-blue-700 border-blue-200'
        }`}>
          {expert.availability === 'Both' ? 'Remote & On-site' : expert.availability}
        </span>
        <span className="text-xs text-slate-400 flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {expert.location}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
        {expert.bio || `Experienced ${expert.title} with ${expert.yearsExperience} years of experience ready to assist in reconstruction efforts.`}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {expert.skills.slice(0, 3).map((skill, idx) => (
          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
            {skill}
          </span>
        ))}
        {expert.skills.length > 3 && (
            <span className="text-xs bg-slate-50 text-slate-400 px-2 py-1 rounded">+{expert.skills.length - 3}</span>
        )}
      </div>

      <button className="w-full py-2 border border-brand-primary text-brand-primary font-medium rounded-lg hover:bg-brand-primary hover:text-white transition-colors text-sm">
        View Profile
      </button>
    </div>
  );
};
