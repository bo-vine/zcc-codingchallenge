// Auth key is stored on a separate file off of the repo for safety'
import express from 'express';
import {auth as auth} from '../middleware/auth.js';
const router = express.Router();

router.get('/requester/:requester_id', async (req,res) => {
  try {
    console.log(req.params);
    const requester_id = req.params.requester_id;
    const apiData = await auth('users/' + requester_id);
    console.log(apiData.statusCode);
    res.send(apiData.body);
  } catch (err) {
    console.log(err)
  }
});

export {router as requester};
