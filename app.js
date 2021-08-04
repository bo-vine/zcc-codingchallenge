// Require application dependencies
import express from 'express';
import {call_tickets} from './routes/call_tickets.js';
import {requester} from './routes/requester.js';
import {another_page} from './routes/another_page.js';

const app = express();

// Register a route handler for GET requests made to /hello
app.use(call_tickets);
app.use(requester);
app.use(another_page);
app.use(express.static('./public'));

// Get port from environment or default to port 3000.
const port = process.env.PORT || 3000;

// Ask our app to listen on the calculated port.
app.listen(port, () => {
  console.log(`Successfully listening on ${port}`);
})
