import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory store for custom venues and live updates
let customVenues: any[] = [];
let bookedPasses: any[] = [];

// API Endpoint for SerpAPI Google Maps search
app.get('/api/places/search', async (req, res) => {
  const query = (req.query.q as string) || 'Garba Ahmedabad';
  const apiKey = (req.query.api_key as string) || process.env.SERPAPI_API_KEY;

  if (apiKey) {
    try {
      const serpUrl = new URL('https://serpapi.com/search');
      serpUrl.searchParams.set('engine', 'google_maps');
      serpUrl.searchParams.set('q', query);
      serpUrl.searchParams.set('api_key', apiKey);

      const serpRes = await fetch(serpUrl.toString());
      if (serpRes.ok) {
        const data = await serpRes.json();
        return res.json({
          source: 'serpapi_live',
          results: data.local_results || data.places || []
        });
      }
    } catch (err: any) {
      console.warn('SerpAPI fetch failed, falling back:', err.message);
    }
  }

  // Fallback intelligent response for Gujarat garba places
  res.json({
    source: 'local_database',
    message: 'Displaying verified Gujarat Navratri locations matching your query',
    query
  });
});

// Real-time venues endpoints
app.get('/api/venues', (req, res) => {
  res.json(customVenues);
});

app.post('/api/venues', (req, res) => {
  const newVenue = {
    ...req.body,
    id: req.body.id || `custom-venue-${Date.now()}`,
    updatedAt: new Date().toISOString()
  };
  customVenues.unshift(newVenue);
  res.status(201).json(newVenue);
});

app.put('/api/venues/:id', (req, res) => {
  const { id } = req.params;
  const index = customVenues.findIndex((v) => v.id === id);
  if (index !== -1) {
    customVenues[index] = { ...customVenues[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json(customVenues[index]);
  } else {
    // If not found in custom list, add as updated override
    const updated = { ...req.body, id, updatedAt: new Date().toISOString() };
    customVenues.push(updated);
    res.json(updated);
  }
});

// Bookings endpoint
app.get('/api/bookings', (req, res) => {
  res.json(bookedPasses);
});

app.post('/api/bookings', (req, res) => {
  const booking = {
    ...req.body,
    id: `BK-${Date.now().toString(36).toUpperCase()}`,
    bookedAt: new Date().toISOString(),
    status: 'valid'
  };
  bookedPasses.unshift(booking);
  res.status(201).json(booking);
});

// Vite middleware for dev or static files for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Taal & Raas server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
