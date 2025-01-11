import React, { useState } from 'react'
import "./CSS/nav.css";
import { 
    FaBars,
    FaBroadcastTower,
    FaClock,
    FaCloudSunRain,
    FaFacebookSquare,
    FaFootballBall,
    FaGlassCheers,
    FaGlobe,
    FaGlobeAmericas,
    FaLinkedin,
    FaMapMarked,
    FaMapMarkerAlt,
    FaNewspaper,
    FaPinterestP,
    FaPlane,
    FaStar,
    FaTiktok,
    FaTimes,
    FaTv,
    FaTwitter,
    FaUserAlt,
    FaUserEdit,
    FaUserTimes,
    FaYoutube,
    FaRegUserCircle,
    FaPowerOff,
    FaMoon,
    FaCloudSun,
    FaShareAlt  
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

  const [viewMoonPhase, setViewMoonPhase] = useState(false);
  const [viewSocialMedia, setViewSocialMedia] = useState(false);
  const [viewPages, setViewPages] = useState(false);

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

  const handleViewMoonPhase = () => {
    setViewMoonPhase(true);
    setViewSocialMedia(false);
    setViewPages(false)

    const timeout = setTimeout(() => {
      setViewMoonPhase(false)
    }, 15000);
    return () => clearTimeout(timeout);
  }
  const handleViewSocialMedia = () => {
    setViewSocialMedia(true);
    setViewMoonPhase(false);
    setViewPages(false)

    const timeout = setTimeout(() => {
      setViewSocialMedia(false)
    }, 15000);
    return () => clearTimeout(timeout);
  }
  const handleViewPages = () => {
    setViewPages(true)
    setViewSocialMedia(false);
    setViewMoonPhase(false);

    const timeout = setTimeout(() => {
      setViewPages(false)
    }, 20000);
    return () => clearTimeout(timeout);
  }
  const handleHideModals = () => {
    setViewMoonPhase(false)
    setViewSocialMedia(false);
    setViewPages(false)
  }
  

  return (
    <nav>
      {createTDUAccount && <RegisterTDU/>}
      {loginTDUAccount && <LoginTDU/>}


      <div className="mainNavContainer">
        <div className="navContainer website">
          <div className="navContent left">
            <Link to="/" id='navclHome'>
              <img src={require('./assets/imgs/TheDailyUniverseLogo.png')} alt="" />
              <span>
                <h4>THE DAILY UNIVERSE</h4>
                <p>READ THE WORLD</p>
              </span>
            </Link>
            <div className="navclSocial">
              {viewSocialMedia && <div className="navclsContents">
                <h6>SHARE AND FOLLOW US ON:</h6>
                <div className="navclsc">
                  <a href="" target='blank'><p><FaFacebookSquare className='faIcons'/> FACEBOOK</p></a>
                  <a href="" target='blank'><p><FaTwitter className='faIcons'/> TWITTER</p></a>
                  <a href="" target='blank'><p><FaLinkedin className='faIcons'/> LINKEDIN</p></a>
                  <a href="" target='blank'><p><FaYoutube className='faIcons'/> YOUTUBE</p></a>
                  <a href="" target='blank'><p><FaTiktok className='faIcons'/> TIKTOK</p></a>
                </div>
              </div>}
              {!viewSocialMedia ?
                <button onClick={handleViewSocialMedia} className={viewSocialMedia ? 'active' : ''}><FaShareAlt className='faIcons'/></button>:
                <button onClick={handleHideModals} className={viewSocialMedia ? 'active' : ''}><FaShareAlt className='faIcons'/></button>
              }
            </div>
            <div className="navclExtra">
              {viewMoonPhase && <div className="navcleMoon">
                <div className="navclemCurrentMoon">
                  <a href="https://www.moonconnection.com" target="mc_moon_ph">
                    <img
                      src="https://www.moonmodule.com/cs/dm/vn.gif"
                      border="0"
                      alt=""
                    />
                  </a>
                </div>
              </div>}
              {!viewMoonPhase ? 
                <button onClick={handleViewMoonPhase} className={viewMoonPhase ? 'active' : ''}><FaMoon className='faIcons'/></button>:
                <button onClick={handleHideModals} className={viewMoonPhase ? 'active' : ''}><FaMoon className='faIcons'/></button>
              }
              <a href="https://weather.com/" target='blank'><FaCloudSun className='faIcons'/></a>
            </div>
          </div>
          <div className="navContent right">
            {viewPages && <div className="nvcntntrModal">
              <Link><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
              <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
              <Link><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
              <Link><h6><FaGlassCheers className='faIcons'/> RESTAURANTS</h6></Link>
              <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
              <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
              <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
              <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
            </div>}
            <div className="nvcntntr links">
              <button>America</button>
              <button>Europe</button>
              <button>Asia</button>
              <button>Africa</button>
              <button>Oceania</button>
              <button>Antartica</button>
              {!viewPages ? 
                <button onClick={handleViewPages} className={viewPages ? 'active' : ''}><FaBars className='faIcons'/></button>:
                <button onClick={handleHideModals} className={viewPages ? 'active' : ''}><FaTimes className='faIcons'/></button>
              }
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