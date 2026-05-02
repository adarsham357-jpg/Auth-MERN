require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: check env
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

// Connect DB safely
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");

    // Routes
    app.use('/api/users', require('./routes/UserRoutes'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();