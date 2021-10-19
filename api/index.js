// database setup, we use better-sqlite3 because it is basic
// for advanced documentation see 
// https://www.npmjs.com/package/better-sqlite3
const Database = require('better-sqlite3');
// all sql-statements will be sent to console for debug purpose
const db = new Database('../db/my.db', { verbose: console.log });
// onze code negeert errors in sql-commando's maar de database drukt errors af op de console

// server, we use express because that is the most common package
// for advanced documentation see 
// see https://expressjs.com 
const express = require('express')
const app = express()
const port = 8080; // standard port for https

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
app.post('/api/checkout', checkoutOrder)

// start de server!
app.listen(port, serverIsGestart)

function serverIsGestart() {
  console.log(`De server is opgestart en is bereikbaar op poort ${port}`)
}

// -----------------------
// functies die API requests afhandelen
// -----------------------

// stuurt de variabelen uit het request
// terug naar de browser en in de console
function echoRequest(request, response) {
  console.log('API ontvangt /api/echo/?', request.query)
  response.status(200).send(request.query)
}


function getCategories(request, response) {
  console.log('API ontvangt /api/categories/')
  // TODO: change query to make it return categories
  const sqlOpdracht = db.prepare('SELECT * FROM products ORDER BY id ASC')
  const data = sqlOpdracht.all()
  // console.log(JSON.stringify(data, null, 2))
  response.status(200).send(data)
  console.log('API verstuurt /api/categories/')
}

/*
*/
function getProducts(request, response) {
  console.log('API ontvangt /api/products/?', request.query)

  const category_id = parseInt(request.query.category)
  let data = []
  if (category_id > 0) {
    const sqlOpdracht = db.prepare('SELECT * FROM products WHERE category_id = ? ORDER BY id ASC')
    data = sqlOpdracht.all(category_id)
  } else {
    const sqlOpdracht = db.prepare('SELECT * FROM products ORDER BY id ASC')
    data = sqlOpdracht.all()
  }
  // console.log(JSON.stringify(data, null, 2))
  response.status(200).send(data)
  console.log('API verstuurt /api/products/')
}

/*
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


// ---------------------------------
// email bestelling
// ---------------------------------

function checkoutOrder(request, response) {
  console.log("API ontvangt /api/checkout/")

  // lees informatie die is meegestuurd naar api via POST-request
  var { firstName, lastName, email, phone, productIds, productAmounts } = request.body
  console.log("data ontvangen via post-request:")
  console.log(request.body)

  // define productIds and ProductAmounts as array 
  // if there are 0 or 1 products this code is needed
  productIds = productIds || []
  if (!Array.isArray(productIds)) {
    productIds = [productIds]
  }
  productAmounts = productAmounts || []
  if (!Array.isArray(productAmounts)) {
    productAmounts = [productAmounts]
  }

  // order id maken: date + random number
  var today = new Date();
  const orderId = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate() + '-' + String(Math.floor(Math.random() * 1000))

  // maak tabel met info uit database over producten uit winkelmand
  var totaalBedrag = 0;
  var articleTable = "<table>"
  articleTable += "<tr><th>Id</th><th>Code</th><th>Naam</th><th>Prijs per stuk</th><th>Aantal</th><th>Aantal * prijs</th></tr>"
  for (let i in productIds) { // herhaal voor elke index van productIds[]
    let id = productIds[i]
    const sqlOpdracht = db.prepare('SELECT * FROM products WHERE id = ?')
    row = sqlOpdracht.get(id)
    let aantalMaalPrijs = productAmounts[i] * row.price
    articleTable += `<tr><td>${row.id}<tr><td>${row.code}</td><td>${row.name}</td><td>€ ${row.price.toFixed(2)}</td><td>${productAmounts[i]}</td><td>€ ${aantalMaalPrijs}</td></tr>`
    totaalBedrag += aantalMaalPrijs
  }
  articleTable += `<tr><td colspan="5">Totaal</td><td>€ ${totaalBedrag.toFixed(2)}</td><tr>`
  articleTable += "</table>"

  // maak inhoud van mailbericht
  var body = `<html><body>Hi<br><br>Bedankt voor je bestelling met nummer <b>${orderId}</b><br><br>\n` +
    `Naam: ${firstName || '-'} ${lastName || '-'}<br>\n` +
    `Email: ${email || '-'}<br>\n` +
    `Telefoon: ${phone || '-'}<br>\n` +
    articleTable +
    //`productIds: ${productIds || '-'}<br>\n` + 
    //`productAmounts: ${productAmounts || '-'}<br>\n` + 
    `groet,<br><br>\n\nShop Mailer\n</body></html>`

  sendMail('Bevestiging van bestelling', body, email)
  // note: mailer is async, so technically it has not been send yet 
  response.status(200).send({ orderId })

}

// --------------------------
// sent mail hulp onderdelen
// --------------------------

var nodemailer = require('nodemailer');

function mailConfigOK() {
  return process.env.GMAIL_EMAIL !== undefined &&
    process.env.GMAIL_PASSWORD !== undefined &&
    process.env.ORDER_MAIL_TO !== undefined
}

function sendMail(subject, body, recipent) {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: recipent,
    bcc: process.env.ORDER_MAIL_TO,
    subject: subject,
    html: body
  };

  if (!mailConfigOK()) {
    console.log(`mail not configured properly - dumping mail: ${JSON.stringify(mailOptions)}`)
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

} 