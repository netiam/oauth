function notImplemented() {
  throw new Error('Method not implemented')
}

export default Object.freeze({
  getId: notImplemented,
  getById: notImplemented,
  getByUsername: notImplemented,
  comparePassword: notImplemented,
  getBySession: notImplemented
})
