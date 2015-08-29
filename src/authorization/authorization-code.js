import * as errors from 'netiam-errors'

export default function(spec) {
  return new Promise((resolve, reject) => {
    const {
      grantType,
      code
      //redirectUri,
      //clientId
      } = spec.req.body

    if (!grantType || grantType !== 'authorization_code') {
      return reject(errors.badRequest(`Invalid grant_type "${grantType}"`))
    }

    if (!code) {
      return reject(errors.badRequest(`You must provide an authorization code`))
    }

    resolve()
  })
}
