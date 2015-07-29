function notImplemented() {
  throw new Error('Method not implemented')
}

export default Object.freeze({
  getId: notImplemented,
  getSecret: notImplemented,
  getRedirectUri: notImplemented,
  getById: notImplemented,
  compareSecret: notImplemented,
  checkGrantType: notImplemented,
  checkScope: notImplemented
})
