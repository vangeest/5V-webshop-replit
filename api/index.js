// database setup, we use sqlite because it is basic
// for advanced documentation see 
// https://github.com/mapbox/node-sqlite3/wiki
const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('../db/my.db');

// server, we use express because that is the most common package
// for advanced documentation see 
// see https://expressjs.com 
const express = require('express') 
const app = express()
const port = 3000;

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// defineer startpunt voor statische bestanden
app.use(express.static('../web'))

// definieer startpunten voor de API-server
app.get('/api/echo', echoRequest)
app.get('/api/categories', getCategories)
app.get('/api/products', getProducts)
//app.get('/api/products/:id', db.getProductById)
//app.get('/api/products/:id/related', db.getRelatedProductsById)
// our API is not protected...so let's not expose these
// app.post('/api/products', createProduct)
// app.put('/api/products/:id', updateProduct)
// app.delete('/api/products/:id', deleteProduct)
//app.post('/api/checkout', checkout.checkoutOrder)

// start de server!
app.listen(port, serverIsGestart)

function serverIsGestart() {
  console.log(`De server is opgestart en is bereikbaar op poort ${port}`)
}


// stuurt de variabelen uit het request
// terug naar de browser en in de console
function echoRequest(request, response) {
  response.status(200).send(request.query)
}

function getCategories(request, response) {
  // TODO: change query to make it return categories
  var query = 'SELECT * FROM products ORDER BY id ASC'
  var params = []
  db.all(query, params, stuurZoekResultaat(response))
}

/*
*/
function getProducts(request, response) {
  console.log("getProducts called")
  const category_id = parseInt(request.query.category)
  var query = ''
  var params = []
  if(category_id > 0){
    query = 'SELECT * FROM products WHERE category_id = $1 ORDER BY id ASC'
    params = [category_id]
  } else {
    query = 'SELECT * FROM products ORDER BY id ASC'
    params = []
  }
  db.all(query, params, stuurZoekResultaat(response))
}

// ----------------------------------------------------------------------------
// ---------- voorgegeven functies voor de handigheid -------------------------
// ----------------------------------------------------------------------------

// verwerkt output van een SELECT-query en
// stuurt dat terug met de meegegeven response-parameter
function stuurZoekResultaat(response) {
  function returnFunction (error, data) {
    if (error == null) {    // alles ging goed
      console.log('API heeft resultaat terug gestuurd')
      // console.log(JSON.stringify(data, null, 2))
      response.status(200).send(data)
    }
    else {                  // er trad een fout op bij de database
      console.error(`Fout bij opvragen gegevens:` + error)
      response.status(400).send(error)
    }
  }

  return returnFunction;
}

/*



const getProductsByIds = (ids, callback) => {
  pool.query(
    'SELECT * FROM products WHERE id = ANY($1::int[])',
    [ids],  // array of query arguments
    function(_err, result) {
      callback(result.rows)
    })
};

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).json("oops")
    } else {
      response.status(200).json(results.rows[0])
    }
  })
}

const getRelatedProductsById = (request, response) => {
  const id = parseInt(request.params.id)
  // TODO: change query to return related products
  // it now return an array with the current products
  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).json("oops")
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createProduct = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO products (name, email) VALUES ($1, $2)', [name, email], (error, _results) => {
    if (error) {
      console.log(error)
      response.status(500).json("oops")
    } else {
      response.status(201).json(`Product added with ID: ${result.insertId}`)
    }
  })
}

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  // Note: query is not correct
  pool.query(
    'UPDATE products SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, _results) => {
      if (error) {
        console.log(error)
        response.status(500).json("oops")
      } else {
        response.status(200).send(`Product modified with ID: ${id}`)
      }
    }
  )
}

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM products WHERE id = $1', [id], (error, _results) => {
    if (error) {
      console.log(error)
      response.status(500).json("oops")
    } else {
      response.status(200).send(`Product deleted with ID: ${id}`)
    }
  })
}
*/

