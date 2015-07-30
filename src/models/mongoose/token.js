import {Schema} from 'mongoose'
import crypto from 'crypto'
import moment from 'moment'

export const ACCESS_TOKEN_TTL = 3600
export const REFRESH_TOKEN_TTL = 604800
export const TOKEN_TYPE_ACCESS = 'access_token'
export const TOKEN_TYPE_REFRESH = 'refresh_token'

const Token = new Schema({
  token: {
    type: String,
    default: function() {
      return crypto.randomBytes(64).toString('hex')
    },
    unqiue: true,
    required: true
  },
  token_type: {
    type: String,
    default: TOKEN_TYPE_ACCESS,
    enum: [TOKEN_TYPE_ACCESS, TOKEN_TYPE_REFRESH],
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  scope: [
    {
      type: String,
      enum: ['user']
    }
  ],
  expires_at: {
    type: Date,
    default: function() {
      return moment().add(ACCESS_TOKEN_TTL, 's').format()
    },
    expires: REFRESH_TOKEN_TTL,
    required: true
  }
})

export default Token
