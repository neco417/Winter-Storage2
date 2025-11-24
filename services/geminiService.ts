import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: The API key is accessed via process.env.API_KEY
const getAiClient = () => {
    // In a real scenario, we might handle missing keys gracefully in the UI, 
    // but per instructions, we assume process.env.API_KEY is valid.
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export interface AnalysisResult {
    summary: string;
    tags: string[];
    moodColor: string;
    category: string;
}

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
    const ai = getAiClient();
    
    const prompt = `
    Analyze the following text or links provided by a creative user. 
    They are collecting this for inspiration.
    
    1. Provide a short summary (max 10 words).
    2. Extract 3-5 relevant tags (e.g., "Cyberpunk", "Typography", "Tutorial").
    3. Suggest a hex color code representing the "mood" of this content.
    4. Categorize it into one of: "Visual", "Tutorial", "Reference", "Article".

    Content: "${text}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING },
                        tags: { 
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        moodColor: { type: Type.STRING },
                        category: { type: Type.STRING }
                    },
                    required: ["summary", "tags", "moodColor", "category"]
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as AnalysisResult;
        }
        throw new Error("No response text generated");
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        // Fallback mock data in case of API error or empty key for demo robustness
        return {
            summary: "New Inspiration",
            tags: ["Uncategorized", "Import"],
            moodColor: "#d4af37",
            category: "Reference"
        };
    }
};