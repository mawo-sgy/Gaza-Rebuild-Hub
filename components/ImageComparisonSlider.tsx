
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  // Unified Pointer Events for Mouse and Touch
  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) { // dragging or left-click held
       handleMove(e.clientX);
    }
  };
  
  // Clean up global events if dragging goes outside container
  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  return (
    <div 
         className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden cursor-col-resize select-none border border-slate-200 shadow-sm group touch-none"
         ref={containerRef}
         onPointerDown={handlePointerDown}
         onPointerMove={handlePointerMove}
         // touch-none is critical for mobile to prevent scrolling while sliding
         style={{ touchAction: 'none' }}
    >
      {/* Background (After Image) - 2026/Current */}
      <img 
        src={afterImage} 
        alt="Reconstruction Progress" 
        className="absolute inset-0 w-full h-full object-cover" 
        draggable={false}
      />
      
      {/* Label After */}
      <div className="absolute top-4 right-4 bg-[#003D66]/80 backdrop-blur-md text-white px-3 py-1.5 rounded shadow-lg text-xs font-bold z-10 uppercase tracking-wider border border-white/20">
        Current Status
      </div>

      {/* Foreground (Before Image) - 2023/Damage - Clipped */}
      <div 
        className="absolute inset-0 h-full w-full overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Original Damage" 
          className="absolute inset-0 w-full h-full object-cover max-w-none" 
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          draggable={false}
        />
        {/* Label Before */}
        <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-md text-white px-3 py-1.5 rounded shadow-lg text-xs font-bold z-20 uppercase tracking-wider border border-white/20">
            Initial Damage
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white cursor-col-resize shadow-[0_0_15px_rgba(0,0,0,0.5)] z-30"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-[#003D66] border-4 border-slate-100 hover:scale-110 transition-transform">
            <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
