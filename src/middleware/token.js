import * as errors from 'netiam-errors'
import Client from '../models/client'
import Token from '../models/token'

export default function token() {
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
