var nodemailer = require('nodemailer');

function mailConfigOK() {
    return process.env.GMAIL_EMAIL !== undefined && 
      process.env.GMAIL_PASSWORD !== undefined &&
      process.env.ORDER_MAIL_TO !== undefined 
}

function sendMail(subject, body) {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: process.env.ORDER_MAIL_TO,
    subject: subject,
    html: body
  };

  if(!mailConfigOK()) {
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