import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className= 'footer'>
      <div className= 'container'>
        <div className= 'col-md-4'>
          <h4>Our Place</h4>
          <p>Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240, Indonesia</p>
        </div>
        <div className= 'col-md-4 text-center list-logo'>
          <ul className="list-inline">
                <li>
                  <a href="https://www.facebook.com/adnin.rais"><img src="https://raw.githubusercontent.com/adnin31/symantec-web/master/image/facebook.png" className="img-responsive img-center img-rounded foto"
                  alt="Profile"/></a>
                </li>
                <li>
                  <a href="https://twitter.com/adnin_rais"><img src="https://raw.githubusercontent.com/adnin31/symantec-web/master/image/twitter.png" className="img-responsive img-center img-rounded foto"
                  alt="Profile"/></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/adnin31/?hl=en"><img src="https://raw.githubusercontent.com/adnin31/symantec-web/master/image/instagram.png" className="img-responsive img-center img-rounded foto"
                  alt="Profile"/></a>
                </li>
                <li>
                  <a href="https://github.com/adnin31"><img src="https://raw.githubusercontent.com/adnin31/symantec-web/master/image/github.png" className="img-responsive img-center img-rounded foto"
                  alt="Profile"/></a>
                </li>
            </ul>
        </div>
        {/* <div className='col-md-4'>
          <p className='copyright'>© 2017 PT Hacktivate Teknologi Indonesia. All Rights Reserved.</p>
        </div> */}
        <div className='text-center col-md-12'>
          <p className='copyright'>© 2017 PT Hacktivate Teknologi Indonesia. All Rights Reserved.</p>
        </div>

      </div>




    </footer>
  )
}
export default Footer
