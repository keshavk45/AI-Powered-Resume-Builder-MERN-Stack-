export const generateText = async (userContent) => {
    const apiKey = process.env.OPEN_API_KEY;
    const model = process.env.OPENAI_MODEL;
    const baseURL = process.env.OPENAI_BASE_URL;

    if (!apiKey || !model || !baseURL) {
        throw new Error('Missing required environment variables: OPEN_API_KEY, OPENAI_MODEL, OPENAI_BASE_URL');
    }

    try {
        const url = `${baseURL}models/${model}:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: userContent
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Response Error:', errorData);
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from API');
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('generateText error:', error.message);
        throw error;
    }
};