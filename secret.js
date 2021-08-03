export function encryptAuthkey () {
  let user = 'tylermavan@gmail.com' + '/token'
  let pwd = '3y6VNkmHyqUWIqMC8hdEfEXi82xsDJhwBzefZnYZ'
  let b64 = Buffer.from(user + ':' + pwd).toString('base64')
  const basicAuth = 'Basic ' + b64

  return basicAuth
}
