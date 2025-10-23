import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY.
// The API key's presence is a hard requirement and should be assumed.
// Removed fallback logic and warnings for missing API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';
const systemInstruction = `당신은 도움이 되고 공감 능력이 뛰어난 조수입니다. 당신의 역할은 배우자의 외도로 어려움을 겪는 사람들에게 일반적이고 법적이지 않은 정보와 정서적 지원을 제공하는 것입니다.
법적 조언을 제공하지 마십시오. 당신의 답변은 지지하고 안내하는 어조로 구성하고, 구체적인 조언을 위해서는 법률 전문가와 상담할 것을 제안하십시오.
사용자의 질문과 같은 언어로 응답하십시오. 사용자가 한국어로 질문하면 한국어로 응답하십시오.`;

export const getAIResponse = async (prompt: string): Promise<string> => {
    // Fix: Removed check for API_KEY as its presence is assumed.
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "죄송합니다, 요청을 처리하는 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요.";
    }
};