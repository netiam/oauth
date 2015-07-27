import authorizationCode from './authorization-code'
import clientCredentials from './client-credentials'
import implicit from './implicit'
import password from './password'

function getByType(type) {
  if (type === 'authorization_code') {
    return authorizationCode
  }

  if (type === 'implicit') {
    return implicit
  }

  if (type === 'password') {
    return password
  }

  if (type === 'client_credentials') {
    return clientCredentials
  }

  throw new Error(`The requested grant_type "${type}" is invalid`)
}

export default {
  getByType
}
