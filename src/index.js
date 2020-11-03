const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;
const mailer = require('./mailer')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.redirect('index.html');
})

app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.post('/api/users', db.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

// serve static files
app.use(express.static('../public'))

mailer.sendMail('Hey', 'You')

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


