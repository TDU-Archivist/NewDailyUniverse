import React, { useEffect, useState } from 'react'
import "../CSS/newspapers.css";
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



const NewspaperContinent = () => {
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
    const { newspaperContinent } = useParams();
    const [newspaper, setNewspaper] = useState('');
    const [thumbnails, setThumbnails] = useState({}); // Store fetched thumbnails

    useEffect(() => {
        if (newspaperContinent === 'NorthAmerica'){
            setNewspaper('N.America');
        } else if (newspaperContinent === 'SouthAmerica'){
            setNewspaper('S.America');
        } else if (newspaperContinent === 'Europe'){
            setNewspaper('Europe');
        } else if (newspaperContinent === 'Africa'){
            setNewspaper('Africa');
        } else if (newspaperContinent === 'Asia'){
            setNewspaper('Asia');
        } else if (newspaperContinent === 'Oceania'){
            setNewspaper('Oceania');
        } else if (newspaperContinent === 'Antarctica'){
            setNewspaper('Antarctica');
        } else {
            setNewspaper('')
        }
    }, [newspaperContinent, setNewspaper]);

    const currentNewspapers = dataList?.viewAllNewspapers.filter(continent => continent.continent === newspaper) || [];
    useEffect(() => {
        const fetchThumbnails = async () => {
            const newThumbnails = {};
    
            await Promise.all(
                currentNewspapers?.map(async (details) => {
                    try {
                        const response = await axios.get(
                            `${webLogoProxy}?url=${encodeURIComponent(details?.newspaper_website)}`
                        );
    
                        // Ensure the response is valid
                        if (response.data.image && response.data.image !== "No image found") {
                            newThumbnails[details?.newspaper_website] = response.data.image;
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
    
        if (currentNewspapers?.length) {
            fetchThumbnails();
        }
    }, [currentNewspapers]);


    return (
        <div className='mainContainer newspaperContinent'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="newspaperCatContainerPage top">
                <div className="newspaperCatContentPage top2">
                    <div className="nwspprcatntcpt2 left">
                        <Link to='/Newspapers'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4>ALL NEWSPAPERS IN <span>{newspaper}</span></h4>
                    </div>
                    <div className="nwspprcatntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or newspaper name here...'/>
                        <div className="nwspprcatntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="newspaperCatContainerPage mid">
                <div className="newspaperCatContentPage mid1">
                    {currentNewspapers.length ? <>
                        {currentNewspapers?.map((details, i) => (
                            <a key={i} href={details?.newspaper_website} target="_blank" rel="noopener noreferrer">
                                <div className='nwspprctcpm2Img'>
                                    <img src={`https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png`} alt="" id="nwspprctcpm2iFlag" />
                                    <img id='nwspprctcpm2iLogo' src={thumbnails[details?.newspaper_website]} alt='' />
                                </div>
                                <div className='nwspprctccpm2Dets'>
                                    <h6>{details?.newspaper_name}</h6>
                                    <p>{details?.newspaper_description}</p>
                                </div>
                            </a>
                        ))}
                    </>:<>
                        <div className="nwspprctccpm2Empty">
                            <span>
                                <p>No Newspapers listed yet.</p>
                            </span>
                        </div>
                    </>}
                </div>
            </section>
        </div>
    )
}

export default NewspaperContinent