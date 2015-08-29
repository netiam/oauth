import _ from 'lodash'
import adapter from 'sails-disk'
import rimraf from 'rimraf'
import Waterline from 'waterline'
import Client from '../../src/models/client'
import Token from '../../src/models/token'
import User from '../../src/models/user'

const db = new Waterline()

const config = {
  adapters: {
    default: adapter
  },
  connections: {
    default: {
      adapter: 'default'
    }
  },
  defaults: {
    migrate: 'alter'
  }
}

db.loadCollection(Client)
db.loadCollection(Token)
db.loadCollection(User)

const instance = {
  collections: undefined,
  connections: undefined
}

export default instance

export function setup(done) {
  db.initialize(config, (err, ontology) => {
    if (err) {
      return done(err)
    }

    instance.collections = ontology.collections
    instance.connections = ontology.connections

    done(null, err)
  })
}

export function teardown(done) {
  const adapters = config.adapters || {}
  const promises = []

  _.forEach(adapters, adapter => {
    if (_.isFunction(adapter.teardown)) {
      promises.push(new Promise(resolve => {
        adapter.teardown(null, resolve)
      }))
    }
  })

  Promise
    .all(promises)
    .then(() => {
      rimraf('./.tmp', done)
    })
    .catch(err => {
      rimraf('./.tmp', () => {
        done(err)
      })
    })
}
