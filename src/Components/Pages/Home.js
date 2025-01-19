import React, { useEffect, useState } from 'react'
import "../CSS/home.css";
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

const Home = () => {
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const [countryExchangeRate, setCountryExchangeRate] = useState([])
  const [showImages, setShowImages] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [location, setLocation] = useState('Fetching location...');
  
  useEffect(() => {
    if (countryThreeTouristSpots?.tourist_spots) {
      const initialImageStates = countryThreeTouristSpots.tourist_spots.map(() => false);
      setShowImages(initialImageStates);
      countryThreeTouristSpots.tourist_spots.forEach((_, index) => {
        setTimeout(() => {
          setShowImages(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        }, 1500);
      });
    }
  }, [countryThreeTouristSpots]);
  useEffect(() => {
    if (Array.isArray(exchangeRates) && Array.isArray(countryCurrency) && countryCurrency.length > 0) {
      const pickedCountryCurrency = countryCurrency[0]?.currency;
      const countryDollarExchange = exchangeRates.find(
        country => country.currency === pickedCountryCurrency
      );
  
      // Only set state if the value is different to prevent unnecessary re-renders
      if (countryDollarExchange) {
        setCountryExchangeRate(countryDollarExchange);
      }
    }
  }, [exchangeRates, countryCurrency]);
  // useEffect(() => {
  //   // Get user's location
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;

  //         // Use a simpler geocoding API for city and country only (replace YOUR_API_KEY)
  //         try {
  //           const response = await fetch(
  //             `https://geocode.xyz/${latitude},${longitude}?geoit=json`
  //           );
  //           const data = await response.json();

  //           if (data.city && data.country) {
  //             setLocation(`${data.city}, ${data.country}`);
  //           } else {
  //             setLocation('Location not found');
  //           }
  //         } catch (error) {
  //           setLocation('Error fetching location');
  //         }
  //       },
  //       () => {
  //         setLocation('Unable to retrieve location');
  //       }
  //     );
  //   } else {
  //     setLocation('Geolocation not supported');
  //   }

  //   // Update the currentDateTime every second
  //   const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000);

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);
  // const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   hour12: true,
  // });
  // const formattedDate = currentDateTime.toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  const handleHideCountrySummaryModal = () => {
    setPickedCountry(false);
  }

  const filterGoodNews = viewAllArticles.filter(good => good.article_type === "Good News")
  const filterLatestNews = viewAllArticles.filter(latest => latest.article_type === "Latest News")
  const filterBusinessNews = viewAllArticles.filter(business => business.article_type === "Business News")
  const filterSportsNews = viewAllArticles.filter(sports => sports.article_type === "Sports News")

  const [suggestExploreCountry, setSuggestExploreCountry] = useState([]);


  const handleSwitchFullMap = () => {
    setSwitchFullMap(true)
    setOpenSuggestedMapTopic(false);
    setFullMapPickedCountry(false);
    setClickedCountry(false);
    setPickedCountry('')
  }
  const handleRevertFullMap = () => {
    setSwitchFullMap(false)
    setOpenSuggestedMapTopic(false);
    setFullMapPickedCountry(false);
    setClickedCountry(false);
    setPickedCountry('')
  }



  const [countryList, setCountryList] = useState([]);
  const [searchTermCountry, setSearchTermCountry] = useState("");
  const [suggestionsCountries, setSuggestionsCountries] = useState([]);
  const [suggestionsCountriesSelection, setSuggestionsCountriesSelection] = useState(false);



  const handleOpenSuggestedMapTopic = () => {
    setOpenSuggestedMapTopic(true);
  };
  const handleHideSuggestedMapTopic = () => {
    setOpenSuggestedMapTopic(false);
    setFullMapPickedCountry(false);
    setClickedCountry(false);
    setPickedCountry('');
    setViewCountryCapital('');
  };
  
  const fetchRandomCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const shuffled = data.sort(() => 0.5 - Math.random());
      const randomCountries = shuffled.slice(0, 7).map(country => country.name.common);
      setSuggestExploreCountry(randomCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const fetchSearchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryNames = data.map((country) => country.name.common);
      setCountryList(countryNames);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const fetchWikiContent = async () => {
    const clickedCountry = countryData?.name?.common;
    try {
      if(clickedCountry){
        const wikipediaUrl = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${clickedCountry}`);
        const wikipediaResponse = wikipediaUrl.data;
        setCountryDescription(wikipediaResponse);
      }
      // console.log(wikipediaResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRandomCountries();
    fetchWikiContent();
    fetchSearchCountries();
  }, [countryData]);

  const handleInputSearchCountry = (e) => {
    const value = e.target.value;
    setSearchTermCountry(value);
    setSuggestionsCountriesSelection(true);

    if (value) {
      const filtered = countryList.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestionsCountries(filtered.slice(0, 10)); // Limit suggestions to 10
    } else {
      setSuggestionsCountries([]);
    }
  };
  const handleFullMapPickedCountry = (clickedCountry) => {
    if(clickedCountry) {
      setPickedCountryModal(false);
      setPickedCountry(clickedCountry);
      setOpenSuggestedMapTopic(false);
      setFullMapPickedCountry(false);
      setClickedCountry(clickedCountry);
      
      setViewPickCapital(true)
      const setCapital = viewAllCapitals.find(location => location.country === clickedCountry)
      setViewCountryCapital(setCapital);

      const timeoutId = setTimeout(() => {
          setPickedCountryModal(true);
          setOpenSuggestedMapTopic(true);
          setFullMapPickedCountry(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }
  const handleSuggestionCountry = (suggestion) => {
    setSearchTermCountry(suggestion);
    setSuggestionsCountries([]);
    setSuggestionsCountriesSelection(false);

    setViewPickCapital(true)
    const setCapital = viewAllCapitals.find(location => location.country === suggestion)
    setViewCountryCapital(setCapital);

    if(suggestion) {
      setPickedCountryModal(false);
      setPickedCountry(suggestion);
      setOpenSuggestedMapTopic(false);
      setFullMapPickedCountry(false);
      setClickedCountry(suggestion);
      const timeoutId = setTimeout(() => {
          setPickedCountryModal(true);
          setOpenSuggestedMapTopic(true);
          setFullMapPickedCountry(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  };



  return (
    <div className='mainContainer home'>
      <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
        <div className="loaderContent">
          <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
          <p>LOADING UPDATES...</p>
        </div>
      </div>


      <section className="mainContainerPage top">
        <div className="mainContentPage top1">
          {/* <h3>THE DAILY UNIVERSE</h3> */}
          <div className="mncntntpt1 left">
            <h6>Your Gateway to Global News, Travel Guides, and Visa Information</h6>
            <p>Copyright c 2021 YOUNG TYCOONS INC, ALL RIGHTS RESERVED</p>
          </div>
          <div className="mncntntpt1 right">
            <input type="text" placeholder='Search keyword, article or topic here...'/>
            <div className="mncntntpt1rBtn">
              <button><FaSearch className='faIcons'/></button>
              <button><FaMicrophone className='faIcons'/></button>
            </div>
          </div>
        </div>
        <div className="mainContentPage top2">
          <div className="mncntntpt2 right">
            {(pickedCountryModal && pickedCountry) && 
              <div className={(pickedCountryModal && pickedCountry) ? "mncntntpt2rSelected active" : "mncntntpt2rSelected"}>
                <button id='closeCountry' onClick={handleHideCountrySummaryModal}><FaTimes className='faIcons'/></button>
                <div className="mncntntpt2rsCountryName">
                  <div className='mncntntpt2rscnName'>
                    <h5>{pickedCountry}</h5>
                    <h6>{countryData?.name?.official}</h6>
                  </div>
                  <div className='mncntntpt2rscnFlag'>
                    {(pickedCountry || !countryData?.flags?.png) ?
                      <CountryFlag countryName={`${pickedCountry}`} />:
                      <img src={(countryData?.flags?.png) ? `${countryData?.flags?.png}` : require('../assets/imgs/TDULandingBG.png')} alt="" />
                    }
                  </div>
                </div>
                <div className="mncntntpt2rsSubHeader">
                  <span>
                    <p>Area : <br /><NumberFormatter number={countryData?.area}/> km^2</p>
                  </span>
                  <span>
                    <p>Population : <br /><NumberFormatter number={countryData?.population}/> </p>
                  </span>
                  <span id='mncntntpt2rsCapital'>
                    <p>Capital : <br /><TextSlicer text={`${countryData?.capital ? countryData?.capital[0] : 'None'}`} maxLength={20} /> </p>   
                  </span>
                </div>
                <div className="mncntntpt2rsTourist">
                  <div className="mncntntpt2rstHeader">
                    <h6>RECOMMENDED TOURIST SPOTS</h6>
                    <Link><FaExternalLinkAlt /></Link>
                  </div>
                  <div className="mncntntpt2rst">
                    {countryThreeTouristSpots?.tourist_spots.length > 0 ?
                      <>
                        {countryThreeTouristSpots?.tourist_spots.map((data, i) => (
                          <a className="mncntntpt2rstContent" key={i}>
                            {showImages[i] ? (
                              data.image ? (
                                <>
                                  <p>{data.name}</p>
                                  <img src={data.image} alt={data.name} />
                                </>
                              ) : (
                                <img src={require('../assets/imgs/TDULandingBG.png')} alt="Default" />
                              )
                            ) : (
                              <img src={require('../assets/imgs/TDULandingBG.png')} alt="Loading..." />
                            )}
                          </a>
                        ))}
                      </>:<>
                        <a className="mncntntpt2rstContent">
                          <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                        </a>
                        <a className="mncntntpt2rstContent">
                          <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                        </a>
                        <a className="mncntntpt2rstContent">
                          <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                        </a>
                      </>
                    }
                  </div>
                </div>
                <div className="mncntntpt2rsExchange">
                  <h6>US DOLLAR EXCHANGE</h6>
                  <h6>{(countryExchangeRate.value) ? `${countryExchangeRate.value} ${countryCurrency[0]?.currency}` : 0}</h6>
                </div>
              </div>
            }
            <MapboxMap />
          </div>
        </div>
      </section>
      <section className="mainContainerPage mid">
        
        <div className="mainContentPage mid4">
          <div className="mncntntpm4More">
            <h4>THE DAILY UNIVERSE - WORLD NEWS</h4>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm4Container">
            {filterLatestNews.slice(0, 4).map((details, i) => (
              <Link className="mncntntpm4Content" key={i} to={`/News/${details?.article_canonical}`}>
                <div>
                  <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                </div>
                <h5>{details?.article_title}</h5>
                <p>{details?.article_subtitle}</p>
              </Link>
            ))}
          </div>
          <div className="mncntntpm4More">
            <h5>BREAKING NEWS</h5>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm4 external">
            {data?.news.slice(1, 6).map((details, i) => (
              <a className='mncntntpm4ext' key={i} href={details?.data?.url} target='blank'>
                <img src={details?.data?.thumbnail ? details?.data?.thumbnail : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                <div className="mncntntpm4extTitle">
                  <p><TextSlicer text={`${details?.data?.title ? details?.data?.title : 'None'}`} maxLength={75} /></p>
                </div>
              </a>
            ))}
          </div>
          <div className="mncntntpm4Slider">
            <div className="mncntntpm4s left">
              <div className="mncntntpm4slViewMore">
                <h4>LIVE NEWS CHANNELS</h4>
                <Link to='/NewsChannels'><h6>VIEW MORE</h6></Link>
              </div>
              <div className="mncntntpm4slHeader">
                <img src={require('../assets/imgs/LiveChannelsBG.png')} alt="" />
              </div>
              <div className="mncntntpm4slBody">
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/CNN.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/CBSNews.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/MSNBC.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/FOXNews.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
              </div>
            </div>
            <div className="mncntntpm4s right">

            </div>
          </div>
        </div>
        <div className="mainContentPage mid5">
          <div className="mncntntpm5More">
            <h4>US DOLLAR EXCHANGE RATE</h4>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm5Container">
            <ExchangeRateMarquee exchangeRate={exchangeRates} />
          </div>
        </div>
        <div className="mainContentPage mid6">
          <div className="mncntntpm6Container">
            <div className="mncntntpm6cHeader">
              <h4>FINANCE</h4>
              <Link><h6><FaArrowRight className='faIcons'/></h6></Link>
            </div>
            <div className="mncntntpm6cContent">
              {filterBusinessNews.slice(0, 2).map((details, i) => (
                <Link className="mncntntpm6ccArticle" key={i} to={`/News/${details?.article_canonical}`}>
                  <div>
                    <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                  </div>
                  <h5>{details?.article_title}</h5>
                  <p>{details?.article_subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mncntntpm6Container">
            <div className="mncntntpm6cHeader">
              <h4>SPORTS</h4>
              <Link><h6><FaArrowRight className='faIcons'/></h6></Link>
            </div>
            <div className="mncntntpm6cContent">
              {filterSportsNews.slice(0, 2).map((details, i) => (
                <Link className="mncntntpm6ccArticle" key={i} to={`/News/${details?.article_canonical}`}>
                  <div>
                    <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                  </div>
                  <h5>{details?.article_title}</h5>
                  <p>{details?.article_subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mainContentPage mid1">
          <h4>THE DAILY UNIVERSE - GOOD NEWS</h4>
          <div className='maincpm1'>
            {filterGoodNews.slice(0, 4).map((details, i) => (
              <Link className="mncntntpm1" key={i} to={`/News/${details?.article_canonical}`}>
                <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                <div className="mncntntpm1Title">
                  <h6><TextSlicer text={`${details?.article_title ? details?.article_title : 'None'}`} maxLength={70} /></h6>
                  <p><TextSlicer text={`${details?.article_subtitle ? details?.article_subtitle : 'None'}`} maxLength={100} /></p>
                </div>
              </Link>
            ))}
          </div>
          <h5>LATEST SHOWBIZZ NEWS</h5>
          <div className="maincpm1 ent">
            {data?.entertainment2.slice(1, 6).map((details, i) => (
              <a className="mncntntpm1 ent" key={i} href={details?.data?.url} target='blank'>
                <img src={details?.data?.thumbnail ? details?.data?.thumbnail : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                <div className="mncntntpm1Title">
                  <p><TextSlicer text={`${details?.data?.title ? details?.data?.title : 'None'}`} maxLength={100} /></p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="mainContentPage mid2">
          <div className="mncntntpm2 left">
            <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
            <p>Photo/Image by: Photographer</p>
          </div>
          <div className="mncntntpm2 right">
            <div className="mncntntpm2Author">
              <h6>REVIEW BY. JOHN DOE</h6>
              <p>November 2, 2024</p>
            </div>
            <div className="mncntntpm2Title">
              <h3>THIS WAS A MOVIE REVIEW ABOUT A TRENDING MOVIE</h3>
            </div>
            <div className="mncntntpm2SubTitle">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maiores laborum quidem aspernatur nostrum officia velit quo culpa, assumenda repellendus accusamus labore aperiam nemo illo laudantium earum, tempore dicta fuga!</p>
            </div>
            <div className="mncntntpm2More">
              <Link><h6>VIEW MORE REVIEWS</h6></Link>
            </div>
          </div>
        </div>
        <div className="mainContentPage mid3">
          <div className="mncntntpm3AdContainer">
            <h5>LET'S PLACE ANY TEXT OR GIF ADS HERE</h5>
          </div>
        </div>
        {/* <div className="mainContentPage mid4">
          <div className="mncntntpm4Slider">
            <div className="mncntntpm4s left">
              <div className="mncntntpm4slViewMore">
                <h4>LIVE NEWS CHANNELS</h4>
                <Link to='/NewsChannels'><h6>VIEW MORE</h6></Link>
              </div>
              <div className="mncntntpm4slHeader">
                <img src={require('../assets/imgs/LiveChannelsBG.png')} alt="" />
              </div>
              <div className="mncntntpm4slBody">
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/CNN.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/CBSNews.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/MSNBC.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
                <a href="" target='blank'>
                  <img src={require('../assets/imgs/Logos/FOXNews.png')} alt="" />
                  <span><h5><FaPlayCircle /></h5></span>
                </a>
              </div>
            </div>
            <div className="mncntntpm4s right">

            </div>
          </div>
          <div className="mncntntpm4More">
            <h4>THE DAILY UNIVERSE - WORLD NEWS</h4>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm4Container">
            {filterLatestNews.slice(0, 4).map((details, i) => (
              <Link className="mncntntpm4Content" key={i} to={`/News/${details?.article_canonical}`}>
                <div>
                  <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                </div>
                <h5>{details?.article_title}</h5>
                <p>{details?.article_subtitle}</p>
              </Link>
            ))}
          </div>
          <div className="mncntntpm4More">
            <h5>BREAKING NEWS</h5>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm4 external">
            {data?.news.slice(1, 6).map((details, i) => (
              <a className='mncntntpm4ext' key={i} href={details?.data?.url} target='blank'>
                <img src={details?.data?.thumbnail ? details?.data?.thumbnail : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                <div className="mncntntpm4extTitle">
                  <p><TextSlicer text={`${details?.data?.title ? details?.data?.title : 'None'}`} maxLength={75} /></p>
                </div>
              </a>
            ))}
          </div>
        </div> */}
        {/* <div className="mainContentPage mid5">
          <div className="mncntntpm5More">
            <h4>US DOLLAR EXCHANGE RATE</h4>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm5Container">
            <ExchangeRateMarquee exchangeRate={exchangeRates} />
          </div>
        </div> */}
        {/* <div className="mainContentPage mid6">
          <div className="mncntntpm6Container">
            <div className="mncntntpm6cHeader">
              <h4>FINANCE</h4>
              <Link><h6><FaArrowRight className='faIcons'/></h6></Link>
            </div>
            <div className="mncntntpm6cContent">
              {filterBusinessNews.slice(0, 2).map((details, i) => (
                <Link className="mncntntpm6ccArticle" key={i} to={`/News/${details?.article_canonical}`}>
                  <div>
                    <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                  </div>
                  <h5>{details?.article_title}</h5>
                  <p>{details?.article_subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mncntntpm6Container">
            <div className="mncntntpm6cHeader">
              <h4>SPORTS</h4>
              <Link><h6><FaArrowRight className='faIcons'/></h6></Link>
            </div>
            <div className="mncntntpm6cContent">
              {filterSportsNews.slice(0, 2).map((details, i) => (
                <Link className="mncntntpm6ccArticle" key={i} to={`/News/${details?.article_canonical}`}>
                  <div>
                    <img src={details?.article_image ? `https://staging.thedailyuniverse.com/ArticleImages/${details?.article_image}` : (require('../assets/imgs/TDULandingBG.png'))} alt="" />
                  </div>
                  <h5>{details?.article_title}</h5>
                  <p>{details?.article_subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div> */}
        <div className="mainContentPage mid7">
          <div className="mncntntpm7Container left">
            <div className="mncntntpm7cHeader">
              <h4>EDITOR'S PARADISE</h4>
            </div>
            <div className="mncntntpm7clContent">
              <img src="" alt="" />
              <div className="mncntntpm7clcTitle">
                <h4>Lorem ipsum dolor sit</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit corporis ab repudiandae voluptas iste! Quae, totam deleniti cumque labore nisi possimus quia doloremque provident nam excepturi perferendis, omnis temporibus.</p>
              </div>
            </div>
          </div>
          <div className="mncntntpm7Container right">
            <div className="mncntntpm7cHeader">
              <h5>MUST CHECK DESTINATIONS</h5>
              <Link><h6>VIEW MORE</h6></Link>
            </div>
            <div className="mncntntpm7crContent">
              <div className='mncntntpm7crc'>
                <div>
                  <img src="" alt="" />
                </div>
                <span>
                  <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad excepturi aliquam nisi libero.</p>
                </span>
              </div>
              <div className='mncntntpm7crc'>
                <div>
                  <img src="" alt="" />
                </div>
                <span>
                  <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad excepturi aliquam nisi libero.</p>
                </span>
              </div>
              <div className='mncntntpm7crc'>
                <div>
                  <img src="" alt="" />
                </div>
                <span>
                  <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad excepturi aliquam nisi libero.</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContentPage mid8">
          <div className="mncntntpm8More">
            <h4>FAMOUS AIRLINES AROUND THE WORLD</h4>
            <Link to='/Airports'><h6>VIEW COUNTRIES AIRPORTS</h6></Link>
          </div>
          <div className="mncntntpm8Container1">
            <Link>
              <img src={require('../assets/imgs/Airlines/AmericanAirlines.png')} alt="" />
            </Link>
            <Link>
              <img src={require('../assets/imgs/Airlines/EuropeanAirlines.png')} alt="" />
            </Link>
            <Link>
              <img src={require('../assets/imgs/Airlines/AfricanAirlines.png')} alt="" />
            </Link>
            <Link>
              <img src={require('../assets/imgs/Airlines/AsianAirlines.png')} alt="" />
            </Link>
            <Link>
              <img src={require('../assets/imgs/Airlines/OceanianAirlines.png')} alt="" />
            </Link>
            <Link>
              <img src={require('../assets/imgs/Airlines/AntarticaAirlines.png')} alt="" />
            </Link>
          </div>
          <div className="mncntntpm8Container2">
            <p>Are you planning to travel around the globe? Which country requires a visa? Before planning a visit to any country, check the required documents to obtain a visa. Checkout here.</p>
            <Link className="mncntntpm8c2">
              <img src={require('../assets/imgs/VisaGuideBG.png')} alt="" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;