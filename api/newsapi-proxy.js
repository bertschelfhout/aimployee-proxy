// ✅ Forceer Node-runtime, niet Edge
export const config = {
  runtime: "nodejs18.x"
};

// ✅ Gebruik standaard Node 'https' + fetch, zonder X-Api-Key header (NewsAPI accepteert ook apiKey in URL)
export default async function handler(req, res) {
  try {
    const { q, language = "nl", pageSize = 5, sortBy = "publishedAt" } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing required query parameter 'q'." });
    }

    const apiKey = process.env.NEWSAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing NEWSAPI_KEY environment variable" });
    }

    // ✅ Plaats de sleutel in de URL in plaats van de header
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&language=${language}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "NewsAPI error",
        status: response.status,
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch NewsAPI",
      details: error?.message || String(error)
    });
  }
}
