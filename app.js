// Require application dependencies
import express from 'express'
import got from 'got'

// Auth key is stored on a separate file off of the repo for safety
import {encryptAuthkey as KEY} from './secret.js'

const app = express()

const url = 'https://zcccodingchallenge.zendesk.com/api/v2/tickets.json'
const basicAuth = KEY()

app.get('/', async function(req,res) {
  const result = await axios.get(url, {
    headers: {
      Authorization: basicAuth
    }
  })
  console.log(result.status)
})

// Register a route handler for GET requests made to /hello
app.use(express.static('./public'))

// Get port from environment or default to port 3000.
const port = process.env.PORT || 3000

// Ask our app to listen on the calculated port.
app.listen(port, () => {
  console.log(`Successfully listening on ${port}`)
})
