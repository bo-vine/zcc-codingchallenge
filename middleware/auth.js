// Auth key is stored on a separate file off of the repo for safety'
import {encryptAuthkey as KEY} from '../secret.js';
import got from 'got';

const subdomain = 'zcccodingchallenge.zendesk.com';
const baseUrl = 'https://' + subdomain + '/api/v2/';
const basicAuth = KEY();

export async function auth(path) {
  let got_data = null;

  try {
    got_data = await got(path, {
      prefixUrl: baseUrl,
      responseType: 'json',
      headers: {
        'Authorization' : basicAuth
      }
    });
    console.log(got_data.statusCode);
  } catch (err) {
    console.log(err)
  }

  return got_data;
}

export async function authUrl(url) {
  let got_data = null;

  try {
    got_data = await got({
      url: url,
      responseType: 'json',
      headers: {
        'Authorization' : basicAuth
      }
    });
    console.log(got_data);
  } catch (err) {
    console.log(err)
  }

  return got_data;
}
