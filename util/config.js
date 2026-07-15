require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  PORT: process.env.PORT || 3001,
  HOST: process.env.HOST,
  SECRET: 'jfkdjfs88fd8f9d8fdjfjdfdfd88833udue9398',
  TESTING: process.env.TESTING,
}
