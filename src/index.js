const express = require('express')
const path = require('path')
const handlerbars = require('express-handlebars')
const cors = require('cors')
const morgan = require('morgan')
const settings = require('./config/settings')

const app = express()
require('./config/database')

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(require('./middlewares/multer'))

//static files
app.use(express.static('public'))

//Espress hbs engine
app.set('views', path.join(__dirname, 'views'))
app.engine(
  '.hbs',
  handlerbars({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
  })
)
app.set('view engine', 'hbs')

//definig routes
app.use(require('./routes/index.routes'))

//init server
app.listen(settings.PORT, () =>
  console.log('Server listen on port ' + settings.PORT)
)
