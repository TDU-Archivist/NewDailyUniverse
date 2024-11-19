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
    FaRegUserCircle,
    FaPowerOff
} from 'react-icons/fa';
import { 
  MdNotificationsNone, 
  MdOutlineAdminPanelSettings,
  MdPowerSettingsNew  
} from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginTDU from './Pages/LoginTDU';
import RegisterTDU from './Pages/RegisterTDU';
import { MainDataLoad } from './Pages/MainDataContext';



const TextSlicer = ({ text = '', maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return (
    <>{truncatedText}</>
  );
};
const Nav = () => {
  const { 
    userLoggedIn,
    StoredUserID,
    StoredUserDataJSON,
    createTDUAccount, 
    setCreateTDUAccount,
    loginTDUAccount, 
    setLoginTDUAccount,
    pickedCountryModal, 
    setPickedCountryModal,
    pickedCountry, 
    setPickedCountry,
    countryData,
    countryThreeTouristSpots,
  } = MainDataLoad(); 
  const navigate = useNavigate();
  const handleRegisterTDU = () => {
    setCreateTDUAccount(true)
  }
  const handleLoginTDU = () => {
    setLoginTDUAccount(true)
  }

  const handleUserLogout = () => {
    if (!userLoggedIn) return;

    localStorage.removeItem('tduProfileAccount');
    localStorage.removeItem('tduProfileUserID');
    localStorage.removeItem('isLoggedIn');
    navigate('/')
    window.location.reload();
  };

  

  return (
    <nav>
      {createTDUAccount && <RegisterTDU/>}
      {loginTDUAccount && <LoginTDU/>}


      <div className="mainNavContainer">
          <div className="navContainer website">
              <div className="navContent left">
                  <Link to="/">
                    <img src={require('./assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                    <span>
                      <h4>THE DAILY UNIVERSE</h4>
                      <p>READ THE WORLD</p>
                    </span>
                  </Link>
              </div>
              <div className="navContent right">
                <div className="nvcntntr links">
                  <button>Countries</button>
                  <Link>Articles</Link>
                  <Link>Newspapers</Link>
                  <Link>Magazines</Link>
                  <Link>Destinations</Link>
                  <Link>Entertainment</Link>
                </div>
                {(!userLoggedIn && !StoredUserID) ? <div className="nvcntntr user">
                  <button id='nvcntntruLogin' onClick={handleLoginTDU}><FaRegUserCircle className='faIcons'/></button>
                  <button id='nvcntntruSignup' onClick={handleRegisterTDU}><h6>REGISTER</h6></button>
                </div>:<div className="nvcntntr user">
                  {(StoredUserDataJSON?.state === "Admin") && <Link id='nvcntntruAdmin' to="/AdminPanel"><MdOutlineAdminPanelSettings className='faIcons'/></Link>}
                  <button id='nvcntntruNotification'><MdNotificationsNone className='faIcons'/></button>
                  <Link id='nvcntntruUser' to={`/${StoredUserDataJSON?.username}`}>
                    <span>
                      <img src={StoredUserDataJSON?.icon ? `https://staging.thedailyuniverse.com/TDUUsers/${StoredUserDataJSON?.icon}` : (require('./assets/imgs/TDULandingBG.png'))} alt="" />
                    </span>
                    <h6><TextSlicer text={`${StoredUserDataJSON?.username}`} maxLength={6} /></h6>
                  </Link>
                  <button id='nvcntntruLogout' onClick={handleUserLogout}><FaPowerOff className='faIcons'/></button>
                </div>}
              </div>
          </div>
      </div>
    </nav>
  ); 
}

export default Nav;