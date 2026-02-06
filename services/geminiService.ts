import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI Client
// Note: In a real app, never expose API_KEY in frontend code. Use a backend proxy.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

// 1. Thinking Mode: Complex Engineering Analysis
export const analyzeProjectFeasibility = async (projectDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the engineering feasibility and material requirements for this reconstruction project in Gaza: ${projectDescription}. Provide a technical summary.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // Max thinking for deep reasoning
      }
    });
    return response.text;
  } catch (error) {
    console.error("Analysis failed:", error);
    return "Unable to analyze at this time. Please check API configuration.";
  }
};

// 2. Search Grounding: Get real-time context
export const getConstructionStatus = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Search failed:", error);
    return { text: "Search unavailable.", sources: [] };
  }
};

// 3. Image Generation: Visualize the Result
export const generateProjectRender = async (prompt: string, size: '1K' | '2K' | '4K' = '1K') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `Photorealistic architectural render of a reconstruction project in Gaza: ${prompt}. Sunny day, modern sustainable materials, hopeful atmosphere.` }]
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "16:9"
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image gen failed:", error);
    return null;
  }
};

// 4. Maps Grounding: Find nearby resources
export const findNearbyResources = async (location: string, resourceType: string) => {
   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find ${resourceType} near ${location} in Gaza.`,
      config: {
        tools: [{googleMaps: {}}],
      },
    });
    return response.text;
   } catch (error) {
     console.error("Maps failed:", error);
     return "Map data unavailable.";
   }
}
