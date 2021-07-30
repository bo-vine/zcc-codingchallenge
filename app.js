// Require application dependencies
const express = require('express');
const bent = require('bent');

// Request parameters using an API token
const url = 'https://zcccodingchallenge.zendesk.com/api/v2/tickets.json'
const user = 'tylermavan@gmail.com' + '/token'
const pwd = '3y6VNkmHyqUWIqMC8hdEfEXi82xsDJhwBzefZnYZ'

const response = request.get(url, auth=(user, pwd));

// Create our app by calling the express function
const app = express();

// Register a route handler for GET requests made to /hello
app.post('/', (req, res) => {
  res.
});

// Get port from environment or default to port 3000.
const port = process.env.PORT || 3000;

// Ask our app to listen on the calculated port.
app.listen(port, () => {
  console.log(`Successfully listening on ${port}`);
});
