import Waterline from 'waterline'
import schema from './schema/users'

export default Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: Object.assign({}, schema)
})
