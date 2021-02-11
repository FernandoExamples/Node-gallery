require('dotenv').config()
module.exports = {
  PORT: process.env.PORT || 3000,
  DOMAIN: process.env.DOMAIN || '127.0.0.1',
  DB: {
    URI: process.env.MONGODB_URI,
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
  },
  CLOUDINARY: {
    API_KEY: process.env.CLOUDDINARY_API_KEY,
    API_SECRET: process.env.CLOUDDINARY_API_SECRET,
    CLOUD_NAME: process.env.CLOUDINARY_NAME,
  },
}
