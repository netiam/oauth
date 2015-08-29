import crypto from 'crypto'
import uuid from 'uuid'

export default Object.freeze({
  client_id: {
    type: 'string',
    unique: true,
    required: true,
    uuidv4: true,
    defaultsTo: () => {
      return uuid.v4()
    }
  },
  client_secret: {
    type: 'string',
    required: true,
    len: 128,
    defaultsTo: () => {
      return crypto
        .randomBytes(64)
        .toString('hex')
    }
  }
})
