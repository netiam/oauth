import * as errors from 'netiam-errors'

export default function(spec, req, res) {
  const {grant_type} = req.body
  const {code} = req.body
  const {redirect_uri} = req.body
  const {client_id} = req.body

  if (!grant_type || grant_type !== 'authorization_code') {
    throw errors.badRequest(`Invalid grant_type "${grant_type}"`)
  }

  if (!code) {
    throw errors.badRequest(`You must provide an authorization code`)
  }

}
