export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const { q, language = "nl", pageSize = 5, sortBy = "publishedAt" } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query parameter 'q'." });

    const apiKey = process.env.NEWSAPI_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing NEWSAPI_KEY" });

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&language=${language}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${apiKey}`;

    const r = await fetch(url);
    const data = await r.json();

    if (!r.ok) return res.status(r.status).json(data);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
