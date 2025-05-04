import React, { useEffect, useState } from 'react'
import "../CSS/newsChannels.css";
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
  FaPlayCircle,     
  FaYoutube
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

const NewsChannels = () => {
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

    const [viewLiveChannels, setViewLiveChannels] = useState(true);
    const [viewYoutubeChannels, setViewYoutubeChannels] = useState(false);

    const handleViewLiveChannels = () => {
        setViewLiveChannels(true);
        setViewYoutubeChannels(false);
    }
    const handleViewYoutubeChannels = () => {
        setViewLiveChannels(false);
        setViewYoutubeChannels(true);
    }

    const [countries, setCountries] = useState({});

    useEffect(() => {
        const fetchCountryNames = async () => {
        if (!dataList?.viewAllLiveChannels) return;
        
        const uniqueAlphaCodes = [...new Set(dataList.viewAllLiveChannels.map(channel => channel.country))];
        
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

    
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredChannels = dataList?.viewAllLiveChannels?.filter((channels) =>
        channels.channel_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    return (
        <div className='mainContainer newsChannels'>
            <div className={webLoader ? "allLoaderContainer active" : "allLoaderContainer disable"}>
                <div className="loaderContent">
                <img src={require('../assets/imgs/TheDailyUniverseLogo.png')} alt="" />
                <p>LOADING UPDATES...</p>
                </div>
            </div>


            <section className="newsChannelsContainerPage top">
                <div className="newsChannelsContentPage top1">
                    <img src={require('../assets/imgs/LiveChannelsBG.png')} alt="" />
                </div>
                <div className="newsChannelsContentPage top2">
                    <div className="nwschnlcpt2 left">
                        <h4>LIVE TELECAST AND YOUTUBE NEWS CHANNELS</h4>
                        <p>Stay Informed with Live Telecasts from these Trusted News Channels.</p>
                    </div>
                    <div className="nwschnlcpt2 right">
                        <input type="text" placeholder='Search keyword, news channel or youtube channel here...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        <div className="nwschnlcpt2rBtn">
                            <button><FaSearch className='faIcons'/></button>
                            <button><FaMicrophone className='faIcons'/></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="newsChannelsContainerPage mid">
                <div className="newsChannelsContentPage mid1">
                    <div className="nwschnlcpm1Nav">
                        <button className={viewLiveChannels ? 'active' : ''} onClick={handleViewLiveChannels}>LIVE CHANNELS</button>
                        <button className={viewYoutubeChannels ? 'active' : ''} onClick={handleViewYoutubeChannels}>YOUTUBE CHANNELS</button>
                    </div>
                </div>
                <div className="newsChannelsContentPage mid2">
                    {viewLiveChannels && <div className="nwschnlcpm2Content1">
                        <>
                            {(searchTerm && filteredChannels.length > 0) ?<>
                                {filteredChannels?.map((details, i) => (
                                    <a className="nwschnlcpm2c1" href={details?.channel_website} target='blank' key={i}>
                                        <div className='nwschnlcpm2c1Img'>
                                            <img id='nwschnlcpm2c1iLogo' src={details?.channel_logo} alt="" />
                                            <h6>{details?.country}</h6>
                                        </div>
                                        <div className='nwschnlcpm2c1Content'>
                                            <h5>{details?.channel_name}</h5>
                                            <p>{countries[details?.country] || details?.country}</p>
                                        </div>
                                    </a>
                                ))}
                            </>:<>
                                {dataList?.viewAllLiveChannels?.map((details, i) => (
                                    <a className="nwschnlcpm2c1" href={details?.channel_website} target='blank' key={i}>
                                        <div className='nwschnlcpm2c1Img'>
                                            <img id='nwschnlcpm2c1iLogo' src={details?.channel_logo} alt="" />
                                            <h6>{details?.country}</h6>
                                        </div>
                                        <div className='nwschnlcpm2c1Content'>
                                            <h5>{details?.channel_name}</h5>
                                            <p>{countries[details?.country] || details?.country}</p>
                                        </div>
                                    </a>
                                ))}
                            </>}
                        </>
                    </div>}
                    {viewYoutubeChannels && <div className="nwschnlcpm2Content1">
                        <>
                            <a className="nwschnlcpm2c1">
                                <div className='nwschnlcpm2c1Img'>
                                    <h5><FaYoutube className='faIcons'/></h5>
                                </div>
                                <div className='nwschnlcpm2c1Content'>
                                    <h5>CNN YOUTUBE</h5>
                                </div>
                            </a>
                        </>
                    </div>}
                </div>
            </section>

        </div>
    )
}

export default NewsChannels