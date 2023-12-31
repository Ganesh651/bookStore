import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Notfound = () => {
  const navigate = useNavigate()

  const hanndleNotfound = () => {
    navigate("/")
  }


  return (
    <div className='notfound-section'>
      <div className='notfound-container'>
        <img src="https://res.cloudinary.com/dky69roxl/image/upload/v1694595836/Group_7484_oew98o.png"
          alt="notfound"
          className='notfound-image'
        />
        <h2 className='notfound-heading'>Page Not Found</h2>
        <p className='notfound-description'>we are sorry, the page you requested could not be found, Please go back to the homepage.</p>
        <button type='button' className='back-home-button' onClick={hanndleNotfound}>
          Go back to Home
        </button>
      </div>
    </div>
  )
}

export default Notfound
