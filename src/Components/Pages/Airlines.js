import React, { useEffect, useState } from 'react'
import "../CSS/airlines.css";
import { Link } from 'react-router-dom';
import { 
  FaTimes,
  FaSearch,
  FaMicrophone,
  FaExternalLinkAlt,
  FaArrowRight,
  FaArrowLeft,
  FaMapMarkedAlt,
  FaBook,
  FaPlayCircle     
} from 'react-icons/fa';
import { 
  TbArrowsMinimize,
  TbArrowsMaximize 
} from "react-icons/tb";
import { 
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";
import axios from 'axios';
import WorldMap from './WorldMap';
import MapViewer from './MapViewer';
import MapboxMap from './Mapbox';
import CountryFlag from './CountryFlag';
import ExchangeRateMarquee from './ExchangeRateMarquee';
import { MainDataLoad } from './MainDataContext';
import videoBanner from "../assets/vids/List-Airports.mp4"


const TextSlicer = ({ text = '', maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return (
    <>{truncatedText}</>
  );
};
const formatNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '';
  }

  const truncateDecimal = (value, decimals) => {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
  };

  if (num >= 1_000_000_000) {
    return truncateDecimal(num / 1_000_000_000, 1) + 'B';
  } else if (num >= 1_000_000) {
    return truncateDecimal(num / 1_000_000, 1) + 'M';
  } else if (num >= 100_000) {
    return truncateDecimal(num / 1_000, 1) + 'K';
  }
  
  return num.toString();
};
const NumberFormatter = ({ number }) => {
  return <>{number > 0 ? formatNumber(number) : 0}</>;
};

const Airlines = () => {
    const { 
        webLoader,
        createTDUAccount, 
        setCreateTDUAccount,
        loginTDUAccount, 
        setLoginTDUAccount,
        pickedCountryModal, 
        setPickedCountryModal,
        pickedCountry, 
        setPickedCountry,
        clickedCountry, 
        setClickedCountry,
        countryData,
        countryDescription, 
        setCountryDescription,
        countryCurrency,
        countryThreeTouristSpots,
        switchFullMap, 
        setSwitchFullMap,
        openSuggestedMapTopic, 
        setOpenSuggestedMapTopic,
        fullMapPickedCountry, 
        setFullMapPickedCountry,
        viewAllCapitals,
        viewPickCapital, 
        setViewPickCapital,
        viewCountryCapital, 
        setViewCountryCapital,
        exchangeRates,
        viewAllArticles,
        data,
    } = MainDataLoad(); 


    return (
        <div className='mainContainer airlines'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="airlinesContainerPage top">
                <div className="airlinesContentPage top1">
                    <video autoPlay muted loop>
                        <source src={videoBanner} type="video/mp4" />
                    </video>
                </div>
                <div className="airlinesContentPage top2">
                    <div className="airlnscpt2 left">
                        <h4>FAMOUS AIRLINES AROUND THE WORLD</h4>
                    </div>
                    <div className="airlnscpt2 right">
                        <input type="text" placeholder='Search airline or keywords here...'/>
                        <div className="airlnscpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="airlinesContainerPage mid">
                <div className="airlinesContentPage mid1">
                    <Link to='/Airlines/America'>
                        <img src={require('../assets/imgs/Airlines/AmericanAirlines.png')} alt="" />
                        <div>
                            <h6>AMERICAN AIRLINES</h6>
                        </div>
                    </Link>
                    <Link to='/Airlines/Europe'>
                        <img src={require('../assets/imgs/Airlines/EuropeanAirlines.png')} alt="" />
                        <div>
                            <h6>EUROPEAN AIRLINES</h6>
                        </div>
                    </Link>
                    <Link to='/Airlines/Africa'>
                        <img src={require('../assets/imgs/Airlines/AfricanAirlines.png')} alt="" />
                        <div>
                            <h6>AFRICAN AIRLINES</h6>
                        </div>
                    </Link>
                    <Link to='/Airlines/Asia'>
                        <img src={require('../assets/imgs/Airlines/AsianAirlines.png')} alt="" />
                        <div>
                            <h6>ASIAN AIRLINES</h6>
                        </div>
                    </Link>
                    <Link to='/Airlines/Oceania'>
                        <img src={require('../assets/imgs/Airlines/OceanianAirlines.png')} alt="" />
                        <div>
                            <h6>OCEANIAN AIRLINES</h6>
                        </div>
                    </Link>
                    <Link to='/Airlines/Antarctica'>
                        <img src={require('../assets/imgs/Airlines/AntarticaAirlines.png')} alt="" />
                        <div>
                            <h6>ANTARCTICAN AIRLINES</h6>
                        </div>
                    </Link>
                </div>
                <div className="airlinesContentPage mid2">
                    <div className="airlnscpm2Header">
                        <h5>RECOMMENDED AIRLINES</h5>
                        <Link><h6>VIEW ALL AIRLINES</h6></Link>
                    </div>
                    <div className="airlnscpm2Content1">
                        <Link className="airlnscpm2c1">
                            <div className='airlnscpm2c1Img'>
                                <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                            </div>
                            <div className='airlnscpm2c1Content'>
                                <h5>TITLE AIRLINE</h5>
                                <p>This is a description of the country's airline</p>
                            </div>
                        </Link>
                        <Link className="airlnscpm2c1">
                            <div className='airlnscpm2c1Img'>
                                <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                            </div>
                            <div className='airlnscpm2c1Content'>
                                <h5>TITLE AIRLINE</h5>
                                <p>This is a description of the country's airline</p>
                            </div>
                        </Link>
                        <Link className="airlnscpm2c1">
                            <div className='airlnscpm2c1Img'>
                                <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                            </div>
                            <div className='airlnscpm2c1Content'>
                                <h5>TITLE AIRLINE</h5>
                                <p>This is a description of the country's airline</p>
                            </div>
                        </Link>
                        <Link className="airlnscpm2c1">
                            <div className='airlnscpm2c1Img'>
                                <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                            </div>
                            <div className='airlnscpm2c1Content'>
                                <h5>TITLE AIRLINE</h5>
                                <p>This is a description of the country's airline</p>
                            </div>
                        </Link>
                    </div>
                    <div className="airlnscpm2Header">
                        <h5>DISCOVER MORE ABOUT - <span>PHILIPPINES</span></h5>
                        <Link><h6>VIEW ALL ABOUT PHILIPPINES</h6></Link>
                    </div>
                    <div className="airlnscpm2Content2">
                        <Link className="airlnscpm2c2">
                            <h6>TOP TOURIST DESTINATIONS IN PHILIPPINES</h6>
                            <p>Showcasing must-visit places, landmarks, tourist attractions, and hidden gems across the country, encouraging exploration and travel.</p>
                        </Link>
                        <Link className="airlnscpm2c2">
                            <h6>BREAKING NEWS IN PHILIPPINES</h6>
                            <p>Urgent News Updates on the Latest Events Unfolding Across the Country, Covering Breaking Stories, Key Developments, and Real-Time Updates.</p>
                        </Link>
                        <Link className="airlnscpm2c2">
                            <h6>SPORTS IN PHILIPPINES</h6>
                            <p>Description of sports culture, popular sports, famous athletes, and significant sporting events in the country.</p>
                        </Link>
                    </div>
                </div>
            </section>




        </div>
    )
}

export default Airlines