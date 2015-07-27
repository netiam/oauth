import {Schema} from 'mongoose'
import plugins from 'netiam/lib/rest/schema/plugins'

const Client = new Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
})

export default Client
