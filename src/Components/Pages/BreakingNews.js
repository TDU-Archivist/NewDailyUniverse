import React, { useEffect, useState } from 'react'
import "../CSS/breakingNews.css";
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



const BreakingNews = () => {
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
    const thumbnailProxy = process.env.REACT_APP_THUMBNAIL_PROXY;
    const defaultImage = require("../assets/imgs/BreakingNewsBG04.png"); // Default fallback image
    const [thumbnails, setThumbnails] = useState({}); // Store fetched thumbnails

    useEffect(() => {
        const fetchThumbnails = async () => {
            const newThumbnails = {};
    
            await Promise.all(
                data?.news?.map(async (details) => {
                    try {
                        const response = await axios.get(
                            `${thumbnailProxy}?url=${encodeURIComponent(details?.url)}`
                        );
    
                        // If the response contains a valid image, use it
                        if (response.data.image) {
                            newThumbnails[details?.url] = response.data.image;
                        } else {
                            // If the response fails, use details?.thumbnail
                            newThumbnails[details?.url] = details?.thumbnail;
                        }
                    } catch (error) {
                        // If API fails, use details?.thumbnail (or defaultImage if it's also missing)
                        newThumbnails[details?.url] = details?.thumbnail;
                    }
                })
            );
    
            setThumbnails(newThumbnails);
        };
    
        if (data?.news?.length) {
            fetchThumbnails();
        }
    }, [data]);



    return (
        <div className='mainContainer breakingNews'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="breakinNewsContainerPage top">
                <div className="breakinNewsContentPage top1">
                    <h3>BREAKING NEWS</h3>
                    <h5>LATEST NEWS AROUND THE WORLD</h5>
                </div>
                <hr />
            </section>
            <section className="breakinNewsContainerPage mid">
                <div className="breakinNewsContentPage title">
                    <h4>HIGHLIGHT TOPICS</h4>
                </div>
                <div className="breakinNewsContentPage mid1">
                    <div className="brknwscpm1 left">
                        {data?.news?.slice(0, 1).map((details, i) => (
                            <a key={i} href={details?.url} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={thumbnails[details?.url] || details?.thumbnail}
                                    alt={details?.title}
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop
                                        e.target.src = details?.thumbnail; // Use `details?.thumbnail` as fallback, then `defaultImage`
                                    }}
                                />
                                <div>
                                    <h6>{details?.title}</h6>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="brknwscpm1 right">
                        {data?.news?.slice(1, 5).map((details, i) => (
                            <a key={i} href={details?.url} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={thumbnails[details?.url] || details?.thumbnail}
                                    alt=''
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop
                                        e.target.src = details?.thumbnail; // Use `details?.thumbnail` as fallback, then `defaultImage`
                                    }}
                                />
                                <div>
                                    <h6>{details?.title}</h6>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="breakinNewsContentPage title">
                    <h4>RECENT TOPICS</h4>
                </div>
                <div className="breakinNewsContentPage mid2">
                    {data?.news?.slice(5, 25).map((details, i) => (
                        <a key={i} href={details?.url} target="_blank" rel="noopener noreferrer">
                            <div className='brknwscpm2Img'>
                                <img
                                    src={thumbnails[details?.url] || details?.thumbnail}
                                    alt=''
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop
                                        e.target.src = details?.thumbnail; // Use `details?.thumbnail` as fallback, then `defaultImage`
                                    }}
                                />
                            </div>
                            <div className='brknwscpm2Dets'>
                                <h6>{details?.title}</h6>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BreakingNews