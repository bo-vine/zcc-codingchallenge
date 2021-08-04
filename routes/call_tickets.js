import express from 'express';
import {auth as auth} from '../middleware/auth.js';
const router = express.Router();

router.get('/tickets', async (req,res) => {
  try {
    console.log(req.params);
    const page_number = req.params.page_number;
    const apiData = await auth('tickets.json?page[size]=25');
    console.log(apiData);
    res.send(apiData.body);
  } catch (err) {
    console.log(err)
  }
});

export {router as call_tickets};
