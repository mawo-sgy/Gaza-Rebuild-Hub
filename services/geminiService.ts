
import { GoogleGenAI } from "@google/genai";

// Initialize AI Client
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export interface ChatContext {
    totalProjects: number;
    totalExperts: number;
    totalFunds: number;
}

export const createChatSession = (context: ChatContext) => {
    const systemInstruction = `
    You are the "AI Architect" for the Gaza Rebuild Hub. 
    Your role is to assist donors and experts in understanding the reconstruction efforts.
    
    Current Real-Time Stats:
    - Active Projects: ${context.totalProjects}
    - Registered Experts: ${context.totalExperts}
    - Funds Deployed: $${context.totalFunds.toLocaleString()}

    Guidelines:
    1. Tone: Empathetic, professional, technical but accessible, and hopeful.
    2. Focus: Strictly on reconstruction, humanitarian aid logistics, engineering requirements, and project funding.
    3. If asked about politics, politely pivot back to the humanitarian reconstruction mission.
    4. If asked "How can I help?", suggest two paths: donating funds or registering as an expert if they have skills.
    5. Be concise.
    `;

    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });
};

export const sendMessageToChat = async (chatSession: any, message: string) => {
    try {
        const result = await chatSession.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "I'm having trouble connecting to the satellite network. Please try again in a moment.";
    }
};

// Legacy support for specific tools if needed separately
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
