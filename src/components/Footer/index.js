import React from 'react'
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import './index.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='social-icons-containeter'>
        <div style={{ margin: "10px" }}>
          <FaGoogle />
        </div >
        <div style={{ margin: "10px" }}>
          <FaTwitter />
        </div>
        <div style={{ margin: "10px" }}>
          <FaInstagram />
        </div>
        <div style={{ margin: "10px" }}>
          <FaYoutube />
        </div>
      </div>
      <p>Contact Us</p>
    </div>
  )
}

export default Footer