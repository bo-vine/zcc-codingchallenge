// Require application dependencies
import express from 'express'
import axios from 'axios'
import process from 'process'

// Request parameters using an API token
const usr = process.env["user"]
const pwd = process.env["pwd"]

// Encode the secrets to use for authorization
const auth = usr + ':' + pwd
const base64 = Buffer.from(auth).toString('base64')
console.log(base64)

// Create our app by calling the express function
const app = express();

// Register a route handler for GET requests made to /hello
app.get ('/', (req, res) => {
  axios({
    method: 'get',
    url: '/api/v2/tickets/1.json',
    baseURL: 'https://zcccodingchallenge.zendesk.com',
    timeout: 1000,
    headers: {
      Authorization: 'Basic ' + base64
    }
  })
  .then(function (res) {
    console.log(res.status)
  })
  .catch(function (err) {
    console.log(err)
  })
})

// Get port from environment or default to port 3000.
const port = process.env.PORT || 3000

// Ask our app to listen on the calculated port.
app.listen(port, () => {
  console.log(`Successfully listening on ${port}`)
})