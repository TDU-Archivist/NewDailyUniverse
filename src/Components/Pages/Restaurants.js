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
        dataList
    } = MainDataLoad(); 

    const webLogoProxy = process.env.REACT_APP_WEBLOGO_PROXY;
    const [thumbnails, setThumbnails] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
        
    const filteredRestaurants = dataList?.viewAllRestaurants?.filter((restaurant) =>
      restaurant.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.restaurant_category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    useEffect(() => {
      const fetchThumbnails = async () => {
          const newThumbnails = {};
  
          await Promise.all(
            filteredRestaurants?.map(async (details) => {
                  try {
                      const response = await axios.get(
                          `${webLogoProxy}?url=${encodeURIComponent(details?.restaurant_website)}`
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
  
      if (filteredRestaurants?.length) {
        fetchThumbnails();
      }
    }, [filteredRestaurants]);




    return (
        <div className='mainContainer restaurants'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                    <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                    <p>LOADING UPDATES...</p>
                </div>
            </div>


            <section className="restaurantsContainerPage top">
              {/* <div className="restaurantsContentPage top1">
                <img src={require('../assets/imgs/RestaurantsBG.png')} alt="" />
              </div> */}
              <div className="restaurantsContentPage top2">
                <div className="rstrntscpt2 left">
                  <h3>RESTAURANTS</h3>
                  <h5>RESTAURANTS AROUND THE WORLD BY CATEGORY</h5>
                  {/* <p>The must visit restaurants and recommended food and drinks around the world.</p> */}
                </div>
                <div className="rstrntscpt2 right">
                  <input type="text" placeholder='Search keyword, article or topic here...'  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  <div className="rstrntscpt2rBtn">
                    <button><FaSearch className='faIcons'/></button>
                    <button><FaMicrophone className='faIcons'/></button>
                  </div>
                </div>
              </div><hr />
            </section>
            <section className="restaurantsContainerPage mid">
                {(searchTerm && filteredRestaurants.length > 0) ? <>
                  <div className="restaurantCatContentPage mid1">
                    {filteredRestaurants?.map((details, i) => (
                        <a key={i} href={details?.restaurant_website} target="_blank" rel="noopener noreferrer">
                            <div className='rstrntctcpm2Img'>
                                <img src={details?.country ? `https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png` : require('../assets/imgs/TDULandingBG.png')} alt="" id="rstrntctcpm2iFlag" />
                                <img src={thumbnails[details?.restaurant_website]} alt='' id='rstrntctcpm2iLogo' />
                            </div>
                            <div className='rstrntctccpm2Dets'>
                                <h6>{details?.restaurant_name}</h6>
                                <p>{details?.restaurant_description}</p>
                            </div>
                        </a>
                    ))}
                  </div>
                </>:<>
                  <div className="restaurantsContentPage mid1">
                    <Link className="rstrntscm1" to='/Restaurants/ExpensiveRestaurants'>
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/expensive-restaurants.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>MOST EXPENSIVE RESTAURANTS</h5>
                            <p>What is most expensive food in the world? Find the list of Expensive Restaurants in the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                    <Link className="rstrntscm1" to='/Restaurants/FamousRestaurants'>
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/famous-restaurants.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>MOST FAMOUS RESTAURANTS</h5>
                            <p>Find the list of Famous Restaurants in the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                    <Link className="rstrntscm1" to='/Restaurants/OldestRestaurants'>
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/oldest-restaurants.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>OLDEST RESTAURANTS</h5>
                            <p>Find the list of Oldest Restaurants in the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                    <Link className="rstrntscm1" to='/Restaurants/UniqueRestaurants'>
                        <div className='rstrntscm1Img'>
                            <img src={require('../assets/imgs/Restaurants/unique-restaurant.jpg')} alt="" />
                        </div>
                        <div className='rstrntscm1Content'>
                            <h5>UNIQUE RESTAURANTS</h5>
                            <p>Find the list of Most Unique Restaurants around the World. Traveling soon? Try and taste the best food in these restaurants.</p>
                        </div>
                    </Link>
                  </div>
                </>}
            </section>


        </div>
    )
}

export default Restaurants