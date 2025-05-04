import React, { useEffect, useState } from 'react'
import "../CSS/magazine.css";
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


const MagazineCategory = () => {
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
    const defaultImage = require("../assets/imgs/MagazinesBG.png");
    const { magazineCategory } = useParams();
    const [magazine, setMagazine] = useState('');
    const [thumbnails, setThumbnails] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (magazineCategory === 'ArtMagazines'){
            setMagazine('Art Magazine');
        } else if (magazineCategory === 'BoatMagazines'){
            setMagazine('Boat Magazine');
        } else if (magazineCategory === 'BusinessMagazines'){
            setMagazine('Business Magazine');
        } else if (magazineCategory === 'CarMagazines'){
            setMagazine('Car Magazine');
        } else if (magazineCategory === 'ChildrenMagazines'){
            setMagazine('Children Magazine');
        } else if (magazineCategory === 'ComputerMagazines'){
            setMagazine('Computer Magazine');
        } else if (magazineCategory === 'CookingMagazines'){
            setMagazine('Cooking Magazine');
        } else if (magazineCategory === 'CruiseMagazines'){
            setMagazine('Cruise Magazine');
        } else if (magazineCategory === 'EducationMagazines'){
            setMagazine('Education Magazine');
        } else if (magazineCategory === 'EntertainmentMagazines'){
            setMagazine('Entertainment Magazine');
        } else if (magazineCategory === 'FashionMagazines'){
            setMagazine('Fashion Magazine');
        } else if (magazineCategory === 'FinanceAndMoneyMagazines'){
            setMagazine('Finance and Money Magazine');
        } else if (magazineCategory === 'HealthMagazines'){
            setMagazine('Health Magazine');
        } else if (magazineCategory === 'HistoryMagazines'){
            setMagazine('History Magazine');
        } else if (magazineCategory === 'HomeMagazines'){
            setMagazine('Home Magazine');
        } else if (magazineCategory === 'MusicMagazines'){
            setMagazine('Music Magazine');
        } else if (magazineCategory === 'PetMagazines'){
            setMagazine('Pet Magazine');
        } else if (magazineCategory === 'PhotographyMagazines'){
            setMagazine('Photography Magazine');
        } else if (magazineCategory === 'SportsMagazines'){
            setMagazine('Sports Magazine');
        } else if (magazineCategory === 'TravelMagazines'){
            setMagazine('Travel Magazine');
        } else {
            setMagazine('')
        }

    }, [setMagazine]);

    const currentMagazine = dataList?.viewAllMagazines.filter(category => category.magazine_category === magazine) || [];
    const countries = [...new Set(currentMagazine.map(mag => mag.country))].sort((a, b) => a.localeCompare(b));
    const filteredMagazines = currentMagazine.filter(
        mag => selectedCountry ? mag.country === selectedCountry : false
    );



    useEffect(() => {
        const fetchThumbnails = async () => {
            const newThumbnails = {};
    
            await Promise.all(
                currentMagazine?.map(async (details) => {
                    try {
                        const response = await axios.get(
                            `${webLogoProxy}?url=${encodeURIComponent(details?.magazine_website)}`
                        );
    
                        // Ensure the response is valid
                        if (response.data.image && response.data.image !== "No image found") {
                            newThumbnails[details?.magazine_website] = response.data.image;
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
    
        if (currentMagazine?.length) {
            fetchThumbnails();
        }
    }, [currentMagazine]);

    const [searchTerm, setSearchTerm] = useState('');
            
    const filteredMagz = currentMagazine?.filter((magazine) =>
        magazine.magazine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        magazine.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        magazine.magazine_category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];



    return (
        <div className='mainContainer magazineCategory'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>

            <section className="magazinCatContainerPage top">
                <div className="magazinCatContentPage top2">
                    <div className="mgzncatntcpt2 left">
                        <Link to='/Magazines'><MdKeyboardDoubleArrowLeft className='faIcons'/></Link>
                        <h4><span>{magazine}S</span></h4>
                        <select
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            value={selectedCountry || ''}
                        >
                            <option value="">All Countries</option>
                            {countries.map((countryCode, i) => (
                                <option key={i} value={countryCode}>
                                    <CountryName code={countryCode} />
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mgzncatntcpt2 right">
                        <input type="text" placeholder='Search keyword, country or magazine name here...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <div className="mgzncatntcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="magazinCatContainerPage mid">
                {(searchTerm && filteredMagz.length > 0) ? <>
                    <div className="magazinCatContentPage mid1">
                        {filteredMagz.map((details, i) => (
                            <a key={i} href={details?.magazine_website} target="_blank" rel="noopener noreferrer">
                            <div className='mgznctcpm2Img'>
                                <img src={details?.country ? `https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png` : require('../assets/imgs/TDULandingBG.png')} alt="" id="mgznctcpm2iFlag" />
                                <img src={thumbnails[details?.magazine_website]} alt='' id='mgznctcpm2iLogo' />
                            </div>
                            <div className='mgznctccpm2Dets'>
                                <h6>{details?.magazine_name}</h6>
                                <p>{details?.magazine_description}</p>
                            </div>
                            </a>
                        ))}
                    </div>
                </>:<>
                    {!selectedCountry ? <div className="magazinCatContentPage mid1">
                        {countries.map((country, i) => (
                            <button key={i} onClick={() => setSelectedCountry(country)}>
                                <div className='mgznctcpm2Img'>
                                    <img src={country ? `https://flagcdn.com/w320/${(country).toLowerCase()}.png` : require('../assets/imgs/TDULandingBG.png')} alt="" id="mgznctcpm2iCountry" />
                                </div>
                                <div className='mgznctccpm2Dets'>
                                    <h6><CountryName code={`${country}`} /></h6>
                                    <p>Online {magazine}s</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    :<div className="magazinCatContentPage mid1">
                        {selectedCountry && (
                            <>
                                {filteredMagazines.length > 0 ? (
                                    <>
                                        {filteredMagazines.map((details, i) => (
                                            <a key={i} href={details?.magazine_website} target="_blank" rel="noopener noreferrer">
                                                <div className='mgznctcpm2Img'>
                                                    <img src={details?.country ? `https://flagcdn.com/w320/${(details?.country).toLowerCase()}.png` : require('../assets/imgs/TDULandingBG.png')} alt="" id="mgznctcpm2iFlag" />
                                                    <img src={thumbnails[details?.magazine_website]} alt='' id='mgznctcpm2iLogo' />
                                                </div>
                                                <div className='mgznctccpm2Dets'>
                                                    <h6>{details?.magazine_name}</h6>
                                                    <p>{details?.magazine_description}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </>
                                ) : (
                                    <div className="mgznctccpm2Empty">
                                        <span>
                                            <p>No {magazine}s listed yet.</p>
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>}
                </>}
            </section>


        </div>
    )
}

export default MagazineCategory