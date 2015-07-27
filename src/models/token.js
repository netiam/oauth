import mongoose from 'mongoose'
import Schema from './schemas/token'

export default mongoose.model('Token', Schema)
