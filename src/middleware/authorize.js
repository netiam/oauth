import * as errors from 'netiam-errors'
import Client from '../models/client'
import Token from '../models/token'
import authorization from '../authorization'

function params(req) {
  if (req.method === 'GET') {
    return {
      response_type: req.query.response_type,
      redirect_uri: req.query.redirect_uri,
      grant_type: req.query.grant_type
    }
  }

  if (req.method === 'POST') {
    return {
      response_type: req.body.response_type,
      redirect_uri: req.body.redirect_uri,
      grant_type: req.body.grant_type
    }
  }

  throw errors.methodNotAllowed(
    'Authorization request must either be of type "GET" or "POST"')
}

export default function authorize(spec) {

  return function(req, res) {
    const normalizedParams = params(req)
    const {response_type, redirect_uri, grant_type} = normalizedParams

    if (!response_type) {
      return reject(errors.badRequest(
          'You must provide a "response_type" parameter', 400, 'invalid_request')
      )
    }

    if (!redirect_uri) {
      return reject(errors.badRequest(
        'You must provide a "redirect_uri" parameter'
      ))
    }

    return authorization
      .get({grant_type})(
      {
        spec,
        req,
        res
      })
  }

}
