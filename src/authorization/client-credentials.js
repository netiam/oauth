import * as errors from 'netiam-errors'

export default function(spec) {
  return new Promise((resolve, reject) => {
    const {client_id, client_secret} = spec.req.body

    resolve()
  })
}
