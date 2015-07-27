import Client from '../models/client'
import Token from '../models/token'
import grantTypes from '../grant-types'

export default function authorize(spec) {

  return function(req, res) {
    const {grant_type} = req.body
    const grantType = grantTypes.getByType(grant_type)

    return grantType(spec, req, res)
  }

}
