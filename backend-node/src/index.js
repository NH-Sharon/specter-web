require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const { seedContent } = require('./db/seedContent');

const app = express();

// ─── Middleware ──────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:4200',
  'https://specter.com',
  'https://www.specter.com',
  /\.vercel\.app$/,
  /\.up\.railway\.app$/
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    cb(allowed ? null : new Error('CORS not allowed'), allowed);
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// ─── Health ──────────────────────────────────────────────────────────────────
app.get('/api/v1/ping', (_, res) => res.json({ status: 'UP', service: 'specter-api', timestamp: new Date().toISOString() }));
app.get('/actuator/health', (_, res) => res.json({ status: 'UP' }));

// ─── Public routes ───────────────────────────────────────────────────────────
app.use('/api/v1/auth',       require('./routes/auth'));
app.use('/api/v1/contact',    require('./routes/contact'));
app.use('/api/v1/newsletter', require('./routes/newsletter'));

// Public read-only (blog, portfolio, jobs, content)
const pub = require('./routes/public');
app.use('/api/v1', pub);

// ─── Admin routes (JWT protected inside each router) ─────────────────────────
app.use('/api/v1/admin/blog',      require('./routes/admin/blog'));
app.use('/api/v1/admin/portfolio', require('./routes/admin/portfolio'));
app.use('/api/v1/admin/jobs',      require('./routes/admin/jobs'));
app.use('/api/v1/admin/content',   require('./routes/admin/content'));
app.use('/api/v1/admin/inquiries', require('./routes/admin/inquiries'));

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` }));

// ─── Error handler ───────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '8080');
app.listen(PORT, async () => {
  console.log(`Specter API running on http://localhost:${PORT}`);
  await seedContent().catch(err => console.warn('Content seed skipped:', err.message));
});
