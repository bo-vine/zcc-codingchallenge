// Auth key is stored on a separate file off of the repo for safety'
import express from 'express';
import {encryptAuthkey as KEY} from '../secret.js';
import got from 'got';
import {pipeline} from 'stream';

const router = express.Router();
const subdomain = 'zcccodingchallenge.zendesk.com';
const baseUrl = 'https://' + subdomain + '/api/v2/';
const basicAuth = KEY();

router.get('/tickets', async (req,res) => {
  let got_data = null;

  try {
    got_data = await got('tickets.json', {
      prefixUrl: baseUrl,
      responseType: 'json',
      headers: {
        "Authorization" : basicAuth
      }
    });
    console.log(got_data.statusCode);
    res.send(got_data.body)

  } catch (err) {
    console.log(err)
  }
});

export {router as call_tickets};
