import bcrypt from 'bcrypt'
import request from 'supertest'
import db,{setup,teardown} from '../utils/db'
import appTpl from '../utils/app'
import user from '../fixtures/user'

describe('OAuth', () => {

  describe('grant-types', () => {
    let app

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

    it('should not authenticate - invalid user', done => {
      request(app)
        .post('/authorize')
        .send({
          'grant_type': 'password',
          'username': 'anyuser',
          'password': user.password
        })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          res.body.should.have.properties(['code', 'status', 'message', 'data'])
          res.body.data.should.be.an.Array()
          res.body.data.should.have.length(1)
          res.body.data[0].should.have.properties('code', 'message')
          res.body.data[0].code.should.eql(1003)

          done()
        })
    })

    it('should not authenticate - wrong password', done => {
      request(app)
        .post('/authorize')
        .send({
          'grant_type': 'password',
          'username': user.username,
          'password': 'wrongpass'
        })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          res.body.should.have.properties(['code', 'status', 'message', 'data'])
          res.body.data.should.be.an.Array()
          res.body.data.should.have.length(1)
          res.body.data[0].should.have.properties('code', 'message')
          res.body.data[0].code.should.eql(4010)

          done()
        })
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

          done()
        })
    })

  })

})
