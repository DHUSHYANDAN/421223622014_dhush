const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const routes = require("./routes/students");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use('/', routes);

//mognodb connection
mongoose.connect('mongodb://localhost:27017/crudDB', {
  
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1); // Exit process with failure
});




// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



// Catch-all handler to serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
