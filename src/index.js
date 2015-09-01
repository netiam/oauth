import authorizer from './authorization/authorizer'

export default function(spec) {
  // TODO process config
  const config = spec
  const auth = authorizer(config)

  function authorize(req, res) {
    auth(req, res)
      .then(pair => {
        res
          .json(pair)
      })
      .catch(err => {
        res
          .status(err.code || 500)
          .json(err)
      })
  }

  function revoke(req, resc) {
  }

  return Object.freeze({
    authorize,
    revoke
  })
}
