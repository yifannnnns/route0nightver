
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCommunityInsights = async (communityName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide travel insights, hidden spots, and cultural facts about ${communityName} in Xiangshan (象山), Ningbo, China. Specifically focus on things interesting for tourists or road trippers on "Road 0". Return as JSON with title, content, and category.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["title", "content", "category"]
          }
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
