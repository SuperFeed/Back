export const DB = process.env.NODE_ENV === 'production'
  ? require('./knexfile')['production']
  : require('../knexfile')['development']

export const PORT = process.env.NODE_ENV === 'production'
  ? process.env.PORT || 80
  : 3001
