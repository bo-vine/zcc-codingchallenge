import express from 'express';
import {authUrl as authUrl} from '../middleware/auth.js';
const router = express.Router();

router.get('/another/:page_request', async (req,res) => {
  try {
    console.log(req.params);
    const pageRequest = req.params.page_request;
    const apiData = await authUrl(pageRequest);
    console.log(apiData);
    res.send(apiData.body);
  } catch (err) {
    console.log(err)
  }
});

export {router as another_page};
