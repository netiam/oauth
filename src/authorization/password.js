export default function(spec, req) {
  const {collection} = spec
  const {usernameField} = spec
  const {passwordField} = spec
  const username = req.body.username
  const password = req.body.password

  return new Promise((resolve, reject) => {
    collection
      .findOne({
        [usernameField]: username
      }).exec()
      .then(user => {
        if (!user) {
          return reject(new Error('User does not exist', 404))
        }

        user.comparePassword(password, user[passwordField], (err, isMatch) => {
          if (err) {
            return reject(err)
          }

          if (!isMatch) {
            return reject(new Error('User credentials are invalid', 400))
          }

          return resolve()
        })
      })
      .then(null, reject)
  })

}
