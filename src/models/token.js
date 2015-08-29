import Waterline from 'waterline'
import schema from './schema/tokens'

export default Waterline.Collection.extend({
  identity: 'token',
  connection: 'default',
  attributes: Object.assign({}, schema)
})
