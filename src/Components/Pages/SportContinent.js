import React, { useEffect, useState } from 'react'
import "../CSS/sports.css";
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

const SportContinent = () => {
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
    const { sportContinent } = useParams();
    const [sports, setSports] = useState('');
    const [thumbnails, setThumbnails] = useState({}); // Store fetched thumbnails

    useEffect(() => {
        if (sportContinent === 'NorthAmerica'){
            setSports('N.America');
        } else if (sportContinent === 'SouthAmerica'){
            setSports('S.America');
        } else if (sportContinent === 'Europe'){
            setSports('Europe');
        } else if (sportContinent === 'Africa'){
            setSports('Africa');
        } else if (sportContinent === 'Asia'){
            setSports('Asia');
        } else if (sportContinent === 'Oceania'){
            setSports('Oceania');
        } else if (sportContinent === 'Antarctica'){
            setSports('Antarctica');
        } else {
            setSports('')
        }
    }, [sportContinent, setSports]);

    const currentSports = dataList?.viewAllSports.filter(continent => continent.continent === sports) || [];
    useEffect(() => {
        const fetchThumbnails = async () => {
            const newThumbnails = {};
    
            await Promise.all(
                currentSports?.map(async (details) => {
                    try {
                        const response = await axios.get(
                            `${webLogoProxy}?url=${encodeURIComponent(details?.sports_website)}`
                        );
    
                        // Ensure the response is valid
                        if (response.data.image && response.data.image !== "No image found") {
                            newThumbnails[details?.sports_website] = response.data.image;
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
    
        if (currentSports?.length) {
            fetchThumbnails();
        }
    }, [currentSports]);


    return (
        <div className='mainContainer sportContinent'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>


            <section className="sportCatContainerPage top">
                <div className="sportCatContentPage top2">
                    <div className="sprtcatntcpt2 left">
                        <Link to='/Sports'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4>ALL SPORTS IN <span>{sports}</span> BY CATEGORY</h4>
                    </div>
                    <div className="sprtcatntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or sports name here...'/>
                        <div className="sprtcatntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sportCatContainerPage mid">
                <div className="sportCatContainerPage mid1">
                    {currentSports.length ? <>
                        {currentSports?.map((details, i) => (
                            <a key={i} href={details?.sports_website} target="_blank" rel="noopener noreferrer">
                                <div className='sprtctcpm2Img'>
                                    <img src={`https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png`} alt="" id="nwspprctcpm2iFlag" />
                                    <img id='sprtctcpm2iLogo' src={thumbnails[details?.sports_website]} alt='' />
                                </div>
                                <div className='sprtctccpm2Dets'>
                                    <h6>{details?.sports_name}</h6>
                                    <p>{details?.sports_description}</p>
                                </div>
                            </a>
                        ))}
                    </>:<>
                        <div className="sprtctccpm2Empty">
                            <span>
                                <p>No Sports listed yet.</p>
                            </span>
                        </div>
                    </>}
                </div>
            </section>

        </div>
    )
}

export default SportContinent