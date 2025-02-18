import React, { useEffect, useState } from 'react'
import "../CSS/airlines.css";
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

const AirlineContinent = () => {
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

    const { airlineContinent } = useParams();
    const americaAirline = dataList?.viewAllAirlines.filter(cont => cont.continent === airlineContinent)

    const [countries, setCountries] = useState({});

    useEffect(() => {
        const fetchCountryNames = async () => {
        if (!americaAirline) return;
        
        const uniqueAlphaCodes = [...new Set(americaAirline.map(channel => channel.country))];
        
        try {
            const responses = await Promise.all(
            uniqueAlphaCodes.map(code => 
                fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(res => res.json())
            )
            );
            
            const countryMap = {};
            responses.forEach((data, index) => {
            if (data && data[0]?.name?.common) {
                countryMap[uniqueAlphaCodes[index]] = data[0].name.common;
            }
            });
            
            setCountries(countryMap);
        } catch (error) {
            console.error("Error fetching country names:", error);
        }
        };
        
        fetchCountryNames();
    }, [dataList]);


    return (
        <div className='mainContainer airlineContinent'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>



            <section className="airlineContContainerPage top">
                <div className="airlineContContentPage top1">
                    <img src={require('../assets/imgs/AirlinesBG.png')} alt="" />
                </div>
                <div className="airlineContContentPage top2">
                    <div className="arlncntntcpt2 left">
                        <Link to='/Airlines'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4>FAMOUS AIRLINES IN <span>{airlineContinent}</span></h4>
                    </div>
                    <div className="arlncntntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or airline name here...'/>
                        <div className="arlncntntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="airlineContContainerPage mid">
                <div className="airlineContContentPage mid1">
                    {americaAirline.map((details, i) => (
                        <a className='arlncntntcpm1' href={details?.airline_website} target='blank' key={i}>
                            <div className="arlncntntcpm1Top">
                                <img src={details?.airline_logo} alt="" />
                                <h5>{details?.country}</h5>
                            </div>
                            <div className="arlncntntcpm1Bottom">
                                <div>
                                    <h6>{details?.airline_name}</h6>
                                    <p>{countries[details?.country] || details?.country}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

            </section>






        </div>
    )
}

export default AirlineContinent