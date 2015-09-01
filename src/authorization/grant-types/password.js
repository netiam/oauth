import dbg from 'debug'
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
    throw new Error(`Parameter "${usernameField}" is undefined`)
  }

  if (!password) {
    throw new Error(`Parameter "${passwordField}" is undefined`)
  }

  return User
    .findOne({
      [usernameField]: username
    })
    .then(user => {
      if (!user) {
        throw errors.notFound('User does not exist', [errors.Codes.E1003])
      }
    })

}
