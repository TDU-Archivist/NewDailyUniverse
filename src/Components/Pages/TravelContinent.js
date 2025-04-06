import React, { useEffect, useState } from 'react'
import "../CSS/travel.css";
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


const TravelContinent = () => {
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
    const { travelContinent } = useParams();
    const [travel, setTravel] = useState('');
    const [thumbnails, setThumbnails] = useState({}); // Store fetched thumbnails

    useEffect(() => {
        if (travelContinent === 'NorthAmerica'){
            setTravel('N.America');
        } else if (travelContinent === 'SouthAmerica'){
            setTravel('S.America');
        } else if (travelContinent === 'Europe'){
            setTravel('Europe');
        } else if (travelContinent === 'Africa'){
            setTravel('Africa');
        } else if (travelContinent === 'Asia'){
            setTravel('Asia');
        } else if (travelContinent === 'Oceania'){
            setTravel('Oceania');
        } else if (travelContinent === 'Antarctica'){
            setTravel('Antarctica');
        } else {
            setTravel('')
        }
    }, [travelContinent, setTravel]);

    const currentTravel = dataList?.viewAllTravel.filter(continent => continent.continent === travel) || [];
    
    const [countries, setCountries] = useState({});

    useEffect(() => {
        const fetchCountryDetails = async () => {
            if (!currentTravel.length) return;
            const uniqueAlphaCodes = [...new Set(currentTravel.map(destination => destination.country))];
            try {
                const responses = await Promise.all(
                    uniqueAlphaCodes.map(async (code) => {
                        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                        if (!res.ok) return null;
                        return res.json();
                    })
                );
                const countryMap = {};
                responses.forEach((data, index) => {
                    if (data && data[0]) {
                        countryMap[uniqueAlphaCodes[index]] = {
                            name: data[0]?.name?.common || uniqueAlphaCodes[index],
                            code: uniqueAlphaCodes[index],
                            subcontinent: data[0]?.subregion || "Unknown"
                        };
                    }
                });
                setCountries(countryMap);
            } catch (error) {
                console.error("Error fetching country details:", error);
            }
        };
        fetchCountryDetails();
    }, [dataList, currentTravel]);

    const groupedBySubcontinent = currentTravel.reduce((acc, airline) => {
        const { subcontinent, country } = airline;
        if (!acc[subcontinent]) {
            acc[subcontinent] = [];
        }
        const countryDetails = countries[country] || { name: country, code: country, subcontinent };
        if (!acc[subcontinent].some(c => c.code === countryDetails.code)) {
            acc[subcontinent].push(countryDetails);
        }
        return acc;
    }, {});


    return (
        <div className='mainContainer travelContinent'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="travelCatContainerPage top">
                <div className="travelCatContentPage top2">
                    <div className="trvlcatntcpt2 left">
                        <Link to='/Travel'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4>ALL TRAVEL DESTINATION IN <span>{travel}</span></h4>
                    </div>
                    <div className="trvlcatntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or destination name here...'/>
                        <div className="trvlcatntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="travelContContainerPage mid">
                <div className="travelContContentPage mid1">
                    {currentTravel.length ? <>
                        {Object.keys(groupedBySubcontinent).map((subcontinent) => (
                            <div className="trvlcntntcpm1" key={subcontinent}>
                                <h4>{subcontinent}</h4>
                                <h6>All {subcontinent} Destinations</h6>
                                <ul>
                                    {groupedBySubcontinent[subcontinent].map(({ name, code }) => (
                                        <li key={code}>
                                            <img src={`https://flagcdn.com/w320/${code.toLowerCase()}.png`} alt={name} />
                                            <button>{name} ({code})</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>:<>
                        <div className="trvlcntntcpm1Empty">
                            <span>
                                <p>No Travel Destination/s data yet.</p>
                            </span>
                        </div>
                    </>}
                </div>

            </section>
        </div>
    )
}

export default TravelContinent