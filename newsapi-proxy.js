export default async function handler(req, res) {
  try {
    const { q, language = "nl", pageSize = 5, sortBy = "publishedAt" } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Missing required query parameter 'q'." });
    }
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=${language}&pageSize=${pageSize}&sortBy=${sortBy}`;
    const r = await fetch(url, { headers: { "X-Api-Key": process.env.NEWSAPI_KEY } });
    const data = await r.json();
    // Bubble up NewsAPI errors clearly
    if (r.status !== 200) {
      return res.status(r.status).json({ error: "NewsAPI error", status: r.status, data });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch NewsAPI", details: error?.message || String(error) });
  }
}
