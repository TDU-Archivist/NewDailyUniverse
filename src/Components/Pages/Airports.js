import React, { useEffect, useState } from 'react'
import "../CSS/airports.css";
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

const Airports = () => {
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
        <div className='mainContainer airports'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="airportsContainerPage top">
                {/* <div className="airportsContentPage top1">
                    <video autoPlay muted loop>
                        <source src={videoBanner} type="video/mp4" />
                    </video>
                </div> */}
                <div className="airportsContentPage top2">
                    <div className="airprtscpt2 left">
                        <h3>AIRPORTS</h3>
                        <h5>AIRPORTS AROUND THE WORLD - IATA CODES</h5>
                    </div>
                    <div className="airprtscpt2 right">
                        <input type="text" placeholder='Search country, airports or keywords here...'/>
                        <div className="airprtscpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div><hr />
                <div className="airportsContentPage top3">
                    <p>List of busiest airports and biggest airlines with scheduled flights. Below you will find the list of IATA airport codes, number of airlines and destinations in every airports. Wondering where to travel? You can visit the top tourist spots from the most visited countries in the world. Most of the travelers visited these amazing countries: France, Spain, USA, China, Italy, Turkey, Mexico, Thailand, Germany and United Kingdom.</p>
                </div>
            </section>
            <section className="airportsContainerPage mid">
                <div className="airportsContentPage mid1">
                    <Link className="airprtscpm2c1">
                        <div className='airprtscpm2c1Img'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/1920px-Flag_of_the_Philippines.svg.png' alt="" />
                        </div>
                        <div className='airprtscpm2c1Content'>
                            <h5>PHILIPPINE AIRPORTS</h5>
                            <p>5 Listed Airports</p>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Airports