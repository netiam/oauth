import middleware from './middleware'

export default {
  authorize: middleware.authorize,
  refresh: middleware.refresh,
  revoke: middleware.revoke
}
