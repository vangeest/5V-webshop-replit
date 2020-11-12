const mailer = require('./mailer')


const checkoutOrder = (request, response) => {

  var { firstName, lastName, email, articles } = request.body

  articles = articles || []
  if(!Array.isArray(articles)) {
    articles = [ articles ]
  }

  var body = `we recieved a new order from\n\n`+
   `name: ${firstName||'-'} ${lastName||'-'}\n`+
   `email: ${email||'-'}\n`+
   `articles: ${articles.join(',')||'-'}\n\n` +
   `regards,\n\nShop Mailer\n`

  mailer.sendMail('New Order recieved', body)
  // note: mailer is async, so technically it has not been send yet 
  response.status(200).send(`Order has been mailed`)
}


module.exports = {
  checkoutOrder,
}
