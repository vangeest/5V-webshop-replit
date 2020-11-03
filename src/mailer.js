var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

function sendMail(subject, body) {
  console.log('sending mail');
  var mailOptions = {
  from: process.env.GMAIL_EMAIL,
  to: process.env.GMAIL_EMAIL,
  subject: subject,
  text: body
  };
  console.log(process.env.GMAIL_PASSWORD)

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
} 

module.exports = {
  sendMail,
}