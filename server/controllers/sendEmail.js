const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'botick.vr@gmail.com',
    pass: 'botickvr123'
  }
})

const sendMail = (req, res) => {
  var header = {
    username: req.headers.username,
    seatBook: req.headers.seatBook,
    email: req.headers.email,
    studio: req.headers.studio
  }
    
  var bookingId = Math.floor((Math.random() * 100) +54);
  var link = 'https://api.botick.ga/booking?verify='+bookingId
  var mailOptions = {
    to: header.email,
    subject: `Botick confirmation user: ${header.username}`,
    html: `Hello ${header.username},<br> Please Click on the link to confirm your booking tickets.<br><button href=${link}>Click here to verify</a>`
  }

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