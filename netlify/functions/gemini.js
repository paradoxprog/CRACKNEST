// netlify/functions/gemini.js
export const handler = async (event, context) => {
  // 1. Get the Key from Netlify Environment Variables
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error: API Key missing' }),
    };
  }

  // 2. Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // 3. Parse the incoming body (Netlify sends body as a string)
    const reqBody = JSON.parse(event.body);
    const userPrompt = reqBody.prompt;

    // 4. Call Google Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }]
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to communicate with AI service' }),
    };
  }
};
