import * as errors from 'netiam-errors'
import params from '../params'
import authorization from '../authorization/grant-types'

export default function authorize(spec) {

  return function(req, res) {
    try {
      const normalizedParams = params(req)
      const grantType = authorization.get(normalizedParams)
      return grantType({
        config: spec,
        params: normalizedParams
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

}
