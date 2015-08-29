import * as errors from 'netiam-errors'

export default function(spec) {
  return new Promise((resolve, reject) => {
    const {client_id, redirect_uri, scope, state} = spec.req.body

    resolve()
  })
}
