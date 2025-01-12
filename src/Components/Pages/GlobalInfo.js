import React, { useEffect, useState } from 'react'
import "../CSS/globalInfo.css";
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

const GlobalInfo = () => {
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
        <div className='mainContainer globalInfo'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>


            <section className="globalInfoContainerPage top">
                <div className="globalInfoContentPage top1">
                    <img src={require('../assets/imgs/GlobalInfoBG.png')} alt="" />
                </div>
                <div className="globalInfoContentPage top2">
                    <div className="glbinfocpt2 left">
                        <h4>EARTH'S CURRENT STATE AND INFORMATION</h4>
                    </div>
                    <div className="glbinfocpt2 right">
                        <input type="text" placeholder='Search keyword, article or topic here...'/>
                        <div className="glbinfocpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="globalInfoContainerPage mid">
                <div className="globalInfoContentPage mid1">
                    <a className="glbinfocpm2c1" target='blank' href='https://aqicn.org/map/world'>
                        <div className='glbinfocpm2c1Img'>
                            <img src={require('../assets/imgs/GlobalInfo/airPolution.png')} alt="" />
                        </div>
                        <div className='glbinfocpm2c1Content'>
                            <h5>AIR POLLUTION</h5>
                            <p>Air pollution is the presence of harmful substances in the air, caused by sources like industry, transportation, and natural events.</p>
                        </div>
                    </a>
                    <a className="glbinfocpm2c1" target='blank' href='https://moonphases.co.uk/'>
                        <div className='glbinfocpm2c1Img'>
                            <img src={require('../assets/imgs/GlobalInfo/moonPhases.png')} alt="" />
                        </div>
                        <div className='glbinfocpm2c1Content'>
                            <h5>MOON PHASES</h5>
                            <p>The Moon's phases refer to the different appearances of the Moon as seen from Earth during its orbit around our planet.</p>
                        </div>
                    </a>
                    <a className="glbinfocpm2c1" target='blank' href='https://www.suncalc.org/'>
                        <div className='glbinfocpm2c1Img'>
                            <img src={require('../assets/imgs/GlobalInfo/sunsetSunrise.png')} alt="" />
                        </div>
                        <div className='glbinfocpm2c1Content'>
                            <h5>SUNSET/SUNRISE</h5>
                            <p>Sunset and sunrise are the times of day when the sun appears to rise above the horizon in the morning or sink below the horizon in the evening.</p>
                        </div>
                    </a>
                    <a className="glbinfocpm2c1" target='blank' href='https://www.suncalc.org/'>
                        <div className='glbinfocpm2c1Img'>
                            <img src={require('../assets/imgs/GlobalInfo/worldCalendar.png')} alt="" />
                        </div>
                        <div className='glbinfocpm2c1Content'>
                            <h5>WORLD CALENDAR</h5>
                            <p>The World Calendar is a proposed reform of the Gregorian calendar, which is the calendar system currently used by most of the world.</p>
                        </div>
                    </a>
                    <a className="glbinfocpm2c1" target='blank' href='https://weather.com/'>
                        <div className='glbinfocpm2c1Img'>
                            <img src={require('../assets/imgs/GlobalInfo/worldWeather.png')} alt="" />
                        </div>
                        <div className='glbinfocpm2c1Content'>
                            <h5>WORLD WEATHER</h5>
                            <p>World weather content provides information about the current and forecasted weather conditions in different regions and countries around the world.</p>
                        </div>
                    </a>
                    <a className="glbinfocpm2c1" target='blank' href='https://www.earthcam.com/'>
                        <div className='glbinfocpm2c1Img'>
                            <img src={require('../assets/imgs/GlobalInfo/worldCam.png')} alt="" />
                        </div>
                        <div className='glbinfocpm2c1Content'>
                            <h5>WORLD CAM</h5>
                            <p>The goal of world cam content is to provide viewers with a glimpse into different parts of the world and to promote understanding and appreciation for global diversity.</p>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    )
}

export default GlobalInfo