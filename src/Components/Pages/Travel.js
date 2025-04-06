import React, { useEffect, useState } from 'react'
import "../CSS/travel.css";
import { useParams } from "react-router-dom";
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
const Travel = () => {
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
        dataList,
    } = MainDataLoad(); 



    return (
        <div className='mainContainer travel'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="travelContainerPage top">
                <div className="travelContentPage top2">
                    <div className="trvlcpt2 left">
                        <h3>TRAVEL DESTINATIONS</h3>
                        <h5>FAMOUS TRAVEL DESTINATIONS AROUND THE WORLD</h5>
                    </div>
                    <div className="trvlcpt2 right">
                        <input type="text" placeholder='Search destinations or keywords here...'/>
                        <div className="trvlcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
            <section className="travelContainerPage mid">
                <div className="travelContentPage mid1">
                    <Link className="trvlcm1" to='/Travel/Continent/NorthAmerica'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/NAmericaTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL N.AMERICA DESTINATIONS</h5>
                            <p>Famous travel destinations across North America.</p>
                        </div>
                    </Link>
                    <Link className="trvlcm1" to='/Travel/Continent/SouthAmerica'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/SAmericaTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL S.AMERICA DESTINATIONS</h5>
                            <p>Famous travel destinations across South America.</p>
                        </div>
                    </Link>
                    <Link className="trvlcm1" to='/Travel/Continent/Europe'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/EuropeTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL EUROPE DESTINATIONS</h5>
                            <p>Famous travel destinations across Europe.</p>
                        </div>
                    </Link>
                    <Link className="trvlcm1" to='/Travel/Continent/Africa'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/AfricaTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL AFRICA DESTINATIONS</h5>
                            <p>Famous travel destinations across Africa.</p>
                        </div>
                    </Link>
                    <Link className="trvlcm1" to='/Travel/Continent/Asia'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/AsiaTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL ASIA DESTINATIONS</h5>
                            <p>Famous travel destinations across Asia.</p>
                        </div>
                    </Link>
                    <Link className="trvlcm1" to='/Travel/Continent/Oceania'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/OceaniaTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL OCEANIA DESTINATIONS</h5>
                            <p>Famous travel destinations across Oceania.</p>
                        </div>
                    </Link>
                    <Link className="trvlcm1" to='/Travel/Continent/Antarctica'>
                        <div className='trvlcm1Img'>
                            <img src={require('../assets/imgs/Travel/AntarcticaTravel.png')} alt="" />
                        </div>
                        <div className='trvlcm1Content'>
                            <h5>ALL ANTARCTICA DESTINATIONS</h5>
                            <p>Famous travel destinations across Antarctica.</p>
                        </div>
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default Travel