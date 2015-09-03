import Bearer,{
  TTL_ACCESS_TOKEN,
  TTL_REFRESH_TOKEN,
  TOKEN_TYPE_ACCESS,
  TOKEN_TYPE_REFRESH
} from './bearer'
import moment from 'moment'
import * as errors from 'netiam-errors'

function create(spec) {
  const {type} = spec
  const {user} = spec
  const {client} = spec
  const Token = spec.config.db.collections.token

  let accessToken
  let refreshToken
  let accessTokenExpiresAt
  let refreshTokenExpiresAt

  if (type === 'bearer') {
    accessToken = Bearer.create()
    refreshToken = Bearer.create()
    accessTokenExpiresAt = moment().add(TTL_ACCESS_TOKEN, 's')
    refreshTokenExpiresAt = moment().add(TTL_REFRESH_TOKEN, 's')
  } else {
    throw errors.internalServerError(
      'Invalid token_type', [errors.Codes.E4006])
  }

  return Token.create(
    [
      {
        token: accessToken,
        token_type: TOKEN_TYPE_ACCESS,
        owner: user,
        client,
        expires_at: accessTokenExpiresAt.toDate()
      },
      {
        token: refreshToken,
        token_type: TOKEN_TYPE_REFRESH,
        owner: user,
        client,
        expires_at: refreshTokenExpiresAt.toDate()
      }
    ]
  )
    .then(() => {
      return Object.freeze({
        access_token: accessToken,
        token_type: type,
        expires_in: accessTokenExpiresAt.diff(moment(), 's'),
        refresh_token: refreshToken
      })
    })
}

export default Object.freeze({
  create
})
