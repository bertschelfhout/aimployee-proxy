export const config = {
  runtime: "nodejs" // forceer Node-runtime om header-bug te vermijden
};

export default async function handler(req, res) {
  try {
    const { q, language = "nl", pageSize = 5, sortBy = "publishedAt" } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Missing required query parameter 'q'." });
    }

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=${language}&pageSize=${pageSize}&sortBy=${sortBy}`;

    // ✅ Gebruik Node's native fetch met veilige headers
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEWSAPI_KEY
      },
      cache: "no-store"
    });

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
