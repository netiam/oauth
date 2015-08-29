import moment from 'moment'
import {
  TTL_ACCESS_TOKEN
} from '../../tokens/bearer'

export default Object.freeze({
  email: {
    type: 'email',
    unique: true,
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  created: {
    type: 'datetime',
    required: true,
    defaultsTo: () => {
      return moment()
        .add(TTL_ACCESS_TOKEN, 'seconds')
        .format('YYYY-MM-DDTHH:mm:ssZ')
    }
  }
})
