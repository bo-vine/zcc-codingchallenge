import {encryptAuthkey as KEY} from '../secret.js';
import got from 'got';

export const subdomain = 'zcccodingchallenge.zendesk.com';
export const baseUrl = 'https://' + subdomain + '/api/v2/';
export const basicAuth = KEY();

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
