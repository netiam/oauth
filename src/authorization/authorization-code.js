import * as errors from 'netiam-errors'

export default function(spec) {
  return new Promise((resolve, reject) => {
    const {grant_type, code, redirect_uri, client_id} = spec.req.body

    if (!grant_type || grant_type !== 'authorization_code') {
      return reject(errors.badRequest(`Invalid grant_type "${grant_type}"`))
    }

    if (!code) {
      return reject(errors.badRequest(`You must provide an authorization code`))
    }

    resolve()
  })
}
