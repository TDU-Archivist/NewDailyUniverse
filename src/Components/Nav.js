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
    FaShareAlt,
    FaUtensils   
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
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [viewNAmericaNav, setViewNAmericaNav] = useState(false);
  const [viewSAmericaNav, setViewSAmericaNav] = useState(false);
  const [viewEuropeNav, setViewEuropeNav] = useState(false);
  const [viewAfricaNav, setViewAfricaNav] = useState(false);
  const [viewAsiaNav, setViewAsiaNav] = useState(false);
  const [viewOceniaNav, setViewOceniaNav] = useState(false);
  const [viewAntarticaNav, setViewAntarticaNav] = useState(false);

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
    setViewPages(false);
    setViewNAmericaNav(false);
    setViewSAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);

    const timeout = setTimeout(() => {
      setViewMoonPhase(false)
    }, 10000);
    return () => clearTimeout(timeout);
  }
  const handleViewSocialMedia = () => {
    setViewSocialMedia(true);
    setViewMoonPhase(false);
    setViewPages(false);
    setViewNAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);

    const timeout = setTimeout(() => {
      setViewSocialMedia(false)
    }, 10000);
    return () => clearTimeout(timeout);
  }
  const handleViewPages = () => {
    setViewPages(true)
    setViewSocialMedia(false);
    setViewMoonPhase(false);
    setViewNAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);

    // const timeout = setTimeout(() => {
    //   setViewPages(false)
    // }, 5000);
    // return () => clearTimeout(timeout);
  }
  const handleHideModals = () => {
    setViewMoonPhase(false)
    setViewSocialMedia(false);
    setViewPages(false);
    setViewNAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);
  }


  const handleViewNAmericaNav = () => {
    setViewNAmericaNav(true);
    setViewSAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);

    const timeout = setTimeout(() => {
      setViewNAmericaNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }
  const handleViewSAmericaNav = () => {
    setViewNAmericaNav(false);
    setViewSAmericaNav(true);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);
    
    const timeout = setTimeout(() => {
      setViewSAmericaNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }
  const handleViewEuropeNav = () => {
    setViewNAmericaNav(false);
    setViewSAmericaNav(false);
    setViewEuropeNav(true);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);
    
    const timeout = setTimeout(() => {
      setViewEuropeNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }
  const handleViewAfricaNav = () => {
    setViewNAmericaNav(false);
    setViewSAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(true);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);
    
    const timeout = setTimeout(() => {
      setViewAfricaNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }
  const handleViewAsiaNav = () => {
    setViewNAmericaNav(false);
    setViewSAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(true);
    setViewOceniaNav(false);
    setViewAntarticaNav(false);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);
    
    const timeout = setTimeout(() => {
      setViewAsiaNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }
  const handleViewOceaniaNav = () => {
    setViewNAmericaNav(false);
    setViewSAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(true);
    setViewAntarticaNav(false);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);
    
    const timeout = setTimeout(() => {
      setViewOceniaNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }
  const handleViewAntarcticaNav = () => {
    setViewNAmericaNav(false);
    setViewSAmericaNav(false);
    setViewEuropeNav(false);
    setViewAfricaNav(false);
    setViewAsiaNav(false);
    setViewOceniaNav(false);
    setViewAntarticaNav(true);
    setViewMoonPhase(false);
    setViewSocialMedia(false);
    setViewPages(false);
    
    const timeout = setTimeout(() => {
      setViewAntarticaNav(false)
    }, 8000);
    return () => clearTimeout(timeout);
  }


  

  return (
    <nav>
      {createTDUAccount && <RegisterTDU/>}
      {loginTDUAccount && <LoginTDU/>}


      <div className="mainNavContainer">
        <div className="navContainer website">
          <div className="navContent left">
            <Link to="/" id='navclHome'>
              <img id='navclhWeb' src={require('./assets/imgs/TheDailyUniverseLogo00.png')} alt="" />
              <img id='navclhMobile' src={require('./assets/imgs/TheDailyUniverseLogo.png')} alt="" />
              {/* <span>
                <h4>THE DAILY UNIVERSE</h4>
                <p>READ THE WORLD</p>
              </span> */}
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
              <button onClick={!viewSocialMedia ? handleViewSocialMedia : handleHideModals} className={viewSocialMedia ? 'active' : ''}><FaShareAlt className='faIcons'/></button>
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
              <button onClick={!viewMoonPhase ? handleViewMoonPhase : handleHideModals} className={viewMoonPhase ? 'active' : ''}><FaMoon className='faIcons'/></button>
              <a href="https://weather.com/" target='blank'><FaCloudSun className='faIcons'/></a>
            </div>
          </div>
          <div className="navContent right">
            {viewPages && <div className={!userLoggedIn ? "nvcntntrModal" : "nvcntntrModal logged"}
              // onMouseEnter={() => {
              //   if (hideTimeout) {
              //     clearTimeout(hideTimeout);
              //   }
              //   setHasMouseEntered(true); 
              //   setViewPages(true); 
              // }}
              // onMouseLeave={() => {
              //   if (hasMouseEntered) {
              //     const timeout = setTimeout(() => {
              //       setViewPages(false);
              //       setHasMouseEntered(false);
              //     }, 500);
              //     setHideTimeout(timeout);
              //   }
              // }}
            >
              <Link to='/Airlines' onClick={handleHideModals}><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
              <Link to='/Airports' onClick={handleHideModals}><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
              <Link to='/BreakingNews' onClick={handleHideModals}><h6><FaBroadcastTower className='faIcons'/> BREAKING NEWS</h6></Link>
              <Link to='/GlobalInfo' onClick={handleHideModals}><h6><FaGlobe className='faIcons'/> GLOBAL INFO</h6></Link>
              <Link to='/NewsChannels' onClick={handleHideModals}><h6><FaTv className='faIcons'/> LIVE NEWS CHANNELS</h6></Link>
              <Link to='/Magazines' onClick={handleHideModals}><h6><FaNewspaper className='faIcons'/> MAGAZINES</h6></Link>
              <Link to='/Newspapers' onClick={handleHideModals}><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
              <Link to='/Restaurants' onClick={handleHideModals}><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
              <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
              <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
              <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
              <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER FORECAST</h6></Link>
              <Link><h6><FaClock className='faIcons'/> WORLD CLOCK</h6></Link>
            </div>}
            {viewNAmericaNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
              onMouseEnter={() => {
                if (hideTimeout) {
                  clearTimeout(hideTimeout);
                }
                setHasMouseEntered(true); 
                setViewNAmericaNav(true); 
              }}
              onMouseLeave={() => {
                if (hasMouseEntered) {
                  const timeout = setTimeout(() => {
                    setViewNAmericaNav(false);
                    setHasMouseEntered(false);
                  }, 500);
                  setHideTimeout(timeout);
                }
              }}
            >
              <div className="nvcntntrcTitle">
                <h6>ALL NORTH AMERICAN ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Flag_of_the_Organization_of_American_States.svg/1920px-Flag_of_the_Organization_of_American_States.svg.png" alt="" />
                </div>
                <div>
                  <h6>Organization of American States</h6>
                  <p>The Organization of American States (OAS or OEA) is an international organization founded on 30 April 1948 to promote cooperation among its member states within the Americas.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/America'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/NorthAmerica'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/NorthAmerica'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            {viewSAmericaNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
              onMouseEnter={() => {
                if (hideTimeout) {
                  clearTimeout(hideTimeout);
                }
                setHasMouseEntered(true); 
                setViewSAmericaNav(true); 
              }}
              onMouseLeave={() => {
                if (hasMouseEntered) {
                  const timeout = setTimeout(() => {
                    setViewSAmericaNav(false);
                    setHasMouseEntered(false);
                  }, 500);
                  setHideTimeout(timeout);
                }
              }}
            >
              <div className="nvcntntrcTitle">
                <h6>ALL SOUTH AMERICAN ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_UNASUR.svg/800px-Flag_of_UNASUR.svg.png" alt="" />
                </div>
                <div>
                  <h6>Union of South American Nations</h6>
                  <p>The Union of South American Nations (USAN), sometimes also referred to as the South American Union, abbreviated in Spanish as UNASUR and in Portuguese as UNASUL, is an intergovernmental regional organization.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/America'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/SouthAmerica'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/SouthAmerica'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            {viewEuropeNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
              onMouseEnter={() => {
                if (hideTimeout) {
                  clearTimeout(hideTimeout);
                }
                setHasMouseEntered(true); 
                setViewEuropeNav(true); 
              }}
              onMouseLeave={() => {
                if (hasMouseEntered) {
                  const timeout = setTimeout(() => {
                    setViewEuropeNav(false);
                    setHasMouseEntered(false);
                  }, 500);
                  setHideTimeout(timeout);
                }
              }}
            >
              <div className="nvcntntrcTitle">
                <h6>ALL EUROPEAN ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1920px-Flag_of_Europe.svg.png" alt="" />
                </div>
                <div>
                  <h6>European Union</h6>
                  <p>The European Union (EU) is a supranational political and economic union of 27 member states that are located primarily in Europe. The EU has often been described as a sui generis political entity combining the characteristics of both a federation and a confederation.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/Europe'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/Europe'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/Europe'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            {viewAfricaNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
                onMouseEnter={() => {
                  if (hideTimeout) {
                    clearTimeout(hideTimeout);
                  }
                  setHasMouseEntered(true); 
                  setViewAfricaNav(true); 
                }}
                onMouseLeave={() => {
                  if (hasMouseEntered) {
                    const timeout = setTimeout(() => {
                      setViewAfricaNav(false);
                      setHasMouseEntered(false);
                    }, 500);
                    setHideTimeout(timeout);
                  }
                }}
              >
              <div className="nvcntntrcTitle">
                <h6>ALL AFRICAN ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_the_African_Union.svg/1920px-Flag_of_the_African_Union.svg.png" alt="" />
                </div>
                <div>
                  <h6>African Union</h6>
                  <p>The African Union (AU) is a continental union of 55 member states located on the continent of Africa. The AU was announced in the Sirte Declaration in Sirte, Libya, on 9 September 1999, calling for the establishment of the African Union.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/Africa'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/Africa'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/Africa'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            {viewAsiaNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
                onMouseEnter={() => {
                  if (hideTimeout) {
                    clearTimeout(hideTimeout);
                  }
                  setHasMouseEntered(true); 
                  setViewAsiaNav(true); 
                }}
                onMouseLeave={() => {
                  if (hasMouseEntered) {
                    const timeout = setTimeout(() => {
                      setViewAsiaNav(false);
                      setHasMouseEntered(false);
                    }, 500);
                    setHideTimeout(timeout);
                  }
                }}
              >
              <div className="nvcntntrcTitle">
                <h6>ALL ASIAN ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Flag_of_ASEAN.svg/1920px-Flag_of_ASEAN.svg.png" alt="" />
                </div>
                <div>
                  <h6>Association of Southeast Asian Nations</h6>
                  <p>The Association of Southeast Asian Nations (ASEAN), is a political and economic union of 10 states in Southeast Asia. ASEAN member states include some of the fastest growing economies in the world, and the institution plays an integral role in East Asian regionalism.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/Asia'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/Asia'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/Asia'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            {viewOceniaNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
                onMouseEnter={() => {
                  if (hideTimeout) {
                    clearTimeout(hideTimeout);
                  }
                  setHasMouseEntered(true); 
                  setViewOceniaNav(true); 
                }}
                onMouseLeave={() => {
                  if (hasMouseEntered) {
                    const timeout = setTimeout(() => {
                      setViewOceniaNav(false);
                      setHasMouseEntered(false);
                    }, 500);
                    setHideTimeout(timeout);
                  }
                }}
              >
              <div className="nvcntntrcTitle">
                <h6>ALL OCEANIA ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/APEC_logo_vertical.svg/1920px-APEC_logo_vertical.svg.png" alt="" />
                </div>
                <div>
                  <h6>Asia-Pacific Economic Cooperation</h6>
                  <p>Asia-Pacific Economic Cooperation (APEC) is an inter-governmental forum for 21 member economies in the Pacific Rim that promotes free trade throughout the Asia-Pacific region.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/Oceania'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/Oceania'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/Oceania'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            {viewAntarticaNav && <div className={!userLoggedIn ? "nvcntntrContinent" : "nvcntntrContinent logged"}
                onMouseEnter={() => {
                  if (hideTimeout) {
                    clearTimeout(hideTimeout);
                  }
                  setHasMouseEntered(true); 
                  setViewAntarticaNav(true); 
                }}
                onMouseLeave={() => {
                  if (hasMouseEntered) {
                    const timeout = setTimeout(() => {
                      setViewAntarticaNav(false);
                      setHasMouseEntered(false);
                    }, 500);
                    setHideTimeout(timeout);
                  }
                }}
              >
              <div className="nvcntntrcTitle">
                <h6>ALL ANTARCTICA ARTICLES AND CONTENTS</h6>
              </div>
              <div className="nvcntntrcContent">
                <div className='nvcntntrccOrg'>
                  <img src="https://upload.wikimedia.org/wikipedia/en/2/25/Antarctic_and_Southern_Ocean_Coalition_Logo.jpeg" alt="" />
                </div>
                <div>
                  <h6>Antarctic and Southern Ocean Coalition </h6>
                  <p>The Antarctic and Southern Ocean Coalition (ASOC) is a global coalition of environmental non-governmental organizations with more than 150 members in 40 countries worldwide.</p>
                </div>
              </div>
              <div className="nvcntntrcPages">
                <Link to='/Airlines/Continent/Antarctica'><h6><FaPlane className='faIcons'/> AIRLINES</h6></Link>
                <Link><h6><FaPlane className='faIcons'/> AIRPORTS</h6></Link>
                <Link to='/Newspapers/Continent/Antarctica'><h6><FaNewspaper className='faIcons'/> NEWSPAPER</h6></Link>
                <Link to='/Restaurants/Continent/Antarctica'><h6><FaUtensils className='faIcons'/> RESTAURANTS</h6></Link>
                <Link><h6><FaFootballBall className='faIcons'/> SPORTS</h6></Link>
                <Link><h6><FaMapMarked className='faIcons'/> TRAVEL</h6></Link>
                <Link><h6><FaMapMarkerAlt className='faIcons'/> VISA GUIDE</h6></Link>
                <Link><h6><FaCloudSunRain className='faIcons'/> WEATHER</h6></Link>
              </div>
            </div>}
            <div className="nvcntntr links">
              <button className={viewNAmericaNav ? 'active' : ''} onMouseEnter={!viewNAmericaNav ? handleViewNAmericaNav : handleHideModals}>N.America</button>
              <button className={viewSAmericaNav ? 'active' : ''} onMouseEnter={!viewSAmericaNav ? handleViewSAmericaNav : handleHideModals}>S.America</button>
              <button className={viewEuropeNav ? 'active' : ''} onMouseEnter={!viewEuropeNav ? handleViewEuropeNav : handleHideModals}>Europe</button>
              <button className={viewAfricaNav ? 'active' : ''} onMouseEnter={!viewAfricaNav ? handleViewAfricaNav : handleHideModals}>Africa</button>
              <button className={viewAsiaNav ? 'active' : ''} onMouseEnter={!viewAsiaNav ? handleViewAsiaNav : handleHideModals}>Asia</button>
              <button className={viewOceniaNav ? 'active' : ''} onMouseEnter={!viewOceniaNav ? handleViewOceaniaNav : handleHideModals}>Oceania</button>
              <button className={viewAntarticaNav ? 'active' : ''} onMouseEnter={!viewAntarticaNav ? handleViewAntarcticaNav : handleHideModals}>Antarctica</button>
              <button onClick={!viewPages ? handleViewPages : handleHideModals} className={viewPages ? 'active bar' : 'bar'}>{!viewPages ? <FaBars className='faIcons'/> : <FaTimes className='faIcons'/>}</button>
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