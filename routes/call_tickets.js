// Auth key is stored on a separate file off of the repo for safety'
import express from 'express';
import {auth as auth} from '../middleware/auth.js';
const router = express.Router();

router.get('/tickets', async (req,res) => {
  try {
    const apiData = await auth('tickets');
    console.log(apiData);
    res.send(apiData.body);
  } catch (err) {
    console.log(err)
  }
});

export {router as call_tickets};
//
