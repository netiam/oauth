import * as errors from 'netiam-errors'
import Client from '../models/client'
import Token from '../models/token'

function params(req) {
  if (req.method === 'GET') {
    return {
      response_type: req.query.response_type,
      redirect_uri: req.query.redirect_uri
    }
  }

  if (req.method === 'POST') {
    return {
      response_type: req.body.response_type,
      redirect_uri: req.body.redirect_uri
    }
  }

  throw errors.methodNotAllowed(
    'Authorize request must either be of type "GET" or "POST"')
}

export default function authorize() {
  return function(req, res) {
    return new Promise((resolve, reject) => {
      const {response_type, redirect_uri} = params(req)

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

      resolve()
    })
  }
}
