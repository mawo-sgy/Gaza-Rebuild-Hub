
import { Expert } from '../types';

// Mock database simulation
// In a real app, you would import { collection, addDoc } from 'firebase/firestore'
// and { db } from './firebaseConfig'

export const registerExpert = async (expertData: Omit<Expert, 'id' | 'verified' | 'specialization'>): Promise<{ success: boolean; id?: string; error?: string }> => {
  console.log("Submitting to Firestore...", expertData);

  // Simulate Network Delay (Firebase)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic Validation Logic
      if (!expertData.email.includes('@')) {
        resolve({ success: false, error: "Invalid email address." });
        return;
      }
      if (!expertData.name || !expertData.title) {
        resolve({ success: false, error: "Missing required fields." });
        return;
      }

      // Success
      resolve({ 
        success: true, 
        id: "exp_" + Math.random().toString(36).substr(2, 9) 
      });
    }, 1500);
  });
};

export const AVAILABLE_SKILLS = [
  "Structural Analysis",
  "Seismic Retrofitting",
  "Solar Power Systems",
  "Water Purification",
  "Project Management",
  "Urban Planning",
  "Medical Equipment Repair",
  "Electrical Grid Design",
  "Sustainable Materials",
  "Damage Assessment"
];
