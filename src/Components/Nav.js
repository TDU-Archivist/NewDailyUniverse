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
    window.location.reload();
    navigate('/')
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
                {(!userLoggedIn && !StoredUserID) ? <div className="nvcntntr user">
                  <button id='nvcntntruSignup' onClick={handleRegisterTDU}><h6>REGISTER</h6></button>
                  <button id='nvcntntruLogin' onClick={handleLoginTDU}><FaRegUserCircle className='faIcons'/></button>
                </div>:<div className="nvcntntr user">
                  <Link id='nvcntntruUser'><h6><TextSlicer text={`${StoredUserDataJSON?.username}`} maxLength={8} /></h6></Link>
                  {(StoredUserDataJSON?.state === "Admin") && <Link id='nvcntntruAdmin' to="/AdminPanel"><MdOutlineAdminPanelSettings className='faIcons'/></Link>}
                  <button id='nvcntntruLogin' onClick={handleUserLogout}><MdPowerSettingsNew className='faIcons'/></button>
                </div>}
              </div>
          </div>
      </div>
    </nav>
  ); 
}

export default Nav;