import dbg from 'debug'
import authorizationCode from './authorization-code'
import clientCredentials from './client-credentials'
import password from './password'
import refreshToken from './refresh-token'

const debug = dbg('authorization/grant-types')

function get(spec) {
  const type = spec.grantType

  debug(`Authorization request with grant_type "${type}"`)

  if (type === 'authorization_code') {
    return authorizationCode
  }

  if (type === 'implicit') {
    return implicit
  }

  if (type === 'password') {
    return password
  }

  if (type === 'refresh_token') {
    return refreshToken
  }

  if (type === 'client_credentials') {
    return clientCredentials
  }

  debug(`The requested grant_type "${type}" is invalid`)
  throw new Error(`The requested grant_type "${type}" is invalid`)
}

export default Object.freeze({
  get
})
