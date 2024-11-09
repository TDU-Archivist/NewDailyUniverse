import React, { useEffect, useState } from 'react'
import "../CSS/home.css";
import { Link } from 'react-router-dom';
import { 
  FaTimes,
  FaSearch,
  FaExternalLinkAlt,
  FaArrowRight  
} from 'react-icons/fa';
import axios from 'axios';
import WorldMap from './WorldMap';
import MapViewer from './MapViewer';
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
    countryData,
    countryCurrency,
    countryThreeTouristSpots,
    exchangeRates,
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
  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Use a simpler geocoding API for city and country only (replace YOUR_API_KEY)
          try {
            const response = await fetch(
              `https://geocode.xyz/${latitude},${longitude}?geoit=json`
            );
            const data = await response.json();

            if (data.city && data.country) {
              setLocation(`${data.city}, ${data.country}`);
            } else {
              setLocation('Location not found');
            }
          } catch (error) {
            setLocation('Error fetching location');
          }
        },
        () => {
          setLocation('Unable to retrieve location');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }

    // Update the currentDateTime every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleHideCountrySummaryModal = () => {
    setPickedCountry(false);
  }



  return (
    <div className='mainContainer home'>
      <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
        <div className="loaderContent">
          <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
        </div>
      </div>


      <section className="mainContainerPage top">
        <div className="mainContentPage top1">
          <h3>THE DAILY UNIVERSE</h3>
          <h6>Your Gateway to Global News, Travel Guides, and Visa Information</h6>
        </div>
        <div className="mainContentPage top2">
          <div className="mncntntpt2 left">
            <h4>CHECK WORLD HAPPENINGS TODAY</h4>
            <p>Stay Updated on World Events - Explore Happenings and Destinations Across Every Country</p>
            <div className="mncntntpt2lBreakingNews">
              <h5>BREAKING NEWS</h5>
              <div className="mncntntpt2lbn">
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
                <div className="mncntntpt2lbnContent">
                  <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
                </div>
              </div>
            </div>
          </div>
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
                    {/* <CountryFlag countryName={`${pickedCountry}`} /> */}
                    <img src={(countryData?.flags?.png) ? `${countryData?.flags?.png}` : require('../assets/imgs/TDULandingBG.png')} alt="" />
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
            <div className="mncntntpt2rSearch">
              {/* <input type="text" placeholder='Search Country here..' onChange={handleSearchCountry}/>
              <h6><FaSearch /></h6> */}
              <h5>{formattedTime}</h5>
              <p>{formattedDate}</p>
              <p>{location}</p>
            </div>
            <WorldMap />
          </div>
        </div>
      </section>
      <section className="mainContainerPage mid">
        <div className="mainContentPage mid1">
          <a className="mncntntpm1">
            <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
            <div className="mncntntpm1Title">
              <h6>THIS WAS A NEWS HEADER</h6>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex earum eos laborum ducimus ipsam...</p>
            </div>
          </a>
          <a className="mncntntpm1">
            <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
            <div className="mncntntpm1Title">
              <h6>THIS WAS A NEWS HEADER</h6>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex earum eos laborum ducimus ipsam...</p>
            </div>
          </a>
          <a className="mncntntpm1">
            <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
            <div className="mncntntpm1Title">
              <h6>THIS WAS A NEWS HEADER</h6>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex earum eos laborum ducimus ipsam...</p>
            </div>
          </a>
          <a className="mncntntpm1">
            <img src={require('../assets/imgs/TDULandingBG.png')} alt="" />
            <div className="mncntntpm1Title">
              <h6>THIS WAS A NEWS HEADER</h6>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex earum eos laborum ducimus ipsam...</p>
            </div>
          </a>
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
        <div className="mainContentPage mid4">
          <div className="mncntntpm4More">
            <h4>LATEST NEWS</h4>
            <Link><h6>VIEW MORE</h6></Link>
          </div>
          <div className="mncntntpm4Container">
            <div className="mncntntpm4Content">
              <div>
                <img src="" alt="" />
              </div>
              <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut inventore 
                beatae, cum quisquam pariatur repellendus possimus tenetur delectus 
                voluptas expedita cumque ea veniam eum repudiandae totam architecto. 
                Distinctio, sed consequatur?
              </p>
            </div>
            <div className="mncntntpm4Content">
              <div>
                <img src="" alt="" />
              </div>
              <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut inventore 
                beatae, cum quisquam pariatur repellendus possimus tenetur delectus 
                voluptas expedita cumque ea veniam eum repudiandae totam architecto. 
                Distinctio, sed consequatur?
              </p>
            </div>
            <div className="mncntntpm4Content">
              <div>
                <img src="" alt="" />
              </div>
              <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut inventore 
                beatae, cum quisquam pariatur repellendus possimus tenetur delectus 
                voluptas expedita cumque ea veniam eum repudiandae totam architecto. 
                Distinctio, sed consequatur?
              </p>
            </div>
            <div className="mncntntpm4Content">
              <div>
                <img src="" alt="" />
              </div>
              <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut inventore 
                beatae, cum quisquam pariatur repellendus possimus tenetur delectus 
                voluptas expedita cumque ea veniam eum repudiandae totam architecto. 
                Distinctio, sed consequatur?
              </p>
            </div>
          </div>
        </div>
        <div className="mainContentPage mid5">
          <div className="mncntntpm5More">
            <h4>US DOLLAR EXCHANGE RATE</h4>
            {/* <Link><h6>VIEW MORE</h6></Link> */}
          </div>
          <div className="mncntntpm5Container">
            <ExchangeRateMarquee exchangeRate={exchangeRates} />
          </div>
        </div>
        <div className="mainContentPage mid6">
          <div className="mncntntpm6Container">
            <div className="mncntntpm6cHeader">
              <h4>BUSINESS</h4>
              <Link><h6><FaArrowRight className='faIcons'/></h6></Link>
            </div>
            <div className="mncntntpm6cContent">
              <div className="mncntntpm6ccArticle">
                <div>
                  <img src="" alt="" />
                </div>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At est nisi quae accusantium sed, eligendi maiores nihil eveniet veniam, error, aliquam in dolor ratione nobis enim voluptas animi soluta! Asperiores?</p>
              </div>
              <div className="mncntntpm6ccArticle">
                <div>
                  <img src="" alt="" />
                </div>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At est nisi quae accusantium sed, eligendi maiores nihil eveniet veniam, error, aliquam in dolor ratione nobis enim voluptas animi soluta! Asperiores?</p>
              </div>
            </div>
          </div>
          <div className="mncntntpm6Container">
            <div className="mncntntpm6cHeader">
              <h4>SPORTS</h4>
              <Link><h6><FaArrowRight className='faIcons'/></h6></Link>
            </div>
            <div className="mncntntpm6cContent">
              <div className="mncntntpm6ccArticle">
                <div>
                  <img src="" alt="" />
                </div>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At est nisi quae accusantium sed, eligendi maiores nihil eveniet veniam, error, aliquam in dolor ratione nobis enim voluptas animi soluta! Asperiores?</p>
              </div>
              <div className="mncntntpm6ccArticle">
                <div>
                  <img src="" alt="" />
                </div>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At est nisi quae accusantium sed, eligendi maiores nihil eveniet veniam, error, aliquam in dolor ratione nobis enim voluptas animi soluta! Asperiores?</p>
              </div>
            </div>
          </div>
        </div>
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
      </section>
    </div>
  )
}

export default Home;