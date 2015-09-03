import express from 'express'
import bodyParser from 'body-parser'
import oauth from '../../src'

export default function(spec) {
  const {db} = spec
  const app = express()
  const auth = oauth({
    db,
    usernameField: 'email',
    passwordField: 'password'
  })

  app.use(bodyParser.urlencoded({extended: false}))

  app.get('/authorize', auth.authorize)
  app.post('/authorize', auth.authorize)

  return app
}
