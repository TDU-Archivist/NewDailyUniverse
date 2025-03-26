import React, { useEffect, useState } from 'react'
import "../CSS/restaurants.css";
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

const RestaurantCategory = () => {
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

    const webLogoProxy = process.env.REACT_APP_WEBLOGO_PROXY;
    const { restaurantCategory } = useParams();
    const [restaurant, setRestaurant] = useState('');
    const [thumbnails, setThumbnails] = useState({}); // Store fetched thumbnails

    useEffect(() => {
        if (restaurantCategory === 'ExpensiveRestaurants'){
            setRestaurant('Expensive Res');
        } else if (restaurantCategory === 'FamousRestaurants'){
            setRestaurant('Famous Res');
        } else if (restaurantCategory === 'OldestRestaurants'){
            setRestaurant('Classic Res');
        } else if (restaurantCategory === 'UniqueRestaurants'){
            setRestaurant('Unique Res');
        } else {
            setRestaurant('')
        }
    }, [setRestaurant]);

    const currentRestaurants = dataList?.viewAllRestaurants.filter(category => category.restaurant_category === restaurant) || [];
    useEffect(() => {
        const fetchThumbnails = async () => {
            const newThumbnails = {};
    
            await Promise.all(
                currentRestaurants?.map(async (details) => {
                  try {
                      const response = await axios.get(
                          `${webLogoProxy}?url=${encodeURIComponent(details?.newspaper_website)}`
                      );
    
                      // Ensure the response is valid
                      if (response.data.image && response.data.image !== "No image found") {
                          newThumbnails[details?.restaurant_website] = response.data.image;
                      } else {
                          // newThumbnails[details?.magazine_website] = defaultImage;
                      }
                  } catch (error) {
                      // Don't fetch the image if there's an error
                      // newThumbnails[details?.magazine_website] = defaultImage;
                  }
              })
            );
    
            setThumbnails(newThumbnails);
        };
    
        if (currentRestaurants?.length) {
            fetchThumbnails();
        }
    }, [currentRestaurants]);
    


    return (
        <div className='mainContainer restaurantCategory'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                    <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="restaurantCatContainerPage top">
                <div className="restaurantCatContentPage top2">
                    <div className="rstrntcatntcpt2 left">
                        <Link to='/Restaurants'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4><span>{restaurant}TAURANTS</span> AROUND THE WORLD</h4>
                    </div>
                    <div className="rstrntcatntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or airline name here...'/>
                        <div className="rstrntcatntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="restaurantCatContainerPage mid">
                <div className="restaurantCatContentPage mid1">
                    {currentRestaurants.length ? <>
                        {currentRestaurants?.map((details, i) => (
                            <a key={i} href={details?.restaurant_website} target="_blank" rel="noopener noreferrer">
                                <div className='rstrntctcpm2Img'>
                                    <img src={thumbnails[details?.restaurant_website]} alt='' />
                                </div>
                                <div className='rstrntctccpm2Dets'>
                                    <h6>{details?.restaurant_name}</h6>
                                    <p>{details?.restaurant_description}</p>
                                </div>
                            </a>
                        ))}
                    </>:<>
                        <div className="rstrntctccpm2Empty">
                            <span>
                                <p>No {restaurant}taurants listed yet.</p>
                            </span>
                        </div>
                    </>}
                </div>
            </section>


        </div>
    )
}

export default RestaurantCategory