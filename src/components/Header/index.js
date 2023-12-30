import React from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Hamburger from '../Hamburger'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const className = (props) => props.isActive ? "active" : "pending"

  const handdleLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <nav className='navbar'>
      <Link to="/">
        <img src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
          alt="book store"
          className='website-logo'
        />
      </Link>
      <div className='nav-items-container'>
        <span style={{ marginRight: "10px" }}>
          <NavLink to="/" className={className}>
            Home
          </NavLink>
        </span>
        <span style={{ marginRight: "10px" }}>
          <NavLink to="/shelf" className={className}>
            Bookshelves
          </NavLink>
        </span>
        <button type='button' className='logout-button' onClick={handdleLogout}>
          Logout
        </button>
      </div>
      <Hamburger />
    </nav >
  )
}

export default Header