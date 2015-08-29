import Waterline from 'waterline'
import schema from './schema/clients'

export default Waterline.Collection.extend({
  identity: 'client',
  connection: 'default',
  attributes: Object.assign({}, schema)
})
