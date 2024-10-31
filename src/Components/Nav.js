import React, { useState } from 'react'
import "./CSS/nav.css";
import { 
    FaBars, 
    FaWindowClose,
    FaArrowCircleDown,
    FaComments,
    FaTh,
    FaTelegramPlane,
    FaTwitter,
    FaGithub,
    FaYoutube,
    FaRegUserCircle
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

const Nav = () => {
  

  return (
    <nav>
        <div className="mainNavContainer">
            <div className="navContainer website">
                <div className="navContent left">
                    <Link to="/">
                        <img src={require('./assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                        <h4>THE DAILY UNIVERSE</h4>
                    </Link>
                </div>
                <div className="navContent right">
                  <div className="nvcntntr links">
                    <button>Countries</button>
                    <Link>Newspapers</Link>
                    <Link>Magazines</Link>
                    <Link>Destinations</Link>
                    <Link>Visa Guide</Link>
                  </div>
                  <div className="nvcntntr user">
                    <button id='nvcntntruSignup'><h6>REGISTER</h6></button>
                    <button id='nvcntntruLogin'><FaRegUserCircle className='faIcons'/></button>
                  </div>
                </div>
            </div>
        </div>
    </nav>
  ); 
}

export default Nav;