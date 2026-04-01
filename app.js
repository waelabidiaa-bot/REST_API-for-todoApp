const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));







// Export users routes
const userRoutes = require('./routes/usersRoutes');
app.use('/users', userRoutes);


// Export todos routes
const todoRouter = require('./routes/todoRoutes');
const authMiddleware = require('./middleware/authMiddleware');
app.use('/todos', authMiddleware, todoRouter);











// Start server with MongoDB connection
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

start();
