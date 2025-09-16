const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

// Import all route files
const repairRoutes = require('./routes/repairRequestRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const technicianRoutes = require('./routes/technicianRoutes');
const userRoutes = require('./routes/userRoutes');
const coachingProgramRoutes = require('./routes/coachingProgramRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');

require('dotenv').config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/repairs', repairRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/users', userRoutes);
app.use('/api/programs', coachingProgramRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reports', reportRoutes);

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Test route working!' });
});

// Error handling middleware (should be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
