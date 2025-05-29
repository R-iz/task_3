import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import bookRoutes from './routes/books.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});
app.use('/api', apiLimiter);

// API routes
app.use('/api/books', bookRoutes);

// API documentation route
app.get('/', (req, res) => {
  res.json({
    message: 'Books REST API is running!',
    version: '1.1.0',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books/:id': 'Get book by ID',
      'POST /api/books': 'Create new book',
      'PUT /api/books/:id': 'Update book by ID',
      'DELETE /api/books/:id': 'Delete book by ID',
      'GET /api/books/search': 'Search books by title or author (query params: q)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Enhanced Books REST API server is running on port ${PORT}`);
  console.log(`📚 API Base URL: http://localhost:${PORT}`);
  console.log('\n📋 Available Endpoints:');
  console.log('  GET    /api/books          - Get all books');
  console.log('  GET    /api/books/:id      - Get book by ID');
  console.log('  POST   /api/books          - Create new book');
  console.log('  PUT    /api/books/:id      - Update book by ID');
  console.log('  DELETE /api/books/:id      - Delete book by ID');
  console.log('  GET    /api/books/search   - Search books by title or author');
  
  if (process.env.VERCEL_URL) {
    console.log(`\n🌐 Deployed URL: https://${process.env.VERCEL_URL}`);
  }
});