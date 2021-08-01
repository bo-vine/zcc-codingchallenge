// Auth key is stored on a separate file off of the repo for safety'
import express from 'express'
import {encryptAuthkey as KEY} from '../secret.js'
import got from 'got'
import {pipeline} from 'stream'

const router = express.Router()

const url = 'https://zcccodingchallenge.zendesk.com/api/v2/tickets.json'
const basicAuth = KEY()

router.get('/', function(req,res) {
  let dataStream = got.stream({
    url: url,
    headers: {
      "Authorization" : basicAuth
    }
  });
  let p = pipeline(dataStream, res, (err) => {
    if (err) {
      console.log(err)
      res.send(500)
    }
  });
});

export {router as call_ticket}
