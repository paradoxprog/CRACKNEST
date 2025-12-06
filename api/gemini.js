// api/gemini.js

export const config = {
    runtime: 'edge', // Runs faster on Vercel
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { prompt } = await req.json();
        
        // Get Key from Vercel Environment Variables
        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), { status: 500 });
        }

        // --- Smart Fallback Logic (Server Side) ---
        
        // List of models to try in order of preference
        const models = [
            'gemini-2.0-flash-exp', // Newest, fast
            'gemini-1.5-flash',     // Stable, fast
            'gemini-1.5-flash-001', // Backup version
            'gemini-pro'            // Legacy backup
        ];

        for (const model of models) {
            try {
                console.log(`Attempting to use model: ${model}`);
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                const data = await response.json();

                // If successful (no error object in response)
                if (!data.error) {
                    return new Response(JSON.stringify(data), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // If specific 404/Not Found error, loop to next model
                if (data.error.code === 404 || data.error.message.includes('not found')) {
                    console.warn(`Model ${model} not found/supported, trying next...`);
                    continue; 
                }

                // If it's a legitimate error (like quota or bad request), stop and report it
                throw new Error(data.error.message);

            } catch (err) {
                // If it's the last model and it failed, throw error
                if (model === models[models.length - 1]) {
                    throw err;
                }
            }
        }

        throw new Error('All models failed to respond.');

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
