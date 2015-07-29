function notImplemented() {
  throw new Error('Method not implemented')
}

export const TTL = 3600

export default Object.freeze({
  getToken: notImplemented,
  getByToken: notImplemented,
  getByUserIdAndClientId: notImplemented,
  checkTTL: notImplemented,
  getTTL: notImplemented,
  create: notImplemented
})
