import bcrypt from 'bcrypt'
import dbg from 'debug'
import tokens from '../../tokens'
import {
  TOKEN_TYPE_ACCESS,
  TOKEN_TYPE_REFRESH
} from '../../tokens/bearer'
import * as errors from 'netiam-errors'

const debug = dbg('authorization/grant-types/password')

export default function(spec) {
  const User = spec.config.db.collections.user
  const Token = spec.config.db.collections.token
  const {idField} = spec.config
  const {refreshToken} = spec.params

  if (!refreshToken) {
    throw errors.badRequest(
      `Parameter "refreshToken" is undefined`, [errors.Codes.E4001])
  }

  return Token
    .findOne({
      'token': refreshToken,
      'token_type': TOKEN_TYPE_REFRESH
    })
    .then(token => {
      if (!token) {
        throw errors.notFound(
          `Refresh token does not exist "${refreshToken}"`,
          [errors.Codes.E4012])
      }

      return token.owner
    })
    .then(userId => {
      return User.findOne({
        [idField]: userId
      })
        .then(user => {
          if (!user) {
            throw errors.notFound(
              `Invalid token. Token owner "${userId}" does not exist.`,
              [errors.Codes.E4003])
          }

          return tokens.create({
            user,
            type: 'bearer',
            config: spec.config
          })
        })
    })

}
