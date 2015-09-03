import crypto from 'crypto'

export const TOKEN_TYPE_ACCESS = 'access_token'
export const TOKEN_TYPE_REFRESH = 'refresh_token'

export const TTL_ACCESS_TOKEN = 3600
export const TTL_REFRESH_TOKEN = 604800

export const TYPE = 'bearer'

function create() {
  return crypto
    .randomBytes(64)
    .toString('hex')
}

export default Object.freeze({
  create
})
