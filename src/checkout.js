const mailer = require('./mailer')
const db = require('./queries')
const dateFormat = require('dateformat');



const checkoutOrder = (request, response) => {

  var { firstName, lastName, email, phone, articles } = request.body


  articles = articles || []
  if(!Array.isArray(articles)) {
    articles = [ articles ]
  }
  var basket = {}
  articles.forEach( id => {
    basket[id]= request.body[`item_${id}`]
  })

  // order id: date + random number
  const orderId = dateFormat(new Date(), "yyyymmddhhMMss-") + Math.floor(Math.random()*1000);

  db.getProductsByIds(articles, function(rows){
    
    var products = {}
    rows.forEach (p => products[p.id] = p)

    var total = 0;
    for (let id in basket) {
      total += basket[id]*products[id].price
    }
    var articleTable = "<table>"
    articleTable += "<tr><th>Code</th><th>Naam</th><th>Aantal</th><th>Prijs</th></tr>"
    Object.values(products).forEach( p => {
      articleTable += `<tr><td>${p.code}</td><td>${p.name}</td><td>${basket[p.id]}</td><td>€${p.price}</td></tr>`
    })
    articleTable += `<tr><td colspan="3">Totaal</td><td>€${total.toFixed(2)}</td><tr>`
    articleTable += "</table>"

    var body = `<html><body>Hi<br><br>Er is een nieuwe order <b>${orderId}</b> ontvangen van <br><br>\n`+
   `Naam: ${firstName||'-'} ${lastName||'-'}<br>\n`+
   `Email: ${email||'-'}<br>\n`+
   `Telefoon: ${phone||'-'}<br>\n`+
   articleTable +
   `groet,<br><br>\n\nShop Mailer\n</body></html>`

  mailer.sendMail('New Order recieved', body)
  // note: mailer is async, so technically it has not been send yet 
  response.status(200).send({orderId})

  })


}


module.exports = {
  checkoutOrder,
}
