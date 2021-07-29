// Require application dependencies
const express = require('express');
const request = require('request');

// Create our app by calling the express function
const app = express();

// Register a route handler for GET requests made to /hello
app.get('/getAPIResponse', (req, res) => {
  
});

// Get port from environment or default to port 3000.
const port = process.env.PORT || 3000;

// Ask our app to listen on the calculated port.
app.listen(port, () => {
  console.log(`Successfully listening on ${port}`);
});
