const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;
const checkout = require('./checkout.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_request, response) => {
  response.redirect('index.html');
})

app.get('/api/categories', db.getCategories)
app.get('/api/products', db.getProducts)
app.get('/api/products/:id', db.getProductById)
app.get('/api/products/:id/related', db.getRelatedProductsById)
// our API is not protected...so let's not expose these
// app.post('/api/products', db.createProduct)
// app.put('/api/products/:id', db.updateProduct)
// app.delete('/api/products/:id', db.deleteProduct)
app.post('/api/checkout', checkout.checkoutOrder)

// serve static files
app.use(express.static('../public'))

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


