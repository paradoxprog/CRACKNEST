// api/gemini.js

export const config = {
    runtime: 'edge', // Runs faster and cheaper on Vercel
};

export default async function handler(req) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { prompt } = await req.json();
        
        // 1. Get Key from Vercel Environment Variables
        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            return new Response(JSON.stringify({ error: 'Server Config Error: GEMINI_API_KEY is missing in Vercel Settings.' }), { status: 500 });
        }

        // 2. Model Priority List
        // We prioritize your requested model: gemini-2.0-flash
        const models = [
            'gemini-2.0-flash',      // YOUR REQUESTED MODEL
            'gemini-2.0-flash-exp',  // Fallback for experimental alias
            'gemini-1.5-flash',      // Stable fallback if 2.0 fails (quota)
            'gemini-1.5-pro'         
        ];

        // 3. Loop through models until one works
        for (const model of models) {
            try {
                console.log(`Attempting model: ${model}`);
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                const data = await response.json();

                // If Google returns an error (like Quota or Not Found), throw to catch block
                if (data.error) {
                    console.warn(`Model ${model} failed: ${data.error.message}`);
                    throw new Error(data.error.message);
                }

                // If successful, return data to frontend immediately
                return new Response(JSON.stringify(data), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });

            } catch (err) {
                // If this was the last model in the list, fail completely
                if (model === models[models.length - 1]) {
                    console.error("All models failed.");
                    throw new Error(`All AI models failed. Last error: ${err.message}`);
                }
                // Otherwise, continue loop to try next model
            }
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
