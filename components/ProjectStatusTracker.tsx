
import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { ProjectCategory, PROJECT_PHASES } from '../types';

interface ProjectStatusTrackerProps {
  currentPhase: number;
  category: ProjectCategory;
}

// "Smart" descriptions generator based on Category and Phase
const getPhaseDescription = (phaseIndex: number, category: ProjectCategory): string => {
  const descriptions: Record<number, Record<string, string>> = {
    0: { // Planning
      [ProjectCategory.HOSPITAL]: "Conducting structural integrity assessments and sourcing medical-grade HVAC systems.",
      [ProjectCategory.SCHOOL]: "Designing modular classroom layouts and ensuring safe play area designations.",
      [ProjectCategory.HOUSING]: "Verifying plot boundaries and sourcing rapid-deploy insulation materials.",
      [ProjectCategory.INFRASTRUCTURE]: "Surveying utility lines and calculating load requirements for the grid.",
      "default": "Initial site surveys and architectural blueprint finalization."
    },
    1: { // Foundation
      [ProjectCategory.HOSPITAL]: "Laying reinforced concrete base capable of supporting heavy diagnostic equipment.",
      [ProjectCategory.SCHOOL]: "Pouring earthquake-resistant foundations for the main academic block.",
      [ProjectCategory.HOUSING]: "Installing plumbing groundwork and pouring slab foundations.",
      [ProjectCategory.INFRASTRUCTURE]: "Excavating trenches for piping and laying sub-grade stabilization layers.",
      "default": "Site clearing, debris removal, and foundation pouring."
    },
    2: { // Construction
      [ProjectCategory.HOSPITAL]: "Erecting steel framework and installing sterile partition walls.",
      [ProjectCategory.SCHOOL]: "Assembling walls, roofing, and installing solar power units.",
      [ProjectCategory.HOUSING]: "Vertical assembly of housing units and window installation.",
      [ProjectCategory.INFRASTRUCTURE]: "Pipe fitting, cabling, and installation of control modules.",
      "default": "Main structural assembly and core system installation."
    },
    3: { // Finalizing
      [ProjectCategory.HOSPITAL]: "Sanitization, equipment calibration, and final safety inspections.",
      [ProjectCategory.SCHOOL]: "Painting, furniture installation, and safety certification.",
      [ProjectCategory.HOUSING]: "Utility connection testing and final interior finishing.",
      [ProjectCategory.INFRASTRUCTURE]: "System pressure testing and grid synchronization.",
      "default": "Final touches, safety checks, and handover preparation."
    }
  };

  const specific = descriptions[phaseIndex]?.[category];
  return specific || descriptions[phaseIndex]?.["default"] || "Proceeding with scheduled works.";
};

export const ProjectStatusTracker: React.FC<ProjectStatusTrackerProps> = ({ currentPhase, category }) => {
  return (
    <div className="relative">
      {PROJECT_PHASES.map((phase, index) => {
        const isCompleted = index < currentPhase;
        const isActive = index === currentPhase;
        const isFuture = index > currentPhase;

        return (
          <div key={phase} className="flex gap-4 pb-8 last:pb-0 relative">
            {/* Connecting Line */}
            {index !== PROJECT_PHASES.length - 1 && (
              <div 
                className={`absolute top-8 left-4 w-0.5 h-[calc(100%-1rem)] -translate-x-1/2 transition-colors duration-500 ${
                  isCompleted ? 'bg-[#28A745]' : 'bg-slate-200'
                }`} 
              />
            )}

            {/* Icon Column */}
            <div className="relative z-10 flex-shrink-0">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-[#28A745] border-[#28A745] text-white shadow-md shadow-green-100' 
                    : isActive 
                      ? 'bg-white border-[#003D66] text-[#003D66] shadow-lg shadow-blue-100 scale-110' 
                      : 'bg-slate-50 border-slate-300 text-slate-300'
                }`}
              >
                {isCompleted && <CheckCircle className="h-5 w-5" />}
                {isActive && <Loader2 className="h-5 w-5 animate-spin" />}
                {isFuture && <Circle className="h-5 w-5" />}
              </div>
            </div>

            {/* Content Column */}
            <div className={`pt-1 transition-opacity duration-500 ${isFuture ? 'opacity-50' : 'opacity-100'}`}>
              <h4 className={`text-sm font-bold uppercase tracking-wide mb-1 ${
                isActive ? 'text-[#003D66]' : isCompleted ? 'text-[#28A745]' : 'text-slate-500'
              }`}>
                {isActive && <span className="mr-2 text-[#003D66] animate-pulse">● Current Phase:</span>}
                {phase}
              </h4>
              
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {getPhaseDescription(index, category)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
