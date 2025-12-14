export default async function handler(req, res) {
  // 1. Check for POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Get the prompt from the frontend
  const { prompt } = req.body;
  
  // 3. Get the API Key from Vercel Environment Variables
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: API Key missing' });
  }

  try {
    // 4. Call Google Gemini API securely from the server
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    // 5. Send the result back to the frontend
    if (!response.ok) {
        throw new Error(data.error?.message || 'API Error');
    }
    
    return res.status(200).json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: 'Failed to fetch response from AI' });
  }
}
