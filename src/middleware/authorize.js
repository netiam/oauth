import * as errors from 'netiam-errors'
import authorization from '../authorization'

function params(req) {
  if (req.method === 'GET') {
    return {
      responseType: req.query.response_type,
      redirectUri: req.query.redirect_uri,
      grantType: req.query.grant_type
    }
  }

  if (req.method === 'POST') {
    return {
      responseType: req.body.response_type,
      redirectUri: req.body.redirect_uri,
      grantType: req.body.grant_type
    }
  }

  throw errors.methodNotAllowed(
    'Authorization request must either be of type "GET" or "POST"')
}

export default function authorize(spec) {

  return function(req, res) {
    const normalizedParams = params(req)
    const responseType = normalizedParams.respose_type
    const redirectUri = normalizedParams.redirect_uri
    const grantType = normalizedParams.grant_type

    if (!responseType) {
      throw errors.badRequest(
        'You must provide a "response_type" parameter', 400, 'invalid_request')
    }

    if (!redirectUri) {
      throw errors.badRequest(
        'You must provide a "redirect_uri" parameter')
    }

    return authorization
      .get({grantType})(
      {
        spec,
        req,
        res
      })
  }

}
