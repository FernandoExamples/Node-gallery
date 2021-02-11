const mongoose = require('mongoose')
const { DB } = require('./settings')
mongoose
  .connect(DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log('Mongo is connected...')
  })
  .catch((err) => console.error(err))
