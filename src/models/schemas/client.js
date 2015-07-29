import {Schema} from 'mongoose'

const Client = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  uri: {
    type: String
  },
  scope: [
    {
      type: String,
      enum: ['user']
    }
  ],
  grants: [
    {
      type: String,
      enum: ['authorization_code', 'implicit', 'password', 'client_credentials']
    }
  ],
  type: {
    type: String,
    enum: ['confidential', 'public'],
    default: 'public',
    required: true
  }
})

export default Client
