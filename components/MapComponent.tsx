
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import L from 'leaflet';
import { ArrowRight } from 'lucide-react';

// Fix Leaflet's default icon issue in React
// We use CDN URLs to avoid bundler-specific image imports that fail in ES modules
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  projects: Project[];
}

export const MapComponent: React.FC<MapComponentProps> = ({ projects }) => {
  // Center of Gaza Strip approx
  const center: [number, number] = [31.4, 34.38]; 

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 z-0 relative">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects.map((project) => (
          <Marker 
            key={project.id} 
            position={[project.location.lat, project.location.lng]}
          >
            <Popup>
              <div className="font-sans min-w-[200px] p-1">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{project.title}</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-slate-500 text-xs">{project.category}</p>
                  <div className="text-xs font-bold text-brand-success bg-green-50 px-2 py-0.5 rounded">
                     {Math.round((project.raised / project.budget) * 100)}% Funded
                  </div>
                </div>
                
                <Link 
                  to={`/projects/${project.id}`}
                  className="group flex items-center justify-center w-full py-2 bg-brand-primary !text-white text-xs font-bold rounded hover:bg-blue-800 transition-all no-underline"
                >
                  View Project Details 
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
