# Aimployee NewsAPI Proxy (Vercel)

Deze mini-proxy maakt NewsAPI bereikbaar voor je Custom GPT via Vercel.
Hij voegt automatisch jouw `NEWSAPI_KEY` toe als header en stuurt de JSON-response terug.

## Structuur
```
api/
  newsapi-proxy.js   # serverless function
vercel.json          # Vercel config
```

## Deploy-stappen (zonder Git)
1) Ga naar https://vercel.com/new en kies **Upload Project** (onderaan).
2) Upload deze map (of de .zip).
3) Voeg in **Settings → Environment Variables** toe:
   - Name: `NEWSAPI_KEY`
   - Value: jouw NewsAPI key (van https://newsapi.org)
   - Environment: Production
4) Klik **Deploy** en wacht tot het klaar is.

## Testen
Ga naar:
```
https://<jouw-project>.vercel.app/api/newsapi-proxy?q=AI%20Vlaanderen
```

Verwacht: JSON-resultaten met artikelen.

## Veelgemaakte issues
- **404 NOT_FOUND** → `vercel.json` staat niet in root of `api/newsapi-proxy.js` ontbreekt.
- **NewsAPI error 401** → `NEWSAPI_KEY` ontbreekt of is ongeldig. Voeg de env var toe en **Redeploy**.
- **500 Failed to fetch** → Tijdelijk probleem bij NewsAPI. Probeer opnieuw of verifieer je key.
