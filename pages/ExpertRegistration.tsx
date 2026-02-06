
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Loader2, User, Mail, MapPin, Briefcase } from 'lucide-react';
import { registerExpert, AVAILABLE_SKILLS } from '../services/expertService';
import { Expert } from '../types';

export const ExpertRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: 'Civil Engineer',
    yearsExperience: 5,
    location: '',
    availability: 'Remote' as Expert['availability'],
    bio: '',
    skills: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await registerExpert(formData);
      if (result.success) {
        setSuccess(true);
        window.scrollTo(0, 0);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border-t-8 border-brand-success relative overflow-hidden">
           <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-brand-success" />
           </div>
           <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome Aboard!</h2>
           <p className="text-slate-600 mb-8 text-lg">
             Thank you for joining the mission, <span className="font-semibold text-slate-900">{formData.name}</span>. 
             <br/>
             Project managers can now view your profile and request your expertise.
           </p>
           <div className="space-y-3">
             <Link to="/projects" className="block w-full py-3 bg-brand-primary text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">
               Explore Projects
             </Link>
             <Link to="/" className="block w-full py-3 text-slate-500 hover:text-slate-700 font-medium">
               Return Home
             </Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-brand-primary p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Join as an Expert</h1>
            <p className="text-blue-200">Lend your skills to rebuild infrastructure, schools, and hospitals.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100">
                {error}
              </div>
            )}

            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Professional Identity</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white text-slate-900" 
                      placeholder="e.g. Sarah Connor" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white text-slate-900" 
                      placeholder="sarah@example.com" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Professional Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <select 
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white text-slate-900"
                      >
                        <option>Civil Engineer</option>
                        <option>Architect</option>
                        <option>Structural Engineer</option>
                        <option>Electrical Engineer</option>
                        <option>Urban Planner</option>
                        <option>Project Manager</option>
                        <option>Medical Tech Specialist</option>
                        <option>Water Systems Engineer</option>
                      </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                    <input 
                      type="number" 
                      name="yearsExperience" 
                      min="0"
                      max="60"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white text-slate-900" 
                    />
                 </div>
              </div>
            </div>

            {/* Section 2: Logistics */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Logistics & Availability</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Location (Country)</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input 
                          type="text" 
                          name="location" 
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all bg-white text-slate-900" 
                          placeholder="e.g. Jordan"
                        />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Availability</label>
                    <div className="flex space-x-4">
                        {['Remote', 'On-site', 'Both'].map((opt) => (
                           <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                              <input 
                                type="radio" 
                                name="availability" 
                                value={opt} 
                                checked={formData.availability === opt}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-brand-success border-slate-300 focus:ring-brand-success" 
                              />
                              <span className="text-slate-700 group-hover:text-brand-primary transition-colors">{opt}</span>
                           </label>
                        ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Section 3: Skills & Bio */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Expertise & Bio</h3>
                
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Specific Skills (Select all that apply)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {AVAILABLE_SKILLS.map(skill => (
                            <div 
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className={`
                                    cursor-pointer px-3 py-2 rounded-lg text-sm border transition-all select-none
                                    ${formData.skills.includes(skill) 
                                        ? 'bg-brand-primary text-white border-brand-primary shadow-md' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary/50'
                                    }
                                `}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Professional Bio</label>
                    <textarea 
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all resize-none bg-white text-slate-900"
                        placeholder="Tell us about your relevant experience..."
                    ></textarea>
                </div>
            </div>

            <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-brand-success hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/10 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                    By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
