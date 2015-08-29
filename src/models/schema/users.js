export default Object.freeze({
  email: {
    type: 'email',
    unique: true,
    required: true
  },
  password: {
    type: 'string',
    required: true
  }
})
