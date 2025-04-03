import React, { useEffect, useState } from 'react'
import "../CSS/sports.css";
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

const Sports = () => {
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
        <div className='mainContainer sports'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                    <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="sportsContainerPage top">
                <div className="sportsContentPage top2">
                    <div className="sprtscpt2 left">
                        <h3>SPORTS</h3>
                        <h5>SPORTS AROUND THE WORLD BY CONTINENTS</h5>
                        {/* <p>The must visit restaurants and recommended food and drinks around the world.</p> */}
                    </div>
                    <div className="sprtscpt2 right">
                        <input type="text" placeholder='Search keyword, article or topic here...'/>
                        <div className="sprtscpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div><hr />
            </section>
            <section className="sportsContainerPage mid">
                <div className="sportsContentPage mid1">
                    <Link className="sprtscm1" to='/Sports/Continent/NorthAmerica'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/NAmericaSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL N.AMERICA SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across North America.</p>
                        </div>
                    </Link>
                    <Link className="sprtscm1" to='/Sports/Continent/SouthAmerica'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/SAmericaSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL S.AMERICA SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across South America.</p>
                        </div>
                    </Link>
                    <Link className="sprtscm1" to='/Sports/Continent/Europe'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/EuropeSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL EUROPE SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across Europe.</p>
                        </div>
                    </Link>
                    <Link className="sprtscm1" to='/Sports/Continent/Africa'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/AfricaSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL AFRICA SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across Africa.</p>
                        </div>
                    </Link>
                    <Link className="sprtscm1" to='/Sports/Continent/Asia'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/AsiaSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL ASIA SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across Asia.</p>
                        </div>
                    </Link>
                    <Link className="sprtscm1" to='/Sports/Continent/Oceania'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/OceaniaSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL OCEANIA SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across Oceania.</p>
                        </div>
                    </Link>
                    <Link className="sprtscm1" to='/Sports/Continent/Antarctica'>
                        <div className='sprtscm1Img'>
                            <img src={require('../assets/imgs/Sports/AntarcticaSports.png')} alt="" />
                        </div>
                        <div className='sprtscm1Content'>
                            <h5>ALL ANTARCTICA SPORTS TEAM</h5>
                            <p>Recognizing the most famous sports teams across Antarctica.</p>
                        </div>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default Sports