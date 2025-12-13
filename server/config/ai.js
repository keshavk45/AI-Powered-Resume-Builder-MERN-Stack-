import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: "GEMINI_API_KEY",
    baseURL: "OPENAI_BASE_URL"
});

export default ai