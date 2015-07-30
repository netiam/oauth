import _ from 'lodash'

export const VALID_CLAIMS = 'profile email address phone'

export default function memory(spec) {
  spec = Object.assign({
    authorizationCodes: [],
    userCredentials: [],
    clientCredentials: [],
    refreshTokens: [],
    accessTokens: [],
    defaultScope: null,
    supportedScopes: [],
    keys: []
  }, spec)

  function getAuthorizationCode(code) {
    if (!spec[code]) {
      return false
    }
    return _.merge({authorization_code: code}, spec.authorizationCodes[code])
  }

  function setAuthorizationCode(code, clientId, userId, redirectUri, expires, scope = null, idToken = null) {
    spec.authorizationCodes[code] = {
      code,
      clientId,
      userId,
      redirectUri,
      expires,
      scope,
      idToken
    }

    return true
  }

  function expireAuthorizationCode(code) {
    delete spec.authorizationCodes[code]
  }

  function checkUserCredentials(username, password) {
    const user = getUserDetails(username)
    return user && user['password'] && user['password'] === password
  }

  function setUser(username, password, firstName = null, lastName = null) {
    spec.userCredentials[username] = {
      password,
      firstName,
      lastName
    }
  }

  function getUserDetails(username) {
    if (!spec.userCredentials[username]) {
      return false
    }

    return _.merge({
      userId: username,
      password: null,
      firstName: null,
      lastName: null
    }, spec.userCredentials[username])
  }

  function checkClientCredentials(clientId, clientSecret) {
    return spec.clientCredentials[clientId]['client_secret'] &&
      spec.clientCredentials[clientId]['client_secret'] === clientSecret
  }

  function isPublicClient(clientId) {
    if (!spec.clientCredentials[clientId]) {
      return false
    }

    return spec.clientCredentials[clientId]['client_secret']
  }

  function getClientDetails(clientId) {
    if (!spec.clientCredentials[clientId]) {
      return false
    }

    const client = _.merge({
      clientId,
      clientSecret: null,
      redirectUri: null,
      scope: null
    }, spec.clientCredentials[clientId])

    return client
  }

  return Object.freeze({
    getAuthorizationCode,
    setAuthorizationCode,
    expireAuthorizationCode,
    checkUserCredentials,
    getUserDetails
  })
}
