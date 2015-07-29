function notImplemented() {
  throw new Error('Method not implemented')
}

export const TTL = 300

export default Object.freeze({
  getUserId: notImplemented,
  getClientId: notImplemented,
  getScope: notImplemented,
  getByCode: notImplemented,
  create: notImplemented,
  removeByCode: notImplemented
})
