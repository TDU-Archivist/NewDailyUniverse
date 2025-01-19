import React, { useEffect, useState } from 'react'
import "../CSS/magazine.css";
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
const Magazine = () => {
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
        <div className='mainContainer magazine'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
              <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
              </div>
            </div>

            <section className="magazineContainerPage top">
              <div className="magazineContentPage top1">
                <img src={require('../assets/imgs/MagazinesBG.png')} alt="" />
              </div>
              <div className="magazineContentPage top2">
                <div className="mgzncpt2 left">
                  <h4>MAGAZINES AROUND THE WORLD BY CATEGORY</h4>
                  <p>List of Best Magazines in the World - Major Magazines online by Topic</p>
                </div>
                <div className="mgzncpt2 right">
                  <input type="text" placeholder='Search keyword, article or topic here...'/>
                  <div className="mgzncpt2rBtn">
                    <button><FaSearch className='faIcons'/></button>
                    <button><FaMicrophone className='faIcons'/></button>
                  </div>
                </div>
              </div>
            </section>
            <section className="magazineContainerPage mid">
              <div className="magazineContentPage mid1">
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/artMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>ART MAGAZINES</h5>
                    <p>20 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/boatMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>BOAT MAGAZINES</h5>
                    <p>10 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/businessMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>BUSINESS MAGAZINES</h5>
                    <p>25 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/carMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>CAR MAGAZINES</h5>
                    <p>18 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/childrensMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>CHILDREN MAGAZINES</h5>
                    <p>7 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/computerMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>COMPUTER MAGAZINES</h5>
                    <p>1 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/cookingMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>COOKING MAGAZINES</h5>
                    <p>1 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/cruiseMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>CRUISE MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/educationMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>EDUCATION MAGAZINES</h5>
                    <p>1 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/entertainmentMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>ENTERTAINMENT MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/fashionMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>FASHION MAGAZINES</h5>
                    <p>20 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/financeMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>FINANCE AND MONEY MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/healthMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>HEALTH MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/historyMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>HISTORY MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/homeMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>HOME AND TUTORIAL MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/musicMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>MUSIC MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/petMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>PET MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/photographyMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>PHOTOGRAPHY MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/sportsMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>SPORTS MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
                <Link className="mgzncpm1">
                  <div className='mgzncpm1Img'>
                    <img src={require('../assets/imgs/Magazine/travelMagazines.png')} alt="" />
                  </div>
                  <div className='mgzncpm1Content'>
                    <h5>TRAVEL MAGAZINES</h5>
                    <p>0 Online Sources</p>
                  </div>
                </Link>
              </div>
            </section>

        </div>
    )
}

export default Magazine