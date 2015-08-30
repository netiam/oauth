import middleware from './middleware'

export default {
  authorize: middleware.authorize,
  revoke: middleware.revoke
}
