const express = require('express');
const cors = require('cors');
const connectDB = require('dotenv').config();






app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/users', require('./routes/UserRoutes'));

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});