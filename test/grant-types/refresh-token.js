import bcrypt from 'bcrypt'
import request from 'supertest'
import db,{setup,teardown} from '../utils/db'
import appTpl from '../utils/app'
import user from '../fixtures/user'

describe('OAuth', () => {

  describe('grant-types', () => {
    let app
    let token

    before(done => {
      setup(() => {
        app = appTpl({db})
        done()
      })
    })
    after(teardown)

    it('should create a user', done => {
      const User = db.collections.user
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password, salt)

      User
        .create({
          email: user.username,
          password: hash
        })
        .exec(done)
    })

    it('should authenticate with user credentials', done => {
      request(app)
        .post('/authorize')
        .send({
          'grant_type': 'password',
          'username': user.username,
          'password': user.password
        })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          res.body.should.have.properties([
            'access_token',
            'refresh_token',
            'expires_in',
            'token_type'
          ])
          res.body.access_token.should.have.length(128)
          res.body.refresh_token.should.have.length(128)
          res.body.token_type.should.eql('bearer')

          token = res.body

          done()
        })
    })

    it('should refresh token', done => {
      request(app)
        .post('/authorize')
        .send({
          'grant_type': 'refresh_token',
          'refresh_token': token.refresh_token
        })
        .set('Authorization', 'Bearer ' + token.access_token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          res.body.should.have.properties([
            'access_token',
            'refresh_token',
            'expires_in',
            'token_type'
          ])
          res.body.access_token.should.have.length(128)
          res.body.refresh_token.should.have.length(128)
          res.body.token_type.should.eql('bearer')

          token = res.body

          done()
        })
    })

    it('should refresh token with currently issued token', done => {
      request(app)
        .post('/authorize')
        .send({
          'grant_type': 'refresh_token',
          'refresh_token': token.refresh_token
        })
        .set('Authorization', 'Bearer ' + token.access_token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          res.body.should.have.properties([
            'access_token',
            'refresh_token',
            'expires_in',
            'token_type'
          ])
          res.body.access_token.should.have.length(128)
          res.body.refresh_token.should.have.length(128)
          res.body.token_type.should.eql('bearer')

          done()
        })
    })

  })

})
