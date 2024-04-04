require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailHost: process.env.EMAIL_HOST,
  emailTest: process.env.EMAIL_TEST,
  sessionSecret: process.env.SESSION_SECRET,
  apiKeyOpenAI: process.env.OPENAI_API_KEY,
  dbUrl: process.env.DATABASE_URL
}
module.exports = { config };