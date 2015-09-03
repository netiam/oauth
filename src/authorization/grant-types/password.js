import bcrypt from 'bcrypt'
import dbg from 'debug'
import tokens from '../../tokens'
import * as errors from 'netiam-errors'

const debug = dbg('authorization/grant-types/password')

export default function(spec) {
  const User = spec.config.db.collections.user
  const {usernameField} = spec.config
  const {passwordField} = spec.config
  const {username} = spec.params
  const {password} = spec.params
  const {scope} = spec.params

  if (!username) {
    throw errors.badRequest(
      `Parameter "${usernameField}" is undefined`, [errors.Codes.E4010])
  }

  if (!password) {
    throw errors.badRequest(
      `Parameter "${passwordField}" is undefined`, [errors.Codes.E4010])
  }

  return User
    .findOne({
      [usernameField]: username
    })
    .then(user => {
      if (!user) {
        throw errors.notFound(
          `User does not exist "${username}"`, [errors.Codes.E1003])
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return reject(
              errors.internalServerError(err, [errors.Codes.E4006]))
          }

          if (!isMatch) {
            return reject(
              errors.forbidden(`Invalid password`, [errors.Codes.E4010]))
          }

          tokens.create({
            type: 'bearer',
            config: spec.config
          })
            .then(resolve)
            .catch(reject)
        })
      })
    })

}
