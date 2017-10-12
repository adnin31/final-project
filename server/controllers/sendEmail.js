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
    seatBook: req.headers.seatbook,
    email: req.headers.email,
    studio: req.headers.studio,
    time: req.headers.time,
    title: req.headers.title,
    total: req.headers.total,

  }
  
  var  html = 
  `Hello ${header.username},
  <br> Thank you for your trusting our booking ticket service.
  <br> Herewith the detail: 
  <table border="0">
    <tr>
      <th>Title</th>
      <td />
      <td>${header.title}</td>
    </tr>
    <tr>
      <th>Studio</th>
      <td />
      <td>${header.studio}</td>
    </tr>
    <tr>
      <th>Seat Booked</th>
      <td />
      <td>${header.seatBook}</td>
    </tr>
    <tr>
      <th>Show Time</th>
      <td />
      <td>${header.time}</td>
    </tr>
    <tr>
    <th>Price</th>
      <td />
      <td>${header.total}</td>
  </tr>
  </table>
  <br />
  <br />
  Botick Team
  `
  var bookingId = Math.floor((Math.random() * 100) +54);
  var link = 'https://api.botick.ga/booking?verify='+bookingId
  var mailOptions = {
    to: header.email,
    subject: `Botick confirmation booking ticket/s ${header.title}`,
    html: html
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