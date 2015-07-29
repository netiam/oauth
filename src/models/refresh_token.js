function notImplemented() {
  throw new Error('Method not implemented')
}

export const TTL = 1209600

export default Object.freeze({
  getUserId: notImplemented,
  getClientId: notImplemented,
  getScope: notImplemented,
  getByToken: notImplemented,
  removeByUserIdAndClientId: notImplemented,
  create: notImplemented
})
