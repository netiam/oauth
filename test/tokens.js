import User from '../src/models/user'
import db,{setup,teardown} from './utils/db'

describe('Tokens', () => {

  before(setup)
  after(teardown)

  it('should create a token', done => {
    const User = db.collections.user

    User
      .create({
        email: 'hannes@impossiblearts.com',
        password: 't3stt3st'
      })
      .then(user => {
        user.should.have.property('email')

        done()
      })
      .catch(done)
  })

})
