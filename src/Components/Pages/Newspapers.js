import React, { useEffect, useState } from 'react'
import "../CSS/newspapers.css";
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

const Newspapers = () => {
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
        <div className='mainContainer newspapers'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>
            
            <section className="newspapersContainerPage top">
                <div className="newspapersContentPage top1">
                    <img src={require('../assets/imgs/NewspaperBG.png')} alt="" />
                </div>
                <div className="newspapersContentPage top2">
                    <div className="nwspprcpt2 left">
                        <h4>NEWSPAPERS AROUND THE WORLD BY CATEGORY</h4>
                        <p>Stay Informed in traditional reading like before, checkout everyday's edition here.</p>
                    </div>
                    <div className="nwspprcpt2 right">
                        <input type="text" placeholder='Search keyword, article or topic here...'/>
                        <div className="nwspprcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="newspapersContainerPage mid">
              <div className="newspapersContentPage mid1">
                <Link className="nwspprcm1">
                  <div className='nwspprcpm1Img'>
                    <img src={require('../assets/imgs/Newspaper/00.AltNewspaper.png')} alt="" />
                  </div>
                  <div className='nwspprcm1Content'>
                    <h5>ALTERNATIVE NEWSPAPER</h5>
                    <p>Find the most interesting issues, hot topics and breakings news. Read the the latest daily news from the list of Alternative Newspapers around the world!</p>
                  </div>
                </Link>
                <Link className="nwspprcm1">
                  <div className='nwspprcpm1Img'>
                    <img src={require('../assets/imgs/Newspaper/00.CollegeNewspaper.png')} alt="" />
                  </div>
                  <div className='nwspprcm1Content'>
                    <h5>COLLEGE NEWSPAPER</h5>
                    <p>The list of student newspapers (College Newspapers and University Newspapers) from the best colleges and universities around the world.</p>
                  </div>
                </Link>
                <Link className="nwspprcm1">
                  <div className='nwspprcpm1Img'>
                    <img src={require('../assets/imgs/Newspaper/00.LocalNewspaper.png')} alt="" />
                  </div>
                  <div className='nwspprcm1Content'>
                    <h5>LOCAL COUNTRY NEWSPAPER</h5>
                    <p>Get the latest news today! Find thousands of online newspapers from around the world. All newspapers are carefully sorted by region, country, and state.</p>
                  </div>
                </Link>
                <Link className="nwspprcm1">
                  <div className='nwspprcpm1Img'>
                    <img src={require('../assets/imgs/Newspaper/00.WorldNewspaper.png')} alt="" />
                  </div>
                  <div className='nwspprcm1Content'>
                    <h5>WORLD NEWSPAPER</h5>
                    <p>Check the list of real-time news from World Newspapers Online. We cover news on politics, society, culture, sport, travel, and more. Learn more.</p>
                  </div>
                </Link>
              </div>
            </section>



            
        </div>
    )
}

export default Newspapers