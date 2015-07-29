import {Schema} from 'mongoose'

const Code = new Schema({
  code: {
    type: String,
    unique: true,
    required: true
  }
})

export default Code
