const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(function (req, res, next) {
  const reqTime = new Date()
  const time =
    reqTime.getFullYear() +
    '/' +
    reqTime.getMonth().toString().padStart(2, '0') +
    '/' +
    reqTime.getDate().toString().padStart(2, '0') +
    ' ' +
    reqTime.getHours().toString().padStart(2, '0') +
    ':' +
    reqTime.getMinutes().toString().padStart(2, '0') +
    ':' +
    reqTime.getSeconds().toString().padStart(2, '0')

  if (req.url !== '/favicon.ico') {
    res.on('finish', () => {
      const resTime = new Date()
      const timeSpent = resTime - reqTime
      console.log(
        `${time} | ${req.method} from ${req.originalUrl} | total time: ${timeSpent}ms`
      )
    })
  }
  next()
})

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/:id', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
