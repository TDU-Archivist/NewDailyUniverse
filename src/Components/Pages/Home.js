import React, { useEffect, useState } from 'react'
import "../CSS/home.css";
import { Link } from 'react-router-dom';
import { 
  FaTimes,
  FaSearch 
} from 'react-icons/fa';
import axios from 'axios';
import WorldMap from './WorldMap';
import MapViewer from './MapViewer';
import CountryFlag from './CountryFlag';
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

  if (num >= 1_000_000) {
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
    createTDUAccount, 
    setCreateTDUAccount,
    loginTDUAccount, 
    setLoginTDUAccount,
    pickedCountryModal, 
    setPickedCountryModal,
    pickedCountry, 
    setPickedCountry,
    countryData,
    countryThreeTouristSpots,
  } = MainDataLoad(); 
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showImages, setShowImages] = useState([]);

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

  const handleHideCountrySummaryModal = () => {
    setPickedCountry(false);
  }
  const handleSearchCountry = (e) => {
    function toCapitalCase(str) {
      return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    const country = e.target.value;
    setPickedCountryModal(false);
    setPickedCountry(toCapitalCase(country));
    const timeoutId = setTimeout(() => {
        setPickedCountryModal(true);
    }, 400);
    return () => clearTimeout(timeoutId);
  }
  


  return (
    <div className='mainContainer home'>
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
                    <img src={`${countryData?.flags?.png}`} alt="" />
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
                  <h6>RECOMMENDED TOURIST SPOTS</h6>
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
              </div>
            }
            <div className="mncntntpt2rSearch">
              <input type="text" placeholder='Search Country here..' onChange={handleSearchCountry}/>
              <h6><FaSearch /></h6>
            </div>
            <WorldMap />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;