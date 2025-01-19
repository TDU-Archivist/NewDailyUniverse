import React, { useEffect, useState } from 'react'
import "../CSS/restaurants.css";
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

const Restaurants = () => {
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
        <div className='mainContainer restaurants'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                    <p>LOADING UPDATES...</p>
                </div>
            </div>


            <section className="restaurantsContainerPage top">
              <div className="restaurantsContentPage top1">
                <img src={require('../assets/imgs/RestaurantsBG.png')} alt="" />
              </div>
              <div className="restaurantsContentPage top2">
                <div className="rstrntscpt2 left">
                  <h4>RESTAURANTS AROUND THE WORLD BY CATEGORY</h4>
                  <p>The must visit restaurants and recommended food and drinks around the world.</p>
                </div>
                <div className="rstrntscpt2 right">
                  <input type="text" placeholder='Search keyword, article or topic here...'/>
                  <div className="rstrntscpt2rBtn">
                    <button><FaSearch className='faIcons'/></button>
                    <button><FaMicrophone className='faIcons'/></button>
                  </div>
                </div>
              </div>
            </section>
            <section className="restaurantsContainerPage mid">
                <div className="restaurantsContentPage mid1">
                    <Link className="rstrntscm1">
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/expensive-restaurants.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>MOST EXPENSIVE RESTAURANTS</h5>
                            <p>What is most expensive food in the world? Find the list of Expensive Restaurants in the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                    <Link className="rstrntscm1">
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/famous-restaurants.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>MOST FAMOUS RESTAURANTS</h5>
                            <p>Find the list of Famous Restaurants in the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                    <Link className="rstrntscm1">
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/oldest-restaurants.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>OLDEST RESTAURANTS</h5>
                            <p>Find the list of Oldest Restaurants in the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                    <Link className="rstrntscm1">
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/unique-restaurant.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>UNIQUE RESTAURANTS</h5>
                            <p>Find the list of Most Unique Restaurants around the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                </div>
            </section>


        </div>
    )
}

export default Restaurants