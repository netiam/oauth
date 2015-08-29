import crypto from 'crypto'
import moment from 'moment'
import {
  TTL_ACCESS_TOKEN,
  TOKEN_TYPE_ACCESS,
  TOKEN_TYPE_REFRESH
} from '../../tokens/bearer'

export default Object.freeze({
  token: {
    type: 'string',
    unique: true,
    required: true,
    len: 128,
    defaultsTo: () => {
      return crypto
        .randomBytes(64)
        .toString('hex')
    }
  },
  token_type: {
    type: 'string',
    enum: [TOKEN_TYPE_ACCESS, TOKEN_TYPE_REFRESH],
    required: true,
    defaultsTo: TOKEN_TYPE_ACCESS
  },
  owner: {
    model: 'user'
  },
  client: {
    model: 'client'
  },
  expires_at: {
    type: 'datetime',
    required: true,
    defaultsTo: () => {
      return moment()
        .add(TTL_ACCESS_TOKEN, 'seconds')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    }
  }
})
