const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/auth', AuthRouter);

// Serve static frontend files  
app.use(express.static(path.join(__dirname, 'client/build')));

// React Router - Handle all other routes  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
