const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'botick.vr@gmail.com',
    pass: 'botickvr123'
  }
})

var bookingId = Math.floor((Math.random() * 100) +54);
var link = 'https://api.botick.ga/booking?verify='+bookingId
var mailOptions = {
  to: 'rusli.gani88@gmail.com',
  subject: 'Test Confirm email',
  html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
}

const sendMail = (req, res) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        console.log(response)
        res.send(response)
      }
    })
}

module.exports = sendMail