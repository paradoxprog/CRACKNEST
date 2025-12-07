export default async function handler(req, res) {
  // 1. CORS Headers - Allow your HTML to talk to this backend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Handle browser pre-checks (OPTIONS request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 4. Get the prompt from main.html
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // 5. Get API Key from Vercel Environment Variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server Error: GEMINI_API_KEY is not set in Vercel settings.' });
    }

    // 6. Call Google Gemini API
    // CRITICAL FIX: Using 'gemini-1.5-flash' which has higher rate limits (15 req/min)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    // 7. Handle Google Errors (like 429)
    if (!response.ok) {
      console.error("Google API Error:", data);
      return res.status(response.status).json({ 
        error: data.error?.message || 'Error fetching from Gemini' 
      });
    }

    // 8. Success
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
