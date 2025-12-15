export default async function handler(req, res) {
    // 1. Handle CORS (Optional: allows access from specific domains if needed)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
    // 2. Handle Preflight Options
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // 3. Check Method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    // 4. Get API Key securely from Environment Variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server Misconfiguration: API Key missing' });
    }
  
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }
  
    // 5. Call Google Gemini API
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
  
      const data = await response.json();
  
      // 6. Return simplified text to frontend
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        res.status(200).json({ text });
      } else {
        console.error("Gemini API Error:", JSON.stringify(data));
        res.status(500).json({ error: 'Failed to generate content from AI provider' });
      }
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
