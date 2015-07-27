import mongoose from 'mongoose'
import Schema from './schemas/client'

export default mongoose.model('Client', Schema)
