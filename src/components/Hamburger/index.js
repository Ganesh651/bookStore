import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { RiMenu3Line } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './index.css';

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const className = (props) => props.isActive ? "active" : "pending"

  const handleMenu = () => {
    setOpen(!open);
  };

  const onCloseMenu = () => {
    setOpen(false);
  };

  const onLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <div className="hamburger-menu">
      <button className="trigger-button" type="button" onClick={handleMenu}>
        <RiMenu3Line className='hamburger-icon' />
      </button>
      <Popup open={open} closeOnDocumentClick onClose={onCloseMenu}>
        <div className="nav-items-container-mobile popup-content">
          <NavLink to="/" className={className}>
            <span className="nav-item">Home</span>
          </NavLink>
          {/* <NavLink to="/profile" className={className} onClick={onCloseMenu}>
            <span className="nav-item">Profile</span>
          </NavLink> */}
          <NavLink to="/shelf" className={className}>
            <span className="nav-item">Bookshelves</span>
          </NavLink>
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
          <IoCloseCircleOutline className="close-icon" onClick={onCloseMenu} />
        </div>
      </Popup>
    </div>
  );
};

export default Hamburger;
