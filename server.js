import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Proxy endpoint to fetch recipe URLs and bypass CORS
app.post('/api/fetch-recipe', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    console.log(`Fetching recipe from: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch URL: ${response.statusText}`
      });
    }

    const html = await response.text();
    res.json({ html });

  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Swedish Cooking Companion Proxy Server',
    status: 'running',
    endpoints: {
      health: '/health',
      fetchRecipe: 'POST /api/fetch-recipe'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not Found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Recipe fetch endpoint: POST http://localhost:${PORT}/api/fetch-recipe`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health`);
});
