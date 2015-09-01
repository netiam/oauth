export default function(req) {
  if (req.method === 'GET') {
    return {
      responseType: req.query.response_type || undefined,
      redirectUri: req.query.redirect_uri || undefined,
      grantType: req.query.grant_type || undefined,
      username: req.query.username || undefined,
      password: req.query.password || undefined,
    }
  }

  if (req.method === 'POST') {
    return {
      responseType: req.body.response_type || undefined,
      redirectUri: req.body.redirect_uri || undefined,
      grantType: req.body.grant_type || undefined,
      username: req.body.username || undefined,
      password: req.body.password || undefined,
    }
  }

  throw errors.methodNotAllowed(
    'Authorization request must either be of type "GET" or "POST"')
}
