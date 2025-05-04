import React, { useEffect, useState, useMemo } from 'react'
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
import CountryName from './CountryName';



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
    const currentAirline = dataList?.viewAllAirlines.filter(cont => cont.continent === airlineContinent) || [];
    const [countries, setCountries] = useState({});

    useEffect(() => {
        const fetchCountryDetails = async () => {
            if (!currentAirline.length) return;
            const uniqueAlphaCodes = [...new Set(currentAirline.map(airline => airline.country))];
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
    }, [dataList, currentAirline]);

    const groupedBySubcontinent = currentAirline.reduce((acc, airline) => {
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

    
    const [selectedCountry, setSelectedCountry] = useState('');
    const countryAirline = currentAirline.filter(coun => coun.country === selectedCountry) || [];


    const webLogoProxy = process.env.REACT_APP_WEBLOGO_PROXY;
    const [thumbnails, setThumbnails] = useState({}); // Store fetched 
    const [airline, setAirline] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    

    const filteredAirlines = currentAirline?.filter((airline) =>
        airline.airline_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    useEffect(() => {
        const fetchThumbnails = async () => {
            const newThumbnails = {};
    
            await Promise.all(
                filteredAirlines?.map(async (details) => {
                    try {
                        const response = await axios.get(
                            `${webLogoProxy}?url=${encodeURIComponent(details?.airline_website)}`
                        );
    
                        // Ensure the response is valid
                        if (response.data.image && response.data.image !== "No image found") {
                            newThumbnails[details?.airline_website] = response.data.image;
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
    
        if (filteredAirlines?.length) {
            fetchThumbnails();
        }
    }, [filteredAirlines]);
    
    

    return (
        <div className='mainContainer airlineContinent'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>



            <section className="airlineContContainerPage top">
                {/* <div className="airlineContContentPage top1">
                    <img src={require('../assets/imgs/AirlinesBG.png')} alt="" />
                </div> */}
                <div className="airlineContContentPage top2">
                    <div className="arlncntntcpt2 left">
                        <Link to='/Airlines'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4>FAMOUS AIRLINES IN <span>{airlineContinent}</span></h4>
                    </div>
                    <div className="arlncntntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or airline name here...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <div className="arlncntntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="airlineContContainerPage mid">
                {(searchTerm && filteredAirlines.length > 0) ?
                    <>
                        <div className="airlinesContentPage filtered">
                            <>
                                {filteredAirlines.map((details, i) => (
                                    <a key={i} href={details?.airline_website} target="_blank" rel="noopener noreferrer">
                                        <div className='airlinecpm1Img'>
                                            <img src={details?.country ? `https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png` : require('../assets/imgs/TDULandingBG.png')} alt="" id="mgznctcpm2iFlag" />
                                            <img src={thumbnails[details?.airline_website]} alt='' id='mgznctcpm2iLogo' />
                                        </div>
                                        <div className='airlinecpm1Dets'>
                                            <h6>{details?.airline_name}</h6>
                                            <p>{details?.airline_description}</p>
                                        </div>
                                    </a>
                                ))}
                            </>
                        </div>
                </>:<>
                    <div className="airlineContContentPage mid1">
                        {currentAirline.length ? <>
                            {Object.keys(groupedBySubcontinent).map((subcontinent) => (
                                <div className="arlncntntcpm1" key={subcontinent}>
                                    <h4>{subcontinent}</h4>
                                    <h6>All {subcontinent} Airlines</h6>
                                    <ul>
                                        {groupedBySubcontinent[subcontinent].map(({ name, code }) => (
                                            <i key={code}>
                                                <li>
                                                    <img src={`https://flagcdn.com/w320/${code.toLowerCase()}.png`} alt={name} />
                                                    <button onClick={() => setSelectedCountry(code)}>{name ? name : <CountryName code={`${code}`} />}</button>
                                                </li>
                                                {selectedCountry === code && 
                                                    <ul>
                                                        {countryAirline.map((details, i) => (
                                                            <li key={i}><a href={details?.airline_website} target="blank">{details?.airline_name}</a></li>
                                                        ))}
                                                    </ul>
                                                }
                                            </i>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </>:<>
                            <div className="arlncntntcpm1Empty">
                                <span>
                                    <p>No Airline/s data yet.</p>
                                </span>
                            </div>
                        </>}
                    </div>
                </>}
            </section>






        </div>
    )
}

export default AirlineContinent