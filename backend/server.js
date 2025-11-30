const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Log environment variables for debugging (remove in production)
console.log('Environment variables check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS for your frontend
app.use(cors({
  origin: ['https://clothing-ecommerce-000.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

// Route files
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount routers
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    jwtSecretConfigured: !!process.env.JWT_SECRET
  });
});

// Simple root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API Running...', 
    version: '1.0.0',
    documentation: 'Visit /api/health to check if server is running'
  });
});

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});